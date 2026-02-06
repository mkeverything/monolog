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

export default function Features(home: SiteContent['home']) {
  return (
    <FullPageSection id='features'>
      <div className='text-2xl font-medium'>{home.features.title}</div>
      <div className='mt-12 grid grid-cols-1 gap-2 sm:mt-16 sm:gap-2 md:grid-cols-2 lg:grid-cols-3'>
        {home.features.items.map((feature) => (
          <Card
            key={feature.title}
            variant='default'
            className='flex h-40 flex-col justify-between'
          >
            <CardHeader className='flex w-full justify-between'>
              <CardTitle>{feature.title}</CardTitle>
              <Badge className='bg-secondary text-primary rounded-md text-xs'>
                {feature.tag}
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
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
