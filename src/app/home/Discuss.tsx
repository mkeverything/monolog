import { FullPageSection } from '@/src/components/FullPageSection'
import { Badge } from '@/src/components/ui/Badge'
import { Button } from '@/src/components/ui/Button'
import { SiteContent } from '@/src/lib/cms'
import Image from 'next/image'

export default function Discuss({ discuss }: PageProps) {
  return (
    <FullPageSection>
      <div className='relative flex h-full w-full overflow-hidden rounded-2xl max-sm:grow sm:h-65'>
        <Image
          src={'/assets/discuss-hero.png'}
          fill
          alt='discuss-hero'
          className='absolute hidden w-full object-cover sm:block'
        />
        <Image
          src={'/assets/discuss-hero-mobile.png'}
          fill
          alt='discuss-hero'
          className='absolute w-full object-cover sm:hidden'
        />
        <div className='z-10 flex size-full flex-col justify-between gap-4 p-4'>
          <div className='hidden h-[50dvh] w-full max-sm:block' />
          <Badge className='rounded-sm'>{discuss.badge}</Badge>
          <div className='flex w-full flex-wrap items-end justify-between gap-4'>
            <div className='text-primary-content flex max-w-md flex-col gap-2'>
              <span className='text-xl'>{discuss.title}</span>
              <span className='text-xs'>{discuss.caption}</span>
            </div>
            <Button size='sm' className='h-fit p-2 px-4'>
              {discuss.cta}
            </Button>
          </div>
        </div>
      </div>
    </FullPageSection>
  )
}

type PageProps = {
  discuss: SiteContent['home']['discuss']
}
