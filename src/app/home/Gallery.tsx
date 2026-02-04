import { FullPageSection } from '@/src/components/FullPageSection'
import { HorizontalCarousel } from '@/src/components/HorizontalCarousel'
import { SiteContent } from '@/src/lib/cms'

export default function Gallery(home: SiteContent['home']) {
  return (
    <FullPageSection id='gallery'>
      <div className='w-full h-full flex flex-col justify-center relative items-center gap-8'>
        <h2 className='text-xl font-medium text-primary'>
          {home.workflow.title}
        </h2>
        <HorizontalCarousel data={home.workflow} />
      </div>
    </FullPageSection>
  )
}
