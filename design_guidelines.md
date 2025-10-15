# Design Guidelines: Yazid Mouayn Portfolio

## Design Approach: Modern Portfolio with Technical Sophistication

**Selected Approach:** Hybrid of Linear's clean minimalism + GitHub's dark mode excellence + Notion's content hierarchy

**Design Principles:**
- Technical elegance: Clean, precise, and functional
- Content-first: Projects are the hero, design supports them
- Dark-mode native: Designed for dark, adapted for light
- Subtle sophistication: Refined details without distraction

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Default):**
- Background: 222 15% 10% (deep charcoal)
- Surface: 222 15% 15% (elevated surfaces)
- Border: 222 10% 25% (subtle separation)
- Text Primary: 0 0% 98% (crisp white)
- Text Secondary: 0 0% 70% (muted gray)
- Accent: 210 100% 60% (professional blue for links/CTAs)
- Accent Hover: 210 100% 50%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 0 0% 88%
- Text Primary: 222 15% 15%
- Text Secondary: 222 10% 40%
- Accent: 210 100% 45%
- Accent Hover: 210 100% 35%

### B. Typography

**Font Stack:**
- Primary: Inter (via Google Fonts) - clean, technical, excellent readability
- Monospace: 'JetBrains Mono' - for code snippets/technical details

**Type Scale:**
- Hero Name: text-5xl md:text-6xl font-bold
- Section Headings: text-3xl md:text-4xl font-semibold
- Project Titles: text-xl font-semibold
- Body: text-base leading-relaxed
- Small/Meta: text-sm text-secondary

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 md:py-24
- Component gaps: gap-6 to gap-8
- Card padding: p-6 to p-8
- Micro spacing: space-y-4

**Container Strategy:**
- Max width: max-w-6xl mx-auto px-6
- Hero: max-w-4xl mx-auto (narrower for focus)
- Content sections: max-w-6xl

### D. Component Library

**Navigation:**
- Fixed top navbar with backdrop blur (backdrop-blur-sm bg-background/80)
- Height: h-16
- Flex layout with name left, links + toggle right
- Theme toggle: rounded-lg border with smooth icon transition
- Link hover: subtle brightness increase, no underline

**Hero Section:**
- Clean, centered text-only hero (no background image needed)
- Large name typography with subtle gradient text effect (optional)
- Tagline in muted text below
- Two prominent CTAs: "View Projects" (primary) and "Resume" (outline)
- Vertical spacing: py-24 md:py-32

**Project Cards:**
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Card style: Elevated surface with border, rounded-xl, overflow-hidden
- Image: aspect-video object-cover (first media item as thumbnail)
- Content padding: p-6
- Title + tagline + bullet preview (first 2 bullets)
- Tech chips: flex flex-wrap gap-2 with small rounded pills
- Hover: subtle lift (transform translateY(-2px)) + border color shift

**Modal System:**
- Overlay: backdrop blur with semi-transparent dark/light background
- Modal: max-w-4xl centered, rounded-2xl, elevated shadow
- Close button: top-right, clear icon
- Content: scrollable with generous padding
- Media gallery: carousel or stacked images with captions
- Chip display: all technologies shown

**Contact Section:**
- Simple centered layout
- Large email link as primary CTA
- Social icons below: GitHub, LinkedIn (use lucide-react icons)
- Minimal, clean presentation

**About Section:**
- Single column, max-w-3xl
- Professional headshot placeholder (circular, border)
- Paragraph text with comfortable line-height
- Skills/expertise as subtle pills or comma-separated list

### E. Interactions & Transitions

**Theme Toggle:**
- Smooth icon crossfade: transition-all duration-300
- Root class change triggers all color transitions: transition-colors duration-300
- Sun/Moon icon rotation on toggle (rotate-180)

**General Animations:**
- Card hover: transition-all duration-200 ease-in-out
- Modal: fade in with scale (0.95 to 1) over 200ms
- Button states: subtle scale on active (scale-95)
- NO scroll-triggered animations, NO parallax
- Keep page interactions immediate and responsive

---

## Portfolio-Specific Guidelines

**Project Showcase Strategy:**
- Lead with grid immediately after hero (no filler content)
- Each card shows: image thumbnail, title, tagline, 2 key bullets, tech stack
- "View Details" triggers modal with full content
- Modal includes: complete bullet list, all media in gallery, HTML content rendering

**Content Hierarchy:**
1. Hero (name + CTA)
2. Projects grid (primary content)
3. About (brief professional context)
4. Contact (simple, accessible)

**Visual Consistency:**
- All cards use same border radius (rounded-xl)
- Consistent elevation system: subtle borders, no heavy shadows
- Tech chips: consistent size (text-xs px-3 py-1 rounded-full)
- All transitions: 200-300ms duration

**Responsive Behavior:**
- Mobile: single column, full-width cards, stacked navigation
- Tablet: 2-column project grid
- Desktop: 3-column project grid, horizontal nav
- Breakpoints: md:768px, lg:1024px

---

## Images

**Project Thumbnails:**
- Use first media item from each project as card thumbnail
- Aspect ratio: 16:9 (aspect-video)
- Object-fit: cover
- All project images as specified in data

**Image Treatment:**
- No hero background image (text-focused hero)
- Project cards feature prominent thumbnails
- Modal galleries: full-size images with proper aspect ratios
- Maintain image quality, no aggressive compression

**Placement:**
- Hero: Text-only, clean background
- Projects: Thumbnail top of each card
- Modal: Gallery section with all media items
- About: Optional professional headshot (circular)