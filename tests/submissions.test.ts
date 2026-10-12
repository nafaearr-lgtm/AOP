import { describe, it, expect, vi } from "vitest";
import { submissionSchema } from "../lib/validation";
import { processSubmission, type Storage } from "../lib/submissions";
const valid = {
  requestId: "a9320a5b-d4bd-40a1-9af3-ec086dfd7241",
  kind: "interest",
  name: "Dealer Operator",
  email: "OWNER@example.com",
  jobTitle: "Principal",
  company: "Example dealer",
  country: "South Africa",
  website: "",
  brands: "",
  rooftops: "",
  challenge: "Management Visibility",
  interests: ["Participate in Product Research"],
  comments: "",
  marketingConsent: false,
  privacyAcknowledged: true,
  honeypot: "",
  source: "/register-interest",
};
describe("submission validation", () => {
  it("normalizes email and allows no marketing consent", () => {
    const v = submissionSchema.parse(valid);
    expect(v.email).toBe("owner@example.com");
    expect(v.marketingConsent).toBe(false);
  });
  it.each([
    { name: "" },
    { email: "invalid" },
    { jobTitle: "" },
    { company: "" },
    { country: "" },
    { challenge: "" },
    { honeypot: "bot" },
    { privacyAcknowledged: false },
    { website: "javascript:alert(1)" },
    { rooftops: "-1" },
    { source: "/contact" },
  ])("rejects invalid input %j", (change) => {
    expect(submissionSchema.safeParse({ ...valid, ...change }).success).toBe(
      false,
    );
  });
  it("requires separate consent for updates", () => {
    expect(
      submissionSchema.safeParse({
        ...valid,
        interests: ["Receive Development Updates"],
      }).success,
    ).toBe(false);
  });
  it("allows contact form but requires message", () => {
    const contact = {
      ...valid,
      kind: "contact",
      source: "/contact",
      jobTitle: "",
      challenge: "",
      comments: "Question about research",
    };
    expect(submissionSchema.safeParse(contact).success).toBe(true);
    expect(
      submissionSchema.safeParse({ ...contact, comments: "" }).success,
    ).toBe(false);
  });
});
describe("storage outcomes", () => {
  it("never claims success without credentials", async () => {
    expect(
      (await processSubmission(valid, "127.0.0.1", null, undefined)).status,
    ).toBe(503);
  });
  it("does not call storage for invalid data", async () => {
    const save = vi.fn();
    expect(
      (
        await processSubmission(
          { ...valid, email: "bad" },
          "ip",
          { save },
          "secret",
        )
      ).status,
    ).toBe(400);
    expect(save).not.toHaveBeenCalled();
  });
  it("records explicit preferences and confirms persisted id", async () => {
    const save = vi.fn().mockResolvedValue({ id: "persisted-id" });
    const result = await processSubmission(valid, "ip", { save }, "secret");
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id", "persisted-id");
    const data = save.mock.calls[0][0];
    expect(data.marketing_consent).toBe(false);
    expect(data.consent_timestamp).toBeNull();
    expect(data.lead_status).toBe("New Pre-Launch Interest");
    expect(data.areas_of_interest).toEqual(valid.interests);
    expect(save.mock.calls[0][3]).not.toContain("ip");
  });
  it("uses the same retry key and fingerprint", async () => {
    const save = vi.fn().mockResolvedValue({ id: "same" });
    await processSubmission(valid, "ip", { save }, "secret");
    await processSubmission(valid, "ip", { save }, "secret");
    expect(save.mock.calls[0].slice(1)).toEqual(save.mock.calls[1].slice(1));
  });
  it.each([
    ["rate", 429],
    ["conflict", 409],
    ["storage", 503],
  ] as const)("reports %s accurately", async (error, status) => {
    const storage: Storage = { save: async () => ({ error }) };
    expect(
      (await processSubmission(valid, "ip", storage, "secret")).status,
    ).toBe(status);
  });
  it("handles network failure without exposing details", async () => {
    const result = await processSubmission(
      valid,
      "ip",
      {
        save: async () => {
          throw new Error("secret error");
        },
      },
      "secret",
    );
    expect(result.status).toBe(503);
    expect(JSON.stringify(result)).not.toContain("secret error");
  });
});
