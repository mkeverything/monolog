import Link from "next/link"
import { getFooter, getSiteInfo } from "../lib/cms"

export function Footer() {
  const footer = getFooter()
  const siteInfo = getSiteInfo()

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary">
              {siteInfo.name}
            </Link>
            <p className="mt-2 text-secondary-content">{siteInfo.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-base-content uppercase tracking-wider">
              Links
            </h4>
            <ul className="mt-4 space-y-3">
              {footer.links.slice(0, 2).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-secondary-content hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-base-content uppercase tracking-wider">
              Social
            </h4>
            <ul className="mt-4 space-y-3">
              {footer.links.slice(2).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-secondary-content hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-base-300 text-center">
          <p className="text-secondary-content text-sm">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
