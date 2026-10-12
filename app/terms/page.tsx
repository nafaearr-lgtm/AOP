import type { Metadata } from "next";
import { Intro } from "@/components/ui";
export const metadata: Metadata = {
  title: "Website Terms",
  description:
    "Draft terms for the AOP pre-launch website, product concepts and expressions of interest.",
  alternates: { canonical: "/terms" },
};
const sections = [
  [
    "About this website",
    "This website explains the vision and intended capabilities of Automotive One Platform and invites enquiries and product research participation. REVIEW REQUIRED: identify the operating legal entity, registered address and contact details.",
  ],
  [
    "Product stage and illustrations",
    "AOP is in development and being prepared for local dealership validation in Pakistan. Modules, interfaces, workflows, integrations and future availability are subject to validation and change. Dashboard visuals are illustrative concepts and do not represent verified production functionality or business performance.",
  ],
  [
    "Expressions of interest",
    "Submitting an enquiry does not create a paid subscription, commercial agreement, guaranteed access, scheduled demonstration or implementation commitment. Future demonstrations and early access depend on readiness and assessment. A successful submission confirms storage of an enquiry, not eligibility for a program.",
  ],
  [
    "Acceptable use",
    "Provide accurate information you are authorized to share. Do not submit sensitive personal data unnecessarily, attempt unauthorized database access, misuse the forms, introduce malicious content or interfere with the website. We may restrict abusive use.",
  ],
  [
    "Website content and third-party services",
    "Website content is supplied for general information. Third-party links and services are subject to their own terms. No manufacturer partnership, certification, universal integration compatibility or regulatory compliance is implied. REVIEW REQUIRED: confirm ownership and permitted use of intellectual property and content.",
  ],
  [
    "Availability and limitations",
    "No commercial service-level commitment, uninterrupted availability or fitness warranty is established by this website. REVIEW REQUIRED: have counsel draft appropriate limitations and exclusions consistent with applicable law and rights that cannot be excluded.",
  ],
  [
    "Privacy",
    "Information submitted is handled as described in the Privacy Policy. Optional update consent is separate from privacy acknowledgement and can be withdrawn. Company-specific processing and retention details require review before production launch.",
  ],
  [
    "Governing law and disputes",
    "REVIEW REQUIRED: insert the applicable governing law, jurisdiction, dispute process and mandatory consumer or other protections after determining the operating entity and intended markets. No jurisdiction is asserted in this draft.",
  ],
  [
    "Changes and contact",
    "These draft terms may be updated as the initiative develops. REVIEW REQUIRED: publish an effective date, legal entity and monitored contact channel before public production use. Draft prepared 12 October 2026.",
  ],
];
export default function Terms() {
  return (
    <>
      <Intro eyebrow="WEBSITE TERMS" title="A clear starting point.">
        <p>Editable draft terms · 12 October 2026</p>
      </Intro>
      <div className="legal">
        <div className="legal-review">
          Legal review required. These are draft website terms, not a software
          subscription agreement or a promise of service availability.
        </div>
        {sections.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
      </div>
    </>
  );
}
