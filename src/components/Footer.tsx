import Link from 'next/link'
import { getFooter } from '../lib/cms'
import { Button } from './ui/Button'
import { ArrowRight } from 'lucide-react'
import { Badge } from './ui/Badge'

export function Footer() {
  const footer = getFooter()

  return (
    <footer className='bg-black/91 text-white'>
      <div className='relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-4'>
        {/* Top section with links and info */}
        <div className='mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8'>
          {/* CTA Section */}
          <div className='space-y-4'>
            <p className='text-primary-content text-xl whitespace-pre-line'>
              {footer.cta.caption}
            </p>
            <Button className='bg-primary-content text-primary hover:text-primary-content flex h-10 gap-2 p-2 pr-1.5 pl-4'>
              {footer.cta.button}
              <Badge className='bg-primary text-primary-content size-8 p-1'>
                <ArrowRight />
              </Badge>
            </Button>
          </div>

          {/* External Links & Contacts */}
          <div className='grid-col-1 grid w-full gap-8 sm:grid-cols-2'>
            {/* External */}
            <div className='flex flex-col gap-4'>
              <h4 className='text-secondary-content mb-3 text-sm font-semibold tracking-wider uppercase'>
                {footer.external.title}
              </h4>
              <div className='grid grid-cols-2 gap-2'>
                {footer.external.items.map((item) => (
                  <div key={item.label} className='flex items-center gap-2'>
                    <div className='border-accent size-4 shrink-0 rounded-full border-[1.5px]' />
                    <Link href={item.href || '#'} className='text-sm'>
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div className='flex flex-col gap-4'>
              <h4 className='text-secondary-content mb-3 text-sm font-semibold tracking-wider uppercase sm:text-right'>
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
              className='text-secondary/50 text-sm font-normal transition-colors duration-200 hover:text-white'
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* MONOLOG */}

        <h2 className='from-primary-content to-primary/90 w-screen -translate-x-4 self-start bg-linear-to-t from-30% to-90% bg-clip-text text-left text-[19.40vw] leading-tight font-bold tracking-tight text-transparent select-none'>
          {footer.title}
        </h2>

        {/* Bottom section - Copyright and Legal links */}
        <div>
          <div className='text-secondary/50 flex flex-col items-center justify-between gap-4 text-sm font-normal md:flex-row'>
            <p>{footer.copyright}</p>
            <div className='flex gap-2'>
              <p>{footer.legal.name}</p>
              <p>{footer.legal.tax}</p>
              <p>{footer.legal.orgnip}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
