import { getSiteContent, SiteContent } from '@/src/lib/cms'
import Hero from './Hero'
import Projects from './Projects'

export default function Page() {
  const { projects } = getSiteContent()
  return (
    <main className='p-4'>
      <Hero {...projects} />
      <Projects {...projects} />
    </main>
  )
}

export type ProjectsProps = SiteContent['projects']
