'use client'

import { Footer } from '@/src/components/Footer'
import { Badge } from '@/src/components/ui/Badge'
import { Button } from '@/src/components/ui/Button'
import { getProjectContent, getSiteContent, SiteContent } from '@/src/lib/cms'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC } from 'react'

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectContent(slug)

  if (!project) return null

  const { meta } = project

  return (
    <>
      {/* <div className='grid size-full grid-cols-1 gap-8 p-4 lg:grid-cols-4 relative items-start'> */}
      <div className='relative flex size-full flex-col gap-8 p-4 lg:flex-row'>
        <Meta meta={meta} />
        <Content images={meta.images} />
      </div>
      <Footer />
    </>
  )
}

const BackButton: FC<{ cta: string }> = ({ cta }) => {
  return (
    <Link href='/projects'>
      <Button className='bg-neutral text-primary flex h-10 w-fit gap-2 pr-4 pl-1.5 font-normal'>
        <Badge className='bg-secondary size-8 p-1'>
          <ArrowLeft />
        </Badge>
        {cta}
      </Button>
    </Link>
  )
}

const Meta: FC<{ meta: MetaProps }> = ({ meta }) => {
  const {
    projects: { cta },
  } = getSiteContent()

  return (
    <div className='top-24 flex size-full flex-col items-center gap-12 self-start sm:w-full lg:sticky lg:max-w-[25vw] lg:items-start'>
      <BackButton cta={cta} />
      <div className='flex flex-col gap-8 md:flex-row lg:flex-col'>
        <div className='flex flex-col gap-2'>
          <div className='relative size-12 overflow-hidden rounded-sm'>
            <Image src={meta.icon || ''} fill alt='icon' />
          </div>
          <span className='text-sm font-medium'>{meta.description}</span>
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
}) => (
  <div
    className={`grid grid-cols-2 ${divider && 'border-secondary border-b'} py-2 text-sm font-medium`}
  >
    <span className='text-secondary-content'>{name}:</span>
    <span className='w-fit'>{value}</span>
  </div>
)

const Content: FC<{ images: string[] }> = ({ images }) => (
  <div className='col-span-2 flex w-full flex-col gap-4 lg:max-w-[40%]'>
    {images.map((image, i) => (
      <div key={i} className='relative aspect-video w-full'>
        <Image
          src={image}
          fill
          className='rounded-lg object-cover'
          alt={`Project image ${i + 1}`}
          sizes='(max-width: 768px) 100vw, 80vw'
        />
      </div>
    ))}
  </div>
)

type MetaProps = SiteContent['projects']['items'][number]['meta']
