import { getSiteContent, SiteContent } from '@/src/lib/cms'
import Hero from './Hero'
import Projects from './Projects'
import DiscussCard from '@/src/components/DiscussCard'

export default function Page() {
  const { discuss, projects } = getSiteContent()
  return (
    <main className='p-4'>
      <Hero {...projects} />
      <Projects {...projects} />
      <div className='my-32'>
        <DiscussCard discuss={discuss} />
      </div>
    </main>
  )
}

export type ProjectsProps = SiteContent['projects']
