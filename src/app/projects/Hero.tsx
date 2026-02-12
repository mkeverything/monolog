import { FullPageSection } from '@/src/components/FullPageSection'
import Image from 'next/image'

export default function Hero() {
  return (
    <FullPageSection className=''>
      <Image src='/assets/projects-hero.svg' fill alt='hero' />

    </FullPageSection>
  )
}
