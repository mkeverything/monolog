'use client'

import Image from 'next/image'
import { ProjectsProps } from './page'

export default function Hero(projects: ProjectsProps) {
  return (
    <div className='flex h-[75dvh] flex-col p-2'>
      <div className='size-full'>
        <div className='relative h-1/2 w-full'>
          <Image src={projects.hero.image} className='h-fit' fill alt='hero' />
        </div>
        <div className='grid w-full grid-cols-2 gap-8 md:grid-cols-5'>
          <div className='flex flex-col md:col-span-3'>
            <span className='text-secondary-content'>
              {projects.hero.content.projects.title}
            </span>
            <span className='text-xl font-semibold'>
              {projects.hero.content.projects.subtitle}
            </span>
          </div>

          <div className='flex flex-col'>
            <span className='text-secondary-content'>
              {projects.hero.content.year.title}
            </span>
            <span className='text-xl font-semibold'>
              {projects.hero.content.year.subtitle}
            </span>
          </div>

          <div className='flex flex-col'>
            <span className='text-secondary-content'>
              {projects.hero.content.returned.title}
            </span>
            <span className='text-xl font-semibold'>
              {projects.hero.content.returned.subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
