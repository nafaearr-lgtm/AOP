import { z } from "zod";
export const challenges = [
  "Sales and CRM",
  "Workshop and Aftersales",
  "Inventory Management",
  "Finance and Reporting",
  "HR and Administration",
  "Management Visibility",
  "Integrating Existing Systems",
  "Other",
] as const;
export const interests = [
  "Participate in Product Research",
  "Receive Development Updates",
  "Request a Future Demonstration",
  "Explore Early Access",
] as const;
const text = (max: number) =>
  z.string().trim().min(1, "This field is required.").max(max);
export const submissionSchema = z
  .object({
    requestId: z.uuid(),
    kind: z.enum(["interest", "contact"]),
    name: text(120),
    email: z
      .email()
      .max(254)
      .transform((v) => v.toLowerCase()),
    jobTitle: z.string().trim().max(120),
    company: text(160),
    country: text(100),
    website: z
      .string()
      .trim()
      .max(300)
      .refine(
        (v) => !v || /^https?:\/\//i.test(v),
        "Use a full http:// or https:// URL.",
      )
      .refine((v) => {
        if (!v) return true;
        try {
          const u = new URL(v);
          return !!u.hostname && !u.username && !u.password;
        } catch {
          return false;
        }
      }, "Enter a valid website URL."),
    brands: z.string().trim().max(300),
    rooftops: z
      .string()
      .refine(
        (v) => !v || (/^\d{1,5}$/.test(v) && Number(v) > 0),
        "Enter a positive number.",
      ),
    challenge: z.union([z.enum(challenges), z.literal("")]),
    interests: z
      .array(z.enum(interests))
      .max(4)
      .refine((v) => new Set(v).size === v.length),
    comments: z.string().trim().max(3000),
    marketingConsent: z.boolean(),
    privacyAcknowledged: z.literal(true, {
      error: "Please acknowledge the privacy notice.",
    }),
    honeypot: z.string().max(0, "Submission could not be accepted."),
    source: z.enum(["/register-interest", "/contact"]),
  })
  .superRefine((v, c) => {
    if (v.kind === "interest") {
      if (!v.jobTitle)
        c.addIssue({
          code: "custom",
          path: ["jobTitle"],
          message: "Job title is required.",
        });
      if (!v.challenge)
        c.addIssue({
          code: "custom",
          path: ["challenge"],
          message: "Select your primary challenge.",
        });
    }
    if (v.kind === "contact" && !v.comments)
      c.addIssue({
        code: "custom",
        path: ["comments"],
        message: "Please enter a message.",
      });
    if (
      v.interests.includes("Receive Development Updates") &&
      !v.marketingConsent
    )
      c.addIssue({
        code: "custom",
        path: ["marketingConsent"],
        message:
          "Please give separate consent to receive development updates, or deselect that preference.",
      });
    if (
      v.source !== (v.kind === "interest" ? "/register-interest" : "/contact")
    )
      c.addIssue({
        code: "custom",
        path: ["source"],
        message: "Invalid source.",
      });
  });
export type Submission = z.infer<typeof submissionSchema>;
