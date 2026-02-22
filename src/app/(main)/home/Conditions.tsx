import { FullPageSection } from '@/src/components/FullPageSection'
import { Badge } from '@/src/components/ui/Badge'
import { Button } from '@/src/components/ui/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/Card'
import { SiteContent } from '@/src/lib/cms'
import { Check } from 'lucide-react'
import Image from 'next/image'

export default function Conditions(home: SiteContent['home']) {
  const { conditions } = home

  return (
    <FullPageSection id='conditions' centered={false}>
      <div className='w-full text-center text-2xl font-semibold'>
        {conditions.title}
      </div>
      <div className='mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3'>
        {conditions.cards.map((card) => (
          <Card
            key={card.title}
            variant='default'
            className='flex flex-col gap-8 overflow-hidden p-2'
          >
            <div className='relative h-48 w-full'>
              <Card className='bg-base-300 flex size-full justify-between rounded-2xl p-4'>
                <div className='flex size-full flex-col justify-between'>
                  <Badge className='bg-secondary rounded-sm border-none text-xs'>
                    {card.terms}
                  </Badge>
                  <CardTitle className='text-xl'>{card.title}</CardTitle>
                </div>
                <div className='relative h-auto w-3/4'>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className='object-contain'
                  />
                </div>
              </Card>
            </div>
            <CardContent className='flex flex-1 flex-col gap-3'>
              {card.checkpoints.map((checkpoint, index) => (
                <div key={index} className='flex items-start gap-2'>
                  <Check className='text-accent mt-0.5 h-4 w-4 shrink-0' />
                  <span className='text-sm'>{checkpoint}</span>
                </div>
              ))}
            </CardContent>
            <div className='p-1'>
              <Button className='w-full rounded-2xl py-2'>{card.cta}</Button>
            </div>
          </Card>
        ))}
        <Card className='lg:col-span-3 p-4 py-6'>
          <CardHeader>
            <div className='flex w-full items-center justify-between gap-2'>
              <CardTitle>{conditions.support.title}</CardTitle>
              <Badge className='bg-secondary rounded-sm p-1 text-xs'>
                {conditions.support.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:w-2/3'>
              {conditions.support.checkpoints.map((checkpoint, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <Check className='text-accent mt-0.5 size-3 shrink-0' />
                  <span className='text-sm'>{checkpoint}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <p className='text-base-content/50 mt-8 text-center text-sm italic'>
        {conditions.disclaimer}
      </p>
    </FullPageSection>
  )
}
