'use client'

import { FullPageSection } from '@/src/components/FullPageSection'
import { Badge } from '@/src/components/ui/Badge'
import { SiteContent } from '@/src/lib/cms'
import { InfoIcon, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

export default function FAQ({ faq }: FAQProps) {
  const [tabOpen, setTabOpen] = useState<number | undefined>(undefined)
  const onClick = (index: number) => {
    if (index === tabOpen) setTabOpen(undefined)
    else setTabOpen(index)
  }

  return (
    <FullPageSection id='faq' className='max-sm:p-0!'>
      <span className='text-2xl font-semibold'>{faq.title}</span>
      <div className='mt-12 w-full md:mt-16'>
        <div className='flex w-full flex-col gap-4'>
          {faq.items.map((item, index) => (
            <details
              key={index}
              onClick={() => onClick(index)}
              className={`collapse-${index === tabOpen ? 'open' : 'close'} join-item bg-neutral collapse cursor-pointer`}
              name='faq-accordion'
            >
              <summary
                className={`collapse-title flex w-full items-center justify-between gap-2 p-4 text-sm transition-all ${index === tabOpen && 'pb-1'}`}
              >
                <div className='flex items-center gap-2 text-base'>
                  <InfoIcon className='text-accent size-4 max-sm:hidden' />
                  {item.q}
                </div>
                <Badge className='bg-secondary text-primary aspect-square rounded-md p-0'>
                  {index === tabOpen ? (
                    <Minus className='size-3' />
                  ) : (
                    <Plus className='size-3' />
                  )}
                </Badge>
              </summary>
              <div className='collapse-content text-base-content/50 sm:px-10 pt-[-12px] text-sm'>
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </FullPageSection>
  )
}

type FAQProps = {
  faq: SiteContent['home']['faq']
}
