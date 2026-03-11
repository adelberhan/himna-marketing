# Coding Rules & Best Practices

## Code Style & Standards

### TypeScript Configuration

- **Target Version**: ES2017
- **Strict Mode**: Enabled (`strict: true`)
- **JSX**: react-jsx (React 17+ new transform)
- **Module Resolution**: Bundler (for monorepo optimization)

### Naming Conventions

#### Components

- **PascalCase** for component files: `Hero.tsx`, `Navbar.tsx`, `Services.tsx`
- Component names must match file names
- One component per file (with rare exceptions for very small shared sub-components)

#### Variables & Functions

- **camelCase** for variables and functions
  ```tsx
  const isScrolled = false;
  const handleClick = () => {};
  const userProfile = {};
  ```

#### Constants

- **UPPER_SNAKE_CASE** for configuration constants
  ```tsx
  const API_ENDPOINT = 'https://api.example.com';
  const MAX_RETRIES = 3;
  ```

#### CSS Classes

- **kebab-case** for Tailwind classes (built-in)
- Custom utilities use kebab-case: `.shadow-soft`

#### Directories

- **kebab-case** for folder names: `components/`, `sections/`, `layout/`

### File Organization

#### Component Structure

Standard component structure pattern:

```tsx
"use client"; // If interactive

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconName } from "lucide-react";

// Data/constants
const ITEMS = [
  { id: 1, title: "Item 1" },
  // ...
];

// Main component
export default function ComponentName() {
  const [state, setState] = useState("");
  
  useEffect(() => {
    // Side effects
  }, []);
  
  return (
    // JSX
  );
}
```

#### Import Order

1. React/Next.js imports
2. Third-party library imports
3. Lucide icons
4. Internal components
5. Styles/utilities

```tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Layout from "@/components/Layout";
import "./styles.css";
```

## React & TypeScript Patterns

### Component Declaration

- Use **functional components** exclusively
- Use **default exports** for pages and primary components
- Use **named exports** for utilities and helpers

```tsx
// Good: Page component
export default function HomePage() {}

// Good: Utility function
export function calculatePrice() {}

// Avoid: Default export of utility
export default function utility() {}
```

### Props Typing

- Always type component props with interfaces or types
- Use `React.ReactNode` for children

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return <button>{children}</button>;
}
```

### State Management

- Use **React hooks**: `useState`, `useReducer`, `useContext`
- Hoist common state to parent components
- Use `useRef` for DOM access with Framer Motion
- Use `next-themes` for theme state (don't reinvent)

```tsx
// Good
const [isOpen, setIsOpen] = useState(false);
const ref = useRef<HTMLDivElement>(null);

// Avoid
const isOpen = true; // Not reactive
```

### Client vs Server Components

- Default to **server components** (no "use client" directive)
- Add **"use client"** only when needed:
  - Using React hooks (useState, useEffect, etc.)
  - Using Framer Motion animations
  - Using browser APIs (window, localStorage)
  - Handling user interactions

```tsx
// Server component - OK
export default function StaticSection() {
  return <section>Static content</section>;
}

// Client component - Use for interactivity
"use client";
import { useState } from "react";
export default function InteractiveSection() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## Styling Patterns

### Tailwind CSS Usage

- Use **utility classes** for styling (no custom CSS unless necessary)
- Leverage Tailwind's responsive prefixes: `hidden md:flex lg:grid`
- Use custom theme colors from `globals.css`

```tsx
// Good: Utility-first
<div className="flex items-center justify-between gap-4 p-6 rounded-lg bg-bg-100">
  
// Avoid: Inline styles or separate CSS
<div style={{ display: 'flex', gap: '1rem' }}>
```

### Custom Theme Colors

Always use defined theme colors from `globals.css`:

```
text-text-100 (main text)
text-text-200 (secondary text)
bg-bg-100 (white background)
bg-bg-200 (light gray)
bg-primary-100 (brand blue)
bg-primary-200 (lighter blue)
bg-accent-100 (light cyan)
```

### Responsive Design

Follow mobile-first approach with Tailwind breakpoints:

```tsx
<div className="flex flex-col md:flex-row lg:grid lg:grid-cols-3 gap-4">
  {/* Mobile: vertical flex, Tablet (md): horizontal flex, Desktop (lg): 3-column grid */}
</div>
```

### Shadow & Depth

Use defined shadow utilities:

```tsx
// Global shadow utility
<div className="shadow-soft"> {/* 0 4px 20px rgba(0, 119, 194, 0.1) */}
  
// Tailwind shadows
<div className="shadow-md hover:shadow-xl transition-shadow">
```

## Animation Patterns

### Framer Motion Standards

#### Initial Mount Animations

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.2 }}
>
  Content
</motion.div>
```

#### Scroll-Triggered Animations

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }} // Only animate once
  transition={{ delay: index * 0.1 }} // Stagger multiple items
>
  Content
</motion.div>
```

#### Layout & Filter Animations

```tsx
<motion.div layout>
  {items.map(item => (
    <motion.div key={item.id} layout initial={...} animate={...}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Data & Logic Patterns

### Component Data Organization

Store section data as constants inside components:

```tsx
const services = [
  {
    title: "Service 1",
    description: "Description",
    icon: <IconComponent />
  },
  // ...
];

export default function Services() {
  return (
    <div>
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
}
```

### Dynamic Values

Use inline calculations sparingly:

```tsx
// Good
const currentYear = new Date().getFullYear();
return <p>© {currentYear} Company</p>;

// Avoid
return <p>© {new Date().getFullYear()} Company</p>; // Recalculates on render
```

## Performance Patterns

### Image Optimization

Recommended (though not yet implemented):

```tsx
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={100} 
  height={100}
/>
```

Current pattern to avoid:

```tsx
<img src="/logo.png" alt="Logo" /> // Works but no optimization
```

### Component Composition

Keep components focused and composable:

```tsx
// Good: Small, focused components
function ServiceCard({ title, description, icon }) {
  return <div>{icon}{title}{description}</div>;
}

function Services() {
  return services.map(s => <ServiceCard key={s.id} {...s} />);
}

// Avoid: Large monolithic components
function AllServices() {
  // 300+ lines with everything mixed together
}
```

## Accessibility Standards

### Semantic HTML

- Use semantic elements: `<section>`, `<nav>`, `<footer>`, `<main>`
- Use proper heading hierarchy: `<h1>`, `<h2>`, etc.
- Use `<button>` for clickable elements, not `<div>`

```tsx
// Good
<nav>
  <button onClick={toggle}>Menu</button>
</nav>

// Avoid
<div onClick={toggle} className="cursor-pointer">Menu</div>
```

### ARIA & Labels

- Use `alt` text for images
- Use `aria-label` for icon-only buttons
- Use `role` attributes when semantic HTML is insufficient

```tsx
<button aria-label="Open mobile menu" onClick={toggle}>
  <Menu size={28} />
</button>
```

### Language Support

- All text content supports Arabic (RTL)
- Test responsive layout in RTL mode
- Use `dir="rtl"` in HTML element (already in place)

## Testing Considerations

### Code Quality

- ESLint configured with Next.js standards
- TypeScript strict mode catches type errors
- No console logs in production code

### Browser Testing

- Test on Chrome, Firefox, Safari, Edge
- Test on mobile devices (iOS Safari, Android Chrome)
- Test RTL layout in browser DevTools

## Version Control & Commits

### Commit Messages

Follow conventional commits format:

```
feat: Add new portfolio section
fix: Resolve navbar scroll detection issue
docs: Update coding standards
refactor: Improve component composition
style: Fix Tailwind class formatting
```

## Code Review Checklist

Before pushing code, ensure:

- [ ] TypeScript compiles without errors
- [ ] ESLint passes without warnings
- [ ] Components follow naming conventions
- [ ] Props are properly typed
- [ ] Framer Motion animations are smooth
- [ ] Responsive design tested (mobile/tablet/desktop)
- [ ] Accessibility standards met
- [ ] No console errors or warnings
- [ ] Performance is acceptable (React profiler)

## Common Mistakes to Avoid

1. **Not typing props**: All component props must be typed
2. **Using `any` type**: Use `unknown` or specific types instead
3. **Missing "use client"**: Mark components with hooks as client
4. **Hardcoding colors**: Use theme colors from `globals.css`
5. **Skipping alt text**: All images need descriptive alt text
6. **Missing keys in loops**: Always use unique, stable keys
7. **Direct DOM manipulation**: Use React refs only when necessary
8. **Uncontrolled components**: Form inputs should be controlled
