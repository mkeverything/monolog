'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { SiteContent } from '../lib/cms'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

export function HorizontalCarousel({
  data,
}: {
  data: SiteContent['home']['workflow']
}) {
  const images = data.gallery
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    const carousel = carouselRef.current
    if (!carousel) return

    const scrollLeft = carousel.scrollLeft
    const maxScroll = carousel.scrollWidth - carousel.clientWidth
    const itemWidth = carousel.scrollWidth / images.length
    const currentIndex = Math.round(scrollLeft / itemWidth)

    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < maxScroll - 1)
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

  const scroll = (direction: 'left' | 'right') => {
    const carousel = carouselRef.current
    if (!carousel) return

    const itemWidth = carousel.scrollWidth / images.length
    carousel.scrollBy({
      left: direction === 'left' ? -itemWidth : itemWidth,
      behavior: 'smooth',
    })
  }

  const progressPercentage = Math.round(
    ((activeIndex + 1) / images.length) * 100,
  )

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const barLength = isMobile ? 10 : 15

  return (
    <>
      <div className='relative w-full flex flex-col'>
        {/* Horizontal Carousel - Single centered item */}
        <div className='relative flex-1 w-full flex items-center justify-center'>
          <div
            ref={carouselRef}
            className='carousel w-full max-w-md h-full overflow-x-auto snap-x snap-mandatory flex items-center'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className='carousel-item snap-center shrink-0 w-full h-full flex gap-8 flex-col items-center justify-center'
              >
                <Card className='relative p-0 w-full h-48 flex rounded-box overflow-hidden'>
                  <Badge className='bg-primary text-primary-content rounded-full size-6 text-xs absolute left-4 top-4'>
                    {image.number}
                  </Badge>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1024}
                    height={1024}
                    className='object-cover mx-26'
                  />
                </Card>
                <div className='text-center flex flex-col gap-4 max-w-86'>
                  <div className='text-xl'>{data.steps[index].title}</div>
                  <div className='text-sm'>{data.steps[index].description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className='absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity z-10'
            aria-label='Previous image'
          >
            <ChevronLeft className='w-4 h-4' />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className='absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity z-10'
            aria-label='Next image'
          >
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>
      </div>

      {/* Progress Bar - Full width with equal gaps */}
      <div className='w-full flex flex-col gap-2 absolute bottom-4 mt-6'>
        <div className='flex justify-between w-full'>
          <div className='pl-4'>
            <span className='text-4xl font-semibold text-left'>
              {progressPercentage}
            </span>
            <span className='text-3xl'>%</span>
          </div>
          <Button
            size='sm'
            variant='secondary'
            className='p-1 h-fit text-primary font-normal bg-neutral'
          >
            <span className='px-2'>{data.cta}</span>
            <Badge className='rounded-full size-6 p-1 bg-secondary text-xl'>
              <ArrowRight />
            </Badge>
          </Button>
        </div>
        <Card className='py-2 px-4'>
          <div className='w-full flex gap-1 justify-between'>
            {Array.from({ length: images.length * barLength }).map(
              (_, index) => {
                const filledBars = activeIndex * barLength

                return (
                  <div
                    key={index}
                    className={`w-1 h-6 rounded-full transition-all duration-300 ${
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
      </div>
    </>
  )
}
