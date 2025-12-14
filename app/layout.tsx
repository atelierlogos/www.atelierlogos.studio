import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: "--font-inter",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Atelier Logos | Spec-driven Solutions" as const,
  description: "Still vibe coding? It's time to grow up anon" as const,
  generator: 'v0.dev',

  keywords: ['LLM', 'AI', 'Software Development', 'Bespoke Solutions', 'Machine Learning'],
  authors: [{ name: 'Atelier Logos' }],
  creator: 'Atelier Logos',
  openGraph: {
    title: "Atelier Logos | Spec-driven Solutions",
    description: "Still vibe coding? It's time to grow up anon",
    url: "https://www.atelierlogos.studio",
    siteName: "Atelier Logos",
    images: [
      {
        url: "https://www.atelierlogos.studio/og-image.png",
        width: 2910,
        height: 1540,
        alt: "Atelier Logos - Spec-driven Solutions",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier Logos | LLM Solutions Studio",
    description: "Still vibe coding? It's time to grow up anon",
    images: ["https://www.atelierlogos.studio/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const title = metadata.title as string
  const description = metadata.description as string

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://www.atelierlogos.studio" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.atelierlogos.studio/og-image.png" />
        <meta property="og:image:width" content="2910" />
        <meta property="og:image:height" content="1540" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.atelierlogos.studio" />

        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Atelier Logos" />
        

        

        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.segment.com" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-background to-background/95 text-foreground selection:bg-black selection:text-white`}> 
        <Script
          id="posthog"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init zr Wr fi Br Gr ci Nr Hr capture Ui calculateEventProperties Kr register register_once register_for_session unregister unregister_for_session Zr getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Xr Jr createPersonProfile Qr jr ts opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Vr debug O Yr getPageViewId captureTraceFeedback captureTraceMetric Or".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_GkcMVU2dHH3gmlzTDqucQTx42yRtSAaHyf0kBLHekqt', {
                api_host: 'https://us.i.posthog.com',
                defaults: '2025-11-30',
                person_profiles: 'identified_only',
            })
            `,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnalyticsProvider />
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
