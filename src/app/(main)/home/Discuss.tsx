import DiscussCard from '@/src/components/DiscussCard'
import { getSiteContent } from '@/src/lib/cms'

export default function Discuss() {
  const { discuss } = getSiteContent()
  return (
    <div className='flex h-[75dvh] items-center p-8'>
      <DiscussCard discuss={discuss} />
    </div>
  )
}
