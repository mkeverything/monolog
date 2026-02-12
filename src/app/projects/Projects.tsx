import { ProjectCard } from '@/src/components/ui/ProjectCard'
import { ProjectsProps } from './page'

export default function Projects(projects: ProjectsProps) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {projects.items.map((props, i) => (
        <ProjectCard {...props} key={i} />
      ))}
    </div>
  )
}
