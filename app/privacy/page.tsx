import type { Metadata } from "next";
import { Intro } from "@/components/ui";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Draft privacy notice for AOP pre-launch research and lead collection. Company-specific and legal review required.",
  alternates: { canonical: "/privacy" },
};
const sections = [
  [
    "Who is responsible",
    "Automotive One Platform is the name used for this pre-launch initiative. REVIEW REQUIRED: insert the legal entity, registered address, controller details and applicable privacy representative before collecting production data.",
  ],
  [
    "Information we collect",
    "When you submit an interest or contact form, we collect your name, work email, company and country, and any job title, website, represented brands, dealership location count, operational challenge, interests and comments you provide. We record your explicit update preferences, marketing consent, consent timestamp where given, policy version, submission time and source. Do not include sensitive personal information in comments.",
  ],
  [
    "Why we use it",
    "We use enquiries to respond to your requests, understand dealership requirements, organize product research and assess expressions of interest in future access or demonstrations. We send optional product and development updates only with separate consent. Registration does not guarantee access, deployment or a demo.",
  ],
  [
    "Legal bases and consent",
    "REVIEW REQUIRED: determine the applicable legal bases in each market. Enquiry handling and research may rely on legitimate interests or another applicable basis following an assessment. Optional marketing relies on your separate consent where required. Acknowledging this notice is not marketing consent. You may submit without opting into updates.",
  ],
  [
    "Storage and service providers",
    "Submissions are stored in a restricted Supabase database when configured. Authorized personnel may access enquiries for the purposes above. Hosting may use Vercel. REVIEW REQUIRED: confirm the actual providers, contractual safeguards, deployment region, access procedures and any additional processors. This implementation does not send automated marketing campaigns or notification emails.",
  ],
  [
    "International transfers",
    "Data may be processed outside your country depending on the selected hosting and database regions. REVIEW REQUIRED: identify actual locations, transfer mechanisms and safeguards before launch. No automatic compliance with POPIA, GDPR, Malaysia PDPA or Philippines privacy requirements is claimed.",
  ],
  [
    "Retention",
    "REVIEW REQUIRED: set and publish a justified retention period, review schedule and deletion procedure. Keep enquiries only as long as necessary for the stated purposes and any applicable legal obligations. Consent withdrawal must be reflected in communication preferences; minimal suppression records may be needed to avoid unwanted updates.",
  ],
  [
    "Your choices and rights",
    "Depending on applicable law, you may request access, correction, deletion, restriction or objection, data portability, and withdrawal of consent. Withdrawal does not affect lawful prior processing. You may also have a right to complain to an applicable supervisory authority. REVIEW REQUIRED: define identity verification and response procedures without collecting excessive information.",
  ],
  [
    "Cookies and abuse protection",
    "No advertising or analytics cookies are implemented in this version. A honeypot, same-origin checks and database-backed rate limiting help prevent abuse. The server derives a daily keyed hash from the platform-provided network address for rate limiting; it does not store raw IP addresses in the submissions table. Rate-limit records are cleaned after two days on subsequent successful submissions.",
  ],
  [
    "Updates to this notice",
    "Material changes should be published with an updated policy version and date. The policy version acknowledged at submission is recorded. Current draft version: 2026-10-draft-1.",
  ],
];
export default function Privacy() {
  return (
    <>
      <Intro
        eyebrow="PRIVACY & YOUR PREFERENCES"
        title="Your information. Clear choices."
      >
        <p>Draft privacy notice · 12 October 2026</p>
      </Intro>
      <div className="legal">
        <div className="legal-review">
          This editable notice requires legal and company-specific review before
          production lead collection. It is not a statement of certified
          regulatory compliance.
        </div>
        {sections.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
        <section>
          <h2>Privacy requests</h2>
          {site.privacyEmail ? (
            <p>
              Contact{" "}
              <a className="text-link" href={`mailto:${site.privacyEmail}`}>
                {site.privacyEmail}
              </a>{" "}
              to ask about your data or withdraw update consent.
            </p>
          ) : (
            <p>
              REVIEW REQUIRED: a monitored privacy contact has not yet been
              configured. Set NEXT_PUBLIC_PRIVACY_EMAIL and publish the legal
              entity’s contact details before production collection.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
