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

export type FooterLink = {
  label: string
  href: string
}

export type HeroSection = {
  title: string
  subtitle: string
  ctaPrimary?: {
    label: string
    href: string
  }
  tags: string[]
}

export type FeatureItem = {
  title: string
  description: string
  icon: string
}

export type TestimonialItem = {
  quote: string
  author: string
  role: string
}

export type TeamMember = {
  name: string
  role: string
  bio: string
}

export type ValueItem = {
  title: string
  description: string
}

export type ContactInfoItem = {
  type: string
  label: string
  value: string
}

export type FormField = {
  name: string
  label: string
  type: string
  required: boolean
}

export type FaqItem = {
  question: string
  answer: string
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

export function getAboutContent() {
  return content.about
}

export function getContactContent() {
  return content.contact
}

export function getSiteInfo() {
  return content.site
}
