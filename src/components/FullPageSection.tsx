import { cn } from '../lib/utils'

type FullPageSectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral'
  centered?: boolean
}

const backgroundStyles = {
  default: 'bg-white',
  primary: 'bg-primary text-primary',
  secondary: 'bg-secondary text-secondary-content',
  accent: 'bg-accent text-accent-content',
  neutral: 'bg-neutral text-neutral-content',
}

export function FullPageSection({
  children,
  className,
  id,
  background = 'default',
  centered = true,
}: FullPageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'min-h-dvh w-full p-4 sm:p-6',
        backgroundStyles[background],
        className,
        centered && 'flex flex-col items-center justify-center',
      )}
    >
      {children}
    </section>
  )
}

type SectionTitleProps = {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function SectionTitle({
  children,
  className,
  as: Component = 'h2',
}: SectionTitleProps) {
  return (
    <Component
      className={cn(
        'text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl',
        className,
      )}
    >
      {children}
    </Component>
  )
}

type SectionSubtitleProps = {
  children: React.ReactNode
  className?: string
}

export function SectionSubtitle({ children, className }: SectionSubtitleProps) {
  return (
    <p className={cn('mt-4 max-w-2xl text-lg sm:text-xl', className)}>
      {children}
    </p>
  )
}
