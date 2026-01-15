import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getAllGuideSlugs } from '@/lib/guides'
import { getAllTopicHubs } from '@/lib/topic-hubs'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guides | Atelier Logos',
  description: 'Comprehensive guides on spec-driven development, compliance engineering, LLM security, and strategic tooling.',
}

export default async function GuidesPage() {
  const topicHubs = await getAllTopicHubs()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b-4 border-black bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Guides
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Comprehensive guides on spec-driven development, compliance engineering, LLM security, and strategic tooling. 
            Learn how to build software that's fast, compliant, and secure.
          </p>
        </div>
      </section>

      {/* Topic Hubs */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Browse by Topic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={hub.url}
                className="group rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {hub.title}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-muted-foreground mb-4">
                  {hub.description}
                </p>
                <div className="text-sm text-muted-foreground">
                  {hub.subpages.length} guide{hub.subpages.length !== 1 ? 's' : ''}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
