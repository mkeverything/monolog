'use client'

import { FullPageSection } from '@/src/components/FullPageSection'
import Image from 'next/image'
import { ProjectsProps } from './page'

export default function Hero(projects: ProjectsProps) {
  return (
    <FullPageSection>
      <div className='h-full w-full p-8'>
        <Image src={projects.hero.image} fill alt='hero' />
      </div>
    </FullPageSection>
  )
}
