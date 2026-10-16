# Gurukripa Peeth Redesign — Page Layouts & Tabs Blueprint
> Wireframe specifications, responsive grid layouts, and interactive tabbed UI patterns modeled after [GMGC Udaipur](https://gmgcudaipur.org/).

---

## 1. Global Page Layout System (The 2-Column Academic Grid)

For inner pages (Academics, About, Admission, Activities, NAAC, Student Corner), we adopt the standard **2-Column Academic Layout**:
- **Desktop (>= 992px)**: 25% Left Sticky Navigation Sidebar + 75% Main Content Body.
- **Mobile / Tablet (< 992px)**: Horizontal swipeable sub-menu pills on top + full-width content body below.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER (Top Utility Bar + Institutional Branding + Sticky Mega-Menu) │
├─────────────────────────────────────────────────────────────────────────────┤
│ BREADCRUMB & PAGE BANNER (e.g., Home > Academics > Faculty of Arts)         │
├──────────────────────────────┬──────────────────────────────────────────────┤
│ LEFT STICKY SIDEBAR (25%)    │ MAIN CONTENT AREA (75%)                      │
│                              │                                              │
│ • Section Navigation Links   │ 1. Page Title & Category Badge               │
│ • Quick Enquiry / Apply Box  │ 2. Dynamic Tabbed Interface                  │
│ • Contact Coordinator Card   │    [Tab A] [Tab B] [Tab C] [Tab D]           │
│ • Related Downloads / Notices│ 3. Active Tab Content Pane                   │
│                              │    • Descriptive Content & High-Res Images   │
│                              │    • Responsive Data Tables / Lists          │
│                              │    • Downloadable PDF Rows                   │
│                              │ 4. Next/Prev Navigation Buttons              │
├──────────────────────────────┴──────────────────────────────────────────────┤
│ GLOBAL INSTITUTIONAL FOOTER (4-Column Layout + Statutory Badges + Copyright)│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Interactive Tab Archetypes

### 2.1 Archetype A: Department / Program Page Tabs
Used for: **Arts, Science, Education (B.Ed., Integrated B.A. B.Ed., B.Sc. B.Ed.)**

```
[ Overview ] [ Courses & Syllabus ] [ Faculty Profiles ] [ Labs & Facilities ] [ Outcomes (PO/CO) ] [ Activities ]
```

- **Tab 1: Overview**: Department introduction, vision, student intake capacity, affiliation to GGTU Banswara, and NCTE approval status.
- **Tab 2: Courses & Syllabus**:
  - Grid of courses offered.
  - Downloadable university syllabus PDF for Part-I, Part-II, Part-III, and B.Ed. Semesters.
  - Subject combinations table.
- **Tab 3: Faculty Profiles**:
  - Grid of faculty cards (Photo, Name, Designation, Qualification: NET/SET/Ph.D., Experience, Teaching Specialization).
- **Tab 4: Labs & Facilities**:
  - Dedicated laboratory photos (Physics, Chemistry, Botany, Zoology, Computer Lab, Psychology & Educational Tech Lab).
  - List of key instruments and software.
- **Tab 5: Program Outcomes (PO) & Course Outcomes (CO)**:
  - Structured accordion displaying clear learning outcomes mandated by NAAC.
- **Tab 6: Departmental Activities**:
  - Guest lectures, educational tours, workshops, and science exhibitions.

---

### 2.2 Archetype B: Admissions Portal Tabs
Used for: **Admissions 2026-27, Admissions 2025-26, Admission Archive**

```
[ Admission Process ] [ Merit & Cutoff Lists ] [ Fee Structure ] [ Seat Matrix ] [ Rules & Reservation ] [ Online Apply ]
```

- **Tab 1: Admission Process**:
  - Step-by-step visual flowchart: (1) Online Registration -> (2) Document Verification -> (3) Merit List Declaration -> (4) Fee Payment -> (5) Roll Number Allotment.
  - Important deadlines table (Start date, Last date of form submission, Merit list release).
- **Tab 2: Merit & Cutoff Lists (Filterable Table)**:
  - Interactive Filter: `[All Streams] [Arts (B.A.)] [Science (B.Sc.)] [Education (B.Ed.)]`
  - Category Pills: `[General] [OBC] [SC] [ST] [EWS] [MBC] [Divyang]`
  - Structured download table with columns: `List Type`, `Stream`, `Category`, `Date Published`, `Download PDF`.
- **Tab 3: Fee Structure**:
  - Transparent fees table for General, Reserved categories, Laboratory fees, Examination fees, and Refund policies.
- **Tab 4: Seat Matrix & Combinations**:
  - Sanctioned intake capacity per course (e.g., B.A. 240 seats, B.Sc. 120 seats, B.Ed. 100 seats).
- **Tab 5: Rules & Reservation**:
  - Govt of Rajasthan and GGTU tribal reservation norms, age criteria, bonus marks rules.
- **Tab 6: Online Application Gateway**:
  - Direct form or SSO Rajasthan application portal link with video guide.

---

### 2.3 Archetype C: Student Corner & Grievance Portal Tabs
Used for: **Student Welfare, Examinations, Anti-Ragging, and Internal Complaints Committee (ICC)**

```
[ GGTU Exam & Results ] [ Scholarships ] [ Grievance Redressal (ICC) ] [ Anti-Ragging ] [ Time Table ] [ Code of Conduct ]
```

- **Tab 1: GGTU Exam & Results**:
  - Direct links to GGTU Banswara Exam Portal (`sisums.in/GGTU`), Exam form submission steps, and Result checking.
- **Tab 2: Scholarships**:
  - Post-Matric Tribal Scholarship (TAD / Social Justice & Empowerment Dept Rajasthan).
  - CM Higher Education Scholarship.
  - Application deadlines and eligibility checklist.
- **Tab 3: Grievance Redressal & ICC (Internal Complaints Committee)**:
  - Committee members list with contact mobile numbers.
  - Statutory UGC guidelines on prevention of sexual harassment.
  - Confidential online grievance submission form.
- **Tab 4: Anti-Ragging**:
  - Anti-Ragging affidavit link (amanmovement.org / antiragging.in).
  - Campus Anti-Ragging squad contact directory.
  - Statutory punishment notice.
- **Tab 5: Time Table**:
  - Downloadable academic time tables for Arts, Science, and Education.
- **Tab 6: Code of Conduct**:
  - Student rules, attendance minimum requirements (75%), identity cards, campus etiquette.

---

### 2.4 Archetype D: Infrastructure & Campus Tour Tabs
Used for: **Infrastructure, Library, Sports, Laboratories, Hostels**

```
[ Academic Blocks ] [ Central Library & NDL ] [ Science & EdTech Labs ] [ Sports & Grounds ] [ Campus Amenities ] [ Safety & Land Certs ]
```

- **Tab 1: Academic Blocks**:
  - Smart classrooms, lecture halls, seminar auditorium, biometric attendance, Wi-Fi zones.
- **Tab 2: Central Library**:
  - Book volumes (10,000+ books), journals, reading room capacity, National Digital Library of India (NDLI) club.
- **Tab 3: Science & Educational Technology Labs**:
  - High-res photo gallery with descriptions of physics apparatus, chemical storage, zoology specimens, botany herbarium, and language/computer labs.
- **Tab 4: Sports & Fitness**:
  - Cricket ground, volleyball court, badminton, indoor games (table tennis, chess), annual athletic meet.
- **Tab 5: Campus Amenities**:
  - Pure RO drinking water, power backup generator, green solar energy, canteen, girls' common room.
- **Tab 6: Statutory Safety & Land Certificates (NCTE & State Compliant)**:
  - Blue print layout of building `[PDF]`
  - Building stability & safety certificate `[PDF]`
  - Land title & conversion documents `[PDF]`
  - Fire safety NOC `[PDF]`

---

## 3. UI Component Construction Rules

### 3.1 Tab Buttons CSS Pattern
```css
/* Tab Navigation Bar */
.academic-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 24px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
}

.academic-tab-btn {
  padding: 12px 20px;
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #002147;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.academic-tab-btn:hover {
  color: #9b0c23;
  background: #fcf0f2;
}

.academic-tab-btn.active {
  color: #9b0c23;
  border-bottom-color: #9b0c23;
  background: #ffffff;
}
```

### 3.2 Responsive Download Table Pattern
```css
/* Statutory Table Style */
.statutory-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
}

.statutory-table th {
  background-color: #002147;
  color: #ffffff;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
}

.statutory-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
}

.statutory-table tr:nth-child(even) {
  background-color: #f8f9fc;
}

.statutory-table tr:hover {
  background-color: #fcf0f2;
}

.btn-pdf-download {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background-color: #9b0c23;
  color: #ffffff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.btn-pdf-download:hover {
  background-color: #7a091b;
}
```

---

## 4. Breadcrumb Navigation Component
Every sub-page will feature a standardized institutional breadcrumb:
```html
<nav class="breadcrumb-container" aria-label="Breadcrumb">
  <div class="container">
    <ol class="breadcrumb-list">
      <li><a href="index.html"><i class="fa fa-home"></i> Home</a></li>
      <li><a href="academics.html">Academics</a></li>
      <li class="active" aria-current="page">Faculty of Arts</li>
    </ol>
  </div>
</nav>
```
- **Height**: 44px
- **Background**: `#f8f9fc` with a bottom border `#e2e8f0`.
- **Text**: Slate Gray `#64748b` with home icon, active item in bold `#002147`.
