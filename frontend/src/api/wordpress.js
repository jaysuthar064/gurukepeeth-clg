/**
 * WordPress Headless REST API Client
 */

const API_BASE = import.meta.env.VITE_WP_API_URL || '';

export async function fetchJson(endpoint, fallback = null) {
  try {
    const separator = endpoint.includes('?') ? '&' : '?';
    const res = await fetch(`${API_BASE}${endpoint}${separator}_t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });

    if (!res.ok) {
      console.warn(`API error on ${endpoint}: ${res.status}`);
      return fallback;
    }
    return await res.json();
  } catch (err) {
    console.warn(`Fetch failed for ${endpoint}:`, err.message);
    return fallback;
  }
}

// 1. Global Institutional Settings
export async function getSettings() {
  const fallback = {
    college_name: 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH',
    college_hindi: 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ',
    college_subtitle: 'Run by Shree Narayan Shiksha Seva Samiti Peeth • Affiliated to GGTU Banswara',
    tagline: 'Nurturing Intellect, Cultivating Character, Empowering Society',
    trust_name: 'Shree Narayan Shiksha Seva Samiti Peeth',
    trust_reg_no: '55/DUNGARPUR/2013-14',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    aishe_code: 'C-48902',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
    phone_primary: '+91 95874 33001',
    phone_secondary: '+91 96105 87077',
    email_info: 'gurukripa.peeth@gmail.com',
    email_principal: 'gurukripa.peeth@gmail.com',
    address: 'Gurukripa Shikshan Sansthan College, Peeth, Tehsil Simalwara, Dungarpur, Rajasthan - 314001, India',
    marquee_announcement: 'Admissions Open 2026-27 for B.A. and B.Sc. (Bio) Degree Programs — Apply Online Now!',
    logo_url: '/images/college-logo.png',
  };

  const res = await fetchJson('/wp-json/gurukapeeth/v1/settings', fallback);
  if (res) {
    res.college_name = 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH';
    res.college_hindi = 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ';
    res.trust_name = 'Shree Narayan Shiksha Seva Samiti Peeth';
    res.trust_reg_no = '55/DUNGARPUR/2013-14';
    if (!res.college_subtitle || res.college_subtitle.toLowerCase().includes('teacher') || res.college_subtitle.toLowerCase().includes('ncte')) {
      res.college_subtitle = 'Run by Shree Narayan Shiksha Seva Samiti Peeth • Affiliated to GGTU Banswara';
    }
    if (res.marquee_announcement && (res.marquee_announcement.toLowerCase().includes('b.ed') || res.marquee_announcement.toLowerCase().includes('integrated') || res.marquee_announcement.toLowerCase().includes('ncte'))) {
      res.marquee_announcement = 'Admissions Open 2026-27 for B.A. and B.Sc. (Bio) Degree Programs — Apply Online Now!';
    }
  }
  return res || fallback;
}

// 2. Complete Homepage Assembled Data
export async function getHomepageData() {
  const data = await fetchJson('/wp-json/gurukapeeth/v1/homepage', null);
  if (data) {
    if (data.hero && data.hero.subheading && (data.hero.subheading.toLowerCase().includes('ncte') || data.hero.subheading.toLowerCase().includes('teacher'))) {
      data.hero.subheading = 'Affiliated with Govind Guru Tribal University (GGTU), Banswara & Approved by Govt. of Rajasthan';
    }
    if (data.settings) {
      data.settings.college_name = 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH';
      data.settings.college_hindi = 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ';
      data.settings.trust_name = 'Shree Narayan Shiksha Seva Samiti Peeth';
      data.settings.college_subtitle = 'Run by Shree Narayan Shiksha Seva Samiti Peeth • Affiliated to GGTU Banswara';
    }
    if (Array.isArray(data.programs)) {
      data.programs = data.programs
        .filter(p => {
          const t = (p.title?.rendered || p.title || '').toLowerCase();
          const s = (p.stream || '').toLowerCase();
          return !t.includes('b.ed') && !t.includes('d.el.ed') && !t.includes('bstc') && !t.includes('integrated') && !s.includes('teacher');
        })
        .map(p => {
          const t = (p.title?.rendered || p.title || '').toLowerCase();
          const isBA = t.includes('b.a.') || (p.stream || '').toLowerCase().includes('arts');
          return {
            ...p,
            title: isBA ? 'Bachelor of Arts (B.A.)' : 'Bachelor of Science (B.Sc. - Biology / CBZ)',
            intake: isBA ? '160 Seats' : '140 Seats',
            stream: isBA ? 'Faculty of Arts' : 'Faculty of Science',
          };
        });
    }
  }
  return data;
}

// 3. Marquee Ticker & Recent Announcements
export async function getMarqueeData() {
  const fallback = {
    announcement: 'Admissions Open 2026-27 for B.A. and B.Sc. Degree Programs — Apply Online Now!',
    notices: [],
  };
  const res = await fetchJson('/wp-json/gurukapeeth/v1/marquee', fallback);
  if (res && res.announcement) {
    if (res.announcement.toLowerCase().includes('b.ed') || res.announcement.toLowerCase().includes('integrated') || res.announcement.toLowerCase().includes('ncte')) {
      res.announcement = 'Admissions Open 2026-27 for B.A. and B.Sc. Degree Programs — Apply Online Now!';
    }
  }
  return res || fallback;
}

// 4. Navigation Menu Structure
export async function getNavigation() {
  return await fetchJson('/wp-json/gurukapeeth/v1/navigation', null);
}

// 5. Faculty & Staff Directory
export async function getFaculty() {
  return await fetchJson('/wp-json/gurukapeeth/v1/faculty', [
    {
      id: 1,
      seniority: 1,
      name: 'Dr. Hari Shanker Maru',
      designation: 'Principal',
      post_category: 'PRINCIPAL',
      subject: 'Hindi Literature',
      department: 'Administration & Faculty of Arts',
      stream: 'arts',
      qualification: 'Retd. Govt. Principal, Ph.D., M.A. (Hindi)',
      experience: '28+ Years',
      specialization: 'Hindi Literature & Institutional Governance',
      photo_url: '',
      initials: 'HM',
    },
    {
      id: 2,
      seniority: 2,
      name: 'Mrs. Priyanka Pandya',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Political Science',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed., M.Lib.',
      experience: '8+ Years',
      specialization: 'Political Science & Library Information Systems',
      photo_url: '',
      initials: 'PP',
    },
    {
      id: 3,
      seniority: 3,
      name: 'Mr. Rajesh Kumar Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Sanskrit Literature',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '8+ Years',
      specialization: 'Classical Sanskrit Literature & Vedic Grammar',
      photo_url: '',
      initials: 'RD',
    },
    {
      id: 4,
      seniority: 4,
      name: 'Mr. Ashok Kumar Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Geography',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '8+ Years',
      specialization: 'Physical Geography & Regional Cartography',
      photo_url: '/images/faculty/ashok-kumar-damor.jpeg',
      initials: 'AD',
    },
    {
      id: 5,
      seniority: 5,
      name: 'Mr. Ramesh Chandra Pargi',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'History',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'B.A., B.Ed.',
      experience: '7+ Years',
      specialization: 'Indian History & Tribal Heritage Studies',
      photo_url: '',
      initials: 'RP',
    },
    {
      id: 6,
      seniority: 6,
      name: 'Mrs. Priyanka Rathore',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - B.Sc',
      subject: 'Zoology',
      department: 'Faculty of Science',
      stream: 'science',
      qualification: 'M.Sc., B.Ed.',
      experience: '7+ Years',
      specialization: 'Cell Biology, Entomology & Animal Physiology',
      photo_url: '/images/faculty/priyanka-rathore.jpeg',
      initials: 'PR',
    },
    {
      id: 7,
      seniority: 7,
      name: 'Ms. Laxmi Labana',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'English Literature',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '7+ Years',
      specialization: 'English Literature & Applied Linguistics',
      photo_url: '',
      initials: 'LL',
    },
    {
      id: 8,
      seniority: 8,
      name: 'Mr. Mithun Kumar Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Economics',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '6+ Years',
      specialization: 'Development Economics & Tribal Financial Studies',
      photo_url: '/images/faculty/mithun-kumar-damor.jpeg',
      initials: 'MD',
    },
    {
      id: 9,
      seniority: 9,
      name: 'Mr. Bhura Lal Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Political Science',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '6+ Years',
      specialization: 'Indian Political Thought & Constitutional Governance',
      photo_url: '/images/faculty/bhuralal-damor.jpeg',
      initials: 'BD',
    },
    {
      id: 10,
      seniority: 10,
      name: 'Ms. Shilpa Kumari Labana',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - B.Sc',
      subject: 'Botany',
      department: 'Faculty of Science',
      stream: 'science',
      qualification: 'M.Sc., B.Ed.',
      experience: '5+ Years',
      specialization: 'Plant Physiology, Cytology & Taxonomy',
      photo_url: '/images/faculty/shilpa-labana.jpeg',
      initials: 'SL',
    },
    {
      id: 11,
      seniority: 11,
      name: 'Mr. Pratap Singh Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Hindi Literature',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '5+ Years',
      specialization: 'Modern Hindi Literature & Folk Pedagogy',
      photo_url: '/images/faculty/pratap-singh-damor.jpeg',
      initials: 'PD',
    },
    {
      id: 12,
      seniority: 12,
      name: 'Ms. Divya Kalal',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - B.Sc',
      subject: 'Chemistry',
      department: 'Faculty of Science',
      stream: 'science',
      qualification: 'M.Sc., B.Ed.',
      experience: '5+ Years',
      specialization: 'Inorganic Chemistry & Analytical Chemical Methods',
      photo_url: '/images/faculty/divya-kalal.jpeg',
      initials: 'DK',
    },
  ]);
}

// 6. Academic Programs
export async function getPrograms() {
  const list = await fetchJson('/wp-json/gurukapeeth/v1/programs', []);
  if (Array.isArray(list)) {
    return list.filter(p => {
      const t = (p.title?.rendered || p.title || '').toLowerCase();
      const s = (p.stream || '').toLowerCase();
      return !t.includes('b.ed') && !t.includes('d.el.ed') && !t.includes('bstc') && !t.includes('integrated') && !s.includes('teacher');
    });
  }
  return list;
}

// 7. Notices & Circulars
export async function getNotices() {
  return await fetchJson('/wp-json/gurukapeeth/v1/notices', []);
}

// 8. NAAC SSR Documents
export async function getNaacDocuments() {
  return await fetchJson('/wp-json/gurukapeeth/v1/naac', []);
}

// 9. IQAC Reports & AQAR
export async function getIqacReports() {
  return await fetchJson('/wp-json/gurukapeeth/v1/iqac', []);
}

// 10. Admission Lists & Cutoffs
export async function getAdmissions() {
  return await fetchJson('/wp-json/gurukapeeth/v1/admissions', []);
}

// 11. Leadership Messages
export async function getLeadership() {
  return await fetchJson('/wp-json/gurukapeeth/v1/leadership', [
    {
      id: 1,
      role_key: 'director',
      name: "Chairman & Director's Desk",
      role_title: 'Director / Chairman',
      qualifications: 'Mr. Kalu Ram Labana',
      message: 'Gurukripa Peeth College is committed to delivering quality higher education and teacher training to the youth of Southern Rajasthan. Our mission is to combine academic excellence, moral integrity, and regional development to shape empowered leaders for the nation.',
      photo_url: '',
    },
    {
      id: 2,
      role_key: 'secretary',
      name: "Secretary's Desk",
      role_title: 'Secretary',
      qualifications: 'Mr. Vipin Kumar Labana',
      message: 'We prioritize learner-centric infrastructure, transparent administration, and comprehensive student support. Gurukripa Peeth stands as a beacon of opportunity for tribal and rural scholars to achieve excellence in higher education and pedagogical careers.',
      photo_url: '',
    },
    {
      id: 3,
      role_key: 'principal',
      name: "Principal's Desk",
      role_title: 'Principal & Head of Institution',
      qualifications: 'Dr. Hari Shanker Maru, Ph.D., M.A. (Hindi)',
      message: 'Welcome to Gurukripa Peeth College. Our academic framework integrates curricular rigor with ethical character building, experiential learning, and community engagement under GGTU and UGC standards.',
      photo_url: '',
    },
  ]);
}

// 12. Mandatory Statutory Disclosures
export async function getDisclosures() {
  return await fetchJson('/wp-json/gurukapeeth/v1/disclosures', {
    documents: [
      {
        id: 1,
        category: 'govt_noc',
        title: 'Rajasthan Govt. Permanent NOC — Faculty of Arts (B.A.)',
        description: 'Permanent No Objection Certificate (स्थायी अनापत्ति प्रमाण पत्र) granted by Commissionerate of College Education, Govt. of Rajasthan, Jaipur (Order: एफ4 (54)आकाशि/नि.सं./2014/1128) for B.A. Arts subjects.',
        issued_date: '05 Mar 2021',
        pdf_url: '/documents/noc/rajasthan-govt-permanent-noc-ba-arts.pdf',
      },
      {
        id: 2,
        category: 'govt_noc',
        title: 'Rajasthan Govt. Permanent NOC — Faculty of Science (B.Sc. Biology)',
        description: 'Permanent No Objection Certificate (स्थायी अनापत्ति प्रमाण पत्र) granted by Commissionerate of College Education, Govt. of Rajasthan, Jaipur (Order: एफ4 (54)आकाशि/नि.सं./2014/20) for B.Sc. Biology Group (Chemistry, Zoology, Botany).',
        issued_date: '06 Aug 2021',
        pdf_url: '/documents/noc/rajasthan-govt-permanent-noc-bsc-biology.pdf',
      },
      {
        id: 3,
        category: 'affiliation',
        title: 'GGTU Affiliation Order — Session 2025-26',
        description: 'Provisional Affiliation Order from Govind Guru Tribal University, Banswara (Order No. F/GGTU/Affiliation/2025/1992) for B.A. (80 seats) and B.Sc. (70 seats).',
        issued_date: '11 Jul 2025',
        pdf_url: '/documents/affiliation/ggtu-affiliation-2025-26.pdf',
      },
      {
        id: 4,
        category: 'affiliation',
        title: 'GGTU Affiliation Order — Session 2024-25',
        description: 'Provisional Affiliation Order from Govind Guru Tribal University, Banswara (Order No. F/GGTU/Affiliation/2024/731-39) for B.A. (80 seats) and B.Sc. (70 seats).',
        issued_date: '07 Dec 2024',
        pdf_url: '/documents/affiliation/ggtu-affiliation-2024-25.pdf',
      },
      {
        id: 5,
        category: 'affiliation',
        title: 'GGTU Affiliation Order — Session 2022-23',
        description: 'Provisional Affiliation Order from Govind Guru Tribal University, Banswara (Order No. F.1/GGTU/Affiliation/BSW/2022/626) for B.A. and B.Sc. courses.',
        issued_date: '13 Sep 2022',
        pdf_url: '/documents/affiliation/ggtu-affiliation-2022-23.pdf',
      },
      {
        id: 6,
        category: 'affiliation',
        title: 'GGTU Affiliation Order — Session 2021-22',
        description: 'Provisional Affiliation Order from Govind Guru Tribal University, Banswara (Order No. F/GGTU/Affi./2021/230-236) for B.A. and B.Sc. courses.',
        issued_date: '27 Nov 2021',
        pdf_url: '/documents/affiliation/ggtu-affiliation-2021-22.pdf',
      },
      {
        id: 8,
        category: 'registration',
        title: 'Society Registration Certificate — Shree Narayan Shiksha Seva Samiti Peeth',
        description: 'Official Registration Certificate granted under the Rajasthan Societies Registration Act, 1958 (Registration No: 55/DUNGARPUR/2013-14) by the Registrar of Societies, Dungarpur.',
        issued_date: '26 Jan 2024',
        pdf_url: '/documents/society-registration-certificate.jpeg',
      },
      {
        id: 81,
        category: 'registration',
        title: 'Executive Committee Order (नवीन कार्यकारिणी 2023-24) — Office of Assistant Registrar, Dungarpur',
        description: 'Official certified list of 16 Executive Committee members (अध्यक्ष: श्री कालूराम लबाना, सचिव: श्री विपिन कुमार लबाना, कोषाध्यक्ष: श्रीमती लक्ष्मी लबाना) approved by Office of Assistant Registrar, Cooperative Societies, Dungarpur.',
        issued_date: '26 Jan 2024',
        pdf_url: '/documents/society-executive-committee-2023-24.pdf',
      },
      {
        id: 9,
        category: 'fire_safety',
        title: 'Fire Safety & Prevention Certificate — Dungarpur Fire Department',
        description: 'Valid fire safety NOC issued by the Chief Fire Officer, Dungarpur District.',
        issued_date: '10 Jan 2026',
        pdf_url: '#',
      },
      {
        id: 10,
        category: 'building_noc',
        title: 'Building Safety Certificate & Structural Stability Report',
        description: 'Structural safety certificate issued by a Government-approved civil engineer for all campus buildings.',
        issued_date: '05 Feb 2026',
        pdf_url: '#',
      },
      {
        id: 11,
        category: 'fee_structure',
        title: 'Approved Fee Structure & Refund Policy — Session 2026-27',
        description: 'University-approved fee schedule for B.A. and B.Sc. with government scholarship adjustments.',
        issued_date: '15 Jun 2026',
        pdf_url: '#',
      },
      {
        id: 12,
        category: 'anti_ragging',
        title: 'Anti-Ragging Committee Constitution & Policy — Session 2026-27',
        description: 'Annual committee constitution as per UGC Regulation 2009 with member details and helpline numbers.',
        issued_date: '01 Aug 2026',
        pdf_url: '#',
      },
      {
        id: 13,
        category: 'icc',
        title: 'Internal Complaints Committee (ICC) — As per Vishakha Guidelines',
        description: 'Constituted ICC for prevention of sexual harassment at workplace as mandated by UGC.',
        issued_date: '01 Aug 2026',
        pdf_url: '#',
      },
      {
        id: 14,
        category: 'ugc_approval',
        title: 'UGC 2(f) & 12(B) Application Status',
        description: 'Current status of application under Section 2(f) and 12(B) of the UGC Act, 1956.',
        issued_date: '2025-26',
        pdf_url: '#',
      },
    ]
  });
}

// 13. Syllabus Hub & Exam Portal
export async function getExamHub() {
  return await fetchJson('/wp-json/gurukapeeth/v1/examhub', {
    syllabi: [
      { id: 1, session: '2026-27', program: 'B.A.', semester: 'Semester I', title: 'Hindi Literature — Gadya Sahitya', nep_compliant: true, pdf_url: 'https://www.ggtu.ac.in/Syllabus.php' },
      { id: 2, session: '2026-27', program: 'B.A.', semester: 'Semester I', title: 'Political Science — Bharatiya Rajvyavastha', nep_compliant: true, pdf_url: 'https://www.ggtu.ac.in/Syllabus.php' },
      { id: 3, session: '2026-27', program: 'B.Sc.', semester: 'Semester I', title: 'Botany — Diversity of Microbes & Cryptogams', nep_compliant: true, pdf_url: 'https://www.ggtu.ac.in/Syllabus.php' },
      { id: 4, session: '2026-27', program: 'B.Sc.', semester: 'Semester I', title: 'Chemistry — Inorganic & Organic Foundations', nep_compliant: true, pdf_url: 'https://www.ggtu.ac.in/Syllabus.php' },
      { id: 5, session: '2026-27', program: 'B.Sc.', semester: 'Semester I', title: 'Zoology — Animal Diversity & Cell Biology', nep_compliant: true, pdf_url: 'https://www.ggtu.ac.in/Syllabus.php' },
      { id: 6, session: '2026-27', program: 'B.A.', semester: 'Semester I', title: 'Geography — Physical Geography', nep_compliant: true, pdf_url: 'https://www.ggtu.ac.in/Syllabus.php' },
      { id: 7, session: '2025-26', program: 'B.A.', semester: 'Semester III', title: 'History — Medieval India', nep_compliant: false, pdf_url: 'https://www.ggtu.ac.in/Syllabus.php' },
      { id: 8, session: '2025-26', program: 'B.A.', semester: 'Semester III', title: 'Sanskrit Literature — Natak & Vyakaran', nep_compliant: false, pdf_url: 'https://www.ggtu.ac.in/Syllabus.php' },
    ],
    schedules: [
      {
        id: 1, session: '2026-27', type: 'NEP Portal',
        title: 'GGTU Student ERP Portal (Login, Exam Form, Results & Reval)',
        program: 'All UG Programs (B.A. & B.Sc.)', date: 'Active Portal',
        description: 'Official GGTU NEP ERP Portal for student login, examination form submission, admit cards, semester results, and revaluation.',
        url: 'https://erp.ggtuexam.com/',
      },
      {
        id: 2, session: '2026-27', type: 'Timetable',
        title: 'B.A. Semester I & III Exam Timetable',
        program: 'B.A.', date: '15 Nov 2026',
        description: 'Theory examination schedule for all B.A. semesters.',
        url: 'https://erp.ggtuexam.com/',
      },
      {
        id: 3, session: '2026-27', type: 'Timetable',
        title: 'B.Sc. Semester I & III Exam Timetable',
        program: 'B.Sc.', date: '18 Nov 2026',
        description: 'Theory + practical examination schedule.',
        url: 'https://erp.ggtuexam.com/',
      },
      {
        id: 4, session: '2025-26', type: 'Admit Card',
        title: 'B.Sc. Semester Examination Admit Cards',
        program: 'B.Sc.', date: '20 Mar 2026',
        description: 'Download admit cards directly via GGTU Student ERP portal.',
        url: 'https://erp.ggtuexam.com/',
      },
      {
        id: 5, session: '2025-26', type: 'Result',
        title: 'B.A. Semester IV Results Declared',
        program: 'B.A.', date: '10 Aug 2026',
        description: 'Results and marksheets available on GGTU ERP examination portal.',
        url: 'https://erp.ggtuexam.com/',
      },
    ],
    scholarships: [
      {
        id: 1, title: 'Post-Matric Scholarship for SC/ST/OBC Students',
        sponsor: 'Govt. of Rajasthan', eligibility: 'SC/ST/OBC category, Income ≤ ₹2.5 Lakh',
        description: 'Covers tuition fees, maintenance allowance, and book grants for students belonging to SC/ST/OBC categories pursuing higher education.',
        last_date: '31 Dec 2026', apply_url: 'https://sso.rajasthan.gov.in',
      },
      {
        id: 2, title: 'Mukhyamantri Uchha Shiksha Chhatravrtti Yojana',
        sponsor: 'Govt. of Rajasthan', eligibility: '12th ≥ 60%, Income ≤ ₹2.5 Lakh',
        description: 'Chief Minister Higher Education Scholarship providing ₹5,000 per annum to meritorious students from economically weaker families.',
        last_date: '15 Nov 2026', apply_url: 'https://hte.rajasthan.gov.in',
      },
      {
        id: 3, title: 'Minority Scholarship (Pre & Post Matric)',
        sponsor: 'Ministry of Minority Affairs', eligibility: 'Minority community, Income ≤ ₹2 Lakh',
        description: 'Central government scholarship for students of minority communities pursuing undergraduate and professional courses.',
        last_date: '31 Oct 2026', apply_url: 'https://scholarships.gov.in',
      },
      {
        id: 4, title: 'Devnarayan Chhatravrtti Yojana',
        sponsor: 'Govt. of Rajasthan', eligibility: 'Most Backward Classes, Income ≤ ₹2 Lakh',
        description: 'Special scholarship for girl students of most backward classes pursuing regular higher education in Rajasthan.',
        last_date: '30 Nov 2026', apply_url: 'https://sso.rajasthan.gov.in',
      },
    ],
  });
}

// 14. Confidential Grievance Submission
export async function submitGrievance(payload) {
  try {
    const res = await fetch(`${API_BASE}/wp-json/gurukapeeth/v1/grievance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Server error: ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error('Grievance submission error:', err);
    throw err;
  }
}

// 15. Submit Student Admission / Contact Inquiry
export async function submitInquiry(payload) {
  try {
    const res = await fetch(`${API_BASE}/wp-json/gurukapeeth/v1/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Server error: ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error('Inquiry submission error:', err);
    throw err;
  }
}

