import { getSiteContent, SiteContent } from '@/src/lib/cms'
import Hero from './Hero'
import Projects from './Projects'

export default function Page() {
  const { projects } = getSiteContent()
  return (
    <main className='bg-white'>
      <Hero {...projects} />
      <Projects {...projects} />
    </main>
  )
}

export type ProjectsProps = SiteContent['projects']
