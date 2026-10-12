import { createHash, createHmac } from "node:crypto";
import { submissionSchema } from "./validation";
export interface Storage {
  save(
    data: Record<string, unknown>,
    key: string,
    fingerprint: string,
    rateKey: string,
  ): Promise<{ id: string } | { error: "rate" | "conflict" | "storage" }>;
}
export async function processSubmission(
  raw: unknown,
  ip: string,
  storage: Storage | null,
  rateSecret: string | undefined,
) {
  const parsed = submissionSchema.safeParse(raw);
  if (!parsed.success)
    return {
      status: 400,
      body: {
        error: "Please check your form entries.",
        fields: parsed.error.flatten().fieldErrors,
      },
    };
  if (!storage || !rateSecret)
    return {
      status: 503,
      body: {
        error:
          "Submissions are not available yet. Your information has not been saved. Please try again later.",
      },
    };
  const v = parsed.data;
  const fingerprint = createHash("sha256")
    .update(JSON.stringify(v))
    .digest("hex");
  const day = new Date().toISOString().slice(0, 10);
  const rateKey = createHmac("sha256", rateSecret)
    .update(`${day}:${ip}`)
    .digest("hex");
  const data = {
    kind: v.kind,
    name: v.name,
    work_email: v.email,
    job_title: v.jobTitle || null,
    company: v.company,
    company_website: v.website || null,
    country: v.country,
    automotive_brands: v.brands || null,
    rooftop_count: v.rooftops ? Number(v.rooftops) : null,
    operational_challenge: v.challenge || null,
    areas_of_interest: v.interests,
    additional_comments: v.comments || null,
    marketing_consent: v.marketingConsent,
    consent_timestamp: v.marketingConsent ? new Date().toISOString() : null,
    policy_version: "2026-10-draft-1",
    privacy_acknowledged: true,
    source_page: v.source,
    lead_status:
      v.kind === "interest" ? "New Pre-Launch Interest" : "New Contact Enquiry",
  };
  try {
    const result = await storage.save(data, v.requestId, fingerprint, rateKey);
    if ("error" in result) {
      if (result.error === "rate")
        return {
          status: 429,
          body: {
            error: "Too many submissions. Please wait an hour and try again.",
          },
        };
      if (result.error === "conflict")
        return {
          status: 409,
          body: {
            error:
              "This submission was already received with different details. Refresh the page to start a new enquiry.",
          },
        };
      return {
        status: 503,
        body: {
          error:
            "We could not confirm storage. Please retry with this form; your retry will not create a duplicate.",
        },
      };
    }
    return {
      status: 200,
      body: {
        id: result.id,
        message:
          v.kind === "interest"
            ? "Your interest has been registered. Future demonstrations and early access depend on product readiness."
            : "Your enquiry has been saved. Thank you for getting in touch.",
      },
    };
  } catch {
    return {
      status: 503,
      body: {
        error:
          "We could not confirm storage. Please retry with this form; your retry will not create a duplicate.",
      },
    };
  }
}
