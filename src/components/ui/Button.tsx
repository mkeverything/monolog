import Link from 'next/link'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-base-100 hover:bg-primary/90 focus:ring-primary',
  secondary:
    'bg-secondary text-secondary-content hover:bg-secondary/90 focus:ring-secondary',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-primary focus:ring-primary',
  ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
  accent: 'bg-accent text-base-100 hover:bg-accent/90 focus:ring-primary',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-light transition-all duration-200 focus:outline-none focus:ring-2 font-medium focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const combinedStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
    </button>
  )
}
