import DiscussCard from '@/src/components/DiscussCard'
import { getSiteContent } from '@/src/lib/cms'

export default function Discuss() {
  const { discuss } = getSiteContent()
  return (
    <div className='flex h-dvh items-center p-0 max-sm:mt-64 sm:h-[75dvh] sm:p-8'>
      <DiscussCard discuss={discuss} />
    </div>
  )
}
