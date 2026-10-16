# Gurukripa Peeth Redesign — Admin & Data Architecture Mapping
> Technical mapping connecting the existing Gurukripa Peeth Admin System (`https://gurukripapeeth.in/admin`) to the redesigned frontend structure.

---

## 1. Existing Admin Infrastructure Overview

The current Gurukripa Peeth website runs on a standard PHP/MySQL stack managed via a custom administrative control panel:
- **Admin Gateway**: `https://gurukripapeeth.in/admin`
- **Primary Modules Observed in Current Site**:
  1. `page.php?id={n}` (Dynamic content pages: Director Message, Principal Message, Objectives/Aims, Mission/Vision, Rooms Details, Courses, University Affiliation, Govt NOC, Teaching Staff, Guest Lectures, RTI, etc.)
  2. `downloads.php` (Centralized downloadable statutory documents, PDF notifications, admission lists)
  3. `gallery/` (Document uploads, certificates, land blueprints, building safety certificates, option banners)
  4. Slider management (Hero banners & promotional images)
  5. News & Notices ticker updates

---

## 2. Dynamic Data-to-Frontend Component Mapping

The table below specifies how each existing dynamic data point from the Admin Panel populates the modernized redesign:

| Existing Admin Data Source | Current Frontend Representation | Redesigned Frontend Component (GMGCU Standard) |
|---|---|---|
| **Page ID 1** (`page.php?id=1`) | Raw unformatted text block for Principal Message | **Executive Leadership Card** on Homepage + dedicated full-page Principal's Message layout with photo, credentials, signature, and message archive. |
| **Page ID 2** (`page.php?id=2`) | Raw text block for Director Message | **Director’s Desk** component on Homepage & About Us module with institutional vision statement. |
| **Page ID 19 & 20** (`id=19, id=20`) | Plain text for Aims, Mission & Vision | **Interactive Core Values & Philosophy Grid** with iconography, bilingual Devanagari translation, and NAAC Criterion 6 alignment. |
| **Page ID 18** (`page.php?id=18`) | Simple course list | **Interactive Programs Explorer** tabbed interface (Arts, Science, B.Ed., Integrated B.A. B.Ed. & B.Sc. B.Ed.) with eligibility, fee notes, and syllabus links. |
| **Page ID 23** (`page.php?id=23`) | Unstyled list of teaching faculty | **Faculty Directory Card Grid** (Photo, Designation, Department, Qualifications, Subjects, Email, Research). |
| **Page ID 13 & 3** (`id=13, id=3`) | University Affiliation & Govt NOC | **Statutory Affiliations & Approvals Accordion** with downloadable GGTU Banswara & NCTE approval letters. |
| **Page ID 21 & 22** (`id=21, id=22`) | RTI & Room Details | **RTI Statutory Cell Page** (PIO contact, RTI Act guidelines, fee, appeal authority) + **Infrastructure Specs Table**. |
| **Document Uploads** (`/gallery/documents/*.pdf`) | Raw unstyled hyperlinks | **Standardized Statutory Download Tables** with red PDF badges, file size indicator, session label, and one-click viewer. |
| **Image Slider Uploads** | Revolution Slider assets | **High-Definition Responsive Hero Slider** with dynamic text overlay, progress indicator, and mobile optimization. |

---

## 3. Database Schema Recommendations for Enhanced Modules

To support the newly introduced NAAC, IQAC, and Admissions modules, the following database tables or fields can be seamlessly introduced into the admin backend:

### 3.1 `iqac_aqar` Table
```sql
CREATE TABLE IF NOT EXISTS `iqac_aqar` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `academic_session` VARCHAR(50) NOT NULL, -- e.g. "2024-25"
  `title` VARCHAR(255) NOT NULL,           -- e.g. "Annual Quality Assurance Report 2024-25"
  `file_url` VARCHAR(255) NOT NULL,        -- PDF path in /gallery/documents/
  `status` ENUM('Submitted', 'Approved', 'Draft') DEFAULT 'Submitted',
  `submission_date` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 `admissions_merit` Table
```sql
CREATE TABLE IF NOT EXISTS `admissions_merit` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `academic_session` VARCHAR(50) NOT NULL, -- e.g. "2026-27"
  `stream` VARCHAR(50) NOT NULL,           -- "Arts", "Science", "B.Ed", "Integrated"
  `list_type` VARCHAR(50) NOT NULL,        -- "Provisional", "Waiting", "Final Admitted"
  `category` VARCHAR(50) NOT NULL,         -- "General", "OBC", "SC", "ST", "EWS"
  `title` VARCHAR(255) NOT NULL,
  `file_url` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.3 `college_notices` Table
```sql
CREATE TABLE IF NOT EXISTS `college_notices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `notice_title` VARCHAR(255) NOT NULL,
  `category` ENUM('Admission', 'Examination', 'General', 'NAAC', 'Sports') DEFAULT 'General',
  `notice_date` DATE NOT NULL,
  `file_url` VARCHAR(255) NULL,
  `is_marquee` TINYINT(1) DEFAULT 0,       -- 1 to show in top ticker
  `is_pinned` TINYINT(1) DEFAULT 0,        -- 1 to pin to top of notice board
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Phased Deployment & Preservation Strategy

1. **Zero Downtime**: The existing live website and admin panel continue operating without disruption while new frontend templates are prepared and tested.
2. **Backward Compatibility**: All existing file paths (`/gallery/documents/*`, `/gallery/option/*`) and `page.php?id={n}` routes remain fully functional or cleanly redirected.
3. **Template Modernization**: The static HTML/CSS/JS frontend templates can be directly integrated with PHP `include` headers and footers (`header.php`, `footer.php`, `nav.php`) for easy ongoing maintenance by college staff.
