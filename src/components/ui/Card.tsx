import { cn } from '../../lib/utils'

export type CardProps = {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantStyles = {
  default: 'bg-neutral',
  outline: 'bg-transparent border-2 border-base-300',
  elevated: 'bg-neutral shadow-lg border border-base-300',
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  className,
  variant = 'default',
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </div>
  )
}

type CardHeaderProps = {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

type CardTitleProps = {
  children: React.ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-base-content text-lg', className)}>{children}</h3>
  )
}

type CardDescriptionProps = {
  children: React.ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={cn('text-xs', className)}>{children}</p>
}

type CardContentProps = {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('', className)}>{children}</div>
}

type CardFooterProps = {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('border-base-300 mt-4 border-t pt-4', className)}>
      {children}
    </div>
  )
}
