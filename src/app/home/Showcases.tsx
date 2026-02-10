'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { FullPageSection } from '@/src/components/FullPageSection'
import { SiteContent } from '@/src/lib/cms'
import { cn } from '@/src/lib/utils'

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
        'absolute inset-0 flex items-center justify-center p-16 py-32',
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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const images = showcases.images || []

  return (
    <FullPageSection id='showcases' className='relative overflow-hidden'>
      <div className='absolute top-0 z-20 flex items-center justify-center'>
        <span className='text-xl font-medium'>{showcases.title}</span>
      </div>
      <div
        ref={containerRef}
        className='relative h-[175vh] w-full'
        style={{ marginTop: '-50vh' }}
      >
        <div className='sticky top-0 h-screen w-full overflow-hidden'>
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
      </div>
    </FullPageSection>
  )
}

interface ShowcasesProps {
  showcases: SiteContent['home']['showcases']
}
