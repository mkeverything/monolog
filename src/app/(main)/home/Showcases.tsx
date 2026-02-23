'use client'

import { FC, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { SiteContent } from '@/src/lib/cms'
import { cn } from '@/src/lib/utils'
import { useMediaQuery } from 'react-responsive'

function ShowcaseCard({
  src,
  index,
  total,
  progress,
}: {
  src: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const cardIndex = index
  const segmentSize = 1 / total
  const startThreshold = cardIndex * segmentSize
  const endThreshold = (cardIndex + 1) * segmentSize

  const y = useTransform(
    progress,
    [startThreshold - 0.1, startThreshold, endThreshold - 0.05],
    ['100%', '0%', '0%'],
  )

  const opacity = useTransform(
    progress,
    [startThreshold - 0.05, startThreshold, endThreshold],
    [0, 1, 1],
  )

  const rotate = useTransform(
    progress,
    [startThreshold, startThreshold + segmentSize * 0.5],
    [3, 0],
  )

  const scale = useTransform(
    progress,
    [startThreshold, startThreshold + segmentSize * 0.3],
    [0.9, 1],
  )

  const isEven = index % 2 === 0
  const tiltRotation = isEven ? 2 : -2

  const finalRotate = useTransform(rotate, (r) => r + tiltRotation)

  return (
    <motion.div
      className={cn(
        'absolute inset-0 flex items-center justify-center p-16 py-24 max-lg:pb-42',
      )}
      style={{
        y,
        opacity,
        rotate: index === 0 ? 0 : finalRotate,
        scale,
        zIndex: index + 10,
      }}
    >
      <div
        className={cn(
          'relative h-full w-full overflow-hidden rounded-3xl shadow-2xl',
          'bg-neutral-100',
        )}
      >
        <Image
          src={src}
          alt={`Showcase ${index + 1}`}
          fill
          className='object-cover'
          priority={index === 0}
        />
      </div>
    </motion.div>
  )
}

export default function Showcases({ showcases }: ShowcasesProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const images = showcases.images || []

  return (
    <div
      id='showcases'
      ref={containerRef}
      className='relative w-full max-sm:pb-32'
      style={{
        height: isMobile ? '100%' : `${images.length * 100}vh`,
      }}
    >
      <div className='top-0 hidden h-dvh w-full overflow-hidden sm:sticky sm:block md:top-16'>
        <div className='absolute top-4 right-0 left-0 z-20 flex items-center justify-center'>
          <span className='text-xl font-semibold'>{showcases.title}</span>
        </div>
        {images.map((src, index) => (
          <ShowcaseCard
            key={index}
            src={src}
            index={index}
            total={images.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
      <div className='flex flex-col gap-4 p-4 sm:hidden'>
        <span className='text-center text-xl font-semibold mb-4'>
          {showcases.title}
        </span>
        {images.map((src, index) => (
          <StaticShowcaseCard key={index} src={src} index={index} />
        ))}
      </div>
    </div>
  )
}

const StaticShowcaseCard: FC<{ src: string; index: number }> = ({
  src,
  index,
}) => {
  return (
    <div
      className={cn(
        'relative aspect-3/4 w-full overflow-hidden rounded-3xl shadow-2xl',
        'bg-neutral-100',
      )}
    >
      <Image
        src={src}
        alt={`Showcase ${index + 1}`}
        fill
        className='object-cover'
        priority={index === 0}
      />
    </div>
  )
}

type ShowcasesProps = {
  showcases: SiteContent['home']['showcases']
}
