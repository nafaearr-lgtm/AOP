import type { Metadata } from "next";
import { ArrowRight, Check, Layers } from "lucide-react";
import { Intro, Invitation, icons } from "@/components/ui";
import Dashboard from "@/components/dashboard";
import { modules } from "@/lib/site";
export const metadata: Metadata = {
  title: "Platform",
  description:
    "Explore AOP’s intended connected dealership workflows, modular capabilities and executive intelligence.",
  alternates: { canonical: "/platform" },
};
export default function Platform() {
  return (
    <>
      <Intro
        eyebrow="THE AOP PLATFORM"
        title="One operation. Connected from end to end."
      >
        <p>
          Not just a collection of tools. AOP is being designed around the
          handoffs that keep a dealership moving.
        </p>
        <span className="status-pill">
          INTENDED CAPABILITIES · IN DEVELOPMENT
        </span>
      </Intro>
      <section className="workflow-section">
        <p className="eyebrow">
          THE CUSTOMER JOURNEY, WITH OPERATIONAL CONTEXT
        </p>
        <div className="workflow">
          {[
            "Lead",
            "Test drive",
            "Booking",
            "Inventory allocation",
            "Delivery",
            "Customer relationship",
            "Service",
            "Finance",
            "Reporting",
          ].map((s, i) => (
            <div key={s}>
              <span>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {s}
              </span>
              {i < 8 && <ArrowRight size={17} />}
            </div>
          ))}
        </div>
        <p>
          Information is intended to follow the customer and vehicle across
          departments, with clear ownership at each handoff.
        </p>
      </section>
      <section className="architecture">
        <div>
          <p className="eyebrow">ONE MANAGEMENT PERSPECTIVE</p>
          <h2>
            Connect the work.
            <br />
            Understand the whole.
          </h2>
          <p>
            Shared customer, vehicle and operational context is intended to
            connect departmental workflows with permissions, approvals and
            executive reporting.
          </p>
          <div
            className="architecture-diagram"
            aria-label="Concept architecture: departments connect through shared records and controlled workflows to executive intelligence"
          >
            <div className="diagram-nodes">
              <span>Sales & CRM</span>
              <span>Workshop</span>
              <span>Inventory</span>
              <span>Finance & People</span>
            </div>
            <div className="diagram-core">
              <Layers size={20} /> Shared records · permissions · approvals
            </div>
            <div className="diagram-output">
              Executive intelligence & supervised automation
            </div>
          </div>
        </div>
        <Dashboard />
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">EXPLORE THE MODULES</p>
          <h2>Designed for the work you do.</h2>
          <p>
            These capabilities are defined in the development specification.
            Availability will depend on validation, product readiness and market
            requirements.
          </p>
        </div>
        <div className="module-details">
          {modules.map((m) => {
            const Icon = icons[m.icon as keyof typeof icons];
            return (
              <article className="module-detail" id={m.id} key={m.id}>
                <div>
                  <Icon />
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  {m.id === "automation" && (
                    <p>
                      Customer, financial, pricing and record-changing actions
                      are intended to require permissions and appropriate human
                      supervision.
                    </p>
                  )}
                </div>
                <ul className="check-list">
                  {m.features.map((f) => (
                    <li key={f}>
                      <Check size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
      <section className="notice">
        <h2>Modular adoption. Carefully assessed integration.</h2>
        <p>
          Select the modules relevant to your operation. Integration with
          existing DMS, OEM platforms and local requirements will be assessed by
          dealership and market. No universal compatibility or rollout dates are
          promised.
        </p>
      </section>
      <Invitation />
    </>
  );
}
