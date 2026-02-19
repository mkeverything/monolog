import { FullPageSection } from '@/src/components/FullPageSection'
import { Badge } from '@/src/components/ui/Badge'
import { Button } from '@/src/components/ui/Button'
import { SiteContent } from '@/src/lib/cms'
import Image from 'next/image'
import { Fragment } from 'react/jsx-runtime'

export default function Hero({
  home,
  contact,
}: Pick<SiteContent, 'home' | 'contact'>) {
  return (
    <FullPageSection
      centered={false}
      background='neutral'
      id='hero'
      className='relative flex flex-col items-start overflow-x-hidden'
    >
      <div className='bg-neutral absolute -top-20 right-0 left-0 h-20' />
      <Image
        src='/assets/hero.png'
        fill
        alt='hero'
        className='absolute inset-0 z-10 object-cover'
      />
      <Image
        src='/assets/hero-pattern.svg'
        fill
        alt='hero'
        className='absolute inset-0 object-cover'
      />
      <div className='z-20 mt-[25dvh] flex max-w-2/5 grow flex-col gap-2'>
        <div className='flex gap-3'>
          {home.hero.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className='text-primary text-2xl font-medium'>
          {home.hero.title}
        </div>
        <div className='text-primary text-sm'>{home.hero.subtitle}</div>
        <Button
          href={home.hero.ctaPrimary?.href}
          size='sm'
          className='mt-4 w-fit'
        >
          {home.hero.ctaPrimary?.label}
        </Button>
      </div>
      <div className='z-20 grid grid-cols-[max-content_auto_max-content_1fr] gap-2 max-sm:hidden'>
        {contact.contactInfo.contacts.map((item) => (
          <Fragment key={item.label}>
            <div className='text-accent whitespace-nowrap'>{item.label}</div>
            <div className='text-primary mr-32'>{item.value}</div>
          </Fragment>
        ))}
      </div>
    </FullPageSection>
  )
}
