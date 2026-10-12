import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  CarFront,
  Users,
  Wrench,
  Package,
  Wallet,
  UserRound,
  ChartNoAxesCombined,
  Sparkles,
} from "lucide-react";
export const icons = {
  sales: CarFront,
  crm: Users,
  workshop: Wrench,
  inventory: Package,
  finance: Wallet,
  people: UserRound,
  intelligence: ChartNoAxesCombined,
  automation: Sparkles,
};
export function CTA({
  children = "Register Your Interest",
  href = "/register-interest",
  secondary = false,
}: {
  children?: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Intro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </header>
  );
}
export function Invitation() {
  return (
    <section className="invitation">
      <div>
        <p className="eyebrow">BUILD IT WITH US</p>
        <h2>
          Your experience can shape
          <br />
          what comes next.
        </h2>
        <p>
          Share the challenges behind your daily operations. Help us build a
          platform that starts with the realities of your dealership.
        </p>
      </div>
      <CTA>Help Shape AOP</CTA>
    </section>
  );
}
export function ModuleCard({
  item,
}: {
  item: { id: string; group: string; text: string; icon: string };
}) {
  const Icon = icons[item.icon as keyof typeof icons];
  return (
    <Link href={`/platform#${item.id}`} className="module-card">
      <div className="card-top">
        <Icon size={25} />
        <ArrowUpRight size={17} />
      </div>
      <h3>{item.group}</h3>
      <p>{item.text}</p>
      <span className="text-link">
        Explore capability <ArrowRight size={14} />
      </span>
    </Link>
  );
}
