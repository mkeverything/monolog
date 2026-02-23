'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getHeaderContent, getSiteContent } from '../lib/cms'
import { cn } from '../lib/utils'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [moscowTime, setMoscowTime] = useState('')
  const site = getSiteContent()
  const header = getHeaderContent()
  const pathname = usePathname()

  useEffect(() => {
    const updateMoscowTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Europe/Moscow',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setMoscowTime(`${time} Moscow, RU`)
    }

    updateMoscowTime()
    const interval = setInterval(updateMoscowTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className='fixed top-0 right-0 left-0 z-50 bg-transparent'>
      <div className='w-full px-1'>
        <div className='flex w-full items-center justify-between p-3 lg:grid lg:grid-cols-[1fr_auto_1fr]'>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className='text-primary text-xl font-bold sm:text-2xl'
            >
              <Image
                width={87}
                height={46}
                src={header.logo.src}
                alt={header.logo.alt}
                className='h-10'
              />
            </Link>

            <Badge className='text-primary m-auto hidden items-center justify-center border-0 bg-white p-4 font-light lg:flex'>
              {moscowTime}
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav
            role='tablist'
            className='tabs tabs-box text-base-content bg-base-content hidden items-center gap-2 justify-self-center sm:fixed sm:right-0 sm:bottom-6 sm:left-0 sm:flex lg:static'
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
          <div className='flex justify-end'>
            <Button variant='accent' size='sm'>
              <Link href={header.accentButton.href}>
                {header.accentButton.label}
              </Link>
            </Button>
          </div>
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
