import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import LeadForm from "@/components/lead-form";
export const metadata: Metadata = {
  title: "Register Your Interest",
  description:
    "Help shape AOP. Share your dealership challenges, request development updates and express interest in future demonstrations.",
  alternates: { canonical: "/register-interest" },
};
export default function Register() {
  return (
    <section className="conversion-layout">
      <aside>
        <p className="eyebrow">BE PART OF WHAT COMES NEXT</p>
        <h1>
          Your dealership.
          <br />
          Your perspective.
          <br />
          <span>A better direction.</span>
        </h1>
        <p>
          Help shape the next generation of dealership operations. Tell us what
          matters to your business.
        </p>
        <ul className="check-list">
          {[
            "Share your operational challenges",
            "Influence product priorities",
            "Choose verified development updates",
            "Express interest in future demonstrations",
            "Explore potential early-access participation",
          ].map((x) => (
            <li key={x}>
              <Check size={17} />
              {x}
            </li>
          ))}
        </ul>
        <div className="trust-note">
          <ShieldCheck size={24} />
          <p>
            We’re in development, preparing for local validation. Registration
            is an expression of interest, not a promise of access or a scheduled
            demo.
          </p>
        </div>
      </aside>
      <div className="form-panel">
        <h2>Let’s start a conversation.</h2>
        <p>A little context helps us understand your operation.</p>
        <LeadForm />
      </div>
    </section>
  );
}
