import { getAllIndustryGuides } from '@/lib/industries'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Clock, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industry Guides | Atelier Logos',
  description: 'Learn how spec-driven development with LLM assistance works across different industries: FinTech, HealthTech, GovTech, and more.',
  keywords: ['industry guides', 'fintech', 'healthtech', 'govtech', 'spec-driven development', 'LLM development'],
  openGraph: {
    title: 'Industry Guides | Atelier Logos',
    description: 'Learn how spec-driven development with LLM assistance works across different industries.',
    type: 'website',
    images: ['/api/og/industries?title=Industry%20Guides&subtitle=Spec-driven%20development%20across%20industries'],
  },
}

export default async function IndustriesPage() {
  const guides = await getAllIndustryGuides()

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Building2 className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>Industry Expertise</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Spec-Driven Development Across Industries
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Learn how our methodology enables rapid, compliant software development in highly regulated industries.
              Each guide includes real architecture patterns, compliance strategies, and technical deep dives.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Guides Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          {guides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No industry guides available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={guide.url}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="mb-3">
                      <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                        {guide.industry}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {guide.heroTitle}
                    </h2>

                    <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {guide.metaDescription}
                    </p>

                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{guide.estimatedReadTime} min read</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all whitespace-nowrap">
                        Read Guide
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why These Industries Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Why Spec-Driven Development Matters
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              These industries share a common challenge: complex compliance requirements that make rapid development difficult.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-7 w-7 md:h-8 md:w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Compliance-First</h3>
              <p className="text-sm text-muted-foreground">
                Formal specifications map directly to regulatory requirements, making compliance audits straightforward.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-7 w-7 md:h-8 md:w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Rapid Development</h3>
              <p className="text-sm text-muted-foreground">
                LLM-assisted development with strong specs delivers 3-4x faster than traditional methods.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-7 w-7 md:h-8 md:w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Living Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Specifications serve as both implementation guides and compliance documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-xl md:rounded-2xl border border-border bg-card p-8 md:p-10 lg:p-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Ready to Build in Your Industry?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're building FinTech, HealthTech, GovTech, or other regulated software,
              our spec-driven approach ensures compliance without sacrificing speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://cal.com/team/atelierlogos/greenfield-retainer-intro"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
