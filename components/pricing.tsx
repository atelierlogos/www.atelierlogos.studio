import Link from "next/link"
import { CheckIcon } from "lucide-react"

const pricingPlans = [
  {
    title: "Written Plans + Technical Demo",
    description: "Map out your custom MCP architecture and get a demo of core features.",
    price: "Starting @ ~$20k",
    cadence: "",
    popular: false,
    features: [
      "Custom MCP architecture plan",
      "Technical demo of core features",
      "Risks and mitigation strategies",
      "3rd party connection ideation",
      "Security overview",
      "Project timeline estimate",
    ],
    ctaLink: "https://cal.com/team/atelierlogos/mcp-strategy",
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
          async collaboration, and the ability to scale up or pause with notice. <a href="/blog" className="text-primary hover:underline font-semibold">Read about our process</a>.
        </p>
      </div>

      <div className="flex justify-between flex-wrap gap-6 w-full max-w-6xl">
        {pricingPlans.map((plan, index) => (
          <div
            key={plan.title}
            className={`flex-1 min-w-[280px] rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              plan.popular ? "relative" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary border-4 border-black px-4 py-1 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs uppercase tracking-[0.2em] font-bold text-black">
                Most Popular
              </div>
            )}
            <div className="flex flex-col h-full gap-6 justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-2xl leading-snug">
                    {plan.title}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
                  <div className="text-sm uppercase tracking-[0.2em]">
                    <span className="text-3xl font-black">{plan.price}</span>{" "}
                    <span className="text-muted-foreground lowercase font-bold">{plan.cadence}</span>
                  </div>
                </div>
                <hr className="border-2 border-black" />

                <div className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-5 h-5 font-bold" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-2 border-black" />
              <div>
                <Link
                  href={plan.ctaLink}
                  target={plan.ctaLink.startsWith("http") ? "_blank" : undefined}
                  rel={plan.ctaLink.startsWith("http") ? "noreferrer" : undefined}
                  className={`inline-flex w-full h-12 items-center justify-center rounded-lg border-4 border-black text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                    plan.popular
                      ? "bg-primary text-black"
                      : "bg-white text-black"
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
