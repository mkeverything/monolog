import { FullPageSection } from '@/src/components/FullPageSection'
import { Card } from '@/src/components/ui/Card'
import { SiteContent } from '@/src/lib/cms'
import Image from 'next/image'
import { FC } from 'react'

export default function Product({ product }: SiteContent['home']) {
  return (
    <FullPageSection id='product' className='overflow-hidden'>
      <span className='flex h-32 items-center font-semibold text-xl'>{product.title}</span>
      <div className='relative flex w-full items-center justify-center'>
        <Image
          className='z-10 m-auto h-auto w-full max-w-4xl object-contain px-4'
          src={product.hero}
          width={1178}
          height={1178}
          alt='hero'
          priority
        />
        <div className='pointer-events-none absolute inset-0 z-10 m-auto w-1/2 bg-transparent bg-linear-to-b from-60% to-white to-85%' />
        <div className='border-primary/50 pointer-events-none absolute top-0 left-1/2 aspect-square h-auto w-[200vw] -translate-x-1/2 rounded-full border-4 blur-lg' />
        <div className='border-primary/50 pointer-events-none absolute top-1/3 left-1/2 aspect-square h-auto w-[120vw] -translate-x-1/2 rounded-full border-4 blur-lg' />
        <FloatingCard card={product.cards[0]} coordinates='top-6 left-16' />
        <FloatingCard card={product.cards[1]} coordinates='right-16 top-40' />
        <FloatingCard card={product.cards[2]} coordinates='bottom-40 left-16' />
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
        className='size-10'
        width={1024}
        height={1024}
        alt='card-image'
      />
      <div className='flex flex-col text-sm'>
        <span className=''>{card.title}</span>
        <span className='text-secondary-content/75 italic'>{card.caption}</span>
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
