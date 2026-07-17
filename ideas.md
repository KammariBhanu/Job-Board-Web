# Job Board Design & Architecture

## Design Philosophy

**Chosen Approach: Premium SaaS - Modern Professional**

This job board embodies the aesthetic of leading SaaS products (LinkedIn, Stripe, Linear) with emphasis on clarity, professionalism, and sophisticated interactions.

### Design Movement
Modern Minimalism with Premium Polish - combining clean layouts with subtle depth, sophisticated typography, and purposeful micro-interactions.

### Core Principles
1. **Clarity First** - Information hierarchy is paramount; every element serves a purpose
2. **Subtle Depth** - Soft shadows, gentle gradients, and layered spacing create dimension without clutter
3. **Purposeful Motion** - Animations enhance, not distract; every transition has intent
4. **Professional Elegance** - Premium materials (glassmorphism, soft surfaces) convey trust and quality

### Color Philosophy
- **Primary (Indigo):** Trust, professionalism, action - used for CTAs and key interactions
- **Accent (Emerald):** Growth, opportunity, success - highlights positive actions (apply, save, hire)
- **Semantic Colors:** Green (success), Amber (warning), Red (danger) for clear communication
- **Neutrals:** Pure white backgrounds with carefully calibrated grays for hierarchy and contrast
- **Dark Mode:** Deep charcoal backgrounds with soft white text, maintaining contrast and elegance

### Layout Paradigm
- **Landing Page:** Asymmetric hero with floating cards, organic flow through sections
- **Job Listings:** Sidebar filters (persistent on desktop, collapsible on mobile) with main content area
- **Dashboards:** Two-column layout with sidebar navigation and content panels
- **Detail Pages:** Full-width with contextual sidebars for related information

### Signature Elements
1. **Glassmorphic Cards** - Semi-transparent backgrounds with backdrop blur for layered depth
2. **Soft Shadows & Rounded Corners** - 0.65rem radius with multi-layer shadows for elevation
3. **Animated Badges & Tags** - Smooth entrance animations with hover effects

### Interaction Philosophy
- **Hover States:** Subtle scale (1.02), shadow elevation, and color transitions
- **Loading States:** Skeleton screens matching content layout
- **Transitions:** 150-250ms ease-out for UI changes, 200-500ms for modals
- **Micro-interactions:** Button press feedback (scale 0.97), smooth filter updates

### Animation Guidelines
- Button press: `scale(0.97)` on active, 160ms ease-out
- Dropdown/popover: 150-200ms ease-out, scale from trigger point
- Card entrance: staggered 30-50ms per item for cascading reveal
- Loading skeleton: subtle pulse animation
- Respect `prefers-reduced-motion` for all animations

### Typography System
- **Display Font:** Inter 700/800 for headlines (bold, commanding presence)
- **Body Font:** Inter 400/500 for body text (excellent readability)
- **Hierarchy:**
  - H1: 48px / 700 weight (hero titles)
  - H2: 32px / 700 weight (section titles)
  - H3: 24px / 600 weight (card titles)
  - Body: 16px / 400 weight (default)
  - Small: 14px / 500 weight (metadata, labels)
  - Tiny: 12px / 400 weight (timestamps, badges)

### Brand Essence
**One-liner:** The modern job board for ambitious professionals and forward-thinking companies.
**Personality:** Professional, trustworthy, innovative, accessible, empowering

### Brand Voice
- **Headlines:** Action-oriented, clear, benefit-focused
- **CTAs:** Direct, encouraging, specific ("View 342 Open Roles" vs "Browse Jobs")
- **Microcopy:** Helpful, human, never generic
- **Example Lines:**
  - "Find your next opportunity with 50,000+ roles from 10,000+ companies"
  - "Post a job in minutes. Hire the right person in days."

### Logo & Branding
- **Wordmark:** Bold, modern, professional
- **Icon:** Geometric symbol representing growth/opportunity (upward arrow or ascending steps)
- **Signature Color:** Indigo (primary brand color, unmistakably JobBoard)

---

## Architecture Overview

### Page Structure
```
Landing Page (/)
├── Header (sticky nav)
├── Hero Section
├── Quick Search
├── Trending Jobs
├── Featured Companies
├── Statistics
├── Top Categories
├── Top Companies
├── Testimonials
├── Newsletter
└── Footer

Jobs Page (/jobs)
├── Sidebar Filters
├── Search Bar
├── Sort Options
└── Job Cards Grid

Job Details (/jobs/:id)
├── Job Header
├── Description Sections
├── Company Card
├── Related Jobs
└── Application Form

Companies (/companies)
├── Company Grid
└── Company Cards

Company Details (/companies/:id)
├── Company Header
├── About Section
├── Open Jobs
├── Reviews
└── Footer

Categories (/categories)
├── Category Grid
└── Jobs by Category

Saved Jobs (/saved)
├── Saved Jobs List
└── Quick Actions

Applied Jobs (/applied)
├── Application Timeline
└── Status Tracking

Profile (/profile)
├── Profile Info
├── Resume
├── Preferences
└── Activity

Settings (/settings)
├── Account Settings
├── Notifications
├── Privacy
└── Preferences

Employer Dashboard (/employer)
├── Dashboard Overview
├── Post Job
├── Manage Jobs
├── Applicants
├── Analytics
└── Company Profile

Admin Dashboard (/admin)
├── Dashboard Overview
├── Manage Users
├── Manage Companies
├── Manage Jobs
├── Reports
└── Analytics
```

### Component Architecture
- **Layout Components:** Header, Footer, Sidebar, Navigation
- **Feature Components:** JobCard, CompanyCard, FilterPanel, SearchBar
- **UI Components:** Button, Card, Badge, Modal, Drawer (from shadcn/ui)
- **Form Components:** JobForm, ApplicationForm, ProfileForm
- **Chart Components:** Analytics charts using Recharts

### State Management
- **Zustand stores:**
  - `userStore` - User authentication and profile
  - `jobsStore` - Jobs list, filters, search
  - `savedStore` - Saved jobs
  - `appliedStore` - Applied jobs
  - `themeStore` - Theme preference
  - `dashboardStore` - Dashboard data

### Mock Data Structure
- 500+ jobs with realistic data
- 100+ companies with profiles
- 50+ job categories
- Salary ranges, experience levels, skills
- Testimonials and reviews
- Analytics data for dashboards

---

## Implementation Phases

### Phase 1: Core Infrastructure
- [ ] Theme system (light/dark with toggle)
- [ ] Global navigation header
- [ ] Footer
- [ ] Mock data generation
- [ ] Zustand stores setup

### Phase 2: Landing Page
- [ ] Hero section with search
- [ ] Featured jobs carousel
- [ ] Top companies showcase
- [ ] Statistics section
- [ ] Testimonials
- [ ] Newsletter signup

### Phase 3: Job Listings
- [ ] Jobs page layout
- [ ] Filter sidebar
- [ ] Search functionality
- [ ] Job cards with animations
- [ ] Pagination

### Phase 4: Detail Pages
- [ ] Job details page
- [ ] Company details page
- [ ] Categories page

### Phase 5: User Features
- [ ] Saved jobs
- [ ] Applied jobs
- [ ] User profile
- [ ] Settings page

### Phase 6: Dashboards
- [ ] Employer dashboard
- [ ] Admin dashboard
- [ ] Analytics and charts

### Phase 7: Additional Pages
- [ ] About page
- [ ] Contact page
- [ ] Privacy policy
- [ ] Terms of service
- [ ] 404 page

### Phase 8: Polish & Optimization
- [ ] Animations and transitions
- [ ] Responsive design refinement
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Final visual review

---

## Design Tokens

### Colors
- **Primary:** `oklch(0.623 0.214 259.815)` (Indigo)
- **Accent:** `oklch(0.5 0.15 120)` (Emerald)
- **Success:** `oklch(0.6 0.15 120)` (Green)
- **Warning:** `oklch(0.7 0.15 60)` (Amber)
- **Danger:** `oklch(0.577 0.245 27.325)` (Red)

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Border Radius
- sm: 4px
- md: 8px
- lg: 12px (default: 0.65rem / 10.4px)
- xl: 16px

### Shadows
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 6px rgba(0,0,0,0.1)
- lg: 0 10px 15px rgba(0,0,0,0.1)
- xl: 0 20px 25px rgba(0,0,0,0.15)

### Typography
- Font Family: Inter
- Base Size: 16px
- Line Height: 1.5 (body), 1.2 (headings)

---

## Style Decisions

### Navbar
- Sticky header with glassmorphic background (backdrop blur)
- Logo on left, navigation items center, auth/theme toggle right
- Mobile: Hamburger menu with slide-out drawer
- Smooth transitions on scroll (opacity change at 50px)

### Hero Section
- Full viewport height with animated gradient background
- Floating cards with staggered entrance animation
- Search bar with autocomplete suggestions
- Popular searches displayed below

### Job Cards
- Glassmorphic design with soft shadows
- Hover: Scale 1.02, shadow elevation, color accent
- Badge system for job type, remote status, easy apply
- Company logo, title, salary, location, skills tags
- Bookmark and share buttons

### Filters
- Sticky sidebar on desktop (collapsible on mobile)
- Smooth animations when opening/closing
- Clear all filters button
- Active filter count badge

### Dashboards
- Two-column layout: sidebar navigation + main content
- Card-based interface with consistent spacing
- Charts using Recharts with custom styling
- Loading skeletons matching content layout

### Forms
- Consistent input styling with focus states
- Clear error messages with icons
- Success confirmations with toast notifications
- Multi-step forms with progress indicators
