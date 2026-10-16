# Gurukripa Peeth Redesign — Design System & Visual Tokens
> Modeled after the authoritative academic aesthetic of [Government Meera Girls College, Udaipur (GMGCU)](https://gmgcudaipur.org/) and modern university portals.

---

## 1. Design Philosophy & Identity
The redesign elevates Gurukripa Shikshan Sansthan College (Gurukripa Peeth) from a basic web template to an esteemed, NAAC/UGC-compliant institutional digital presence. 

The visual identity embodies:
- **Academic Prestige & Heritage**: Deep royal hues reflecting scholarly tradition, state accreditation, and institutional dignity.
- **Clarity & Information Architecture**: High scannability for students, parents, faculty, inspection teams (NAAC/UGC/GGTU), and government bodies.
- **Dynamic Modern Usability**: Sticky navigation, multi-level mega-menus, fluid tab switchers, interactive accordions, and rapid access to statutory downloads.

---

## 2. Color Palette & Design Tokens

### Primary Palette
| Token Name | Hex Code | HSL / RGB | Intended Application |
|---|---|---|---|
| `--color-primary` | `#9b0c23` | `rgb(155, 12, 35)` | Primary brand crimson/maroon: Header accents, primary buttons, active tab borders, section category tags, prominent headlines. |
| `--color-primary-dark` | `#7a091b` | `rgb(122, 9, 27)` | Dark maroon: Button hover states, active menu item backgrounds. |
| `--color-primary-light` | `#fcf0f2` | `rgb(252, 240, 242)` | Very light maroon tint: Highlight alert boxes, badge backgrounds, table header accents. |
| `--color-secondary` | `#002147` | `rgb(0, 33, 71)` | Deep Oxford / Royal Navy Blue: Primary navigation bar, footer background, card titles, institutional authority accents. |
| `--color-secondary-light`| `#172554` | `rgb(23, 37, 84)` | Dark blue shade: Main section headings (`h2`, `h3`), hero subtitles, icon counters. |
| `--color-accent` | `#ffb606` | `rgb(255, 182, 6)` | Golden Amber: Callout badges, rating stars, alert highlights, "Apply Now" buttons. |
| `--color-accent-soft` | `#e3ccad` | `rgb(227, 204, 173)` | Warm parchment gold: Dividers, subtle borders, sub-header rules. |

### Neutral & Background Palette
| Token Name | Hex Code | Intended Application |
|---|---|---|
| `--color-bg-body` | `#ffffff` | Pure white background for high readability of academic text. |
| `--color-bg-alt` | `#f8f9fc` | Light cool gray for alternating section backgrounds and card containers. |
| `--color-bg-card` | `#ffffff` | White card surface with subtle border/shadow. |
| `--color-border` | `#e2e8f0` | Crisp 1px border lines for grids, cards, and tables. |
| `--color-border-dark`| `#dedede` | Table borders, divider lines. |
| `--color-text-main` | `#1e293b` | Dark charcoal for crystal-clear readability (WCAG AAA compliant). |
| `--color-text-muted`| `#64748b` | Sub-labels, meta timestamps, author attributions. |
| `--color-text-light`| `#ffffff` | Text on dark backgrounds (navy nav and maroon banners). |

---

## 3. Typography Hierarchy

### Font Families
- **Display & Headings**: `'Raleway', 'PT Serif', serif` or `'Outfit', sans-serif`
  - *Feel*: Dignified, scholarly, authoritative, crisp serifs and bold modern sans-serifs.
- **Body & Interface**: `'Roboto', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - *Feel*: Highly legible at small sizes, optimal for tables, circulars, lists, and dense academic notices.
- **Hindi / Bilingual Support**: `'Noto Sans Devanagari', 'Yatra One', sans-serif`
  - *Usage*: Official notices, college anthem (*Sanstha Geet*), Hindi department pages, statutory headings.

### Scale & Hierarchy
| Level | Font Size | Line Height | Weight | Case / Transform | Usage |
|---|---|---|---|---|---|
| `h1.hero` | `44px - 52px` | `1.15` | `700` | Normal | Hero banner headlines, landmark titles |
| `h2.section` | `32px - 36px` | `1.25` | `700` | Normal / Uppercase tracking | Main homepage & landing section headings |
| `h3.card-title` | `20px - 24px` | `1.3` | `600` | Normal | Card headings, program names, department titles |
| `h4.subhead` | `16px - 18px` | `1.4` | `600` | Normal | Tab titles, widget headers, faculty designations |
| `body-large` | `16px - 17px` | `1.65` | `400` | Normal | Lead intro paragraphs, leadership messages |
| `body-regular`| `14px - 15px` | `1.6` | `400` | Normal | Standard body copy, table content, lists |
| `body-small` | `12px - 13px` | `1.5` | `500` | Normal | Meta info, date stamps, category badges, captions |

---

## 4. UI Component Library Specifications

### 4.1. Top Header Utility Bar
- **Background**: `#ffffff` or clean subtle gradient with `#002147` accents.
- **Left Element**: Official NAAC Accreditation ribbon (`Accredited "A" Grade / Quality Affiliated`) + GGTU Banswara Affiliation Badge.
- **Center**: College name in Bilingual format (English + Hindi Devanagari).
- **Right Element**: Quick links (Downloads, NDL Portal, Student Feedback, Alumni Registration, SSO Rajasthan, Admin Login) + Contact numbers.

### 4.2. Main Navigation Bar (Sticky Mega-Menu)
- **Background**: Primary Oxford Blue (`#002147`).
- **Text Color**: `#ffffff` with hover transition to `#ffb606` (Gold) or `#9b0c23` (Maroon pill).
- **Drop-Down Style**: Multi-level dropdown with glassmorphic shadow (`0 10px 25px rgba(0,33,71,0.15)`), white background, crimson left-border on active hover.
- **Mobile Menu**: Responsive hamburger toggle transitioning into a smooth slide-out drawer with accordion submenus.

### 4.3. Announcement & Marquee Bar
- **Badge**: Solid Maroon pill `#9b0c23` labelled **"LATEST NOTICES"** / **"ताज़ा सूचनाएँ"**.
- **Ticker Track**: Smooth horizontal scroller with pause-on-hover functionality for urgent admission notices, examination dates, and circulars.

### 4.4. Hero Slider & Quick Application Widget
- **Layout**: 65% width High-Definition Campus Slider + 35% Quick Admission / Key Portals Box.
- **Slider Elements**: Campus infrastructure, academic ceremonies, cultural events, NAAC activities.
- **Quick Box**: Quick dropdown to select degree (B.A., B.Sc., B.Ed.), download prospectus, and apply online.

### 4.5. Quick Action Metric & Portal Cards (Icon Grid)
- **Elevation**: 1px solid `#e2e8f0` with hover lift `transform: translateY(-4px)` and box-shadow `0 12px 24px rgba(0,33,71,0.08)`.
- **Top Accent**: 4px colored border indicator (Maroon / Navy / Gold).
- **Icons**: 50px rounded badge with 24px SVG/FontAwesome icons.
- **Targets**: 
  1. Online Admission
  2. Examination Portal & Results
  3. Time Table & Schedules
  4. NAAC & IQAC Corner
  5. Scholarships & Welfare
  6. Grievance Redressal & ICC

### 4.6. Tabbed Information Panels (Tabs Component)
- **Tab Headers**: Horizontal pills or underline bar.
- **Active State**: Crimson background (`#9b0c23`) with white text, or deep navy underline with 3px bar.
- **Transition**: Smooth fade-in (`opacity` and `transform`) without layout shifts.
- **Mobile Behavior**: Automatically wraps or becomes horizontally swipeable on screens `< 768px`.

### 4.7. Academic Program & Course Cards
- **Structure**: Image banner (180px height) + Badge (UG/PG/Bed) + Course Title + Duration + Eligibility + "View Syllabus & Outcomes" CTA.
- **Hover Effect**: Image zoom `scale(1.05)`, subtle border glow.

### 4.8. Statutory Document Tables (PDF Download Lists)
- **Columns**: `#`, `Document Title / Description`, `Academic Year / Session`, `Date Published`, `Action (Download PDF Button)`.
- **Styling**: Alternating row zebra striping (`#ffffff` and `#f8f9fc`), crisp borders, red PDF icon with file size indicator.

---

## 5. Responsive Grid & Breakpoints

| Breakpoint Name | Media Query | Container Max-Width | Layout Behavior |
|---|---|---|---|
| **Desktop XL** | `@media (min-width: 1400px)` | `1320px` | 4-column cards, full mega-menu |
| **Desktop Standard** | `@media (min-width: 1200px)` | `1200px` | 3 to 4 columns, standard mega-menu |
| **Tablet Landscape** | `@media (min-width: 992px)` | `960px` | 3 columns, compact menu |
| **Tablet Portrait** | `@media (min-width: 768px)` | `720px` | 2 columns, off-canvas navigation |
| **Mobile Standard** | `@media (max-width: 767px)` | `100% (padding 16px)` | 1 column, sticky quick-action bar |

---

## 6. Accessibility & Compliance Standards
- **Color Contrast**: 4.5:1 ratio minimum for normal text, 3:1 for large text (WCAG 2.1 Level AA).
- **Keyboard Navigation**: Clear `:focus-visible` outlines on all links, buttons, and tab controls (`outline: 2px solid #9b0c23; outline-offset: 2px`).
- **Semantic Tags**: Semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **Screen Reader Friendly**: Clear `aria-label`, `aria-expanded`, and descriptive link titles (e.g., "Download SSR Report PDF").
