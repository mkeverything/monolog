'use client'

import { Badge } from '@/src/components/ui/Badge'
import { Button } from '@/src/components/ui/Button'
import { getProjectContent, getSiteContent, SiteContent } from '@/src/lib/cms'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FC } from 'react'

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectContent(slug)

  if (!project) return null

  const { meta } = project

  console.log(meta)

  return (
    <div className='flex size-full p-4'>
      <Meta meta={meta} />
      <Content images={meta.images} />
    </div>
  )
}

const Meta: FC<{ meta: MetaProps }> = ({ meta }) => {
  const {
    projects: { cta },
  } = getSiteContent()
  return (
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
  )
}

const MetaRow: FC<{ name: string; value: string; divider?: boolean }> = ({
  name,
  value,
  divider,
}) => (
  <div
    className={`grid grid-cols-2 ${divider && 'border-secondary border-b'} py-2`}
  >
    <span className='text-secondary-content'>{name}:</span>
    <span className='w-fit'>{value}</span>
  </div>
)

const Content: FC<{ images: string[] }> = ({ images }) => (
  <div className='size-lg flex flex-col border w-full border-red-500'>
    {images.map((image, i) => {
      console.log(image)
      return (
        <div key={i} className='relative w-full'>
          <Image
            key={i}
            src={image || ''}
            fill
            alt={`image-${i}`}
          />
        </div>
      )
    })}
  </div>
)

type MetaProps = SiteContent['projects']['items'][number]['meta']
