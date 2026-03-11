# Important Files & Entry Points

## Application Entry Points

### 1. **Root Layout** - [src/app/layout.tsx](../src/app/layout.tsx)

**Purpose**: Application entry point and global layout

**Key Responsibilities**:
- Initializes metadata (title, description)
- Loads Cairo font from Google Fonts
- Wraps app with ThemeProvider for dark/light mode
- Establishes global styles and font variables
- Renders fixed Navbar component
- Provides main content wrapper

**Critical Code**:
```tsx
export const metadata: Metadata = {
  title: "هيمنة للخدمات التسويقية | Himna Marketing",
  description: "نخفف عليك ضغوط أعمالك ونتولى مهامك التسويقية بكل احترافية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-cairo antialiased bg-bg-100 text-text-100`}>
        <ThemeProvider>
          <Navbar /> {/* Fixed navigation */}
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Dependencies**: ThemeProvider, Navbar, Google Fonts (Cairo)

---

### 2. **Home Page** - [src/app/page.tsx](../src/app/page.tsx)

**Purpose**: Main landing page - orchestrates all page sections

**Key Responsibilities**:
- Imports and renders all page sections in sequence
- Serves as the orchestrator component
- Returns rendered HTML for the home route

**Critical Code**:
```tsx
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <Partners />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
```

**Important Note**: This uses fragment wrapping for clean DOM structure

**Exports**: Hero, Services, Stats, Portfolio, Testimonials, Contact, Footer, Partners sections

---

## Core Configuration Files

### 3. **Package Configuration** - [package.json](../package.json)

**Purpose**: Project dependencies and scripts

**Key Dependencies**:
- Next.js 16.1.6 - Framework
- React 19.2.3 - UI library
- Tailwind CSS 4 - Styling
- Framer Motion 12.34.3 - Animations
- next-themes 0.4.6 - Theme management
- Lucide React 0.575.0 - Icons

**Scripts**:
```json
{
  "dev": "next dev",      // Development server
  "build": "next build",  // Production build
  "start": "next start",  // Start production server
  "lint": "eslint"        // Linting
}
```

**Critical**: Defines all external dependencies and versions

---

### 4. **Next.js Configuration** - [next.config.ts](../next.config.ts)

**Purpose**: Next.js framework configuration

**Key Settings**:
```typescript
const nextConfig: NextConfig = {
  reactCompiler: true,  // Enable React compiler for optimizations
};
```

**Impact**: 
- Enables automatic component rendering optimizations
- Should NOT be modified without understanding implications

---

### 5. **TypeScript Configuration** - [tsconfig.json](../tsconfig.json)

**Purpose**: TypeScript compiler and development settings

**Critical Settings**:
- `strict: true` - Strict type checking
- `target: ES2017` - Output JavaScript version
- `moduleResolution: "bundler"` - Module resolution strategy
- `jsx: "react-jsx"` - JSX transformation
- `paths: { "@/*": ["./src/*"] }` - Path alias for imports

**Impact**: Any changes here affect type checking across entire codebase

---

### 6. **PostCSS Configuration** - [postcss.config.mjs](../postcss.config.mjs)

**Purpose**: CSS processing pipeline

**Configuration**:
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**Impact**: Enables Tailwind CSS 4 processing

---

### 7. **ESLint Configuration** - [eslint.config.mjs](../eslint.config.mjs)

**Purpose**: Code quality and style enforcement

**Configuration**:
- Uses Next.js core-web-vitals rules
- Uses Next.js TypeScript rules
- Ignores `.next`, `out`, `build` directories

**Command**: `npm run lint` to check code quality

---

## Styling & Theme

### 8. **Global Styles & Theme** - [src/app/globals.css](../src/app/globals.css)

**Purpose**: Define application-wide styles and color theme

**Critical Content**:
- **Color Theme** (via `@theme` directive):
  - Primary: `#0077c2`, `#59a5f5`, `#c8ffff`
  - Text: `#333333`, `#5c5c5c`
  - Background: `#ffffff`, `#f5f5f5`
  - Accent: `#00bfff`, `#00619a`
  
- **Font**: Cairo (Google Font) with Arabic and Latin support

- **Custom Utilities**:
  - `.shadow-soft`: Soft blue shadow for cards

**Usage**: All other components use classes defined here

**Critical**: Modification of theme colors here affects entire site appearance

---

## Component Reference

### Layout Components

#### 9. **Navigation Bar** - [src/app/components/layout/Navbar.tsx](../src/app/components/layout/Navbar.tsx)

**Purpose**: Fixed top navigation with responsive menu

**Key Features**:
- Logo/branding
- Desktop navigation menu (hidden on mobile)
- Mobile hamburger menu (visible on mobile)
- Scroll detection for backdrop-blur effect
- CTA button "Start Your Project"

**State Management**:
- `isScrolled`: Tracks scroll position
- `isMobileMenuOpen`: Toggles mobile menu visibility

**Important**: Uses fixed positioning, mounted in RootLayout

---

#### 10. **Footer** - [src/app/components/layout/Footer.tsx](../src/app/components/layout/Footer.tsx)

**Purpose**: Site footer with branding, links, and social media

**Key Features**:
- Company branding and description
- Quick navigation links
- Social media links (Instagram, Twitter, LinkedIn, Facebook)
- Dynamic copyright year
- Footer layout with 3 columns

**Important**: Uses client component for dynamic year

---

### Section Components

#### 11. **Hero Section** - [src/app/components/sections/Hero.tsx](../src/app/components/sections/Hero.tsx)

**Purpose**: Landing hero with main CTA

**Key Features**:
- Animated badge with "Creative Partner" message
- Large headline with gradient text
- Sub-headline with company value proposition
- Two CTA buttons (Primary: "Start Success Journey", Secondary: "View Portfolio")
- Background gradient and grid pattern
- Framer Motion animations on mount

**Entry Point**: First section users see
**Critical**: Contains main conversion buttons

---

#### 12. **About Section** - [src/app/components/sections/About.tsx](../src/app/components/sections/About.tsx)

**Purpose**: Company mission and value proposition

**Key Features**:
- Heading and description
- Two-column layout (image on one side, text on other)
- Highlights list with checkmarks
- Animated on scroll entry
- Button for "Learn Our Story"

**Important**: Responsive layout changes at `lg` breakpoint

---

#### 13. **Services Section** - [src/app/components/sections/Services.tsx](../src/app/components/sections/Services.tsx)

**Purpose**: Showcase 4 main services

**Services Displayed**:
1. Social Media Management
2. Content Creation
3. Advertising Campaigns
4. Marketing Consulting

**Key Features**:
- Service cards with icons (from Lucide React)
- Animations on scroll entry with staggered delay
- Hover effects (elevation, color change)
- 4-column grid on desktop, 1 column on mobile

**Important**: Filter component creates card layout

---

#### 14. **Stats Section** - [src/app/components/sections/Stats.tsx](../src/app/components/sections/Stats.tsx)

**Purpose**: Display company metrics with animated counters

**Metrics Shown**:
- 50+ clients
- 120+ completed projects
- 300+ successful campaigns

**Key Features**:
- `Counter` sub-component with animated counting
- `useInView` hook for trigger animation on scroll
- Smooth animation from 0 to target value over 2 seconds
- 3-column layout on desktop

**Important**: Uses custom hook pattern for counter logic

---

#### 15. **Portfolio Section** - [src/app/components/sections/Portfolio.tsx](../src/app/components/sections/Portfolio.tsx)

**Purpose**: Project gallery with filtering

**Key Features**:
- Filter buttons (All, Video, Photography)
- Project grid with thumbnails
- YouTube embed for video projects
- Image display for photography projects
- Animated filtering with Framer Motion `layout` and `AnimatePresence`
- Project metadata display

**State Management**:
- `filter`: Current filter selection ('all' | 'video' | 'photography')
- `activeVideo`: Which video is currently playing

**Important**: Advanced animation patterns with `AnimatePresence` for smooth transitions

---

#### 16. **Testimonials** - [src/app/Testimonials.tsx](../src/app/Testimonials.tsx)

**Purpose**: Client success stories and testimonials

**Content**: 3 testimonials from:
- Abdullah Al-Shammari (Real Estate Manager)
- Sarah Al-Ahmad (Perfume Brand Founder)
- Fahad bin Sultan (Tech Entrepreneur)

**Key Features**:
- Quote icon decoration
- Avatar initial circles
- Client name and role
- Animated on scroll entry
- 3-column grid on desktop

**Note**: Stored at root level, not in sections folder

---

#### 17. **Theme Provider** - [src/app/components/ThemeProvider.tsx](../src/app/components/ThemeProvider.tsx)

**Purpose**: Wrap app with next-themes for dark/light mode support

**Current Configuration**:
```tsx
<NextThemesProvider attribute="class" enableSystem>
  {children}
</NextThemesProvider>
```

**Parameters**:
- `attribute="class"`: Uses CSS class for theme switching
- `enableSystem`: Respects system dark mode preference

**Important**: Must wrap content in RootLayout before Navbar

---

## Supporting Files

### 18. **TypeScript Environment** - [next-env.d.ts](../next-env.d.ts)

**Purpose**: Auto-generated TypeScript definitions for Next.js

**Note**: Should not be manually edited

---

### 19. **README** - [README.md](../README.md)

**Purpose**: Project documentation and setup instructions

**Contains**:
- Getting started guide
- Development server setup
- Learn More resources

---

## Data Flow Summary

```
User Browser Request
        ↓
   RootLayout.tsx ────────────────────────→ Initialize theme, fonts, navbar
        ↓
   ThemeProvider.tsx ─────────────────────→ Enable dark/light mode
        ↓
   page.tsx (Home) ──────────────────────→ Orchestrate all sections
        ├─ Hero.tsx ─────────────────────→ Landing with CTA
        ├─ About.tsx ────────────────────→ Company mission
        ├─ Services.tsx ─────────────────→ Service showcase
        ├─ Stats.tsx ────────────────────→ Metrics display
        ├─ Portfolio.tsx ────────────────→ Project gallery
        ├─ Testimonials.tsx ─────────────→ Client reviews
        ├─ Partners.tsx ─────────────────→ Partner display
        ├─ Contact.tsx ──────────────────→ CTA & contact
        └─ Footer.tsx ───────────────────→ Bottom info
        
   Styling Applied
   ├─ globals.css (Tailwind theme)
   └─ Tailwind Config (colors, fonts)
```

## File Modification Guide

| File | Safe to Modify | Frequency | Impact |
|------|---|---|---|
| `globals.css` | ✅ Yes | Often | Theme colors, fonts, utilities |
| `page.tsx` | ✅ Yes | Often | Section order, add/remove sections |
| Component files (`sections/*.tsx`) | ✅ Yes | Often | Content, layout, interactions |
| `next.config.ts` | ⚠️ Careful | Rarely | Build behavior, optimizations |
| `tsconfig.json` | ⚠️ Careful | Rarely | Type checking behavior |
| `package.json` | ⚠️ Careful | Sometimes | Dependencies versions |
| `eslint.config.mjs` | ⚠️ Careful | Rare | Code quality rules |
| `postcss.config.mjs` | ⚠️ Need backup | Rarely | CSS processing |

