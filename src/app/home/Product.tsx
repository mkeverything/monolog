import { FullPageSection } from '@/src/components/FullPageSection'
import { Card } from '@/src/components/ui/Card'
import { SiteContent } from '@/src/lib/cms'
import Image from 'next/image'
import { FC } from 'react'

export default function Product({ product }: SiteContent['home']) {
  return (
    <FullPageSection id='product' className='p-0!'>
      <span className='flex h-32 items-center text-xl'>{product.title}</span>
      <div className='relative flex h-full items-center justify-center overflow-hidden'>
        <Image
          className='z-10 m-auto max-w-[75%]'
          src={product.hero}
          width={1178}
          height={1178}
          alt='hero'
        />
        <div className='absolute inset-0 z-10 bg-transparent bg-linear-to-b from-60% to-white to-75%' />
        <div className='border-primary absolute top-8 aspect-square h-auto w-[150%] rounded-full border-4 blur-lg' />
        <div className='border-primary absolute top-1/3 aspect-square h-auto w-full rounded-full border-4 blur-lg' />
        <FloatingCard card={product.cards[0]} coordinates='top-8 left-8' />
        <FloatingCard card={product.cards[1]} coordinates='right-8 top-40' />
        <FloatingCard card={product.cards[2]} coordinates='bottom-40 left-8' />
      </div>
    </FullPageSection>
  )
}

const FloatingCard: FC<FloatingCardProps> = ({ card, coordinates }) => {
  return (
    <Card
      variant='elevated'
      className={`bg-base-100 absolute z-20 flex gap-2 rounded-xl! p-2 pr-4 ${coordinates}`}
    >
      <Image
        src={card.image}
        className='size-8'
        width={1024}
        height={1024}
        alt='card-image'
      />
      <div className='flex flex-col text-xs'>
        <span className=''>{card.title}</span>
        <span className='text-secondary-content italic'>{card.caption}</span>
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
  coordinates: string
}
