'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getHeaderContent, getSiteContent } from '../lib/cms'
import { cn } from '../lib/utils'
import { Badge } from './ui/Badge'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const header = getHeaderContent()
  const site = getSiteContent()
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const menuItems = [
    {
      label: header.accentButton.label,
      href: header.accentButton.href,
      isAccent: true,
    },
    ...header.navigation,
  ]

  return (
    <>
      {/* Mobile Menu Button - Fixed at bottom */}
      <motion.div
        className='fixed right-0 bottom-6 left-0 z-50 px-4 md:hidden'
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className='bg-primary flex items-center justify-between rounded-full px-4 py-3 shadow-lg'>
          <Link href='/' className='flex items-center gap-2 invert'>
            <Image
              width={87}
              height={46}
              src={header.logo.src}
              alt={header.logo.alt}
              className='h-6 w-auto'
            />
          </Link>

          <span
            className={`text-base-100 text-sm font-medium ${isOpen && 'text-secondary-content'}`}
          >
            {site.menu}
          </span>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-base-100 hover:text-accent flex h-10 w-10 items-center justify-center rounded-full transition-colors'
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode='wait'>
              {isOpen ? (
                <motion.div
                  key='close'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className='h-6 w-6' />
                </motion.div>
              ) : (
                <motion.div
                  key='menu'
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className='h-6 w-6' />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className='fixed right-4 bottom-24 left-4 z-50 md:hidden'
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className='bg-primary overflow-hidden rounded-4xl shadow-2xl'>
                <nav className='flex flex-col gap-2 p-2'>
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center justify-center gap-2 rounded-full px-4 py-2 font-light transition-colors',
                          pathname === item.href
                            ? 'bg-secondary text-primary font-medium'
                            : 'text-base-100 hover:bg-white/10',
                        )}
                      >
                        {item.href === '/projects' && (
                          <Badge className='badge-accent text-base-100 badge-sm aspect-square rounded-full text-xs font-medium'>
                            {site.projects.items.length}
                          </Badge>
                        )}
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
