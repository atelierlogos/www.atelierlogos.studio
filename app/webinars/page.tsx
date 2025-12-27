import { getAllWebinars } from '@/lib/webinar-db'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Clock, Calendar, Video, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Webinars | Atelier Logos',
  description: 'Join our webinars on spec-driven development, LLM-assisted programming, and building compliant software systems. Watch recordings or register for upcoming sessions.',
  keywords: ['webinars', 'spec-driven development', 'LLM development', 'software architecture', 'technical talks'],
  openGraph: {
    title: 'Webinars | Atelier Logos',
    description: 'Join our webinars on spec-driven development and LLM-assisted programming.',
    type: 'website',
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function WebinarsPage() {
  const allWebinars = await getAllWebinars()
  const now = Date.now()
  const upcomingWebinars = allWebinars.filter(w => w.scheduled_start > now && w.status !== 'ended')
  const pastWebinars = allWebinars.filter(w => w.scheduled_start <= now || w.status === 'ended')

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative max-w-5xl px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4 leading-tight">
              Webinars
            </h1>
            <p className="text-lg text-muted-foreground">
              Technical sessions on spec-driven development and LLM-assisted programming
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      {upcomingWebinars.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container max-w-7xl px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Upcoming
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcomingWebinars.map((webinar) => {
                const webinarDate = new Date(webinar.scheduled_start)
                const formattedDate = webinarDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
                const formattedTime = webinarDate.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })

                return (
                  <div
                    key={webinar.id}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
                  >
                    {/* Upcoming Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
                        Upcoming
                      </span>
                    </div>

                    {/* Placeholder Image - can be customized later */}
                    <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="h-full w-full flex items-center justify-center">
                        <Video className="h-12 w-12 text-primary/30" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {webinar.title}
                      </h2>

                      {webinar.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {webinar.description}
                        </p>
                      )}

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          <span className="line-clamp-1">{formattedDate} • {formattedTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span className="line-clamp-1">{webinar.duration_minutes} minutes</span>
                        </div>
                      </div>

                      <Link
                        href={`/webinars/${webinar.slug}`}
                        className="inline-flex items-center justify-center w-full h-10 rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-black/90"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Past Webinars */}
      {pastWebinars.length > 0 && (
        <section className={`py-12 lg:py-16 ${upcomingWebinars.length > 0 ? 'bg-muted/30' : ''}`}>
          <div className="container max-w-7xl px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Past Webinars
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pastWebinars.map((webinar) => {
                const webinarDate = new Date(webinar.scheduled_start)
                const formattedDate = webinarDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })

                return (
                  <div
                    key={webinar.id}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
                  >
                    {/* Past Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center rounded-full bg-muted/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-foreground border border-border/50">
                        <Video className="mr-1.5 h-3 w-3" />
                        Past
                      </span>
                    </div>

                    {/* Placeholder Image */}
                    <div className="aspect-[16/9] overflow-hidden relative bg-gradient-to-br from-muted/50 to-muted/20">
                      <div className="h-full w-full flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {webinar.title}
                      </h2>

                      {webinar.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {webinar.description}
                        </p>
                      )}

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          <span className="line-clamp-1">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span className="line-clamp-1">{webinar.duration_minutes} minutes</span>
                        </div>
                      </div>

                      <Link
                        href={`/webinars/${webinar.slug}`}
                        className="inline-flex items-center justify-center w-full h-10 rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-black/90"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {allWebinars.length === 0 && (
        <section className="py-16">
          <div className="container max-w-2xl px-4 md:px-6">
            <div className="text-center">
              <p className="text-muted-foreground">No webinars scheduled yet.</p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
