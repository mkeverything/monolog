"use client"

import { motion } from "framer-motion"

export function AnimatedBadge({ children, className }: AnimatedBadgeProps) {
  return (
    <motion.div
      className={`badge ${className}`}
      initial={false}
      whileHover={{
        backgroundColor: "var(--color-accent)",
        color: "var(--color-base-100)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}

type AnimatedBadgeProps = {
  children: React.ReactNode
  className?: string
}
