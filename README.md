# Automotive One Platform website

A pre-launch, operator-led dealership software marketing site built from an empty repository. Eight App Router pages cover the homepage, platform, solutions, origin story, registration, contact, privacy and terms. Product interfaces are clearly labelled concepts; no customers, performance claims, OEM relationships or commercial availability are invented.

## Stack and local development

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide icons, Motion, React Hook Form, Zod and Supabase. Exact compatible versions are retained in `package-lock.json`. Node 22+ is recommended (validated on Node 24).

```sh
npm ci --cache /tmp/aop-npm-cache
cp .env.example .env.local
npm run dev
```

Use the existing isolated checkout; no additional Git worktree is necessary. Open port 3000 in a development environment that supports previews. In cloud onboarding, validate with local HTTP requests; onboarding does not provide a public preview link.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

For browser checks, install Chromium using `npx playwright install chromium` (and supported OS dependencies if needed), then `npm run test:e2e`. If Chromium is already installed, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e` instead of downloading it. The test starts its own server on port 3100. A built application is required. Tests cover navigation, mobile overflow, form validation, consent defaults, and honest unavailable-storage feedback. Unit tests include explicit mocked storage outcomes and execute the actual SQL migration in embedded PostgreSQL (PGlite), checking storage, deduplication, rate limits and role permissions. These checks do not claim production Supabase persistence.

## Environment configuration

| Variable                    | Purpose                                                                                                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Actual canonical origin, e.g. your HTTPS production domain. Required in production for same-origin submission checks; localhost is the development fallback. Set before building. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Real, monitored public contact email; omitted values show an explicit placeholder.                                                                                                |
| `NEXT_PUBLIC_PRIVACY_EMAIL` | Real, monitored privacy/withdrawal contact; required before collecting production personal data.                                                                                  |
| `SUPABASE_URL`              | Project HTTPS API URL, server-only.                                                                                                                                               |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase service role key; never use a public prefix or commit it.                                                                                                    |
| `RATE_LIMIT_SECRET`         | Server-only random secret. Generate using `openssl rand -hex 32`; retain securely.                                                                                                |

Without storage credentials or the rate-limit secret, valid forms return HTTP 503 and explicitly say information was not saved. There is no fake waitlist or local production-storage substitute. Invalid inputs still receive validation errors. Do not share secret values in chat, client bundles or logs.

## Supabase setup and access controls

1. Create a Supabase project in an approved region after privacy/transfer review.
2. Run `supabase/001_submissions.sql` once in the SQL editor. It creates lead/contact records, rate-limit buckets, and the atomic `submit_aop_enquiry` function.
3. Configure the three server variables above in `.env.local` or your deployment's secure environment settings.
4. Register a test enquiry and verify its row in the Supabase dashboard. Retry the identical request ID and verify it returns the same row. A changed payload with that ID must return conflict. Check that unauthenticated/public clients cannot select the tables or execute the function.
5. Test six distinct valid submissions from one client within an hour: the sixth should be limited. Review platform IP handling before enabling another hosting provider.

Tables have RLS enabled with no public policies, and public/anonymous/authenticated privileges are revoked. Only the service-role server invokes the function. SQL execution and live storage must be verified against your actual project; missing credentials prevent that verification here.

### Duplicates, preferences and abuse protection

Each mounted form assigns a random request UUID on its first attempt and preserves it across retries. An advisory transaction lock and unique request ID make concurrent retries atomic. The original canonical-payload fingerprint must match to retrieve the stored ID. If someone edits an already-saved payload after a lost response, they receive a conflict and can reload for a new enquiry. Separate deliberate enquiries from the same email are retained, not silently overwritten; email is indexed for later CRM grouping. This avoids overwriting existing preferences based solely on knowledge of someone's email.

Marketing consent starts unchecked and is stored independently of privacy acknowledgement. Selecting development updates requires explicit update consent; other research/future-demo preferences do not. The database records consent time, policy version, source, status and submission time. No marketing or notification email is sent. Preference withdrawal is handled by the configured privacy contact and must be propagated before communications. Build an authenticated preference-management workflow before launching campaigns.

A server-validated honeypot, bounded request body, same-origin checks and atomic five-per-hour rate buckets provide basic abuse controls. On Vercel, use the platform-overwritten `x-vercel-forwarded-for` header. Other hosts use a conservative shared bucket until a trusted reverse-proxy IP adapter is added. The rate key is a daily HMAC, not a raw stored IP. Daily rollover can reset a bucket; this is basic limiting, not a complete bot defense. Add managed edge/WAF limits for production traffic. Old buckets are cleaned by later successful submissions; configure a scheduled cleanup if needed. Server errors expose no service credentials, raw database errors or submitted personal data.

## Optional Resend notifications

Resend is intentionally not enabled: storage success is independent of email. To add internal notifications later, verify a sender domain, create a server-only `RESEND_API_KEY`, configure an internal notification recipient and sender, and send only after confirmed database persistence through an outbox/job with retry deduplication. Minimize personal data in notifications. Do not send automatic marketing campaigns. Add the processor and retention implications to the privacy notice. No Resend credentials are required for this version.

## Vercel deployment

Import this Git repository into Vercel, use the Next.js preset and the repository root. Set the canonical site URL and real contact details before build, and server-only secrets in the correct deployment scopes. Apply the database migration first. Use a supported Node 22/24 runtime. The standard scripts provide development, production build and startup; no custom Vercel routing is needed. For preview submissions, the configured canonical origin must match the preview origin; use separate preview configuration and a non-production database. Do not connect unchecked preview environments to real lead records.

After deployment, verify all routes, social image, sitemap and robots, form error states, real successful persistence, retry behavior, rate limits and denied public database reads. `NEXT_PUBLIC_*` values are build-time public configuration; rebuild when changing them. Keep deployments private or disable indexing externally until legal/entity details and storage are approved. This project does not publish or deploy itself.

## Updating copy and visuals

`lib/site.ts` centralizes name, configured contacts, navigation and all eight module descriptions/features. Page-specific copy is in `app/*/page.tsx`; design tokens and responsive rules are in `app/globals.css`. `components/dashboard.tsx` is an illustrative interface, not a screenshot. Replace it with approved real screenshots using `next/image`, explicit dimensions and descriptive alt text; change concept labels only after confirming availability. The original concept contains no numeric performance claims. `app/opengraph-image.tsx` generates the social preview; `app/icon.svg` provides the brand favicon. Metadata is defined per page; the canonical domain, structured data, sitemap and robots derive from configuration.

## Accessing and exporting enquiries

Authorized administrators can inspect/filter/export `aop_submissions` in the Supabase dashboard. Restrict account access and protect downloaded CSVs. Use `work_email` for CRM grouping, `areas_of_interest` and `marketing_consent` for permission-aware segmentation, and `lead_status` for workflow status. No public admin route or export endpoint is exposed. Delete or correct records through an authorized internal workflow after verifying requests. Do not interpret a contact submission or privacy acknowledgement as marketing consent.

## Production readiness and legal review

- Configure real legal entity, public contact and monitored privacy address.
- Have counsel replace all `REVIEW REQUIRED` sections in privacy and terms: legal bases, governing law, entity details, processors, regions, international safeguards, retention period, rights and response procedures.
- Define actual retention/deletion, consent withdrawal and staff access/export procedures. The privacy document is a draft and claims no automatic POPIA/GDPR/PDPA compliance.
- Apply and validate the SQL migration, server-only keys, rate limiting, RLS and storage success against a real project.
- Confirm region, backup, incident response, secret rotation and platform client-IP guarantees.
- Configure the real HTTPS canonical origin, share preview and production indexing policy.
- Run browser and build checks, including keyboard navigation and mobile layout; manually review screen readers and real devices.
- Add managed bot protection for public launch as traffic requires it; avoid logging lead payloads.
- Keep all product capability claims subject to validation. Confirm screenshots and integrations before describing them as available.

No external credentials, deployed domain, legal entity or verified contact details were supplied. Those are launch prerequisites, not facts this application invents.
