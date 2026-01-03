import Link from "next/link"
import { Spectral } from "next/font/google"

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
})

const dataProcessingPrinciples = [
  {
    title: "Lawfulness, fairness and transparency",
    description:
      "We only process personal data when there is a lawful basis, we share clear notices, and we never surprise people with uses they did not expect.",
  },
  {
    title: "Purpose limitation",
    description:
      "Data collected for one objective—such as delivering a discovery report—will not be repurposed for unrelated marketing without explicit consent.",
  },
  {
    title: "Data minimization",
    description:
      "We gather only the fields that enable service delivery and prune logs, analytics, and backups on a regular cadence.",
  },
  {
    title: "Accuracy",
    description: "Customers control their contact information and we provide easy ways to update, delete, or confirm it at any time.",
  },
  {
    title: "Storage limitation",
    description:
      "Personal data is retained only as long as needed; project data is expired when contracts close and access tokens rotate quarterly.",
  },
  {
    title: "Integrity and confidentiality",
    description:
      "Secure defaults, encryption in transit (TLS 1.3) and at rest, and role-based access ensure only authorized employees can reach sensitive records.",
  },
]

const rights = [
  "Access: request a copy of the data we hold.",
  "Correction: ask us to update inaccurate or incomplete information.",
  "Deletion: remove personal data from our systems.",
  "Portability: extract data in a machine-readable format.",
  "Restriction: limit processing while a dispute is resolved.",
  "Objection: stop profiling or direct marketing based on personal data.",
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <section className="space-y-3 border-b-4 border-black pb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground font-bold">Privacy Policy</p>
          <h1 className="text-4xl font-semibold">How Atelier Logos protects the people behind every request.</h1>
          <p className={`text-lg text-muted-foreground ${spectral.className}`}>
            We are an LLM solutions studio that treats privacy as a feature. This page explains how we collect, use,
            secure, and share the data you entrust to us so you can partner with confidence.
          </p>
        </section>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-bold">Key data we work with</h2>
            <ul className={`mt-4 space-y-3 text-sm text-muted-foreground ${spectral.className}`}>
              <li>
                <strong>Contact data:</strong> names, titles, business emails, and phone numbers you provide when you
                request a consultation or access deliverables.
              </li>
              <li>
                <strong>Project context:</strong> architecture notes, spec docs, and logs that we process on your behalf
                for product and engineering work.
              </li>
              <li>
                <strong>Usage insights:</strong> analytics (e.g., page visits, clicks) that help us improve this website
                and make our proposals sharper.
              </li>
              <li>
                <strong>Payments:</strong> invoice metadata, vendor references, and budget approvals required for
                retainer agreements.
              </li>
            </ul>
          </div>
          <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-bold">How we collect data</h2>
            <p className={`mt-4 text-sm text-muted-foreground ${spectral.className}`}>
              We rely on explicit customer inputs (emails, forms), integrations with tooling you authorize (e.g.,
              analytics, scheduling), and the cookies that power necessary sessions. All marketing tracking can be
              disabled through our cookie banner, and you are welcome to email us at{" "}
              <Link href="mailto:hello@atelierlogos.com" className="text-foreground underline">
                hello@atelierlogos.com
              </Link>{" "}
              if you prefer we remove you from our lists.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Data processing principles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {dataProcessingPrinciples.map((principle) => (
              <div key={principle.title} className="rounded-xl border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-lg font-bold">{principle.title}</h3>
                <p className={`mt-2 text-sm text-muted-foreground ${spectral.className}`}>{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">How we secure it</h2>
          <div className={`space-y-4 text-sm text-muted-foreground ${spectral.className}`}>
            <p>
              We host services on managed providers (AWS, Vercel, Supabase) with SOC 2 Type II controls. We encrypt all
              data in transit (TLS 1.3) and at rest, rotate secrets quarterly, and require multi-factor authentication
              plus least-privilege approvals before granting new tool access. Incident response runs on a documented
              plan and is tested annually.
            </p>
            <p>
              Third-party processors (Stripe, Cal.com, PostHog, Resend) are bound by our{" "}
              <Link href="/dpa" className="text-foreground underline">
                Data Processing Agreement
              </Link>{" "}
              and we conduct regular reviews of their certifications, data transfer rules, and subprocessors.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Your rights</h2>
          <p className={`text-sm text-muted-foreground ${spectral.className}`}>
            Depending on your jurisdiction, you may have additional rights. We respect them all. Submit requests at{" "}
            <Link href="mailto:hello@atelierlogos.com" className="text-foreground underline">
              hello@atelierlogos.com
            </Link>
            .
          </p>
          <ul className={`grid gap-2 text-sm text-foreground md:grid-cols-2 ${spectral.className}`}>
            {rights.map((right) => (
              <li key={right} className="rounded-lg border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-medium">
                {right}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 space-y-4 rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-bold">Contact & updates</h2>
          <p className={`text-sm text-muted-foreground ${spectral.className}`}>
            We publish policy changes at least 30 days before they take effect. If you are a client, we will surface
            notices inside the shared workspace and by email. You can also reach us directly at{" "}
            <Link href="mailto:hello@atelierlogos.com" className="text-foreground underline">
              hello@atelierlogos.com
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
