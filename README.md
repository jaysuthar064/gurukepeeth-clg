# Gurukripa Peeth College Website Redesign
> Complete Redesign Blueprints & Architecture Specifications based on [Government Meera Girls College, Udaipur](https://gmgcudaipur.org/).

---

## 📌 Documentation Suite (`redesign-docs/`)

All structural, design, statutory, and layout specifications have been drafted into 6 dedicated markdown files:

| # | Document | Scope & Contents |
|---|---|---|
| **01** | [**`01_DESIGN_SYSTEM_AND_TOKENS.md`**](file:///d:/Full-Stack%20Developement/Projects/gurukapeeth/redesign-docs/01_DESIGN_SYSTEM_AND_TOKENS.md) | **Colors & Typography**: Royal Oxford Navy (`#002147`), Crimson/Maroon (`#9b0c23`), Gold (`#ffb606`), cool neutrals (`#f8f9fc`). Heading and body fonts (PT Serif, Raleway, Roboto, Inter, Noto Sans Devanagari), spacing tokens, elevation, shadows, buttons, badges, and responsive grid rules. |
| **02** | [**`02_SITE_ARCHITECTURE_AND_PAGES.md`**](file:///d:/Full-Stack%20Developement/Projects/gurukapeeth/redesign-docs/02_SITE_ARCHITECTURE_AND_PAGES.md) | **Full Site Taxonomy (12 Main Modules)**: Mapped from over 400 sub-items on GMGC Udaipur tailored for Gurukripa Peeth: Home, About Us, Academics, Admissions, Activities, Student Corner, Circulars & Reports, Faculty Directory, Research, IQAC, NAAC, and Alumni. Defines the 6 standardized page archetypes. |
| **03** | [**`03_NAAC_AND_IQAC_STRUCTURE.md`**](file:///d:/Full-Stack%20Developement/Projects/gurukapeeth/redesign-docs/03_NAAC_AND_IQAC_STRUCTURE.md) | **Statutory Pillars (NAAC & IQAC)**: Full breakdown of NAAC's **7 Evaluative Criteria**, IIQA, Self Study Report (SSR), DVV Clarifications, Grade Sheets, and NCTE/Building NOCs. 7-tab IQAC interactive architecture including AQAR archives, Meeting Minutes with ATRs, and the 4-pillar Stakeholder Feedback System (Student, Teacher, Parent, Alumni). |
| **04** | [**`04_PAGE_LAYOUTS_AND_TABS_BLUEPRINT.md`**](file:///d:/Full-Stack%20Developement/Projects/gurukapeeth/redesign-docs/04_PAGE_LAYOUTS_AND_TABS_BLUEPRINT.md) | **2-Column Academic Grid & Tab Layouts**: 25% Left sticky navigation + 75% main content area. Interactive tab blueprints for Department pages, Admissions portal, Student Welfare, and Campus Infrastructure. Standardized statutory PDF download tables. |
| **05** | [**`05_HOMEPAGE_LAYOUT_AND_COMPONENTS.md`**](file:///d:/Full-Stack%20Developement/Projects/gurukapeeth/redesign-docs/05_HOMEPAGE_LAYOUT_AND_COMPONENTS.md) | **Homepage Architecture (14 Visual Zones)**: Section-by-section breakdown: Top utility bar, branding header, sticky mega-nav, announcement ticker, hero slider + quick admission box, 6 key portal cards, flagship institutional initiative, Principal/Director desks, tabbed program explorer, live campus board, stat counters, and grand academic footer. |
| **06** | [**`06_ADMIN_AND_DATA_MAPPING.md`**](file:///d:/Full-Stack%20Developement/Projects/gurukapeeth/redesign-docs/06_ADMIN_AND_DATA_MAPPING.md) | **Admin System Integration**: Mapping existing PHP/MySQL dynamic content (`page.php?id={n}`, `/gallery/documents/`, notices, slider) from `https://gurukripapeeth.in/admin` into the modernized UI without downtime or data loss. |

---

## 🏛️ Reference Comparison

| Dimension | Existing Gurukripa Peeth Site | Redesigned Standard (GMGCU Architecture) |
|---|---|---|
| **Primary Reference** | Basic legacy layout | **Government Meera Girls College, Udaipur** (`gmgcudaipur.org`) |
| **Institutional Brand** | Generic single-tier header | Dual-tier header with NAAC accreditation badge, bilingual title & direct helpdesk |
| **Navigation** | Basic flat dropdown menu | Sticky academic mega-menu with 12 logical clusters and mobile drawer |
| **NAAC / IQAC** | Minimal single dropdown item | Dedicated 8-section Quality Hub with 7 Criteria, AQAR archives & Stakeholder ATRs |
| **Admissions** | Static unorganized text | Year-wise filterable portal (Provisional, Waiting & Final Admitted lists with PDFs) |
| **Academic Streams** | Simple unstructured listing | Streamlined faculties (Arts, Science, B.Ed. & Integrated Education) with outcomes & labs |
| **Student Welfare** | External links in raw dropdown | Comprehensive Student Center with GGTU exam links, scholarship tracker, ICC & anti-ragging |

---

## 🛠️ Next Step: Tech Stack Decision

When you are ready, you can choose whichever tech stack suits your hosting and workflow best:

1. **Option A: Pure HTML5 + Vanilla CSS + Vanilla JS (PHP-ready partials)**
   - *Advantage*: Drops directly into your existing cPanel/Apache PHP hosting without build tools, Node runtime, or server changes.
2. **Option B: Modern Static Site with Vite (or Astro)**
   - *Advantage*: Lightning fast development, component reusability, outputs static files ready for any hosting.
3. **Option C: Next.js / React**
   - *Advantage*: Full-stack capability with built-in API routes if you wish to rebuild the admin panel alongside the frontend.
