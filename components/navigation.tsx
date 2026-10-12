"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/site";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
        aop
        <span className="brand-dot" />{" "}
        <span className="wordmark-caption">
          AUTOMOTIVE
          <br />
          ONE PLATFORM
        </span>
      </Link>
      <div className="desktop-nav">
        {navigation.map(([label, href]) => (
          <Link
            aria-current={path === href ? "page" : undefined}
            key={href}
            href={href}
          >
            {label}
          </Link>
        ))}
      </div>
      <Link className="nav-cta" href="/register-interest">
        Register Interest <ArrowUpRight size={15} />
      </Link>
      <button
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div id="mobile-nav" className="mobile-nav">
          {[...navigation, ["Register Interest", "/register-interest"]].map(
            ([label, href]) => (
              <Link onClick={() => setOpen(false)} key={href} href={href}>
                {label}
              </Link>
            ),
          )}
        </div>
      )}
    </nav>
  );
}
