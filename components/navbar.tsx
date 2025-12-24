"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NavigationMenuItems } from "@/components/navigation-menu"
import { Menu, X, PhoneCallIcon } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scheduleCall = () => {
    window.open("https://cal.com/team/atelierlogos/vendorless-intro", "_blank")
  }

  const learnMore = () => {
    window.open("https://www.atelierlogos.studio/about", "_blank")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Atelier Logos Logo" width={40} height={40} className="dark:brightness-110" />
            <span className="text-xl font-bold">Atelier Logos</span>
          </Link>
        </div>

        <NavigationMenuItems className="hidden md:flex" />

        <div className="hidden md:flex items-center gap-3">
          <Button
            className="gap-2 bg-black hover:bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={scheduleCall}
          >
            <PhoneCallIcon size={16} />
            Schedule a call
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            className="p-2 hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4">
            <NavigationMenuItems variant="mobile" onNavigate={() => setIsMenuOpen(false)} />

            <div className="pt-4 mt-4 border-t border-border/50 space-y-2">
              <Button
                variant="outline"
                className="w-full gap-2 bg-background/90 hover:bg-background border-2 border-primary/20 hover:border-primary/40 text-foreground hover:text-primary font-medium shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
                onClick={() => {
                  scheduleCall()
                  setIsMenuOpen(false)
                }}
              >
                <PhoneCallIcon size={16} />
                View Pricing
              </Button>
              <Button
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => {
                  learnMore()
                  setIsMenuOpen(false)
                }}
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
