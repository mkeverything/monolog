import { FullPageSection } from '@/src/components/FullPageSection'
import { Badge } from '@/src/components/ui/Badge'
import { Button } from '@/src/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/Card'
import { SiteContent } from '@/src/lib/cms'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'

export default function Features(home: SiteContent['home']) {
  return (
    <FullPageSection id='features' className='relative'>
      <div className='relative md:w-2/3 w-full max-w-2xl h-16 px-8 mt-16'>
        <Image src='/assets/features-hero.svg' alt='features-hero' fill />
      </div>
      <div className='text-2xl font-semibold pt-8'>{home.features.title}</div>
      <div className='mt-12 grid w-full grid-cols-1 gap-2 sm:mt-16 sm:gap-2 md:grid-cols-2 lg:grid-cols-3'>
        {home.features.items.map((feature) => (
          <Card
            key={feature.title}
            variant='default'
            className='flex h-36 flex-col justify-between rounded-2xl p-4'
          >
            <CardHeader className='flex w-full justify-between'>
              <CardTitle>{feature.title}</CardTitle>
              <Badge className='bg-secondary text-primary rounded-md text-xs p-2'>
                {feature.tag}
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription className='text-sm'>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className='mt-12 flex justify-between gap-1 rounded-full p-1.5'>
        <span className='pl-1.5'>{home.features.cta}</span>
        <Badge className='badge-xl bg-base-100 text-primary m-0 aspect-square rounded-full p-1.5'>
          <ArrowDown />
        </Badge>
      </Button>
    </FullPageSection>
  )
}
