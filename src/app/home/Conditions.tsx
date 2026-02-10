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
      <div className='text-2xl font-medium'>{conditions.title}</div>
      <div className='mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3'>
        {conditions.cards.map((card) => (
          <Card
            key={card.title}
            variant='default'
            className='flex flex-col overflow-hidden p-2 gap-8'
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
                  <Check className='mt-0.5 h-4 w-4 shrink-0 text-accent' />
                  <span className='text-sm'>{checkpoint}</span>
                </div>
              ))}
            </CardContent>
            <div className='p-6'>
              <Button className='w-full rounded-full'>{card.cta}</Button>
            </div>
          </Card>
        ))}
        <Card className='lg:col-span-3'>
          <CardHeader>
            <div className='flex items-center gap-2 justify-between w-full'>
              <CardTitle>{conditions.support.title}</CardTitle>
              <Badge className='bg-secondary text-secondary-content rounded-md text-xs'>
                {conditions.support.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {conditions.support.checkpoints.map((checkpoint, index) => (
                <div key={index} className='flex items-start gap-2'>
                  <Check className='mt-0.5 h-4 w-4 shrink-0 text-accent' />
                  <span className='text-sm'>{checkpoint}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <p className='text-base-content/60 mt-8 text-center text-sm'>
        {conditions.disclaimer}
      </p>
    </FullPageSection>
  )
}
