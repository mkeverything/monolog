# AGENTS.md - Coding Guidelines for Monolog

## Build & Development Commands

```bash
npm run dev              # Start Next.js dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

**Note:** No test runner is currently configured.

## Project Overview

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + DaisyUI
- **Animation:** Framer Motion (scroll-based animations)
- **Icons:** Lucide React
- **Package Manager:** npm

### Additional Dependencies

- `framer-motion` - Scroll animations and transitions
- `react-responsive` - Responsive breakpoints (if needed)
- `lucide-react` - Icon library

## Code Style Guidelines

### Formatting (Prettier)

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true
}
```

### Imports Order

1. React/Next.js imports
2. Third-party libraries
3. Local components (use `@/src/` alias)
4. Local utilities/hooks (use `@/src/` alias)
5. Styles

```typescript
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/src/components/ui/Button'
import { cn } from '@/src/lib/utils'
```

### Naming Conventions

- **Components:** PascalCase (e.g., `Button`, `Header`)
- **Props Types:** ComponentName + "Props" (e.g., `ButtonProps`)
- **Functions/Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Type aliases:** PascalCase
- **CSS classes:** kebab-case

### TypeScript Guidelines

- Use strict TypeScript configuration
- Define types for all component props (use `type` instead of `interface`)
- Avoid `any` - use `unknown` with type guards
- Use `React.ReactNode` for children types

```typescript
type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  onClick?: () => void
}

type ButtonVariant = 'primary' | 'secondary' | 'outline'
```

### Component Structure

```typescript
"use client"

import { useState } from "react"

type ComponentProps = {
  // props definition
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // component logic
  return (
    // JSX
  )
}
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Use DaisyUI component classes (`btn`, `card`, `badge`, `collapse`, `join`)
- Use custom `cn()` utility for conditional class merging
- **Design system:**
  - Buttons: `rounded-full` (pill shape)
  - Cards: `rounded-box` or `rounded-2xl`
  - DaisyUI theme: primary (black), secondary (gray), accent (orange)
  - Responsive sections: `min-h-dvh` (allows content to expand beyond viewport)

```typescript
className={cn("base-styles", variantStyles[variant], className)}
```

### File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page with sections
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles + theme
│   ├── projects/          # Projects page
│   ├── discuss/           # Discuss page
│   ├── lab/               # Lab page
│   └── home/              # Home page sections
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── Steps.tsx
│       ├── Gallery.tsx
│       ├── Product.tsx
│       ├── Showcases.tsx
│       ├── Conditions.tsx
│       ├── Roles.tsx
│       ├── FAQ.tsx
│       └── Discuss.tsx
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── AnimatedBadge.tsx
│   │   └── Card.tsx
│   ├── FullPageSection.tsx
│   ├── HorizontalCarousel.tsx
│   ├── InfiniteGallery.tsx # Infinite XY scroll gallery (lab page)
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── cms.ts             # Content management & types
│   └── utils.ts           # cn() utility
└── data/
    └── content.json       # Static content
```

### Key Patterns

**Client Components:**

```typescript
'use client'
import { useState } from 'react'
```

**Class Variance:**

```typescript
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-base-100',
  secondary: 'bg-secondary text-secondary-content',
}
```

**Image Component:**

```typescript
import Image from "next/image"
<Image src={src} alt={alt} fill className="object-cover" sizes="..." />
```

**Framer Motion Animations:**

```typescript
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

// Scroll-based animations
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end end'],
})

const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
```

**Drag/Scroll Interactions (Performance Pattern):**

Use refs for high-frequency state updates (drag/scroll) to avoid re-renders:

```typescript
const stateRef = useRef({
  currentX: 0,
  currentY: 0,
  targetX: 0,
  targetY: 0,
  // ... other mutable state
})

// Update DOM directly in animation loop
requestAnimationFrame(() => {
  const state = stateRef.current
  state.currentX += (state.targetX - state.currentX) * ease
  canvas.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`
})
```

**Virtual Rendering Pattern:**

Only render items visible in viewport plus buffer:

```typescript
const BUFFER = 2.5 // 2.5x viewport buffer
const viewWidth = window.innerWidth * (1 + BUFFER)

// Calculate visible range
const startCol = Math.floor((-currentX - viewWidth / 2) / itemWidth)
const endCol = Math.ceil((-currentX + viewWidth * 1.5) / itemWidth)

// Render only items in range
for (let row = startRow; row <= endRow; row++) {
  for (let col = startCol; col <= endCol; col++) {
    // Render item
  }
}
```

### Common Utilities

**cn() - Class Name Merger:**

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### ESLint Configuration

- Next.js core web vitals + TypeScript presets
- Located in `eslint.config.mjs`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Best Practices

- Use semantic HTML and aria-labels for accessibility
- Use Next.js Image component for optimization
- Use `"use client"` only when using React hooks
- Keep server components as default
- Run `npm run lint` before committing
- Follow conventional commit messages

### Resources

- Content: `src/data/content.json`
- Assets: `public/` directory
- DaisyUI docs: https://daisyui.com/components/
