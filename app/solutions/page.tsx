import type { Metadata } from "next";
import { Intro, CTA, Invitation } from "@/components/ui";
import { Check, Eye, CarFront, Wrench } from "lucide-react";
export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Intended AOP workflows for dealership owners, sales and customer teams, aftersales and back office.",
  alternates: { canonical: "/solutions" },
};
const groups = [
  {
    id: "owners",
    icon: Eye,
    label: "FOR DEALERSHIP OWNERS",
    title: "See the operation. Guide the business.",
    text: "A dealership owner shouldn’t have to assemble the picture from separate spreadsheets and conversations. AOP is being designed to bring the questions that matter into one management view.",
    items: [
      "Department dashboards and management visibility",
      "Staff accountability and workflow ownership",
      "Permission-based approvals and exception alerts",
      "Cross-department reporting for better-informed decisions",
    ],
  },
  {
    id: "sales",
    icon: CarFront,
    label: "FOR SALES & CUSTOMER OPERATIONS",
    title: "Keep every customer journey connected.",
    text: "From first enquiry to handover and the next service visit, intended workflows give teams a shared record and a clearer next action.",
    items: [
      "Lead distribution, CRM and follow-up workflows",
      "Test drives, bookings and delivery coordination",
      "Customer engagement and communication history",
      "Permission-based customer assistance and service reminders",
    ],
  },
  {
    id: "aftersales",
    icon: Wrench,
    label: "FOR AFTERSALES & BACK OFFICE",
    title: "Make the handoffs work together.",
    text: "Workshop teams, parts departments, finance and administration all depend on each other. AOP aims to connect that work with clear responsibilities and shared context.",
    items: [
      "Appointments, job cards and technician allocation",
      "Vehicle and parts inventory with procurement",
      "Financial context, reporting and internal approvals",
      "Employee records, HR and administrative workflows",
    ],
  },
];
export default function Solutions() {
  return (
    <>
      <Intro
        eyebrow="SOLUTIONS BY RESPONSIBILITY"
        title="Built around the people who run the dealership."
      >
        <p>
          Different responsibilities. Shared operational context. Explore the
          outcomes guiding AOP’s development.
        </p>
      </Intro>
      <div className="solutions-list">
        {groups.map((g) => (
          <section id={g.id} className="solution" key={g.id}>
            <div className="solution-icon">
              <g.icon size={55} />
              <span>ILLUSTRATIVE WORKFLOW</span>
            </div>
            <div>
              <p className="eyebrow">{g.label}</p>
              <h2>{g.title}</h2>
              <p>{g.text}</p>
              <ul className="check-list">
                {g.items.map((i) => (
                  <li key={i}>
                    <Check size={17} />
                    {i}
                  </li>
                ))}
              </ul>
              <CTA href={`/register-interest?solution=${g.id}`} />
            </div>
          </section>
        ))}
      </div>
      <section className="notice">
        <p>
          All solution capabilities are intended and subject to local
          validation. AOP is not currently offering paid subscriptions or
          international implementations.
        </p>
      </section>
      <Invitation />
    </>
  );
}
