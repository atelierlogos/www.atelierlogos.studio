"use client"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PricingCards } from "@/components/pricing-cards"
import { ServiceIcon } from "@/components/service-icons"

// Note: metadata export not supported in client components
// Title is set via document.title in useEffect or via parent layout

const retainerBenefits = [
  {
    title: "Dedicated triage",
    description: "A scoped team monitors production, answers questions, and keeps your backlog moving throughout the month.",
  },
  {
    title: "Flexible scope",
    description: "Each month you can pivot between feature work, advisory, or experimentation without onboarding friction.",
  },
  {
    title: "Transparent reporting",
    description: "Weekly summaries, burn charts, and milestone reviews keep finance and product aligned.",
  },
]

const retainerTiers = [
  {
    label: "Sprint Focus",
    details: "Up to 60 engineering hours plus product strategy and QA support.",
  },
  {
    label: "Scale Studio",
    details: "100+ hours with design, analytics, and Ops on the same cadence.",
  },
  {
    label: "Executive Partner",
    details: "Fractional CTO + team available for playbooks, governance, and growth experiments.",
  },
]

const pricingTiers = [
  {
    name: "Brownfield Focus",
    price: 540,
    interval: "mo",
    description: "Perfect for maintaining and improving existing applications.",
    highlight: false,
    lightMode: true,
    features: [
      {
        key: "brownfield-dev",
        name: "Brownfield development & maintenance",
        included: true,
      },
      {
        key: "code-review",
        name: "Code review & optimization",
        included: true,
      },
      {
        key: "bug-fixes",
        name: "Bug fixes & performance improvements",
        included: true,
      },
      {
        key: "documentation",
        name: "Technical documentation",
        included: true,
      },
      {
        key: "api-usage",
        name: "API usage (not included)",
        included: false,
      },
      {
        key: "ai-memberships",
        name: "AI tool memberships",
        included: false,
      },
    ],
    cta: {
      text: "Get Started",
      onClick: () => window.open("mailto:hello@atelierlogos.com", "_blank"),
    },
  },
  {
    name: "Greenfield Focus",
    price: 4500,
    interval: "mo",
    description: "Full-spectrum development with premium AI tool access.",
    highlight: false,
    lightMode: true,
    features: [
      {
        key: "openai-api",
        name: (
          <div className="flex items-center gap-2">
            <ServiceIcon service="openai" />
            OpenAI API access & credits
          </div>
        ),
        included: true,
      },
      {
        key: "claude-api",
        name: (
          <div className="flex items-center gap-2">
            <ServiceIcon service="claude" />
            Anthropic Claude API access
          </div>
        ),
        included: true,
      },
      {
        key: "gemini-api",
        name: (
          <div className="flex items-center gap-2">
            <ServiceIcon service="gemini" />
            Google Gemini API access
          </div>
        ),
        included: true,
      },
      {
        key: "v0-membership",
        name: (
          <div className="flex items-center gap-2">
            <ServiceIcon service="v0" />
            v0 by Vercel membership
          </div>
        ),
        included: true,
      },
      {
        key: "replit-membership",
        name: (
          <div className="flex items-center gap-2">
            <ServiceIcon service="replit" />
            Replit Pro membership
          </div>
        ),
        included: true,
      },
      {
        key: "everything-brownfield",
        name: "On-demand AI-enabled dev for new projects",
        included: true,
      },
      {
        key: "priority-support",
        name: "Priority support & consultation",
        included: true,
      },
    ],
    cta: {
      text: "Start AI Development",
      onClick: () => window.open("mailto:hello@atelierlogos.com", "_blank"),
    },
  },
]

export default function MonthlyRetainerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 lg:px-0">
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Monthly Retainer</p>
          <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            Stay ahead with an expert squad that’s always on call.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Retainers give you at least 30 days of design, engineering, and product counsel wrapped in
            predictable investment. That means you can react to user feedback and regulatory updates without
            re-onboarding teams each sprint.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {retainerBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-3xl border border-border/60 bg-white/95 p-6 shadow-2xl shadow-black/10 backdrop-blur-sm ring-1 ring-border/40"
            >
              <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Choose Your Development Approach</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the retainer plan that fits your needs, from basic brownfield maintenance to full AI-powered development with premium tool access.
            </p>
          </div>
          <PricingCards tiers={pricingTiers} />
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-border/30 bg-white/95 p-8 text-foreground shadow-2xl shadow-black/5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,246,255,0.7),transparent_55%)]" />
          <div className="relative space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">Monthly retainer</p>
            <h2 className="text-3xl font-bold leading-tight text-foreground">Lock in shared capacity and visibility.</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              We schedule regular syncs, share dashboards, and help you ration effort so every dollar delivers clarity.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Button asChild className="rounded-2xl bg-black text-white shadow-lg shadow-black/20">
                <Link href="https://cal.com/team/atelierlogos/general-sessions">Book your retainer review</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-2xl border border-border/60 text-foreground hover:bg-muted/40 hover:border-border/80">
                <Link href="https://www.linkedin.com/company/atelier-logos/" target="_blank" rel="noreferrer">
                  Message on LinkedIn
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
