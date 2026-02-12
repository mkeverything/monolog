import { ProjectCard } from '@/src/components/ui/ProjectCard'
import { ProjectsProps } from './page'

export default function Projects(projects: ProjectsProps) {
  return projects.items.map((props, i) => <ProjectCard {...props} key={i} />)
}
