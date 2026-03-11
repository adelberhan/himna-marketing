# Folder Structure

## Project Root Structure

```
himna-marketing/
├── src/                          # Source code directory
│   └── app/                      # Next.js App Router directory (v13+)
├── public/                       # Static assets (images, icons, fonts)
├── docs/                         # Project documentation
├── node_modules/                 # Dependencies (auto-generated)
├── .next/                        # Build output (auto-generated)
├── package.json                  # Project metadata and dependencies
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
├── next-env.d.ts                 # Next.js TypeScript definitions (auto-generated)
└── README.md                      # Project readme

```

## Source Code Structure (`src/app/`)

```
src/app/
├── layout.tsx                    # Root layout component with metadata
├── page.tsx                      # Home page entry point
├── globals.css                   # Global Tailwind CSS configuration and custom theme
├── favicon.ico                   # Website favicon
├── Testimonials.tsx              # Standalone testimonials section component
│
└── components/                   # Reusable React components
    │
    ├── ThemeProvider.tsx         # Theme provider wrapper (dark/light mode)
    │
    ├── layout/                   # Layout components
    │   ├── Navbar.tsx            # Navigation bar with mobile menu
    │   └── Footer.tsx            # Footer with social links and quick navigation
    │
    ├── sections/                 # Page section components
    │   ├── Hero.tsx              # Landing hero section with CTA
    │   ├── About.tsx             # Company/team information section
    │   ├── Services.tsx          # Services showcase with 4 service cards
    │   ├── ServicesList.tsx       # Alternative services list component
    │   ├── Stats.tsx             # Statistics section with animated counters
    │   ├── Portfolio.tsx         # Project gallery with filtering
    │   ├── Partners.tsx          # Partners/clients section
    │   └── ContatUs.tsx          # Contact form section (note: typo in filename)
    │
    └── ui/                       # Reusable UI components
        ├── Button.tsx            # Button component (currently empty)
        └── Card.tsx              # Card component (currently empty)

```

## Key File Purposes

### Core Application Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout - wraps entire app with theme provider and navbar |
| `src/app/page.tsx` | Home page - orchestrates all section components |
| `src/app/globals.css` | Tailwind CSS theme configuration and custom utilities |
| `next.config.ts` | Next.js build and runtime configuration |
| `tsconfig.json` | TypeScript compiler options |
| `postcss.config.mjs` | PostCSS plugins for Tailwind processing |

### Layout Components

| File | Purpose |
|------|---------|
| `src/app/components/layout/Navbar.tsx` | Fixed navigation with logo and responsive menu |
| `src/app/components/layout/Footer.tsx` | Footer with branding, quick links, and social media |
| `src/app/components/ThemeProvider.tsx` | next-themes wrapper for dark mode support |

### Section Components (Used in Home Page)

| File | Purpose |
|------|---------|
| `src/app/components/sections/Hero.tsx` | Landing section with main CTA buttons |
| `src/app/components/sections/About.tsx` | Company mission and value proposition |
| `src/app/components/sections/Services.tsx` | Showcase of 4 main services with icons |
| `src/app/components/sections/Stats.tsx` | Animated counters for company metrics |
| `src/app/components/sections/Portfolio.tsx` | Project gallery with video/photography filter |
| `src/app/components/sections/Partners.tsx` | Client/partner logos or testimonials |
| `src/app/components/sections/ContatUs.tsx` | Contact form and inquiry section |

### Standalone Components

| File | Purpose |
|------|---------|
| `src/app/Testimonials.tsx` | Client testimonials with quotes and avatars |

## Component Organization Pattern

Components are organized by **functional responsibility**:

- **`layout/`**: Navigation and page structure
- **`sections/`**: Full-width page sections that appear on home page
- **`ui/`**: Atomic reusable components (currently underdeveloped)
- **`ThemeProvider.tsx`**: Context provider for theming

## Static Assets

```
public/
├── logo.png                      # Company logo
├── grid.svg                      # SVG background pattern (used in Hero)
└── [other assets]                # Images, icons, etc.

```

## Build Output

```
.next/                            # Auto-generated Next.js build output
├── static/                       # Static assets after bundling
├── server/                       # Server-side bundles
├── types/                        # Generated TypeScript definitions
└── [build artifacts]             # Compiled code and optimizations

```

## Naming Conventions

- **Components**: PascalCase (e.g., `Navbar.tsx`, `Hero.tsx`)
- **Directories**: kebab-case (e.g., `components/`, `sections/`)
- **Files**: Match component name or use descriptive names
- **Note**: `ContatUs.tsx` appears to be a typo for "ContactUs"

## File Size Notes

- Component files are typically 50-150 lines for sections
- Heavy use of inline JSX and Tailwind classes
- CSS organized in `globals.css` with Tailwind `@theme` directive
- No separate component CSS files (utility-first approach)
