import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
let db: PGlite;
const data = {
  kind: "interest",
  name: "Test Owner",
  work_email: "test@example.com",
  job_title: "Principal",
  company: "Test Dealer",
  country: "South Africa",
  areas_of_interest: ["Participate in Product Research"],
  marketing_consent: false,
  consent_timestamp: null,
  policy_version: "2026-10-draft-1",
  privacy_acknowledged: true,
  source_page: "/register-interest",
  lead_status: "New Pre-Launch Interest",
};
async function submit(
  id: string,
  fingerprint = "original",
  rateKey = "bucket",
) {
  const result = await db.query<{ result: { id?: string; error?: string } }>(
    "select public.submit_aop_enquiry($1::jsonb,$2::uuid,$3,$4) as result",
    [JSON.stringify(data), id, fingerprint, rateKey],
  );
  return result.rows[0].result;
}
beforeAll(async () => {
  db = new PGlite();
  await db.exec(
    "create role anon; create role authenticated; create role service_role;",
  );
  await db.exec(
    readFileSync(
      new URL("../supabase/001_submissions.sql", import.meta.url),
      "utf8",
    ),
  );
}, 20000);
afterAll(async () => {
  await db.close();
});
describe("actual SQL migration and database function", () => {
  it("stores an enquiry and preserves explicit consent", async () => {
    const r = await submit("00000000-0000-4000-8000-000000000001");
    expect(r.id).toBeTruthy();
    const result = await db.query(
      "select marketing_consent,consent_timestamp,lead_status,areas_of_interest from public.aop_submissions where id=$1",
      [r.id],
    );
    expect(result.rows[0]).toEqual({
      marketing_consent: false,
      consent_timestamp: null,
      lead_status: "New Pre-Launch Interest",
      areas_of_interest: ["Participate in Product Research"],
    });
  });
  it("deduplicates repeated request IDs and rejects conflicting content", async () => {
    const a = await submit("00000000-0000-4000-8000-000000000002");
    const b = await submit("00000000-0000-4000-8000-000000000002");
    expect(a.id).toBe(b.id);
    expect(
      await submit("00000000-0000-4000-8000-000000000002", "changed"),
    ).toEqual({ error: "conflict" });
    const count = await db.query<{ count: number }>(
      "select count(*)::integer as count from public.aop_submissions where request_id=$1",
      ["00000000-0000-4000-8000-000000000002"],
    );
    expect(count.rows[0].count).toBe(1);
  });
  it("limits new submissions and does not save rate-limited requests", async () => {
    for (let i = 1; i <= 5; i++)
      expect(
        (
          await submit(
            `10000000-0000-4000-8000-00000000000${i}`,
            "original",
            "rate-test",
          )
        ).id,
      ).toBeTruthy();
    expect(
      await submit(
        "10000000-0000-4000-8000-000000000006",
        "original",
        "rate-test",
      ),
    ).toEqual({ error: "rate" });
    const rows = await db.query(
      "select id from public.aop_submissions where request_id=$1",
      ["10000000-0000-4000-8000-000000000006"],
    );
    expect(rows.rows).toHaveLength(0);
  });
  it.each(["anon", "authenticated"])(
    "denies %s reads and writes and function access",
    async (role) => {
      await db.exec(`set role ${role}`);
      try {
        await expect(
          db.query("select * from public.aop_submissions"),
        ).rejects.toThrow(/permission denied/);
        await expect(
          submit("20000000-0000-4000-8000-000000000001"),
        ).rejects.toThrow(/permission denied/);
        await expect(
          db.exec(
            "insert into public.aop_rate_limits values ('unsafe',now(),1)",
          ),
        ).rejects.toThrow(/permission denied/);
      } finally {
        await db.exec("reset role");
      }
    },
  );
  it("permits the service role to call the restricted function", async () => {
    await db.exec("set role service_role");
    try {
      expect(
        (
          await submit(
            "30000000-0000-4000-8000-000000000001",
            "original",
            "service-test",
          )
        ).id,
      ).toBeTruthy();
    } finally {
      await db.exec("reset role");
    }
  });
});
