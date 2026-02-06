'use client'

import { useEffect, useRef, useState } from 'react'
import { FullPageSection } from '@/src/components/FullPageSection'
import { HorizontalCarousel } from '@/src/components/HorizontalCarousel'
import { SiteContent } from '@/src/lib/cms'

export default function Gallery(home: SiteContent['home']) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height
      
      // Shorter scroll range - only scroll when section is mostly visible
      // Start when section top reaches 20% from top of viewport
      // End when section bottom reaches 80% from top of viewport
      const scrollStart = windowHeight * 0.2
      const scrollEnd = windowHeight * 0.8 - sectionHeight
      const currentPosition = rect.top
      
      // Calculate normalized progress (0 to 1) over shorter range
      let progress = 0
      if (currentPosition <= scrollStart) {
        if (currentPosition >= scrollEnd) {
          progress = (scrollStart - currentPosition) / (scrollStart - scrollEnd)
        } else {
          progress = 1
        }
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <FullPageSection id='gallery'>
      <div ref={sectionRef} className='w-full h-full flex flex-col justify-center relative items-center gap-8'>
        <h2 className='text-xl font-medium text-primary'>
          {home.workflow.title}
        </h2>
        <HorizontalCarousel data={home.workflow} scrollProgress={scrollProgress} />
      </div>
    </FullPageSection>
  )
}
