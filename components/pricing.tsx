import Link from "next/link"
import { CheckIcon } from "lucide-react"

const pricingPlans = [
  {
    title: "Brownfield Retainer",
    description: "For teams that need a steady stream of LLM-enabled upgrades on existing systems.",
    price: "$2,500",
    cadence: "monthly",
    popular: false,
    features: [
      "Spec + architecture workshop",
      "Dedicated async channel",
      "Weekly shipping ritual",
      "Telemetry + observability setup",
      "Cancel anytime",
    ],
    ctaLink: "https://cal.com/team/atelierlogos/brownfield-retainer-intro",
  },
  {
    title: "Greenfield Retainer",
    description: "Net-new builds scoped from zero-to-one with collaborative specs.",
    price: "$5,400",
    cadence: "monthly",
    popular: true,
    features: [
      "Priority roadmap slotting",
      "Full-stack + AI pairing",
      "QA + hardened release",
      "Infra + deployment automation",
      "Monthly leadership readout",
      "Cancel anytime",
    ],
    ctaLink: "https://cal.com/team/atelierlogos/greenfield-retainer-intro",
  },
  {
    title: "Vendorless Offboard",
    description: "Rip out redundant SaaS, migrate workflows in-house, and capture the savings.",
    price: "Total Realized Savings",
    cadence: "",
    popular: false,
    features: [
      "SaaS spend analysis",
      "Replacement architecture",
      "Migration + change mgmt",
      "Team enablement sessions",
      "Ongoing support option",
      "Pay from realized savings",
    ],
    ctaLink: "https://cal.com/team/atelierlogos/vendorless-intro",
  },
]

export function Pricing() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-20 w-[95%] mx-auto py-20 bg-background text-foreground"
    >
      <div className="flex flex-col items-center gap-4 w-full">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Pricing</p>
        <h2 className="font-semibold text-3xl md:text-4xl leading-tight text-center">
          Simple, transparent retainers
        </h2>
        <p className="text-muted-foreground max-w-2xl text-center">
          Pick the engagement model that matches your roadmap. Every plan includes deep specs,
          async collaboration, and the ability to scale up or pause with notice.
        </p>
      </div>

      <div className="flex justify-between flex-wrap w-full max-w-5xl border border-primary/10">
        {pricingPlans.map((plan, index) => (
          <div
            key={plan.title}
            className={`flex-1 min-w-[280px] border-primary/10 ${
              index === 1 ? "border-x" : "border-r last:border-r-0 md:last:border-r"
            }`}
          >
            <div className="p-8 flex flex-col h-full gap-6 justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="font-semibold text-xl leading-snug">
                    {plan.title}{" "}
                    {plan.popular && (
                      <span className="text-xs uppercase tracking-[0.2em] text-primary">
                        most popular
                      </span>
                    )}
                  </div>
                  <p className="opacity-80 text-sm leading-relaxed">{plan.description}</p>
                  <div className="text-sm uppercase tracking-[0.2em]">
                    <span className="text-2xl font-bold">{plan.price}</span>{" "}
                    <span className="text-muted-foreground lowercase">{plan.cadence}</span>
                  </div>
                </div>
                <hr />

                <div className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <div>
                <Link
                  href={plan.ctaLink}
                  target={plan.ctaLink.startsWith("http") ? "_blank" : undefined}
                  rel={plan.ctaLink.startsWith("http") ? "noreferrer" : undefined}
                  className={`inline-flex w-[160px] h-11 items-center justify-center rounded-none border text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-[#ff6d3d] text-white hover:bg-[#ff6d3d]/80"
                      : "bg-[#fff1e9] text-[#ff6d3d] border border-[#ffb38f] hover:bg-[#ff6d3d] hover:text-white"
                  }`}
                >
                  Book a call
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
