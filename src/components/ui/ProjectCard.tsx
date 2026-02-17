'use client'

import { Badge } from '@/src/components/ui/Badge'
import { SiteContent } from '@/src/lib/cms'
import { cn } from '@/src/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import FrameOverlay from './FrameOverlay'

export function ProjectCard({
  image,
  title,
  slug,
  type,
  year,
  tags,
  className,
}: ProjectCardProps) {
  const tagsList = tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn('flex h-[90dvh] w-auto cursor-pointer flex-col', className)}
    >
      <div className='relative flex-95 overflow-hidden rounded-2xl'>
        <FrameOverlay>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </FrameOverlay>
      </div>
      <div className='flex flex-5 flex-col justify-center gap-3 p-4'>
        <div className='flex items-center justify-between text-base'>
          <span className='text-base-content font-medium'>{title}</span>
          <span className='text-base-content/60'>{type}</span>
          <span className='text-base-content/60'>{year}</span>
        </div>
        <div className='relative overflow-hidden'>
          <div className='pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-linear-to-r from-white to-transparent' />
          <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-linear-to-l from-white to-transparent' />
          <div className='scrollbar-hide flex gap-2 overflow-x-auto'>
            {tagsList.map((tag, index) => (
              <Badge
                key={`${tag}-${index}`}
                className='badge-sm bg-secondary/10 text-secondary-content border-0 whitespace-nowrap'
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

type ProjectCardProps = SiteContent['projects']['items'][number] & {
  className?: string
}
