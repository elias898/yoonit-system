# Figma Make Development Skill

## Overview

This skill defines the architecture and conventions for building Figma Make prototypes. Follow these patterns to ensure components work correctly when synced between GitHub and Figma Make.

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Root component
│   ├── routes.ts                  # React Router configuration
│   ├── components/
│   │   ├── *.tsx                  # Page and feature components
│   │   ├── ui/                    # shadcn/ui-style primitive components
│   │   ├── settings-form/         # Settings-specific form components
│   │   └── figma/                 # Figma-specific utilities
│   └── layouts/                   # Layout components
├── imports/                       # Generated Figma imports (SVGs, components)
├── styles/
│   ├── index.css                 # Global styles
│   ├── tailwind.css               # Tailwind configuration
│   ├── theme.css                  # CSS custom properties
│   └── fonts.css                  # Font definitions
└── main.tsx                       # Entry point
```

---

## Component Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Pages | PascalCase + "Page" | `ClientsPage`, `SettingsPage` |
| Layouts | PascalCase + "Layout" | `RootLayout`, `DashboardLayout` |
| UI Primitives | PascalCase (shadcn style) | `Button`, `Dialog`, `Card` |
| Settings Components | PascalCase | `ExpandableSettingRow`, `SettingsInput` |
| Figma Imports | PascalCase | `Button`, `InputField` |

---

## Component Patterns

### Props Interface Pattern

```tsx
interface ComponentNameProps {
  // Required props
  onAction: () => void;
  title: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ComponentName({ 
  onAction, 
  title, 
  variant = 'primary',
  disabled = false,
  className = "",
  children 
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)} data-component="component-name">
      {children}
    </div>
  );
}
```

### State Management

```tsx
// Local state
const [isOpen, setIsOpen] = useState(false);

// URL state
const [searchParams] = useSearchParams();

// Derived state
const filteredItems = items.filter(item => item.active);
```

### Export Pattern

```tsx
// Named exports for reusable components
export { Button, buttonVariants };
export { Dialog, DialogContent, DialogTitle };

// Named exports for feature components
export function ClientsPage({ ... }) { ... }
export function ClientsTable({ ... }) { ... }

// Default exports for Figma imports
export default function Button() { ... }
```

---

## TypeScript Patterns

### Props Interface

```tsx
interface SettingsFormFieldProps {
  label: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}
```

### Extended Props with HTML Attributes

```tsx
interface SettingsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
```

### Union Types

```tsx
type ColumnKey = (typeof ALL_COLUMNS)[number]["key"];

const moduleTabs = ["CRM", "CopyTrade", "Partners"] as const;
```

---

## Styling Approach

### Tailwind CSS v4 + CSS Custom Properties

**theme.css** - CSS Custom Properties:
```css
:root {
  --font-heading: 'Public Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  --bg-surface: #ffffff;
  --text-primary: var(--slate-12);
  --accent-solid: var(--indigo-9);
  --border-default: var(--slate-6);
  
  --radius: 0.625rem;
}

.dark {
  --bg-surface: var(--slate-2);
}
```

**tailwind.css**:
```css
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';
@import 'tw-animate-css';

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --radius-sm: calc(var(--radius) - 4px);
}
```

### Class Variance Authority (CVA) for Variants

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white...",
        outline: "border bg-background...",
        secondary: "bg-secondary text-secondary-foreground...",
        ghost: "hover:bg-accent...",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
```

### Utility Function (cn/clsx)

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Figma Make Specific Conventions

### SVG Imports from Figma

```tsx
// Import generated SVG paths
import svgPaths from "../../imports/svg-9ezgt5521u";

// Usage with data-name attribute
<path d={svgPaths.p374d48f1} fill="#1EBBBF" />
```

### Data Attributes

```tsx
// Track Figma layer names
<div data-name="Button">
  <LabelSpacing />
</div>

// Track slots
<div data-slot="button" data-name="Button">...</div>
<div data-slot="sidebar-menu-item">...</div>
```

### Figma Import Component Structure

```tsx
// Auto-generated from Figma
export default function Button() {
  return (
    <div 
      className="content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] size-full" 
      data-name="Button"
    >
      <LabelSpacing />
    </div>
  );
}
```

---

## Required Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-switch": "^1.1.3",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.2.0",
    "lucide-react": "^0.487.0",
    "motion": "^12.23.24",
    "react-router": "^7.13.0",
    "react-hook-form": "^7.55.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.12",
    "@tailwindcss/vite": "^4.1.12",
    "vite": "^6.3.5",
    "@vitejs/plugin-react": "^4.7.0",
    "class-variance-authority": "^0.7.1"
  }
}
```

---

## Vite Configuration

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
```

---

## Component Checklist

Before creating a new component, ensure:

- [ ] Named export (for reusable) or default export (for Figma imports)
- [ ] Props interface defined with TypeScript
- [ ] Optional props have defaults
- [ ] Uses `cn()` utility for class composition
- [ ] `className` prop passed through for extensibility
- [ ] `data-name` attribute matches Figma layer name (if applicable)
- [ ] No hardcoded colors - use CSS custom properties
- [ ] Responsive design with Tailwind breakpoints
- [ ] Proper TypeScript types (no `any`)

---

## File Creation Template

```tsx
import { cn } from "@/app/components/ui/utils";

interface ComponentNameProps {
  className?: string;
}

export function ComponentName({ className = "" }: ComponentNameProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {/* content */}
    </div>
  );
}
```

---

## Common Patterns

### Settings Form Field

```tsx
interface SettingsFormFieldProps {
  label: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsFormField({ label, optional, hint, children, className = "" }: SettingsFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium">
        {label}
        {optional && <span className="text-muted-foreground ml-1">(optional)</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
```

### Dialog Pattern

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";

export function ComponentDialog({ open, onOpenChange, title, description, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
```
