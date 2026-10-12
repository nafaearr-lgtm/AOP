import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { processSubmission, type Storage } from "@/lib/submissions";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = request.headers.get("origin");
  const allowedOrigin = configuredOrigin
    ? new URL(configuredOrigin).origin
    : process.env.NODE_ENV === "development"
      ? request.nextUrl.origin
      : null;
  if (!allowedOrigin || origin !== allowedOrigin)
    return NextResponse.json(
      { error: "Submission origin is not permitted." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ error: "JSON is required." }, { status: 415 });
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > 16000)
    return NextResponse.json(
      { error: "Submission is too large." },
      { status: 413 },
    );
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error();
    let size = 0;
    const chunks: Uint8Array[] = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Submission is too large." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  const url = process.env.SUPABASE_URL,
    key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let storage: Storage | null = null;
  if (url && key) {
    const db = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    storage = {
      async save(data, requestId, fingerprint, rateKey) {
        const { data: result, error } = await db.rpc("submit_aop_enquiry", {
          p_data: data,
          p_request_id: requestId,
          p_fingerprint: fingerprint,
          p_rate_key: rateKey,
        });
        if (error || !result) return { error: "storage" };
        return result;
      },
    };
  }
  // Trust Vercel's platform-controlled client IP header only when deployed there.
  // Other hosts share a conservative bucket until a trusted proxy adapter is configured.
  const ip = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown"
    : "local-shared";
  const result = await processSubmission(
    raw,
    ip,
    storage,
    process.env.RATE_LIMIT_SECRET,
  );
  return NextResponse.json(result.body, {
    status: result.status,
    headers: {
      "Cache-Control": "no-store",
      ...(result.status === 429 ? { "Retry-After": "3600" } : {}),
    },
  });
}
