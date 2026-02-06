import Link from 'next/link'
import { getFooter, getSiteInfo } from '../lib/cms'

export function Footer() {
  const footer = getFooter()
  const siteInfo = getSiteInfo()

  return (
    <footer className='bg-base-200 border-base-300 border-t'>
      <div className='mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 xl:px-12'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12'>
          {/* Brand */}
          <div className='lg:col-span-2'>
            <Link href='/' className='text-primary text-2xl font-bold'>
              {siteInfo.name}
            </Link>
            <p className='text-secondary-content mt-2'>{siteInfo.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className='text-base-content text-sm font-semibold tracking-wider uppercase'>
              Links
            </h4>
            <ul className='mt-4 space-y-3'>
              {footer.links.slice(0, 2).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='text-secondary-content hover:text-accent transition-colors duration-200'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className='text-base-content text-sm font-semibold tracking-wider uppercase'>
              Social
            </h4>
            <ul className='mt-4 space-y-3'>
              {footer.links.slice(2).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='text-secondary-content hover:text-accent transition-colors duration-200'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-base-300 mt-12 border-t pt-8 text-center'>
          <p className='text-secondary-content text-sm'>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
