'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { getHeaderContent, getSiteContent } from '../lib/cms'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const site = getSiteContent()
  const header = getHeaderContent()
  const pathname = usePathname()

  return (
    <header className='fixed top-0 right-0 left-0 z-50 bg-transparent'>
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-6 xl:px-6'>
        <div className='flex h-16 items-center justify-between sm:h-20'>
          <Link href='/' className='text-primary text-xl font-bold sm:text-2xl'>
            <Image
              width={87}
              height={46}
              src={header.logo.src}
              alt={header.logo.alt}
              className='h-10'
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            role='tablist'
            className='tabs tabs-box text-base-content hidden items-center gap-2 bg-black md:flex'
          >
            {header.navigation.map((item) => (
              <Link
                role='tab'
                key={item.href}
                href={item.href}
                className={`hover:text-accent tab flex h-8 gap-2 font-light transition-colors duration-200 ${pathname === item.href ? 'tab-active font-medium' : 'text-white'}`}
              >
                {item.href === '/projects' && (
                  <Badge className='badge-accent text-base-100 badge-xs aspect-square rounded-full text-[8px] font-medium'>
                    {site.projects.items.length}
                  </Badge>
                )}
                {item.label}
              </Link>
            ))}
          </nav>
          <Button variant='accent' size='sm'>
            <Link href={header.accentButton.href}>
              {header.accentButton.label}
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='hover:bg-base-200 rounded-lg p-2 transition-colors md:hidden'
            aria-label='Toggle menu'
          >
            <svg
              className='text-base-content h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
            mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <nav className='border-base-300 space-y-4 border-t py-4'>
            {header.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-base-content hover:text-accent block font-medium transition-colors duration-200'
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
