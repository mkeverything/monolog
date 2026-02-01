"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { getHeaderContent } from "../lib/cms"
import { cn } from "../lib/utils"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const header = getHeaderContent()
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
            <Image
              width={87}
              height={46}
              src={header.logo.src}
              alt={header.logo.alt}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            role="tablist"
            className="hidden md:flex items-center tabs tabs-box space-x-8 bg-black text-base-content"
          >
            {header.navigation.map((item) => (
              <Link
                role="tab"
                key={item.href}
                href={item.href}
                className={`hover:text-accent flex gap-2 font-light transition-colors duration-200 tab ${pathname === item.href ? "tab-active" : "text-white"}`}
              >
                {item.href === "/projects" && (
                  <Badge className="badge-accent text-base-100 badge-xs font-medium text-[8px] rounded-full aspect-square">
                    {header.projectCounter}
                  </Badge>
                )}
                {item.label}
              </Link>
            ))}
          </nav>
          <Button variant="accent" size="sm">
            <Link href={header.accentButton.href}>
              {header.accentButton.label}
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-base-200 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-base-content"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="py-4 space-y-4 border-t border-base-300">
            {header.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base-content hover:text-accent transition-colors duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
