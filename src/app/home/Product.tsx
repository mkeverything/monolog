import { FullPageSection } from '@/src/components/FullPageSection'
import { Card, CardProps } from '@/src/components/ui/Card'
import { SiteContent } from '@/src/lib/cms'
import Image from 'next/image'
import { FC } from 'react'

export default function Product({ product }: SiteContent['home']) {
  return (
    <FullPageSection className='p-0!'>
      <div className='relative flex h-full items-center justify-center overflow-hidden'>
        <Image
          className='z-10 m-auto max-w-[75%]'
          src={product.hero}
          width={1178}
          height={1178}
          alt='hero'
        />
        <div className='border-primary absolute top-8 aspect-square h-auto w-[150%] rounded-full border-4 blur-lg' />
        <div className='border-primary absolute top-1/3 aspect-square h-auto w-full rounded-full border-4 blur-lg' />
        <div className='absolute inset-0 bg-transparent bg-linear-to-b from-60% to-white to-75%' />
      </div>
    </FullPageSection>
  )
}

const FloatingCard: FC<FloatingCardProps> = ({ card, ...props }) => {
  return (
    <Card variant='elevated' className='flex' {...props}>
      <Image src={card.image} fill alt='card-image' />
      <div className='flex flex-col'>
        <span>{card.title}</span>
        <span>{card.caption}</span>
      </div>
    </Card>
  )
}

type FloatingCardProps = {
  card: {
    image: string
    title: string
    caption: string
  }
} & CardProps
