import DiscussCard from '@/src/components/DiscussCard'
import { FullPageSection } from '@/src/components/FullPageSection'
import { getSiteContent } from '@/src/lib/cms'

export default function Discuss() {
  const { discuss } = getSiteContent()
  return (
    <FullPageSection>
      <DiscussCard discuss={discuss} />
    </FullPageSection>
  )
}
