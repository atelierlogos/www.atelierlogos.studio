import { getWebinarBySlug, getAllWebinars } from '@/lib/webinar-db'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShareWidget } from '@/components/share-widget'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, Video, ArrowRight } from 'lucide-react'

interface WebinarPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const webinars = await getAllWebinars()
  return webinars.map((webinar) => ({
    slug: webinar.slug,
  }))
}

export async function generateMetadata({ params }: WebinarPageProps): Promise<Metadata> {
  const { slug } = await params
  const webinar = await getWebinarBySlug(slug)

  if (!webinar) {
    return {
      title: 'Webinar Not Found',
      description: 'The requested webinar could not be found.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.atelierlogos.studio'
  const webinarUrl = `${baseUrl}/webinars/${slug}`

  return {
    title: `${webinar.title} | Atelier Logos Webinars`,
    description: webinar.description || 'Join our webinar on spec-driven development and software architecture.',
    authors: [{ name: 'Atelier Logos' }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: webinar.title,
      description: webinar.description || '',
      url: webinarUrl,
      siteName: 'Atelier Logos',
      type: 'article',
      publishedTime: new Date(webinar.scheduled_start).toISOString(),
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: webinar.title,
      description: webinar.description || '',
      creator: '@atelierlogos',
      site: '@atelierlogos',
    },
    alternates: {
      canonical: webinarUrl,
    },
  }
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function WebinarPage({ params }: WebinarPageProps) {
  const { slug } = await params
  const webinar = await getWebinarBySlug(slug)

  if (!webinar) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.atelierlogos.studio'
  const webinarUrl = `${baseUrl}/webinars/${slug}`

  const webinarDate = new Date(webinar.scheduled_start)
  const now = Date.now()
  const isPast = webinar.scheduled_start <= now || webinar.status === 'ended'
  const isLive = webinar.status === 'live'

  const formattedDate = webinarDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = webinarDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
  const shortDate = webinarDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden border-b border-border">
        <div className="container relative max-w-4xl px-4 md:px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {isLive ? (
                <span className="inline-flex items-center rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white animate-pulse">
                  <Video className="mr-1.5 h-3 w-3" />
                  Live Now
                </span>
              ) : isPast ? (
                <span className="inline-flex items-center rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
                  <Video className="mr-1.5 h-3 w-3" />
                  Past Webinar
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  Upcoming
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-3">
              {webinar.title}
            </h1>
            {webinar.description && (
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {webinar.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              {isLive ? (
                <Link
                  href={`/webinars/live/${webinar.id}`}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-red-500 px-6 text-sm font-medium text-white transition-colors hover:bg-red-600"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Join Live Webinar
                </Link>
              ) : isPast ? (
                <div className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-6 text-sm font-medium text-muted-foreground">
                  Webinar Ended
                </div>
              ) : (
                <div className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground">
                  Scheduled for {shortDate}
                </div>
              )}
            </div>

            <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {isPast ? shortDate : `${formattedDate} • ${formattedTime}`}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {webinar.duration_minutes} minutes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="container max-w-3xl px-4 md:px-6">
          <div className="space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About This Webinar</h2>
              {webinar.description ? (
                <div className="prose dark:prose-invert max-w-none prose-p:text-muted-foreground">
                  <p>{webinar.description}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Join us for this technical session where we'll dive deep into important topics in software development.
                </p>
              )}
            </section>

            {/* Details */}
            <section className="border-t border-border pt-8">
              <h2 className="text-2xl font-bold mb-4">Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Date & Time</div>
                    <div className="text-sm text-muted-foreground">
                      {formattedDate} at {formattedTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Duration</div>
                    <div className="text-sm text-muted-foreground">
                      {webinar.duration_minutes} minutes
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Format</div>
                    <div className="text-sm text-muted-foreground">
                      Online Webinar (Live Session)
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            {!isPast && !isLive && (
              <section className="border-t border-border pt-8">
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Ready to Join?</h3>
                  <p className="text-muted-foreground mb-4">
                    This webinar is scheduled for {shortDate}. Check back when it's live!
                  </p>
                  <Link
                    href="/webinars"
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-6 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    View All Webinars
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      {/* Floating share button */}
      <ShareWidget
        url={webinarUrl}
        title={webinar.title}
        description={webinar.description || 'Join our webinar'}
        variant="floating"
      />

      <Footer />
    </main>
  )
}
