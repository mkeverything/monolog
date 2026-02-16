'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HorizontalCarousel } from '@/src/components/HorizontalCarousel'
import { SiteContent } from '@/src/lib/cms'

export default function Gallery(home: SiteContent['home']) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={containerRef}
      className='relative p-4 sm:p-6'
      style={{ height: `${home.workflow.gallery.length * 100}vh` }}
    >
      <div className='sticky top-0 h-dvh w-full'>
        <div className='relative flex h-full w-full flex-col items-center justify-center gap-8 p-4 sm:p-6'>
          <h2 className='text-primary text-xl font-medium'>
            {home.workflow.title}
          </h2>
          <HorizontalCarousel
            data={home.workflow}
            scrollProgress={scrollProgress}
          />
          <motion.div
            className='pointer-events-none absolute inset-0'
            style={{
              opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]),
            }}
          />
        </div>
      </div>
    </div>
  )
}
