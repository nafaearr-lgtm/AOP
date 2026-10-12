import type { Metadata } from "next";
import {
  ArrowRight,
  Layers,
  Unplug,
  ClipboardList,
  MessageSquare,
  Workflow,
  Eye,
  Timer,
  Check,
} from "lucide-react";
import Link from "next/link";
import { CTA, Invitation, ModuleCard } from "@/components/ui";
import Dashboard from "@/components/dashboard";
import Reveal from "@/components/reveal";
import { modules, site } from "@/lib/site";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      description:
        "Operator-led automotive technology initiative preparing a dealership platform for local validation.",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Pre-launch dealership operating intelligence software in development. Intended capabilities subject to validation.",
    },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\u003c"),
        }}
      />
      <section className="hero">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="small-dot" /> OPERATOR-LED. BUILT WITH PURPOSE.
            <span className="pill-divider" /> IN DEVELOPMENT
          </div>
          <h1>
            Your dealership.
            <br />
            One connected
            <br />
            <span>operating system.</span>
          </h1>
          <p>
            A clearer view of your business. A more connected way to run it. AOP
            is being built to bring sales, aftersales, inventory, finance and
            people into one operating environment.
          </p>
          <div className="hero-actions">
            <CTA />
            <CTA secondary href="/platform">
              Explore the Platform
            </CTA>
          </div>
          <div className="hero-footnote">
            <span className="small-dot" /> Pre-launch · Preparing for local
            dealership validation
          </div>
        </div>
        <div className="hero-visual">
          <div className="orbit-label">VISIBILITY. CONTROL. CONNECTION.</div>
          <Dashboard />
          <div className="floating-tag">
            <Layers size={18} />
            <div>
              One platform.<small>Your entire operation, connected.</small>
            </div>
          </div>
        </div>
      </section>
      <div className="scope-strip">
        <span>DESIGNED AROUND YOUR OPERATION</span>
        {[
          "Sales & CRM",
          "Workshop & Aftersales",
          "Inventory & Finance",
          "People & Intelligence",
        ].map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <Reveal>
        <section className="section problem">
          <div className="section-heading">
            <p className="eyebrow">01 / THE EVERYDAY REALITY</p>
            <h2>
              Running a dealership shouldn’t mean
              <br />
              chasing every department.
            </h2>
            <p>
              When information lives in silos, the owner becomes the connection.
              <br />
              We believe your systems should do more of that work.
            </p>
          </div>
          <div className="problem-grid">
            {[
              [
                Unplug,
                "Disconnected systems",
                "Different tools. Different versions of the truth.",
              ],
              [
                ClipboardList,
                "Manual reporting",
                "Time spent collecting data instead of understanding it.",
              ],
              [
                MessageSquare,
                "Missed follow-ups",
                "Customer conversations lost between teams.",
              ],
              [
                Workflow,
                "Coordination gaps",
                "Handoffs that depend on another call or message.",
              ],
              [
                Eye,
                "Limited visibility",
                "Important issues become visible too late.",
              ],
              [
                Timer,
                "Administrative load",
                "Routine work taking attention away from the business.",
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Eye;
              return (
                <div className="problem-item" key={title as string}>
                  <I size={21} />
                  <h3>{title as string}</h3>
                  <p>{text as string}</p>
                </div>
              );
            })}
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="section">
          <div className="section-heading heading-row">
            <div>
              <p className="eyebrow">02 / THE CONNECTED PLATFORM</p>
              <h2>
                Different departments.
                <br />
                One shared direction.
              </h2>
              <p>
                A modular environment designed around the way a dealership
                works.
                <br />
                Explore the capabilities we’re building and preparing to
                validate.
              </p>
            </div>
            <Link className="text-link" href="/platform">
              Discover the platform <ArrowRight size={17} />
            </Link>
          </div>
          <div className="modules-grid">
            {modules
              .filter((m) => m.id !== "crm")
              .map((item) => (
                <ModuleCard key={item.id} item={item} />
              ))}
            <div className="module-card module-summary">
              <Layers size={26} />
              <h3>Connected by design.</h3>
              <p>
                One connected environment for your entire dealership. Choose the
                modules that fit your operation.
              </p>
              <span className="micro">
                PLANNED CAPABILITIES · SUBJECT TO VALIDATION
              </span>
            </div>
          </div>
        </section>
      </Reveal>
      <section className="spotlight section">
        <div>
          <p className="eyebrow">03 / EXECUTIVE INTELLIGENCE</p>
          <h2>
            Less chasing.
            <br />
            <span>More knowing.</span>
          </h2>
          <p>
            Know what’s happening across your dealership. AOP’s intended
            executive workspace brings department performance, workflow
            exceptions and management alerts into view.
          </p>
          <ul className="check-list">
            {[
              "Visibility across departments",
              "Clear accountability and timely information",
              "Better-informed management decisions",
            ].map((x) => (
              <li key={x}>
                <Check size={17} />
                {x}
              </li>
            ))}
          </ul>
          <CTA secondary href="/solutions#owners">
            Built for dealership owners
          </CTA>
        </div>
        <Dashboard />
      </section>
      <section className="section split-section">
        <div>
          <p className="eyebrow">04 / FIT YOUR OPERATION</p>
          <h2>
            Start with what
            <br />
            your dealership needs.
          </h2>
        </div>
        <div>
          <p className="large-copy">
            A modular platform, not a one-size-fits-all promise.
          </p>
          <p>
            Dealerships can select intended modules according to their
            requirements. Configuration, integration and rollout needs will be
            assessed for each dealership and market. Compatibility with existing
            DMS or OEM systems must be evaluated.
          </p>
          <div className="workflow-mini">
            <span>YOUR REQUIREMENTS</span>
            <ArrowRight size={16} />
            <span>YOUR MODULES</span>
            <ArrowRight size={16} />
            <span>ONE VIEW</span>
          </div>
        </div>
      </section>
      <section className="story-block">
        <div className="story-art">
          <div className="story-mark">
            aop<span>.</span>
          </div>
          <p>
            FROM THE DEALERSHIP FLOOR.
            <br />
            FOR THE DEALERSHIP OWNER.
          </p>
          <span className="micro">CONCEIVED IN PAKISTAN · LOOKING AHEAD</span>
        </div>
        <div>
          <p className="eyebrow">05 / OUR ORIGIN</p>
          <h2>
            Built by people
            <br />
            who know the job.
          </h2>
          <p>
            AOP was conceived and commissioned by operators of authorized 3S
            dealerships in Pakistan. The idea came from the daily reality of
            coordinating sales, service, stock, people and finance.
          </p>
          <p>
            We’re preparing for validation in operating dealerships locally
            before exploring future international availability, with South
            Africa, Malaysia and the Philippines among the markets of interest.
          </p>
          <Link href="/our-story" className="text-link">
            Meet the thinking behind AOP <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="status-section">
        <p className="eyebrow">WHERE WE ARE TODAY</p>
        <div className="status-steps">
          <div>
            <span>01</span>
            <h3>Conceived by operators</h3>
            <p>Rooted in real dealership challenges.</p>
          </div>
          <div className="current">
            <span>02 · CURRENT FOCUS</span>
            <h3>Development & local validation</h3>
            <p>Building and preparing to test in Pakistan.</p>
          </div>
          <div>
            <span>03 · LOOKING AHEAD</span>
            <h3>International discovery</h3>
            <p>Listening to operators before future market entry.</p>
          </div>
        </div>
      </section>
      <Invitation />
    </>
  );
}
