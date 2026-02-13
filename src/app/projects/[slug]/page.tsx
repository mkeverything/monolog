'use client'

import { Badge } from '@/src/components/ui/Badge'
import { Button } from '@/src/components/ui/Button'
import { getProjectContent, getSiteContent } from '@/src/lib/cms'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FC } from 'react'

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectContent(slug)
  const {
    projects: { cta },
  } = getSiteContent()

  if (!project) return null

  const { meta } = project

  return (
    <div className='p-4'>
      <div className='flex max-w-sm flex-col gap-8'>
        <Button className='bg-neutral text-primary flex h-12 w-fit gap-2 pr-4 pl-1.5 text-lg font-normal'>
          <Badge className='bg-secondary size-10 p-1'>
            <ArrowLeft />
          </Badge>
          {cta}
        </Button>
        <div className='flex flex-col gap-2'>
          <div className='relative size-12 overflow-hidden rounded-sm'>
            <Image src={meta.icon || ''} fill alt='icon' />
          </div>
          <span>{meta.description}</span>
        </div>
        <div className='flex flex-col'>
          {meta.items.map((item, i) => {
            return (
              <MetaRow
                key={i}
                name={item.name}
                value={item.value}
                divider={i + 1 < meta.items.length}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const MetaRow: FC<{ name: string; value: string; divider?: boolean }> = ({
  name,
  value,
  divider,
}) => {
  return (
    <div
      className={`grid grid-cols-2 ${divider && 'border-secondary border-b'} py-2`}
    >
      <span className='text-secondary-content'>{name}:</span>
      <span className='w-fit'>{value}</span>
    </div>
  )
}
