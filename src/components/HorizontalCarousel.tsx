'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SiteContent } from '../lib/cms'
import { Badge } from './ui/Badge'
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

  return (
    <div className='relative w-full h-full flex flex-col'>
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

      {/* Vertical Progress Bars */}
      <div className='w-full flex flex-col items-center gap-3 mt-6'>
        <div className='flex items-center gap-1'>
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-0.5 h-6 rounded-full transition-all duration-300 ${
                index <= activeIndex ? 'bg-accent' : 'bg-base-300'
              }`}
            />
          ))}
        </div>
        <span className='text-sm text-secondary-content font-medium'>
          {progressPercentage}%
        </span>
      </div>
    </div>
  )
}
