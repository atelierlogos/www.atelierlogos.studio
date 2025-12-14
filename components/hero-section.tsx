"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useState, FormEvent } from "react"

declare global {
  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void
      __loaded?: boolean
      [key: string]: any
    }
  }
}

const currentProjects = [
  {
    name: "Colony",
    description: "The backoffice for modern vendor ops.",
    category: "VendorOps",
    logo_url: "/colony.png",
  },
  {
    name: "Fugu",
    description: "Angr-powered binary analysis visualization library",
    category: "DevTools",
    logo_url: "fugu.png",
  },
  {
    name: "Nooklanes",
    description: "Cedar-policy powered authorization service for CUI-sensitive infrastructure.",
    category: "Security",
    logo_url: "/nooklanes.png",
  },
]

export function HeroSection() {
  const { toast } = useToast()

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-white font-sans">
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[length:32px_32px] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)",
        }}
      />

      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto text-center space-y-12">
        <div className="inline-block rounded-xl bg-muted/70 backdrop-blur-sm px-6 py-4 text-sm md:text-base text-foreground/80 font-medium italic border border-border/40 shadow-md leading-snug font-serif">
          <span className="font-semibold text-foreground">Atelier</span> (atelier) – a workshop or studio where artists work. |{" "}
          <span className="font-semibold text-foreground">Logos</span> (λόγος) – the act of speaking, discourse, or reasoned thought.
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15] text-black max-w-5xl mx-auto">
          Speaking products into existence from spec to scale.
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed tracking-tight">
          We use spec-driven methodology to build robust, scalable applications that don't sacrifice on any front as both a product studio and consultancy.
        </p>

        <div className="max-w-4xl w-full mx-auto py-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:items-center">
            <Button
              onClick={() => window.location.href = '/monthly-retainer'}
              className="h-12 px-8 text-base font-semibold rounded-lg text-white shadow-lg hover:shadow-xl bg-black hover:bg-primary transition-all duration-200 flex-1 sm:flex-none"
            >
              Our Premium Monthly Retainer
            </Button>
            <Button
              onClick={() => window.location.href = 'mailto:james@atelierlogos.studio'}
              className="h-12 px-8 text-base font-semibold rounded-lg border-2 border-black text-black bg-white hover:bg-black hover:text-white transition-all duration-200 flex-1 sm:flex-none"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        <div className="pt-20 border-t border-border/30 max-w-5xl mx-auto">
          <div className="space-y-3 text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Our Current Projects</p>
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground">Three builds we are obsessing over right now.</h3>
            <p className="text-muted-foreground">
              We're always a bit feral for chances to build. Here are a few of our current in-house projects that showcase our spec-driven approach to building robust, scalable applications.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {currentProjects.map((project) => (
              <div
                key={project.name}
                className="rounded-2xl border border-border/40 bg-white/80 backdrop-blur p-6 text-left shadow-sm"
              >
                <div className="mb-4 flex items-center gap-4">
                  <Image
                    src={project.logo_url}
                    alt={`${project.name} Logo`}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{project.name}</h4>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{project.category}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-20 border-t border-border/30 max-w-5xl mx-auto">
          <div className="space-y-3 text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground">See a walkthrough of Colony</h3>
            <p className="text-muted-foreground">
              We're always a bit feral for chances to build. Here are a few of our current in-house projects that showcase our spec-driven approach to building robust, scalable applications.
            </p>
          </div>
          <div className="flex justify-center">
            <div
              className="w-full max-w-4xl"
              style={{
                position: "relative",
                paddingBottom: "calc(56.25% + 33px)",
                height: 0,
              }}
            >
              <iframe
                src="https://demo.arcade.software/l3ClAIEprcx2X8eXBUGj?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
                title="Colony: The backoffice for modern vendor ops"
                frameBorder="0"
                loading="lazy"
                allow="clipboard-write"
                className="rounded-lg shadow-lg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  colorScheme: "light",
                }}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
