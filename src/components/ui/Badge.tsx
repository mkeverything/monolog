import { HTMLAttributes } from "react"

export function Badge({ children, className, props }: BadgeProps) {
  return (
    <div className={`badge ${className}`} {...props}>
      {children}
    </div>
  )
}

// type BadgeVariants = "accent" | "primary" | "secondary" | "neutral"
// type BadgeSizes = "xs" | "sm" | "md" | "lg"

type BadgeProps = {
  children?: React.ReactNode
  className?: string
  props?: HTMLAttributes<HTMLDivElement>
}
