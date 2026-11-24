import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import IQACPage from './pages/IQACPage';
import NAACPage from './pages/NAACPage';
import FacultyPage from './pages/FacultyPage';
import ContactPage from './pages/ContactPage';
import DisclosuresPage from './pages/DisclosuresPage';
import ExamHubPage from './pages/ExamHubPage';
import AdmissionPortalPage from './pages/AdmissionPortalPage';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function ThemeHandler() {
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const themeParam = params.get('theme');
    if (themeParam && ['purple', 'orange', 'crimson', 'navy'].includes(themeParam.toLowerCase())) {
      const t = themeParam.toLowerCase();
      if (t === 'orange') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('gurukapeeth_theme');
      } else {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('gurukapeeth_theme', t);
      }
    } else {
      const saved = localStorage.getItem('gurukapeeth_theme');
      if (saved && saved !== 'orange') {
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  }, [search]);

  return null;
}

const SEO_MAP = {
  '/': {
    title: 'Gurukripa Shikshan Sansthan College Peeth — Dungarpur | Affiliated with GGTU Banswara',
    description: 'Gurukripa Shikshan Sansthan College Peeth, Dungarpur (Rajasthan). Affiliated with Govind Guru Tribal University (GGTU), Banswara. Offering B.A. and B.Sc. (Bio) programs. Admissions Open.'
  },
  '/about': {
    title: 'About Gurukripa College Peeth — Vision, Leadership & Management',
    description: 'Learn about Gurukripa Shikshan Sansthan College Peeth, established by Shree Narayan Shiksha Seva Samiti. Dedicated to higher education in Southern Rajasthan.'
  },
  '/academics': {
    title: 'Academic Programs (B.A. & B.Sc.) — Gurukripa College Peeth',
    description: 'Undergraduate degree programs under CBCS curriculum affiliated with GGTU Banswara: Faculty of Arts (B.A.) and Faculty of Science (B.Sc. Bio).'
  },
  '/admissions': {
    title: 'Admissions 2026-27 — Gurukripa Shikshan Sansthan College Peeth',
    description: 'Apply for undergraduate admission at Gurukripa College Peeth for academic session 2026-27. Eligibility criteria, fee structure, and online application guidelines.'
  },
  '/admissions/apply': {
    title: 'Online Admission Portal 2026-27 — Gurukripa College Peeth',
    description: 'Submit your online admission form and pay registration fees securely via Razorpay for B.A. and B.Sc. programs at Gurukripa College Peeth.'
  },
  '/admissions/status': {
    title: 'Application & Payment Status — Gurukripa College Peeth',
    description: 'Track your admission application status, payment verification, and enrollment records at Gurukripa Shikshan Sansthan College Peeth.'
  },
  '/faculty': {
    title: 'Faculty Directory & Academic Staff — Gurukripa College Peeth',
    description: 'Meet the qualified and experienced teaching faculty across Arts and Science disciplines at Gurukripa Shikshan Sansthan College Peeth.'
  },
  '/iqac': {
    title: 'IQAC (Internal Quality Assurance Cell) — Gurukripa College Peeth',
    description: 'Internal Quality Assurance Cell policies, quality objectives, minutes, and institutional performance monitoring at Gurukripa College Peeth.'
  },
  '/naac': {
    title: 'NAAC Documentation & SSR Records — Gurukripa College Peeth',
    description: 'NAAC compliance, Self Study Reports (SSR), criteria documentation, and institutional quality metrics at Gurukripa College Peeth.'
  },
  '/disclosures': {
    title: 'Mandatory Public Disclosures & Affiliation Orders — Gurukripa College Peeth',
    description: 'Official Rajasthan Govt. NOC, GGTU Banswara permanent affiliation orders, land and building safety certificates, and audit statements.'
  },
  '/student-corner': {
    title: 'Student Corner & Exam Hub — Gurukripa College Peeth',
    description: 'University examination schedules, GGTU results, syllabus downloads, previous year questions, and notices for enrolled students.'
  },
  '/contact': {
    title: 'Contact Us & Campus Location — Gurukripa College Peeth, Dungarpur',
    description: 'Campus location in VPO Peeth, Tehsil Simalwara, District Dungarpur (Rajasthan) 314406. Phone: +91-9414517375, Email: gurukripa.peeth@gmail.com.'
  }
};

function SEOHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanPath = pathname.toLowerCase().replace(/\/$/, '') || '/';
    let meta = SEO_MAP[cleanPath];

    if (!meta) {
      if (cleanPath.startsWith('/admissions/apply')) meta = SEO_MAP['/admissions/apply'];
      else if (cleanPath.startsWith('/admissions/status')) meta = SEO_MAP['/admissions/status'];
      else if (cleanPath.startsWith('/admissions')) meta = SEO_MAP['/admissions'];
      else if (cleanPath.startsWith('/about')) meta = SEO_MAP['/about'];
      else if (cleanPath.startsWith('/academics')) meta = SEO_MAP['/academics'];
      else if (cleanPath.startsWith('/faculty')) meta = SEO_MAP['/faculty'];
      else if (cleanPath.startsWith('/iqac')) meta = SEO_MAP['/iqac'];
      else if (cleanPath.startsWith('/naac')) meta = SEO_MAP['/naac'];
      else if (cleanPath.startsWith('/disclosures')) meta = SEO_MAP['/disclosures'];
      else if (cleanPath.startsWith('/student-corner') || cleanPath.startsWith('/exam-hub')) meta = SEO_MAP['/student-corner'];
      else if (cleanPath.startsWith('/contact')) meta = SEO_MAP['/contact'];
      else meta = SEO_MAP['/'];
    }

    document.title = meta.title;

    const setMetaTag = (attr, key, val) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMetaTag('name', 'description', meta.description);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', `https://www.gurukripapeeth.in${pathname === '/' ? '' : pathname}`);
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://www.gurukripapeeth.in${pathname === '/' ? '' : pathname}`);
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollHandler />
      <ThemeHandler />
      <SEOHandler />
      <div className="site-wrapper">
        <Header />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about/*" element={<AboutPage />} />
            <Route path="/academics/*" element={<AcademicsPage />} />
            <Route path="/admissions/apply" element={<AdmissionPortalPage />} />
            <Route path="/admissions/status" element={<AdmissionPortalPage defaultTab="status" />} />
            <Route path="/admissions/*" element={<AdmissionsPage />} />
            <Route path="/iqac/*" element={<IQACPage />} />
            <Route path="/naac/*" element={<NAACPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/disclosures" element={<DisclosuresPage />} />
            <Route path="/student-corner/*" element={<ExamHubPage />} />
            <Route path="/exam-hub/*" element={<ExamHubPage />} />
            {/* Catch-all to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
