import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/navigation";
import { site, navigation } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AOP — Your dealership. One connected operating system.",
    template: "%s | Automotive One Platform",
  },
  description:
    "An operator-led dealership operating intelligence platform in development. Connect sales, aftersales, inventory, finance and people. Help shape AOP.",
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-shell">
          <Navigation />
          <main id="main">{children}</main>
          <footer>
            <div className="footer-top">
              <div>
                <Link className="wordmark" href="/">
                  aop
                  <span className="brand-dot" />
                </Link>
                <p>
                  Built for the people
                  <br />
                  who run dealerships.
                </p>
              </div>
              <div className="footer-links">
                {navigation.map(([label, href]) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
                <Link href="/register-interest">Register Interest</Link>
              </div>
              <div className="footer-contact">
                <span className="eyebrow">LET’S CONNECT</span>
                {site.email ? (
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                ) : (
                  <span>Contact details to be confirmed.</span>
                )}
                <Link href="/contact">Send an enquiry ↗</Link>
              </div>
            </div>
            <div className="footer-disclosure">
              AOP is in development and being prepared for local dealership
              validation in Pakistan. International availability, demonstrations
              and integrations are subject to readiness and market assessment.
              Interface visuals are illustrative concepts.
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Automotive One Platform</span>
              <div>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms</Link>
                <span>PRE-LAUNCH / OPERATOR-LED</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
