'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { MotionValue } from 'framer-motion'
import { SiteContent } from '../lib/cms'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

type HorizontalCarouselProps = {
  data: SiteContent['home']['workflow']
  scrollProgress?: number | MotionValue<number>
}

let mounted = false

export function HorizontalCarousel({
  data,
  scrollProgress = 0,
}: HorizontalCarouselProps) {
  const images = data.gallery
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!mounted) {
      mounted = true
    }
  })

  const checkScrollability = () => {
    const carousel = carouselRef.current
    if (!carousel) return

    const scrollLeft = carousel.scrollLeft
    const itemWidth = carousel.scrollWidth / images.length
    const currentIndex = Math.round(scrollLeft / itemWidth)

    setActiveIndex(Math.min(currentIndex, images.length - 1))
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => checkScrollability()

    carousel.addEventListener('scroll', handleScroll)
    checkScrollability()

    return () => carousel.removeEventListener('scroll', handleScroll)
  })

  // Auto-scroll based on section scroll progress
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const maxScroll = carousel.scrollWidth - carousel.clientWidth

    if (typeof scrollProgress === 'number') {
      // Static value - set once
      carousel.scrollTo({
        left: scrollProgress * maxScroll,
        behavior: 'auto',
      })
    } else {
      // MotionValue - subscribe to changes
      return scrollProgress.on('change', (latest) => {
        carousel.scrollTo({
          left: latest * maxScroll,
          behavior: 'auto',
        })
      })
    }
  }, [scrollProgress])

  const progressPercentage = Math.round(
    ((activeIndex + 1) / images.length) * 100,
  )

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const barLength = isMobile ? 10 : 15

  return (
    <>
      <div className='relative flex w-full flex-col'>
        {/* Horizontal Carousel - Single centered item */}
        <div className='relative flex w-full flex-1 items-center justify-center'>
          <div
            ref={carouselRef}
            className='carousel flex h-full w-full max-w-md snap-x snap-mandatory items-center overflow-x-auto'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className='carousel-item flex h-full w-full shrink-0 snap-center flex-col items-center justify-center gap-8'
              >
                <Card className='rounded-box relative flex h-48 w-full overflow-hidden p-0'>
                  <Badge className='bg-primary text-primary-content absolute top-4 left-4 size-6 rounded-full text-xs'>
                    {image.number}
                  </Badge>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1024}
                    height={1024}
                    className='mx-26 object-cover'
                  />
                </Card>
                <div className='flex max-w-86 flex-col gap-4 text-center'>
                  <div className='text-xl'>{data.steps[index].title}</div>
                  <div className='text-sm'>{data.steps[index].description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar - Full width with equal gaps */}
      <div className='absolute bottom-4 mt-6 flex w-full flex-col gap-2'>
        <div className='flex w-full justify-between'>
          <div className='pl-4'>
            <span className='text-left text-4xl font-semibold'>
              {progressPercentage}
            </span>
            <span className='text-3xl'>%</span>
          </div>
          <Button
            size='sm'
            variant='secondary'
            className='text-primary bg-neutral h-fit p-1 font-normal'
          >
            <span className='px-2'>{data.cta}</span>
            <Badge className='bg-secondary size-6 rounded-full p-1 text-xl'>
              <ArrowRight />
            </Badge>
          </Button>
        </div>
        {mounted && (
          <Card className='px-4 py-2'>
            <div className='flex w-full justify-between gap-1'>
              {Array.from({ length: images.length * barLength }).map(
                (_, index) => {
                  const filledBars = activeIndex * barLength

                  return (
                    <div
                      key={index}
                      className={`h-6 w-1 rounded-full transition-all duration-300 ${
                        index - barLength <= filledBars
                          ? 'bg-accent'
                          : 'bg-base-300'
                      }`}
                    />
                  )
                },
              )}
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
