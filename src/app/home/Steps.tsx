import { FullPageSection } from '@/src/components/FullPageSection'
import { AnimatedBadge } from '@/src/components/ui/AnimatedBadge'
import { Badge } from '@/src/components/ui/Badge'
import { Card, CardContent, CardTitle } from '@/src/components/ui/Card'
import { SiteContent } from '@/src/lib/cms'
import Image from 'next/image'

export default function Steps(home: SiteContent['home']) {
  return (
    <FullPageSection id='steps'>
      <div className='mt-12 grid size-full grid-cols-1 gap-2 sm:mt-16 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-2'>
        <Card className='flex w-full flex-col justify-between overflow-hidden px-0 lg:col-start-1 lg:col-end-4'>
          <CardTitle className='px-4'>{home.steps.developing.title}</CardTitle>
          <CardContent className='relative'>
            {/* Gradient masks for fade effect */}
            <div className='from-base-100 pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-linear-to-r to-transparent' />
            <div className='from-base-100 pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-linear-to-l to-transparent' />

            {/* Row 1 - scrolls left */}
            <div className='flex overflow-hidden py-2'>
              <div className='animate-scroll-left flex gap-2'>
                {Array.from({ length: 2 })
                  .flatMap(() => home.steps.developing.items)
                  .map((item, i) => {
                    const badgeStyle: string =
                      i % 2 === 0
                        ? 'bg-white'
                        : i % 3 === 0
                          ? 'bg-base-300'
                          : 'bg-primary text-base-100'
                    return (
                      <Badge
                        key={`r1-${i}`}
                        className={`${badgeStyle} text-xs whitespace-nowrap`}
                      >
                        {item}
                      </Badge>
                    )
                  })}
              </div>
            </div>

            {/* Row 2 - scrolls right */}
            <div className='flex overflow-hidden py-2'>
              <div className='animate-scroll-right flex gap-2'>
                {Array.from({ length: 2 })
                  .flatMap(() => home.steps.developing.items.reverse())
                  .map((item, i) => {
                    const badgeStyle: string =
                      i % 2 === 0
                        ? 'bg-white'
                        : i % 3 === 0
                          ? 'bg-base-300'
                          : 'bg-primary text-base-100'
                    return (
                      <Badge
                        key={`r2-${i}`}
                        className={`${badgeStyle} text-xs whitespace-nowrap`}
                      >
                        {item}
                      </Badge>
                    )
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='relative flex size-full flex-col justify-between overflow-hidden px-0 lg:col-start-4 lg:col-end-6'>
          <CardContent>
            <CardTitle className='px-4'>{home.steps.deadlines.title}</CardTitle>
            <span className='absolute right-4 bottom-4 text-sm italic'>
              {home.steps.deadlines.description}
            </span>
            <div className='absolute -bottom-4 -left-4'>
              <div className='relative'>
                <Image
                  width={250}
                  height={250}
                  alt='meter'
                  src={'/assets/meter.svg'}
                />
                <div className='absolute top-4 -right-8 flex flex-col'>
                  <span className='text-3xl font-medium'>
                    {home.steps.deadlines.value}
                  </span>
                  <span>{home.steps.deadlines.caption}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='flex size-full flex-col justify-between overflow-hidden px-0 lg:col-start-1 lg:col-end-3'>
          <CardTitle className='px-4'>{home.steps.automation.title}</CardTitle>
          <CardContent className='relative'>
            {/* Gradient masks for fade effect */}
            <div className='from-base-100 pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-linear-to-r to-transparent' />
            <div className='from-base-100 pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-linear-to-l to-transparent' />

            {/* Row 1 - scrolls left */}
            <div className='flex overflow-hidden py-1'>
              <div className='animate-scroll-left flex'>
                {Array.from({ length: 2 })
                  .flatMap(() => home.steps.automation.items)
                  .map((item, i) => {
                    return (
                      <AnimatedBadge
                        key={`r1-${i}`}
                        className={`text-secondary-content rounded-sm bg-transparent text-xs whitespace-nowrap`}
                      >
                        {item}
                      </AnimatedBadge>
                    )
                  })}
              </div>
            </div>

            {/* Row 2 - scrolls right */}
            <div className='flex overflow-hidden py-1'>
              <div className='animate-scroll-right flex'>
                {Array.from({ length: 2 })
                  .flatMap(() => home.steps.automation.items.reverse())
                  .map((item, i) => {
                    return (
                      <AnimatedBadge
                        key={`r2-${i}`}
                        className={`text-secondary-content rounded-sm bg-transparent text-xs whitespace-nowrap`}
                      >
                        {item}
                      </AnimatedBadge>
                    )
                  })}
              </div>
            </div>

            {/* Row 3 - scrolls left slow */}
            <div className='flex overflow-hidden py-1'>
              <div className='animate-scroll-left-slow flex'>
                {Array.from({ length: 2 })
                  .flatMap(() =>
                    home.steps.automation.items
                      .slice()
                      .sort(() => Math.random() - 0.5),
                  )
                  .map((item, i) => {
                    return (
                      <AnimatedBadge
                        key={`r3-${i}`}
                        className={`text-secondary-content rounded-sm bg-transparent text-xs whitespace-nowrap`}
                      >
                        {item}
                      </AnimatedBadge>
                    )
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='relative flex size-full flex-col justify-between overflow-hidden px-0 lg:col-start-3 lg:col-end-6'>
          <CardContent className='flex h-full flex-col justify-between px-4'>
            <CardTitle>{home.steps.pricing.title}</CardTitle>
            <div className='flex w-full gap-4'>
              <div className='flex size-full flex-col justify-end gap-4'>
                <Badge className='badge-lg bg-primary text-primary-content w-1/2 justify-between text-xs'>
                  {home.steps.pricing.monolog}
                  <span>₽</span>
                </Badge>
                <Badge className='badge-lg bg-base-300 w-full justify-between text-xs'>
                  {home.steps.pricing.agencies}
                  <span>₽₽₽</span>
                </Badge>
              </div>
              <div className='flex flex-col'>
                <span className='text-secondary-content'>
                  {home.steps.pricing.upto}
                </span>
                <div>
                  <span className='text-6xl font-semibold'>
                    {home.steps.pricing.multiplierValue}
                  </span>
                  <span className='text-4xl font-light'>x</span>
                </div>
                <span className='text-sm'>{home.steps.pricing.caption}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FullPageSection>
  )
}
