# Gurukripa Peeth Redesign — Homepage Layout & Section Specifications
> Detailed wireframe and section-by-section breakdown for the flagship homepage of Gurukripa Shikshan Sansthan College, Peeth.

---

## 1. Homepage Master Architecture Overview

The homepage is organized into **14 sequential visual zones**, engineered to deliver instant institutional credibility, effortless scannability, and rich interactive engagement:

```
[ ZONE 1 ]: Top Institutional Utility Bar (NAAC Badge, Affiliation, Quick Links, SSO)
[ ZONE 2 ]: College Branding & Identity Header (Emblem, Hindi/English Names, Contacts)
[ ZONE 3 ]: Main Sticky Mega-Navigation Bar (12 Modules + Quick Search + Apply CTA)
[ ZONE 4 ]: Urgent Announcement Marquee Ticker (Real-Time Scrolling Alerts)
[ ZONE 5 ]: Hero Banner Visual Slider + Quick Admission Action Box (65% / 35% Split)
[ ZONE 6 ]: Key Statutory & Student Portals (6 Elevated Accent Cards)
[ ZONE 7 ]: Flagship Institutional Initiative (Featured Event / Mahotsav Showcase)
[ ZONE 8 ]: Leadership Desk (Director’s Vision & Principal’s Welcome Message)
[ ZONE 9 ]: Academic Faculties & Programs Explorer (Tabbed Degree Switcher)
[ ZONE 10]: Quality Assurance & Accreditation Showcase (NAAC & IQAC Hub)
[ ZONE 11]: Tri-Column Live Campus Board (Notice Board | Upcoming Events | Press Media)
[ ZONE 12]: Institutional Impact & Numerical Milestones (Animated Stat Counters)
[ ZONE 13]: Campus Life & Infrastructure Showcase (Interactive Filterable Gallery)
[ ZONE 14]: Grand Academic Footer (4-Column Directory + Statutory Badges + Copyright)
```

---

## 2. Granular Section Breakdown

### Zone 1: Top Institutional Utility Bar
- **Visual Style**: Clean height (38px), background `#002147` (Deep Oxford Blue), text `#ffffff`, font-size 13px.
- **Left Elements**:
  - Golden Badge: `<span class="badge-gold">NAAC Accr. / Quality Compliant</span>`
  - Affiliation Text: *"Affiliated to Govind Guru Tribal University (GGTU), Banswara | Recognized by NCTE & Govt. of Rajasthan"*
- **Right Elements**:
  - Quick Links: `Downloads` | `Student Feedback` | `Alumni Portal` | `National Digital Library (NDLI)` | `Admin Login`
  - Font Size Adjuster (`A-` | `A` | `A+`) & Bilingual toggle (`EN` | `हिंदी`).

---

### Zone 2: College Branding & Identity Header
- **Visual Style**: Height 100px–110px, background `#ffffff` with subtle bottom border `#e2e8f0`.
- **Left Identity**:
  - High-resolution College Crest / Emblem (75px × 75px).
  - Main Institutional Name:
    - English: **Gurukripa Shikshan Sansthan College, Peeth** (Font: PT Serif / Raleway, 24px, Bold, `#002147`).
    - Hindi: **गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ (डूंगरपुर)** (Font: Noto Sans Devanagari, 18px, `#9b0c23`).
    - Tagline: *"A Premier Center of Higher Education & Teacher Training in Southern Rajasthan"*.
- **Right Contact Badges**:
  - Call Desk: `📞 9587433001, 9610587077` (Subtext: *Admission & Enquiry Helpline*).
  - Email Desk: `✉️ gurukripa.peeth@gmail.com` (Subtext: *Official Communications*).

---

### Zone 3: Main Sticky Mega-Navigation Bar
- **Visual Style**: Height 56px, background `#002147`, sticky on scroll (`position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.1)`).
- **Navigation Elements**:
  1. **Home**
  2. **About Us** ▾ (Intro, Director/Principal Messages, Vision/Mission, History, Committees, Infrastructure, Organogram, RTI, Sanstha Geet)
  3. **Academics** ▾ (Faculty of Arts, Faculty of Science, Faculty of Education - B.Ed., Integrated B.A. B.Ed. & B.Sc. B.Ed., Subject Combos, Outcomes)
  4. **Admissions** ▾ (Session 2026-27, Merit Lists, Admission Policy, Fee Structure, Seat Matrix, Apply Online)
  5. **Activities** ▾ (NSS, NCC/Scouts, Cultural, Sports, Literary, Women Cell, Red Ribbon, Eco-Club)
  6. **Student Corner** ▾ (GGTU Exam Portal, Results, Scholarships, Time Tables, Central Library, Anti-Ragging, ICC)
  7. **Circulars & Reports** ▾ (HTE Orders, Annual Reports, Book Bank, Environmental Audit)
  8. **Faculty & Staff** ▾ (Teaching Profiles, Non-Teaching Staff, Downloads)
  9. **IQAC** ▾ (About, Committee, AQAR Archive, Meeting Minutes, Feedback, Best Practices)
  10. **NAAC** ▾ (7 Criteria, SSR, IIQA, DVV Clarifications, Grade Sheet, Land/Safety NOCs)
  11. **Alumni** ▾ (Registration, Distinguished Alumni, Association)
  12. **Contact Us**
- **Action Button on Right**: Crimson Pill Button `[ Apply Online 2026-27 ]` with pulsating badge.

---

### Zone 4: Urgent Announcement Marquee Ticker
- **Visual Style**: Height 40px, background `#fcf0f2`, border-top: 1px solid `#f3c8cf`, border-bottom: 1px solid `#f3c8cf`.
- **Badge Label**: Solid Maroon block `#9b0c23`, white text, bold, *"LATEST UPDATES / ताज़ा सूचनाएँ"*.
- **Ticker Content**: Smooth continuous scroll with links:
  - *"📢 Online Admission Form open for B.A., B.Sc., and B.Ed. for Academic Session 2026–27."*
  - *"📝 GGTU Annual Examination 2026 Time Table released. Download from Student Corner."*
  - *"🎓 National Tribal Education Seminar scheduled for next month. Call for Papers open."*
  - *"⭐ Post-Matric Scholarship portal open for ST/SC/OBC students on SSO Rajasthan."*

---

### Zone 5: Hero Visual Banner + Quick Admission Box (65% / 35%)
- **Left (65% width)**:
  - High-Resolution Responsive Slider with 4 rotating slides:
    1. *Majestic Campus Building & Academic Blocks*
    2. *State-of-the-Art Science & Educational Technology Laboratories*
    3. *Convocation, Annual Function & Cultural Fest Celebrations*
    4. *NSS Rural Development Camps & Community Outreach*
  - Slide Captions: Bold white headings with semi-transparent frosted glass backdrop and "Explore Programs" CTA button.
- **Right (35% width)**:
  - **"Quick Admission & Portals Gateway"** card with dark royal header `#002147`:
    - Fast dropdown: Select Stream (`B.A.` / `B.Sc.` / `B.Ed.` / `B.A. B.Ed.` / `B.Sc. B.Ed.`)
    - Select Year / Semester
    - Action Buttons: `[ Apply for Admission ]`, `[ Download Prospectus 2026-27 ]`, `[ View Cut-Off Lists ]`.
    - Emergency Helpdesk contact & WhatsApp direct link.

---

### Zone 6: Key Statutory & Student Portals (6 Elevated Grid Cards)
Modeled after GMGC Udaipur's prominent service icon grid:
1. **Admissions 2026–27**: Guidelines, eligibility, seat availability, online portal.
2. **GGTU Exam & Results**: University admit cards, exam schedules, marksheets gateway.
3. **NAAC & IQAC Hub**: Evaluative criteria, AQAR reports, quality benchmarks.
4. **Scholarship Portal**: Rajasthan TAD, Post-Matric, CM Higher Education forms.
5. **Class Time Tables**: Regular lecture schedules for Arts, Science & B.Ed.
6. **Student Grievance & ICC**: 24/7 confidential online grievance redressal.

*Styling*: Pure white cards, 1px `#e2e8f0` border, maroon top accent bar, hover elevation with smooth cubic-bezier transition.

---

### Zone 7: Flagship Institutional Initiative (Diver Vijay Mahotsav Inspired)
Modeled directly after the prominent **"Diver Vijay Mahotsav / Institutional Spirit"** section on GMGC Udaipur:
- **Left Column (50%)**:
  - Pre-title Tag: `<span class="initiative-tag">EXCELLENCE IN TRIBAL EDUCATION</span>`
  - Headline: **Nurturing Future Educators & Nation Builders in Vagad Region**
  - Subtitle: *Bridging Traditional Values with 21st-Century Pedagogical Skills*
  - Paragraph copy explaining Gurukripa Peeth's unique commitment to empowering tribal and rural youth through teacher education (B.Ed., Integrated B.A. B.Ed. / B.Sc. B.Ed.) and mainstream graduate studies.
  - Highlight Quote Box with left crimson border `#9b0c23`:
    > *"Education is the most powerful weapon to ignite self-reliance and social transformation in our youth."*
  - CTA Button: `[ Read About Our Institutional Impact → ]`
- **Right Column (50%)**:
  - 2×2 Dynamic Image Grid showcasing classroom teaching, science lab work, community field work, and cultural heritage.

---

### Zone 8: Leadership Messages (Principal & Director Desk)
- Two equal-width executive cards side-by-side:
  - **Director's Desk**: Photo, Name, Message focusing on institutional vision, infrastructure development, and long-term academic excellence.
  - **Principal's Desk**: Photo, Name, Message focusing on academic discipline, holistic student mentoring, university curriculum delivery, and NAAC quality standards.
  - Signed credentials and direct email addresses.

---

### Zone 9: Academic Faculties & Programs Explorer (Tabbed Switcher)
Interactive tabbed panel allowing instant exploration of courses:
- **Tab 1: Faculty of Arts (B.A.)**: Subjects (History, Political Science, Hindi Literature, Sanskrit, Sociology, Geography, Economics), eligibility (10+2), 3-Year duration.
- **Tab 2: Faculty of Science (B.Sc.)**: Biology group (CBZ), Mathematics group (PCM), lab facilities, eligibility.
- **Tab 3: Faculty of Education (B.Ed. Programs)**:
  - Two-Year B.Ed. (Post-Graduation / Graduation entry via PTET).
  - Four-Year Integrated B.A. B.Ed. (Direct entry after 10+2).
  - Four-Year Integrated B.Sc. B.Ed. (Direct entry after 10+2 Science).
  - NCTE Recognition details and curriculum structure.
- **Tab 4: Skill & Certificate Courses**: Computer literacy, communicative skills, yoga & physical fitness.

---

### Zone 10: Quality Assurance & Accreditation Showcase (NAAC & IQAC)
- Clean card with royal navy background `#002147` and gold highlights:
  - Overview of NAAC Assessment & Peer Review readiness.
  - 7 Criteria Quick Selector Pills (Criterion 1 to 7).
  - Direct download links for recent AQAR reports, Institutional Strategic Plan, and Code of Ethics.
  - Stakeholder Feedback buttons: Student, Faculty, Parent, Alumni.

---

### Zone 11: Tri-Column Live Information Board
Three equal-width dynamic cards in a single responsive row:
1. **Notice Board**:
   - Scrollable card with pinned notices, admission circulars, holiday notifications, and exam schedules with date badges.
2. **Upcoming Events & Calendar**:
   - Date badge (e.g. `28 MAR`), Event title, venue, and countdown for NSS camps, sports meets, seminars.
3. **Press Releases & Media**:
   - News clippings, photos of college achievements, university sports championships, and cultural awards.

---

### Zone 12: Institutional Impact & Numerical Milestones (Animated Stat Counters)
- Full-width Crimson banner `#9b0c23` with white and gold typography:
  - **1,500+** *Students Enrolled Annually*
  - **45+** *Qualified & Dedicated Faculty*
  - **98%** *Examination Pass Rate*
  - **15+** *Acres Lush Green Campus*
  - **10,000+** *Library Volumes & Digital Resources*
  - **100%** *NCTE & University Approved Programs*

---

### Zone 13: Campus Facilities & Infrastructure Tour
- Categorized filter tabs: `[All] [Classrooms] [Laboratories] [Library] [Sports & Grounds] [Campus Greenery]`
- Lightbox-ready image grid with captions, highlighting spacious lecture halls, botanical surroundings, and student amenities.

---

### Zone 14: Grand Academic Institutional Footer
- **Background**: `#00152e` (Dark Midnight Navy) with top gold accent rule `#ffb606`.
- **Column 1: Institutional Profile**:
  - College crest, brief summary of Gurukripa Peeth, affiliation to GGTU Banswara, NCTE approval, AISHE code.
- **Column 2: Quick Links & Portals**:
  - GGTU Banswara Official Site, Rajasthan Higher Education (HTE), National Digital Library, SSO Rajasthan Portal, NCTE Official Portal.
- **Column 3: Statutory & Quality Cells**:
  - NAAC Documents, IQAC Cell, RTI Guidelines, Anti-Ragging Helpline, Internal Complaints Committee (ICC), AISHE Reports, College Bulletin.
- **Column 4: Contact & Location**:
  - Address: Gurukripa Shikshan Sansthan College, Peeth, Tehsil Simalwara, Dist. Dungarpur, Rajasthan - 314401.
  - Phone: +91-9587433001, +91-9610587077.
  - Email: gurukripa.peeth@gmail.com.
  - Working Hours: Monday – Saturday (10:00 AM – 05:00 PM).
- **Sub-Footer Bar**:
  - Copyright © 2026 Gurukripa Shikshan Sansthan College, Peeth. All Rights Reserved.
  - Statutory Disclaimer, Privacy Policy, Terms of Use.
  - Admin Login Portal link (`https://gurukripapeeth.in/admin`).
