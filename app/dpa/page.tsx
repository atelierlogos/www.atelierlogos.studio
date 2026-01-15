import Link from "next/link"
import { Spectral } from "next/font/google"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Data Processing Agreement | Atelier Logos',
  description: 'Our commitment to treat your data with the same legal care as we do our own. Learn about our data processing practices, security measures, and GDPR compliance.',
}

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
})

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
        <section className="space-y-3 border-b-4 border-black pb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground font-bold">Data Processing Agreement</p>
          <h1 className="text-4xl font-semibold">
            Our commitment to treat your data with the same legal care as we do our own.
          </h1>
          <p className={`text-lg text-muted-foreground ${spectral.className}`}>
            This agreement explains how Atelier Logos processes personal data on behalf of clients, the security
            safeguards we maintain, and the controls we offer so you can fulfill your own obligations under GDPR,
            CCPA, or other regulations.
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold">Roles & scope</h2>
            <p className={`mt-3 text-sm text-muted-foreground ${spectral.className}`}>
              Atelier Logos acts as a service provider (processor) when we store, analyze, or ship personal data that
              you supply in the course of product development, strategy, or hosting. You remain the data controller and
              give us permission to process the data solely to deliver agreed services.
            </p>
          </div>
          <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold">Categories of data</h2>
            <p className={`mt-3 text-sm text-muted-foreground ${spectral.className}`}>
              We typically act on contact data, project metadata, analytics, collaboration notes, and prototype content.
              Sensitive data (e.g., health, financial) is only processed if explicitly scoped into a project and then
              subject to an addendum.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Security & confidentiality</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-4 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className={`text-sm text-foreground font-medium ${spectral.className}`}>
                <strong>Encryption:</strong> All data is encrypted in transit (TLS 1.3) and at rest with managed KMS
                keys.
              </p>
            </div>
            <div className="rounded-lg border-4 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className={`text-sm text-foreground font-medium ${spectral.className}`}>
                <strong>Access controls:</strong> Principle of least privilege with quarterly access reviews, MFA,
                and IAM policies preventing broader exposure.
              </p>
            </div>
            <div className="rounded-lg border-4 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className={`text-sm text-foreground font-medium ${spectral.className}`}>
                <strong>Monitoring:</strong> Auditing, logging, and alerting detect suspicious activity; incidents are
                reported within 72 hours in accordance with law.
              </p>
            </div>
            <div className="rounded-lg border-4 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className={`text-sm text-foreground font-medium ${spectral.className}`}>
                <strong>Backups & retention:</strong> Data backups rotate weekly, are immutable for 30 days, and are
                securely destroyed after contract termination.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Subprocessors</h2>
          <p className={`text-sm text-muted-foreground ${spectral.className}`}>
            We may route data through trusted subprocessors listed below. Each subprocessor agrees to at least the
            same protections we deliver and we notify you before onboarding new ones.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {processors.map((processor) => (
              <div key={processor.name} className="rounded-xl border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-lg font-bold">{processor.name}</p>
                <p className={`mt-2 text-sm text-muted-foreground ${spectral.className}`}>{processor.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Data subject requests</h2>
          <p className={`text-sm text-muted-foreground ${spectral.className}`}>
            We assist controllers with access, correction, deletion, or portability requests using documented workflows.
            Submit requests to{" "}
            <Link href="mailto:james@atelierlogos.com" className="text-foreground underline">
              james@atelierlogos.com
            </Link>
            .
          </p>
          <h2 className="text-2xl font-bold">Audit & compliance</h2>
          <p className={`text-sm text-muted-foreground ${spectral.className}`}>
            We undergo annual compliance reviews, maintain an internal control matrix, and permit limited audits or
            certifications upon reasonable notice.
          </p>
        </section>

        <section className="mt-12 rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-bold">Termination & transfer</h2>
          <p className={`mt-4 text-sm text-muted-foreground ${spectral.className}`}>
            At contract end, we delete or return your data per your instructions and certify destruction. Cross-border
            transfers rely on standard contractual clauses where necessary.
          </p>
        </section>
      </div>
    </div>
  )
}
