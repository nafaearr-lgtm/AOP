import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import LeadForm from "@/components/lead-form";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the AOP team about dealership operations, research participation and the platform in development.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <section className="conversion-layout">
      <aside>
        <p className="eyebrow">LET’S CONNECT</p>
        <h1>
          Good conversations
          <br />
          start with
          <br />
          <span>real challenges.</span>
        </h1>
        <p>
          Questions about the platform, product research or future availability?
          Tell us a little about your dealership and what you’d like to discuss.
        </p>
        <div className="trust-note">
          <MessageSquare />
          <div>
            <h3>Company contact details</h3>
            {site.email ? (
              <a href={`mailto:${site.email}`}>{site.email}</a>
            ) : (
              <p>
                Public contact email: to be configured.
                <br />
                Telephone and office address: not yet published.
              </p>
            )}
          </div>
        </div>
      </aside>
      <div className="form-panel">
        <h2>Send the team an enquiry.</h2>
        <p>
          We’ll store your message securely when submission storage is
          configured.
        </p>
        <LeadForm kind="contact" />
      </div>
    </section>
  );
}
