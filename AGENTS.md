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
- **Package Manager:** npm

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
3. Local components
4. Local utilities/hooks
5. Styles

```typescript
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "../components/ui/Button"
import { cn } from "../lib/utils"
```

### Naming Conventions
- **Components:** PascalCase (e.g., `Button`, `Header`)
- **Props Interfaces:** ComponentName + "Props" (e.g., `ButtonProps`)
- **Functions/Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Type aliases:** PascalCase
- **CSS classes:** kebab-case

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all component props
- Use `type` for unions/intersections, `interface` for object shapes
- Avoid `any` - use `unknown` with type guards
- Use `React.ReactNode` for children types

```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  onClick?: () => void
}

type ButtonVariant = "primary" | "secondary" | "outline"
```

### Component Structure
```typescript
"use client"

import { useState } from "react"

interface ComponentProps {
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
- Use DaisyUI component classes (`btn`, `card`, `badge`)
- Use custom `cn()` utility for conditional class merging
- **Design system:**
  - Buttons: `rounded-full` (pill shape)
  - Cards: `rounded-box`
  - DaisyUI theme: primary (black), secondary (gray), accent (orange)

```typescript
className={cn("base-styles", variantStyles[variant], className)}
```

### File Organization
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Pages
│   ├── layout.tsx         # Layouts
│   └── globals.css        # Global styles + theme
├── components/
│   ├── ui/                # Reusable UI components
│   ├── Header.tsx         # Layout components
│   └── Footer.tsx
├── lib/
│   ├── cms.ts             # Content management
│   └── utils.ts           # cn() utility
└── data/
    └── content.json       # Static content
```

### Key Patterns

**Client Components:**
```typescript
"use client"
import { useState } from "react"
```

**Class Variance:**
```typescript
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-base-100",
  secondary: "bg-secondary text-secondary-content",
}
```

**Image Component:**
```typescript
import Image from "next/image"
<Image src={src} alt={alt} fill className="object-cover" sizes="..." />
```

### Common Utilities

**cn() - Class Name Merger:**
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
