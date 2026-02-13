import content from '../data/content.json'

export type NavigationItem = {
  label: string
  href: string
}

export type HeaderContent = {
  logo: {
    src: string
    alt: string
  }
  accentButton: {
    label: string
    href: string
  }
  navigation: NavigationItem[]
  projectCounter: number
}

export type SiteContent = typeof content

export function getSiteContent(): SiteContent {
  return content
}

export function getHeaderContent(): HeaderContent {
  return content.header
}

export function getNavigation(): NavigationItem[] {
  return content.header.navigation
}

export function getFooter() {
  return content.footer
}

export function getHomeContent() {
  return content.home
}

export function getContactContent() {
  return content.contact
}

export function getSiteInfo() {
  return content.site
}

export function getProjectContent(
  slug: string,
): SiteContent['projects']['items'][number] | undefined {
  return content.projects.items.find((project) => project.slug === slug)
}