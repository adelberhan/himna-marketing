# Tech Stack

## Frontend Framework & Runtime

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.6 | Full-stack React framework with App Router, SSR, and optimizations |
| **React** | 19.2.3 | UI component library and rendering engine |
| **React DOM** | 19.2.3 | DOM rendering layer for React components |
| **TypeScript** | 5.x | Static type checking and JavaScript enhancement |

## Styling & Design

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS framework for rapid UI development |
| **PostCSS** | (via @tailwindcss/postcss) | CSS transformation tool for Tailwind |
| **@tailwindcss/postcss** | 4.x | PostCSS plugin for Tailwind CSS 4 integration |

## Animation & Interactivity

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Framer Motion** | 12.34.3 | Animation library for React with scroll triggers and gesture support |

## UI Components & Icons

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Lucide React** | 0.575.0 | Modern icon library with 450+ SVG icons |

## Theme Management

| Technology | Version | Purpose |
|-----------|---------|---------|
| **next-themes** | 0.4.6 | Theme provider for dark/light mode toggle support |

## Development Tools

| Technology | Version | Purpose |
|-----------|---------|---------|
| **ESLint** | 9.x | JavaScript linter for code quality |
| **eslint-config-next** | 16.1.6 | Next.js ESLint configuration |
| **babel-plugin-react-compiler** | 1.0.0 | React compiler for automatic rendering optimizations |
| **@types/node** | 20.x | TypeScript types for Node.js runtime |
| **@types/react** | 19.x | TypeScript types for React |
| **@types/react-dom** | 19.x | TypeScript types for React DOM |

## Development Environment

- **Language**: TypeScript (strict mode enabled)
- **Package Manager**: npm (based on package.json)
- **Runtime**: Node.js runtime for development and deployment

## Build Configuration

### Next.js Configuration (`next.config.ts`)
- React Compiler enabled (`reactCompiler: true`)
- Optimized builds with default Next.js settings

### TypeScript Configuration (`tsconfig.json`)
- **Target**: ES2017
- **Module**: ESNext
- **Mode**: Strict type checking
- **Path Aliases**: `@/*` → `./src/*`
- **JSX**: react-jsx
- **Module Resolution**: bundler (for better monorepo support)

### PostCSS Configuration (`postcss.config.mjs`)
- Tailwind CSS PostCSS plugin integrated

## Fonts

- **Cairo** (Google Fonts): Arabic and Latin support
  - Subsets: `['arabic', 'latin']`
  - CSS Variable: `--font-cairo`
  - Used as primary font throughout the application

## Browser Support

- Modern browsers with ES2017 support
- React 19 compatibility
- Next.js 16 optimization features

## Performance Features

1. **React Compiler**: Automatic optimization of component rendering
2. **Image Optimization**: Next.js Image component support
3. **Font Optimization**: Google Fonts integrated with Next.js optimization
4. **Code Splitting**: Automatic route-based code splitting
5. **Static Generation**: Opportunities for SSG where applicable
