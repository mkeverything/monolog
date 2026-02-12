import Link from 'next/link'
import { getFooter } from '../lib/cms'
import { Button } from './ui/Button'
import { ArrowRight } from 'lucide-react'
import { Badge } from './ui/Badge'

export function Footer() {
  const footer = getFooter()

  return (
    <footer className='bg-black text-white'>
      <div className='relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 xl:px-12'>
        {/* Top section with links and info */}
        <div className='mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8'>
          {/* CTA Section */}
          <div className='space-y-4'>
            <p className='text-primary-content whitespace-pre-line'>
              {footer.cta.caption}
            </p>  
            <Button className='bg-primary-content text-primary hover:text-primary-content flex h-10 gap-2 p-2 pr-1.5 pl-4 text-sm'>
              {footer.cta.button}
              <Badge className='bg-primary text-primary-content size-8 p-1'>
                <ArrowRight />
              </Badge>
            </Button>
          </div>

          {/* External Links & Contacts */}
          <div className='grid grid-col-1 sm:grid-cols-2 gap-8 w-full'>
            {/* External */}
            <div>
              <h4 className='text-secondary-content mb-3 text-xs font-semibold tracking-wider uppercase'>
                {footer.external.title}
              </h4>
              <div className='grid grid-cols-2 gap-2'>
                {footer.external.items.map((item) => (
                  <div key={item.label} className='flex items-center gap-2'>
                    <div className='border-accent size-3 rounded-full border shrink-0' />
                    <Link href={item.href || '#'} className='text-sm'>
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h4 className='text-secondary-content mb-3 sm:text-right text-xs font-semibold tracking-wider uppercase'>
                {footer.contacts.title}
              </h4>
              <ul className='space-y-2 sm:text-right'>
                {footer.contacts.items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={
                        item.type === 'email'
                          ? `mailto:${item.value}`
                          : `tel:${item.value.replace(/\s/g, '')}`
                      }
                      className='text-sm'
                    >
                      {item.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='flex w-full justify-between'>
          {footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className='text-secondary-content text-xs transition-colors duration-200 hover:text-white'
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* MONOLOG */}
        <div className='flex justify-center py-12'>
          <h2 className='from-primary-content to-primary bg-linear-to-t from-30% to-85% bg-clip-text text-[19vw] font-bold tracking-tighter text-transparent select-none'>
            {footer.title}
          </h2>
        </div>

        {/* Bottom section - Copyright and Legal links */}
        <div>
          <div className='text-secondary-content flex flex-col items-center justify-between gap-4 text-xs md:flex-row'>
            <p>{footer.copyright}</p>
            <p>{footer.legal.name}</p>
            <p>{footer.legal.tax}</p>
            <p>{footer.legal.orgnip}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
