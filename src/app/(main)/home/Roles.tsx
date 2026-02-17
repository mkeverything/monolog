import {
  FullPageSection,
  SectionSubtitle,
} from '@/src/components/FullPageSection'
import { SiteContent } from '@/src/lib/cms'
import Image from 'next/image'

export default function Roles({ roles }: RolesProps) {
  return (
    <FullPageSection id='roles'>
      <SectionSubtitle className='font-semibold'>{roles.title}</SectionSubtitle>
      <span className='mt-2'>{roles.caption}</span>

      <div className='mt-12 flex w-full max-w-5xl flex-wrap justify-center gap-20'>
        {roles.team.map((member, index) => (
          <div
            className='flex flex-col items-center gap-2'
            key={`${member.role}-${index}`}
          >
            <div className='group bg-base-200 relative aspect-square size-30 overflow-hidden rounded-2xl'>
              <Image
                src={member.image}
                alt={member.role}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
                sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
              />
            </div>
            <span className='text-primary text-xs'>{member.role}</span>
          </div>
        ))}
        <div className='bg-base-200 relative flex aspect-square size-30 items-center justify-center rounded-2xl'>
          <span className='text-primary text-4xl font-bold'>
            +{roles.hiddenCount}
          </span>
        </div>
      </div>
    </FullPageSection>
  )
}

type RolesProps = {
  roles: SiteContent['home']['roles']
}
