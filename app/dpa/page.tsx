import Link from "next/link"

const processors = [
  {
    name: "Vercel",
    purpose: "Application hosting, build pipelines, and analytics for production deployments.",
  },
  {
    name: "Supabase",
    purpose: "Postgres databases and auth for customer dashboards and data exports.",
  },
  {
    name: "Stripe",
    purpose: "Invoicing and payment collection for our monthly retainers.",
  },
  {
    name: "Cal.com",
    purpose: "Scheduling and calendaring touches between our team and yours.",
  },
  {
    name: "PostHog",
    purpose: "Product analytics and event tracking on the website.",
  },
  {
    name: "Resend",
    purpose: "Transactional emails for confirmations and onboarding sequences.",
  },
]

export default function DpaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <section className="space-y-3 border-b border-border/30 pb-6">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Data Processing Agreement</p>
          <h1 className="text-4xl font-semibold">
            Our commitment to treat your data with the same legal care as we do our own.
          </h1>
          <p className="text-lg text-muted-foreground">
            This agreement explains how Atelier Logos processes personal data on behalf of clients, the security
            safeguards we maintain, and the controls we offer so you can fulfill your own obligations under GDPR,
            CCPA, or other regulations.
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <div className="rounded-2xl border border-border/30 bg-white/80 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Roles & scope</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Atelier Logos acts as a service provider (processor) when we store, analyze, or ship personal data that
              you supply in the course of product development, strategy, or hosting. You remain the data controller and
              give us permission to process the data solely to deliver agreed services.
            </p>
          </div>
          <div className="rounded-2xl border border-border/30 bg-white/80 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Categories of data</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We typically act on contact data, project metadata, analytics, collaboration notes, and prototype content.
              Sensitive data (e.g., health, financial) is only processed if explicitly scoped into a project and then
              subject to an addendum.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Security & confidentiality</h2>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <strong>Encryption:</strong> All data is encrypted in transit (TLS 1.3) and at rest with managed KMS
              keys.
            </li>
            <li>
              <strong>Access controls:</strong> Principle of least privilege with quarterly access reviews, MFA,
              and IAM policies preventing broader exposure.
            </li>
            <li>
              <strong>Monitoring:</strong> Auditing, logging, and alerting detect suspicious activity; incidents are
              reported within 72 hours in accordance with law.
            </li>
            <li>
              <strong>Backups & retention:</strong> Data backups rotate weekly, are immutable for 30 days, and are
              securely destroyed after contract termination.
            </li>
          </ul>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Subprocessors</h2>
          <p className="text-sm text-muted-foreground">
            We may route data through trusted subprocessors listed below. Each subprocessor agrees to at least the
            same protections we deliver and we notify you before onboarding new ones.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {processors.map((processor) => (
              <div key={processor.name} className="rounded-2xl border border-border/30 bg-muted/10 p-4">
                <p className="text-lg font-semibold">{processor.name}</p>
                <p className="text-sm text-muted-foreground">{processor.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Data subject requests</h2>
          <p className="text-sm text-muted-foreground">
            We assist controllers with access, correction, deletion, or portability requests using documented workflows.
            Submit requests to{" "}
            <Link href="mailto:james@atelierlogos.com" className="text-foreground underline">
              james@atelierlogos.com
            </Link>
            .
          </p>
          <h2 className="text-2xl font-semibold">Audit & compliance</h2>
          <p className="text-sm text-muted-foreground">
            We undergo annual compliance reviews, maintain an internal control matrix, and permit limited audits or
            certifications upon reasonable notice.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-border/30 bg-muted/10 p-6 text-sm text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">Termination & transfer</h2>
          <p>
            At contract end, we delete or return your data per your instructions and certify destruction. Cross-border
            transfers rely on standard contractual clauses where necessary.
          </p>
        </section>
      </div>
    </div>
  )
}
