import { HTMLAttributes } from "react"

export function Badge({ children, className, props }: BadgeProps) {
  return (
    <div
      className={`badge badge-secondary badge-sm rounded-sm text-primary ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

type BadgeProps = {
  children: React.ReactNode
  className?: string
  props?: HTMLAttributes<HTMLDivElement>
}
