# Architecture

## Architectural Overview

Himna Marketing follows a **component-based, section-driven architecture** typical of modern Next.js applications. The architecture is designed for maximum reusability, maintainability, and performance.

## Architectural Layers

```
┌─────────────────────────────────────────────────────┐
│         Browser / Client                            │
├─────────────────────────────────────────────────────┤
│  Layout Layer (Navbar, Footer - Fixed on page)      │
├─────────────────────────────────────────────────────┤
│  Theme Provider (Dark/Light Mode Context)           │
├─────────────────────────────────────────────────────┤
│  Page Content Layer (Dynamic Sections)              │
│  ├─ Hero Section (Landing)                          │
│  ├─ About Section                                   │
│  ├─ Services Section                                │
│  ├─ Stats Section                                   │
│  ├─ Portfolio Section                               │
│  ├─ Testimonials Section                            │
│  ├─ Partners Section                                │
│  └─ Contact Section                                 │
├─────────────────────────────────────────────────────┤
│  UI Components Layer (Reusable: Button, Card, etc)  │
├─────────────────────────────────────────────────────┤
│  Animation Layer (Framer Motion)                    │
├─────────────────────────────────────────────────────┤
│  Styling Layer (Tailwind CSS with custom theme)     │
├─────────────────────────────────────────────────────┤
│  Next.js Runtime (SSR, optimizations, routing)      │
└─────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout (layout.tsx)
├── ThemeProvider (next-themes)
│   ├── Navbar (fixed navigation)
│   │   ├── Logo
│   │   ├── Desktop Menu
│   │   └── Mobile Menu (hamburger)
│   │
│   └── main (content wrapper)
│       └── Home Page (page.tsx)
│           ├── Hero
│           │   ├── Badge
│           │   ├── Main Heading
│           │   ├── Sub-heading
│           │   └── CTA Buttons
│           │
│           ├── About
│           │   ├── Image/Visual
│           │   ├── Heading
│           │   ├── Description
│           │   └── Highlights List
│           │
│           ├── Services
│           │   └── Service Cards (4x)
│           │       ├── Icon
│           │       ├── Title
│           │       └── Description
│           │
│           ├── Stats
│           │   └── Stat Cards (3x)
│           │       ├── Counter (animated)
│           │       └── Label
│           │
│           ├── Portfolio
│           │   ├── Filter Buttons (All/Video/Photo)
│           │   └── Project Grid
│           │       ├── Thumbnail/Video Player
│           │       ├── Title
│           │       └── Category
│           │
│           ├── Testimonials
│           │   └── Testimonial Cards (3x)
│           │       ├── Quote Icon
│           │       ├── Text
│           │       ├── Avatar Initial
│           │       ├── Name
│           │       └── Role
│           │
│           ├── Partners
│           │   └── [Partner content]
│           │
│           ├── Contact
│           │   └── [Contact/CTA content]
│           │
│           └── Footer
│               ├── Branding
│               ├── Quick Links
│               ├── Social Links
│               └── Copyright
```

## Data Flow & State Management

### Global State

```
ThemeProvider (next-themes)
├── theme: 'light' | 'dark'
└── Provides context to all components
```

### Component-Level State

Each interactive component manages its own state:

- **Navbar**: `isScrolled`, `isMobileMenuOpen`
- **Portfolio**: `filter`, `activeVideo`
- **Stats Counter**: `count`, `isInView`

### Page Flow

```
1. Browser requests /
   ↓
2. Next.js loads RootLayout
   ├── Initialize theme from next-themes
   ├── Render navbar with scroll detection
   ├── Mount home page
   │   └── Render all sections in order
   │       ├── Content rendered server-side initially
   │       └── Client-side hydration adds state & interactivity
   └── Render Footer
   ↓
3. Browser renders page with Framer Motion animations
   ├── Each section animates on scroll
   ├── Counters animate when viewed
   └── Portfolio filters update on click
   ↓
4. User interactions trigger client-side state updates
   ├── Navigation clicks scroll to sections
   ├── Portfolio filter changes layout
   ├── Mobile menu toggle
   └── Navbar appearance changes on scroll
```

## Client vs Server Components

| Component | Type | Reason |
|-----------|------|--------|
| `RootLayout` | Server | Initial render, metadata setup |
| `Navbar` | Client | Scroll detection, mobile menu state |
| `ThemeProvider` | Client | React context provider |
| `Hero` | Client | Framer Motion animations |
| `Services` | Client | Scroll-triggered animations |
| `Portfolio` | Client | Filter state, video player control |
| `Stats` | Client | Counter animation with useInView |
| `Testimonials` | Client | Scroll animations |
| `About` | Client | Scroll animations |
| `Partners` | Client | Scroll animations |
| `Contact` | Client | Scroll animations |
| `Footer` | Client | Social links, dynamic year |

## Styling Architecture

### Theme System

```
globals.css (@theme directive)
├── Color Palette
│   ├── primary-100: #0077c2 (main brand blue)
│   ├── primary-200: #59a5f5 (lighter blue)
│   ├── primary-300: #c8ffff (light accent)
│   ├── accent-100: #00bfff
│   ├── accent-200: #00619a
│   ├── text-100: #333333 (dark text)
│   ├── text-200: #5c5c5c (gray text)
│   ├── bg-100: #ffffff (white background)
│   ├── bg-200: #f5f5f5 (light gray)
│   └── bg-300: #cccccc (medium gray)
│
├── Font Configuration
│   └── --font-cairo: Cairo Google Font (Arabic + Latin)
│
└── Utilities
    └── shadow-soft: 0 4px 20px rgba(0, 119, 194, 0.1)
```

### CSS Approach

- **Tailwind CSS 4** with utility-first methodology
- **Custom theme** defined in `@theme` block
- **PostCSS** processing through `@tailwindcss/postcss`
- **No separate component CSS** (all inline with classes)
- **Custom utilities** for shadows and effects

### RTL (Right-to-Left) Support

```
html lang="ar" dir="rtl"
└── Flexbox and grid naturally adapt to RTL
    (due to Tailwind's automatic RTL support)
```

## Routing Architecture

### Next.js App Router Structure

```
src/app/
├── layout.tsx         → Route: / (with metadata)
└── page.tsx          → Route: /

All routes currently render the same home page
Future routes would be:
├── app/about/page.tsx      → Route: /about
├── app/services/page.tsx   → Route: /services
├── app/portfolio/page.tsx  → Route: /portfolio
└── app/contact/page.tsx    → Route: /contact
```

Note: Current implementation uses anchor links (`#about`, `#services`) instead of separate routes.

## Animation Architecture

### Framer Motion Usage

Each major section uses Framer Motion for:

```
1. Initial Mount Animations
   initial={{opacity: 0, y: 30}}
   animate={{opacity: 1, y: 0}}
   transition={{duration: 0.7}}

2. Scroll-Triggered Animations
   whileInView={{opacity: 1, y: 0}}
   viewport={{once: true}}
   (Animates when element enters viewport)

3. Layout Animations
   layout (in Portfolio)
   AnimatePresence (for mount/unmount)
   (Smooth transitions during filter changes)
```

## Performance Considerations

1. **React Compiler**: Enabled in `next.config.ts` for auto-optimization
2. **Font Optimization**: Cairo font loaded with Next.js optimization
3. **Code Splitting**: Each page section as separate component
4. **Lazy Loading**: Framer Motion's `whileInView` enables infinite scroll
5. **Hydration**: Server renders initial HTML, client hydrates for interactivity

## Security Considerations

1. **Type Safety**: Full TypeScript in strict mode
2. **Input Validation**: Form inputs would need validation (Contact form)
3. **CSRF Protection**: Needed for contact form submission
4. **XSS Prevention**: React's built-in HTML escaping
5. **Responsive Images**: Using Next.js Image component recommended

## Extensibility Points

1. **New Sections**: Add to `components/sections/`, import in `page.tsx`
2. **New Routes**: Create new folders in `app/`
3. **Custom Components**: Add to `components/ui/`
4. **Theme Colors**: Modify `@theme` in `globals.css`
5. **Theme Provider**: Extend `ThemeProvider.tsx` with more themes
