# Gurukripa Peeth — Headless WordPress CMS Architecture & College Content Management Blueprint

> How Indian colleges & universities manage their institutional web content, and how Gurukripa Peeth will implement an **industry-standard Headless WordPress CMS + React Frontend** architecture with a custom admin plugin.

---

## 1. How Indian Colleges Actually Manage Their Website Content

### 1.1 The Typical College CMS Workflow

Most Indian colleges affiliated with state universities (GGTU, MLSU, UoR, etc.) manage their website content via one of these patterns:

| Pattern | How It Works | Who Uses It | Limitations |
|---|---|---|---|
| **Static PHP Templates** | Developer manually edits `.php` files, uploads PDFs via FTP/cPanel File Manager | 60%+ of small/private colleges | Non-technical staff can't update; every change needs a developer |
| **WordPress (Monolithic)** | Standard WordPress with themes like Starter Templates / CMSMasters / Flavor | Government Meera Girls College Udaipur, many autonomous colleges | Plugin bloat, slow load times, security risks from too many plugins |
| **Custom Admin Panel** | In-house PHP/MySQL admin panel (like current `gurukripapeeth.in/admin`) | Small to mid-size colleges | Fragile, limited features, no version control, difficult to extend |
| **Headless CMS** | WordPress/Strapi backend exposing REST API → React/Next.js frontend | Top-tier universities like IITs, IIMs, Manipal, Jain University | Best performance, security, and scalability — but requires dev team |

### 1.2 What NAAC Peer Teams Actually Inspect On College Websites

During NAAC assessment visits and Data Validation & Verification (DVV), peer team members:

1. **Download statutory PDFs** — AQAR, SSR, IIQA undertakings, committee orders, affiliation letters
2. **Check structured data** — Faculty qualifications, student enrollment numbers, examination pass rates
3. **Verify feedback mechanisms** — Active links to Google Forms or institutional feedback portals
4. **Inspect freshness** — Whether notices, events, and admission data are current-session or stale
5. **Validate document provenance** — Each PDF should have session labels, official stamps, and consistent naming

**→ This means the CMS must make it dead-simple for college office staff to upload PDFs, publish notices, and update faculty data without any coding.**

---

## 2. Our Architecture: Headless WordPress + React

```
┌─────────────────────────────────────────────────────────────────┐
│                      CONTENT EDITORS                            │
│        (Principal, IQAC Coordinator, Office Staff)              │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │             WordPress Admin Dashboard                      │  │
│  │        http://gurukapeeth.test/wp-admin                    │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │   Custom Plugin: "Gurukripa College Manager"         │  │  │
│  │  │                                                      │  │  │
│  │  │  📋 Sidebar Menu Items:                              │  │  │
│  │  │  ├── 🏛️ College Settings (Name, Logo, Contacts)     │  │  │
│  │  │  ├── 👨‍🏫 Faculty & Staff (Teaching/Non-Teaching)    │  │  │
│  │  │  ├── 📚 Academic Programs (B.A., B.Sc., B.Ed.)      │  │  │
│  │  │  ├── 📝 Admissions Manager (Session-wise lists)     │  │  │
│  │  │  ├── 🏆 NAAC Documents (7 Criteria, SSR, DVV)       │  │  │
│  │  │  ├── 📊 IQAC Cell (AQAR, Minutes, Feedback)         │  │  │
│  │  │  ├── 📰 Notices & Circulars (with marquee toggle)   │  │  │
│  │  │  ├── 🖼️ Campus Gallery (Categorized albums)         │  │  │
│  │  │  ├── 📅 Events Calendar                              │  │  │
│  │  │  ├── 💬 Testimonials & Alumni                        │  │  │
│  │  │  ├── 🔗 Quick Links & Portals                       │  │  │
│  │  │  └── 📄 Static Pages (About, Vision, RTI, etc.)     │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  + WordPress REST API v2 endpoints                        │  │
│  │    /wp-json/wp/v2/faculty                                 │  │
│  │    /wp-json/wp/v2/programs                                │  │
│  │    /wp-json/wp/v2/naac-documents                          │  │
│  │    /wp-json/wp/v2/notices                                 │  │
│  │    /wp-json/gurukapeeth/v1/settings                       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ↓ JSON API                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │             React Frontend (Vite)                          │  │
│  │        http://localhost:5173 (dev)                         │  │
│  │        https://gurukripapeeth.in (production)              │  │
│  │                                                            │  │
│  │  Fetches JSON → Renders modern, responsive UI              │  │
│  │  14-zone Homepage, IQAC portal, NAAC hub, Admissions,     │  │
│  │  Faculty directory, Student corner, etc.                   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Custom WordPress Plugin: "Gurukripa College Manager"

### 3.1 Plugin Sidebar Menu Structure (wp-admin)

The plugin registers a top-level admin menu with sub-pages, making it feel like a **dedicated college management dashboard** inside WordPress:

```
🏛️ College Manager               ← Top-level menu with college icon
├── 📋 Dashboard                  ← Overview stats: total faculty, notices, events
├── ⚙️ College Settings           ← Global: College name, logo, contacts, social links,
│                                    affiliations (GGTU, NCTE), AISHE code, NAAC status
│
├── 👨‍🏫 Faculty & Staff           ← Custom Post Type: `faculty`
│   ├── All Faculty                 Fields: Photo, Name, Designation, Department,
│   ├── Add New                     Qualifications (Ph.D/NET/SET), Subjects,
│   └── Departments (Taxonomy)      Experience, Email, Research Papers, Bio
│
├── 📚 Academic Programs          ← Custom Post Type: `program`
│   ├── All Programs                Fields: Program name, Code, Stream (Arts/Science/Ed),
│   ├── Add New                     Duration, Intake capacity, Eligibility,
│   └── Streams (Taxonomy)          Syllabus PDF, Outcomes (PO/CO/PSO),
│                                    NCTE approval details, Fee structure
│
├── 📝 Admissions                 ← Custom Post Type: `admission`
│   ├── All Admission Lists         Fields: Academic session (2026-27), Stream,
│   ├── Add Merit List              List type (Provisional/Waiting/Final),
│   └── Sessions (Taxonomy)         Category (Gen/OBC/SC/ST/EWS/MBC),
│                                    PDF document, Publication date, Active toggle
│
├── 🏆 NAAC Portal                ← Custom Post Type: `naac_document`
│   ├── All Documents               Fields: Document title, Criterion (1-7),
│   ├── Upload Document             Type (SSR/IIQA/DVV/GradeSheet/PeerReport/NOC),
│   └── Criteria (Taxonomy)         PDF file, Academic session, Description
│
├── 📊 IQAC Cell                  ← Custom Post Type: `iqac_report`
│   ├── AQAR Reports                Fields: Report title, Type (AQAR/Minutes/ATR/
│   ├── Meeting Minutes             FeedbackReport/ActionPlan/BestPractice),
│   ├── Feedback Links              Academic session, PDF, Status (Draft/Submitted)
│   └── Action Taken Reports
│
├── 📰 Notices & Circulars        ← Custom Post Type: `notice`
│   ├── All Notices                 Fields: Title, Category (Admission/Exam/General/
│   ├── Add Notice                  NAAC/Scholarship), Date, PDF attachment,
│   └── Notice Categories           Show in marquee ticker (checkbox),
│                                    Pin to top (checkbox), Expiry date
│
├── 📅 Events                     ← Custom Post Type: `event`
│   ├── All Events                  Fields: Title, Date/Time, Venue, Description,
│   └── Add Event                   Category, Featured image, Status
│
├── 🖼️ Campus Gallery             ← Custom Post Type: `gallery_album`
│   ├── All Albums                  Fields: Album title, Category (Classrooms/Labs/
│   └── Add Album                   Sports/Events/Campus), Multiple images
│
├── 💬 Testimonials               ← Custom Post Type: `testimonial`
│   ├── All Testimonials            Fields: Name, Batch year, Program, Photo,
│   └── Add Testimonial             Quote/Message, Current position
│
├── 🎓 Alumni                     ← Custom Post Type: `alumni`
│   ├── All Alumni                  Fields: Name, Batch, Program, Photo,
│   └── Add Alumni                  Current profession, Achievements
│
├── 🔗 Quick Links                ← Settings page
│   └── Manage portal links         GGTU, NCTE, SSO, NDL, HTE Rajasthan, etc.
│
├── 📄 Leadership Messages        ← Custom Post Type: `leadership`
│   ├── Director's Message          Fields: Person name, Designation, Photo,
│   └── Principal's Message         Qualifications, Message body, Email, Signature
│
└── 🎨 Homepage Sections          ← Settings page
    └── Manage hero slides,         Configure which content appears in each
        counter stats, initiative    homepage zone (slider images, stat numbers,
        section, featured content    featured event, announcement text)
```

### 3.2 Custom Post Types (CPTs) Summary

| CPT Slug | Label | REST Base | Key Meta Fields |
|---|---|---|---|
| `faculty` | Faculty & Staff | `/wp-json/wp/v2/faculty` | photo, department, designation, qualifications, subjects, experience, email, research_papers, bio |
| `program` | Academic Programs | `/wp-json/wp/v2/programs` | stream, duration, intake, eligibility, syllabus_pdf, outcomes, fee_structure, ncte_details |
| `admission` | Admission Lists | `/wp-json/wp/v2/admissions` | session, stream, list_type, category, pdf_file, is_active |
| `naac_document` | NAAC Documents | `/wp-json/wp/v2/naac-documents` | criterion, doc_type, pdf_file, session, description |
| `iqac_report` | IQAC Reports | `/wp-json/wp/v2/iqac-reports` | report_type, session, pdf_file, status, meeting_date |
| `notice` | Notices & Circulars | `/wp-json/wp/v2/notices` | notice_category, date, pdf_file, is_marquee, is_pinned, expiry_date |
| `event` | Events Calendar | `/wp-json/wp/v2/events` | event_date, venue, event_category |
| `gallery_album` | Campus Gallery | `/wp-json/wp/v2/gallery-albums` | album_category, images (gallery field) |
| `testimonial` | Testimonials | `/wp-json/wp/v2/testimonials` | batch_year, program, current_position |
| `alumni` | Alumni Directory | `/wp-json/wp/v2/alumni` | batch, program, profession, achievements |
| `leadership` | Leadership Messages | `/wp-json/wp/v2/leadership` | designation, qualifications, email, signature_image |

### 3.3 Custom Taxonomies

| Taxonomy Slug | Applies To | Example Terms |
|---|---|---|
| `department` | faculty, program | Hindi, Political Science, Physics, Chemistry, Education, Geography |
| `stream` | program, admission | Arts, Science, Education, Integrated |
| `session` | admission, naac_document, iqac_report | 2026-27, 2025-26, 2024-25, 2023-24 |
| `naac_criterion` | naac_document | Criterion 1 through 7 |
| `notice_type` | notice | Admission, Examination, General, NAAC, Scholarship, Sports |
| `event_category` | event | NSS Camp, Seminar, Cultural, Sports, Workshop |
| `album_category` | gallery_album | Classrooms, Laboratories, Sports, Events, Campus |

### 3.4 Custom REST API Endpoints

Beyond the standard WP REST endpoints for CPTs, the plugin registers:

| Endpoint | Method | Purpose |
|---|---|---|
| `/wp-json/gurukapeeth/v1/settings` | GET | Returns global college settings (name, logo URL, contacts, NAAC status, affiliations, social links) |
| `/wp-json/gurukapeeth/v1/homepage` | GET | Returns assembled homepage data: hero slides, stat counters, featured initiative, quick links |
| `/wp-json/gurukapeeth/v1/navigation` | GET | Returns full navigation menu tree for the React frontend |
| `/wp-json/gurukapeeth/v1/marquee` | GET | Returns notices with `is_marquee=true` for the ticker |

---

## 4. How College Office Staff Will Use the CMS

### 4.1 Everyday Workflows (Non-Technical Users)

| Task | Where in WP Admin | Difficulty |
|---|---|---|
| **Upload a new admission merit list PDF** | College Manager → Admissions → Add Merit List → Fill session/stream/category → Upload PDF → Publish | ⭐ Easy (form fill + upload) |
| **Add a new faculty member** | College Manager → Faculty → Add New → Fill name/photo/dept/quals → Publish | ⭐ Easy |
| **Post an urgent exam notice** | College Manager → Notices → Add Notice → Title, date, category "Examination" → Check "Show in Marquee" → Publish | ⭐ Easy |
| **Upload AQAR report to IQAC** | College Manager → IQAC Cell → AQAR Reports → Add New → Session, upload PDF → Publish | ⭐ Easy |
| **Update Principal's message** | College Manager → Leadership Messages → Edit "Principal's Message" → Update text → Save | ⭐ Easy |
| **Add new hero slider image** | College Manager → Homepage Sections → Upload slide image + caption → Save | ⭐ Easy |
| **Upload NAAC SSR document** | College Manager → NAAC Portal → Upload Document → Select "SSR" type, criterion → Upload → Publish | ⭐ Easy |

### 4.2 User Roles & Permissions

| Role | What They Can Do |
|---|---|
| **Administrator** | Full access to everything: settings, all CPTs, users, plugins |
| **College Editor** | Can create/edit/publish all content types (faculty, notices, admissions, IQAC), but cannot change settings or install plugins |
| **Department Coordinator** | Can create/edit faculty profiles and programs within their department taxonomy only |
| **IQAC Coordinator** | Can create/edit IQAC reports, AQAR, meeting minutes, and feedback links |
| **Office Staff** | Can create/edit notices, events, and admission lists |

---

## 5. React Frontend Architecture

```
gurukapeeth/
├── backend/                          ← WordPress installation (Laragon www symlink)
│   ├── wp-content/
│   │   └── plugins/
│   │       └── gurukapeeth-manager/  ← Our custom plugin
│   └── wp-config.php
│
└── frontend/                         ← React app (Vite)
    ├── src/
    │   ├── api/                      ← API client functions
    │   │   └── wordpress.js          ← fetch wrapper for WP REST API
    │   ├── components/               ← Reusable UI components
    │   │   ├── layout/               ← Header, Footer, Sidebar, Breadcrumb
    │   │   ├── home/                 ← 14 homepage zone components
    │   │   ├── academic/             ← Program cards, tabs, faculty grid
    │   │   ├── statutory/            ← NAAC criteria pills, IQAC tabs, PDF tables
    │   │   └── common/               ← Buttons, badges, cards, modals, loaders
    │   ├── pages/                    ← Route-level page components
    │   │   ├── HomePage.jsx
    │   │   ├── AboutPage.jsx
    │   │   ├── AcademicsPage.jsx
    │   │   ├── AdmissionsPage.jsx
    │   │   ├── IQACPage.jsx
    │   │   ├── NAACPage.jsx
    │   │   ├── StudentCornerPage.jsx
    │   │   ├── FacultyPage.jsx
    │   │   ├── ActivitiesPage.jsx
    │   │   ├── ContactPage.jsx
    │   │   └── GalleryPage.jsx
    │   ├── hooks/                    ← Custom React hooks for API fetching
    │   ├── styles/                   ← CSS files (design system)
    │   ├── App.jsx                   ← Router setup
    │   └── main.jsx                  ← Entry point
    ├── public/
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 6. Technology Stack Summary

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Backend CMS** | WordPress | Latest (6.x) | Content management, REST API, user auth |
| **Custom Plugin** | PHP 8.3 | `gurukapeeth-manager` | CPTs, taxonomies, meta fields, custom endpoints |
| **Database** | MySQL 8.4 | Via Laragon | Content storage |
| **Local Server** | Laragon | Latest | Apache + PHP + MySQL orchestration |
| **Frontend Framework** | React 18 | Via Vite | Component-based UI rendering |
| **Build Tool** | Vite 5 | Latest | Fast dev server, HMR, production builds |
| **Routing** | React Router v6 | Latest | Client-side page routing |
| **Styling** | Vanilla CSS | Custom design system | No Tailwind unless requested |
| **Icons** | FontAwesome 6 | CDN | UI iconography |
| **Fonts** | Google Fonts | Raleway, Roboto, PT Serif, Noto Sans Devanagari | Typography system |
