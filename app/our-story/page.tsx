import type { Metadata } from "next";
import { Intro, Invitation } from "@/components/ui";
export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Conceived and commissioned by dealership operators in Pakistan. Learn why AOP is being built and validated locally.",
  alternates: { canonical: "/our-story" },
};
export default function Story() {
  return (
    <>
      <Intro
        eyebrow="OPERATOR-LED. REALITY-FIRST."
        title="It started with the work, not the software."
      >
        <p>
          AOP was conceived and commissioned by people operating authorized 3S
          automotive dealerships in Pakistan.
        </p>
      </Intro>
      <section className="story-quote">
        <span className="eyebrow">THE QUESTION BEHIND AOP</span>
        <blockquote>
          “Why does getting a clear view of the dealership take so much
          coordination?”
        </blockquote>
        <p>
          The operational problem that inspired the platform — not a customer
          testimonial.
        </p>
      </section>
      <div className="editorial">
        <section>
          <span className="eyebrow">01 / THE DAILY REALITY</span>
          <h2>
            Many departments.
            <br />
            Too many disconnected conversations.
          </h2>
          <p>
            Sales, customer relationships, workshop jobs, stock, employees and
            finance are all part of the same business. Yet managing them often
            means moving between disconnected systems, manual reports and
            repeated follow-ups.
          </p>
          <p>
            For the founding operators, the cost was not simply another
            administrative task. It was the attention needed to supervise
            processes, find information and resolve issues across departments.
          </p>
        </section>
        <section>
          <span className="eyebrow">02 / THE DECISION TO BUILD</span>
          <h2>A connected environment for a connected business.</h2>
          <p>
            The operators commissioned AOP to address these recurring challenges
            through one integrated software environment. The ambition is greater
            visibility, clearer accountability and less administrative
            complexity.
          </p>
          <p>
            We are designing around operational workflows and the people
            responsible for them, rather than treating each department as an
            isolated software problem.
          </p>
        </section>
        <section>
          <span className="eyebrow">03 / VALIDATION BEFORE EXPANSION</span>
          <h2>Earn the next step.</h2>
          <p>
            AOP is currently in development and being prepared for validation in
            operating dealerships in Pakistan. Local validation comes before
            future international availability.
          </p>
          <p>
            Alongside this work, we are inviting dealership operators in South
            Africa, Malaysia, the Philippines and other markets to share their
            requirements. Market-specific configuration, integrations and
            regulations need careful assessment.
          </p>
        </section>
        <section>
          <span className="eyebrow">04 / THE LONG-TERM VISION</span>
          <h2>
            More visibility.
            <br />
            More time for the business.
          </h2>
          <p>
            Our vision is a more connected way to run automotive retail
            operations: useful information where it is needed, better handoffs,
            and owners who can spend less time chasing updates.
          </p>
          <p>
            We are not claiming international deployment, manufacturer
            partnerships or verified performance improvements. We are inviting
            experienced operators to help shape what we build next.
          </p>
        </section>
      </div>
      <Invitation />
    </>
  );
}
