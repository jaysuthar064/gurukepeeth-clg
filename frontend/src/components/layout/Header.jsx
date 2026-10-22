import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Award, BookOpen, GraduationCap, ChevronDown, Bell, ShieldCheck, ExternalLink, Menu, X, ChevronRight } from 'lucide-react';
import { getSettings, getMarqueeData } from '../../api/wordpress';

export default function Header() {
  const [settings, setSettings] = useState({
    college_name: 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH',
    college_hindi: 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ',
    college_subtitle: 'Run by Shree Narayan Shiksha Seva Samiti Peeth • Affiliated to GGTU Banswara',
    phone_primary: '+91 95874 33001',
    phone_secondary: '+91 96105 87077',
    email_info: 'gurukripa.peeth@gmail.com',
    aishe_code: 'C-48902',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
    trust_name: 'Shree Narayan Shiksha Seva Samiti Peeth',
  });

  const [marquee, setMarquee] = useState({
    announcement: 'Admissions Open 2026-27 for B.A. and B.Sc. (Bio) Programs — Apply Online Now!',
    notices: [],
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const loadHeader = () => {
      getSettings().then(s => { if (isMounted && s) setSettings(s); });
      getMarqueeData().then(m => { if (isMounted && m) setMarquee(m); });
    };

    loadHeader();
    window.addEventListener('focus', loadHeader);
    const interval = setInterval(loadHeader, 3000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', loadHeader);
      clearInterval(interval);
    };
  }, []);

  // Close mobile drawer and submenus when user changes routes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const handleOpenGGTUSyllabus = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.ggtu.ac.in/Syllabus.php';
    form.target = '_blank';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'link';
    input.value = 'Syllabus';
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <header className="site-header">
      {/* 1. Top Statutory Utility Bar */}
      <div className="topbar-wrapper">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span className="statutory-badge-pill highlight">Affiliated to {settings.affiliating_univ || 'GGTU Banswara'}</span>
            <span className="statutory-badge-pill">AISHE: {settings.aishe_code}</span>
          </div>
          <div className="topbar-right">
            <a href={`tel:${settings.phone_primary}`} className="topbar-contact-item">
              <Phone size={12} /> {settings.phone_primary}
            </a>
            <a href={`mailto:${settings.email_info}`} className="topbar-contact-item topbar-email-link">
              <Mail size={12} /> {settings.email_info}
            </a>
            <Link to="/contact" className="topbar-contact-item topbar-helpdesk-link" style={{ color: '#fbbf24', fontWeight: 600 }}>
              <span>Student Helpdesk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Marquee Ticker Strip */}
      <div className="marquee-bar">
        <div className="container marquee-inner">
          <div className="marquee-badge">
            <Bell size={11} /> Notice
          </div>
          <div className="marquee-track">
            <div className="marquee-content">
              <span>
                {(marquee.announcement || 'Admissions Open 2026-27 for B.A. and B.Sc. Degree Programs — Apply Online Now!')
                  .replace(/\uFFFD/g, '—')
                  .replace(/[^\x20-\x7E\u0900-\u097F\u2010-\u2015\u2022\u25C6]/g, ' ')}
              </span>
              {marquee.notices && marquee.notices.map((n, i) => (
                <span key={i}>◆ {n.title}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Institutional Brand Header */}
      <div className="main-header">
        <div className="container header-brand-row">
          <Link to="/" className="brand-identity" onClick={() => setMobileMenuOpen(false)}>
            {/* Heraldic Collegiate Seal */}
            <div className="brand-emblem" title="Gurukripa Peeth Institutional Seal">
              <img
                src="/images/college-logo.png"
                alt="Gurukripa Peeth College Emblem"
                className="brand-logo-img"
              />
            </div>
            <div className="brand-titles">
              <div className="brand-hindi">{settings.college_hindi || 'गुरुकृपा पीठ महाविद्यालय'}</div>
              <h1>{settings.college_name}</h1>
              <div className="brand-affil">
                {settings.college_subtitle} • Affiliated to {settings.affiliating_univ || 'Govind Guru Tribal University (GGTU), Banswara'}
              </div>
            </div>
          </Link>

          <div className="header-right-actions">
            <div className="header-accreditation-badges">
              <div className="stat-seal">
                <span className="seal-name">{settings.affiliating_univ ? (settings.affiliating_univ.match(/\(([^)]+)\)/)?.[1] || 'GGTU') : 'GGTU'}</span>
                <span className="seal-desc">Affiliated</span>
              </div>
              <div className="header-cta-group">
                <Link to="/admissions" className="btn btn-gold">
                  Apply Now 2026-27
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Sticky Mega Navigation Bar (Desktop) */}
      <nav className="nav-wrapper desktop-nav">
        <div className="container nav-bar">
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                About Us <ChevronDown size={12} />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/about" className="dropdown-link">Institutional Profile</Link></li>
                <li><Link to="/about" className="dropdown-link">Vision, Mission & Core Values</Link></li>
                <li><Link to="/about#society" className="dropdown-link" style={{ color: 'var(--gold-600)', fontWeight: 600 }}>Managing Society &amp; Trust (Samiti)</Link></li>
                <li><Link to="/about" className="dropdown-link">Chairman & Director's Desk</Link></li>
                <li><Link to="/about" className="dropdown-link">Secretary's Desk</Link></li>
                <li><Link to="/about" className="dropdown-link">Principal's Desk</Link></li>
                <li><Link to="/about" className="dropdown-link">Governing Council & Statutory Bodies</Link></li>
                <li><Link to="/about" className="dropdown-link">Right to Information (RTI) Cell</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/academics" className={`nav-link ${isActive('/academics') ? 'active' : ''}`}>
                Academics <ChevronDown size={12} />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/academics" className="dropdown-link">Academic Programs Overview</Link></li>
                <li><Link to="/academics" className="dropdown-link">Faculty of Arts (B.A.)</Link></li>
                <li><Link to="/academics" className="dropdown-link">Faculty of Science (B.Sc.)</Link></li>
                <li><Link to="/academics" className="dropdown-link">Academic Calendar & Examination Schedule</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/admissions" className={`nav-link ${isActive('/admissions') ? 'active' : ''}`}>
                Admissions <ChevronDown size={12} />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/admissions" className="dropdown-link">Admission Guidelines 2026-27</Link></li>
                <li><Link to="/admissions" className="dropdown-link">Eligibility & Seat Matrix</Link></li>
                <li><Link to="/admissions" className="dropdown-link">Fee Structure & Refund Rules</Link></li>
                <li><Link to="/admissions" className="dropdown-link">Online Admission Application Form</Link></li>
                <li><Link to="/admissions" className="dropdown-link">Scholarships (Post-Matric & Chief Minister)</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/iqac" className={`nav-link ${isActive('/iqac') ? 'active' : ''}`}>
                IQAC <ChevronDown size={12} />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/iqac" className="dropdown-link">IQAC Cell Composition & Mandate</Link></li>
                <li><Link to="/iqac" className="dropdown-link">Annual Quality Assurance Reports (AQAR)</Link></li>
                <li><Link to="/iqac" className="dropdown-link">Minutes of Meetings & Action Taken (ATR)</Link></li>
                <li><Link to="/iqac" className="dropdown-link">Student & Stakeholder Feedback</Link></li>
                <li><Link to="/iqac" className="dropdown-link">Institutional Best Practices</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/naac" className={`nav-link ${isActive('/naac') ? 'active' : ''}`}>
                NAAC Portal <ChevronDown size={12} />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/naac" className="dropdown-link">NAAC Accreditation Hub</Link></li>
                <li><Link to="/naac" className="dropdown-link">Self Study Report (SSR)</Link></li>
                <li><Link to="/naac" className="dropdown-link">Criterion 1: Curricular Aspects</Link></li>
                <li><Link to="/naac" className="dropdown-link">Criterion 2: Teaching-Learning & Evaluation</Link></li>
                <li><Link to="/naac" className="dropdown-link">Criterion 3: Research, Innovations & Extension</Link></li>
                <li><Link to="/naac" className="dropdown-link">Criterion 4: Infrastructure & Learning Resources</Link></li>
                <li><Link to="/naac" className="dropdown-link">Criterion 5: Student Support & Progression</Link></li>
                <li><Link to="/naac" className="dropdown-link">Criterion 6: Governance, Leadership & Management</Link></li>
                <li><Link to="/naac" className="dropdown-link">Criterion 7: Institutional Values & Best Practices</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/faculty" className={`nav-link ${isActive('/faculty') ? 'active' : ''}`}>
                Faculty & Staff
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/student-corner" className={`nav-link ${isActive('/student-corner') || isActive('/exam-hub') ? 'active' : ''}`}>
                Student Corner <ChevronDown size={12} />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/student-corner" className="dropdown-link">NEP Syllabi Repository</Link></li>
                <li>
                  <a href="https://erp.ggtuexam.com/" target="_blank" rel="noopener noreferrer" className="dropdown-link" style={{ color: 'var(--gold-600)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>GGTU NEP ERP Portal</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a href="#syllabus" onClick={handleOpenGGTUSyllabus} className="dropdown-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>GGTU Official Syllabi Portal</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
                <li><Link to="/student-corner" className="dropdown-link">Examination Schedule &amp; Results</Link></li>
                <li><Link to="/student-corner" className="dropdown-link">Government Scholarships Guide</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/disclosures" className={`nav-link ${isActive('/disclosures') ? 'active' : ''}`}>
                Compliance &amp; NOC <ChevronDown size={12} />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/disclosures" className="dropdown-link">Mandatory Disclosures Hub</Link></li>
                <li><Link to="/disclosures" className="dropdown-link">GGTU Affiliation Orders (All Sessions)</Link></li>
                <li><Link to="/disclosures" className="dropdown-link">Raj. Govt. Permanent NOC (B.A. &amp; B.Sc.)</Link></li>
                <li><Link to="/disclosures" className="dropdown-link">Anti-Ragging Policy &amp; Committee</Link></li>
                <li><Link to="/disclosures" className="dropdown-link">Grievance Redressal Form</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 5. Mobile Navigation Drawer & Backdrop */}
      <div 
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation Drawer">
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-brand">
            <img src="/images/college-logo.png" alt="Emblem" className="mobile-drawer-logo" />
            <div>
              <div className="mobile-drawer-hindi">{settings.college_hindi || 'गुरुकृपा पीठ महाविद्यालय'}</div>
              <div className="mobile-drawer-title">{settings.college_name}</div>
            </div>
          </div>
          <button 
            type="button" 
            className="mobile-drawer-close" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-drawer-stat-bar">
          <span className="mobile-stat-badge">Affiliated to GGTU</span>
          <span className="mobile-stat-badge">AISHE: {settings.aishe_code}</span>
        </div>

        <div className="mobile-drawer-scroll">
          <nav className="mobile-drawer-nav">
            <ul className="mobile-nav-menu">
              {/* Home */}
              <li className="mobile-nav-menu-item">
                <Link to="/" className={`mobile-nav-menu-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
                  Home
                </Link>
              </li>

              {/* About Us */}
              <li className="mobile-nav-menu-item">
                <button 
                  type="button"
                  className={`mobile-accordion-toggle ${openDropdown === 'about' ? 'open' : ''}`}
                  onClick={() => toggleDropdown('about')}
                >
                  <span className={isActive('/about') ? 'active-label' : ''}>About Us</span>
                  <ChevronDown size={16} className={`accordion-icon ${openDropdown === 'about' ? 'rotated' : ''}`} />
                </button>
                {openDropdown === 'about' && (
                  <ul className="mobile-sub-menu">
                    <li><Link to="/about">Institutional Profile</Link></li>
                    <li><Link to="/about">Vision, Mission & Core Values</Link></li>
                    <li><Link to="/about#society" style={{ color: 'var(--gold-700)', fontWeight: 700 }}>Managing Society &amp; Trust (Samiti)</Link></li>
                    <li><Link to="/about">Chairman & Director's Desk</Link></li>
                    <li><Link to="/about">Secretary's Desk</Link></li>
                    <li><Link to="/about">Principal's Desk</Link></li>
                    <li><Link to="/about">Governing Council & Statutory Bodies</Link></li>
                    <li><Link to="/about">Right to Information (RTI) Cell</Link></li>
                  </ul>
                )}
              </li>

              {/* Academics */}
              <li className="mobile-nav-menu-item">
                <button 
                  type="button"
                  className={`mobile-accordion-toggle ${openDropdown === 'academics' ? 'open' : ''}`}
                  onClick={() => toggleDropdown('academics')}
                >
                  <span className={isActive('/academics') ? 'active-label' : ''}>Academics</span>
                  <ChevronDown size={16} className={`accordion-icon ${openDropdown === 'academics' ? 'rotated' : ''}`} />
                </button>
                {openDropdown === 'academics' && (
                  <ul className="mobile-sub-menu">
                    <li><Link to="/academics">Academic Programs Overview</Link></li>
                    <li><Link to="/academics">Faculty of Arts (B.A.)</Link></li>
                    <li><Link to="/academics">Faculty of Science (B.Sc.)</Link></li>
                    <li><Link to="/academics">Academic Calendar & Examination Schedule</Link></li>
                  </ul>
                )}
              </li>

              {/* Admissions */}
              <li className="mobile-nav-menu-item">
                <button 
                  type="button"
                  className={`mobile-accordion-toggle ${openDropdown === 'admissions' ? 'open' : ''}`}
                  onClick={() => toggleDropdown('admissions')}
                >
                  <span className={isActive('/admissions') ? 'active-label' : ''}>Admissions</span>
                  <ChevronDown size={16} className={`accordion-icon ${openDropdown === 'admissions' ? 'rotated' : ''}`} />
                </button>
                {openDropdown === 'admissions' && (
                  <ul className="mobile-sub-menu">
                    <li><Link to="/admissions">Admission Guidelines 2026-27</Link></li>
                    <li><Link to="/admissions">Eligibility & Seat Matrix</Link></li>
                    <li><Link to="/admissions">Fee Structure & Refund Rules</Link></li>
                    <li><Link to="/admissions">Online Admission Application Form</Link></li>
                    <li><Link to="/admissions">Scholarships (Post-Matric & CM)</Link></li>
                  </ul>
                )}
              </li>

              {/* IQAC */}
              <li className="mobile-nav-menu-item">
                <button 
                  type="button"
                  className={`mobile-accordion-toggle ${openDropdown === 'iqac' ? 'open' : ''}`}
                  onClick={() => toggleDropdown('iqac')}
                >
                  <span className={isActive('/iqac') ? 'active-label' : ''}>IQAC</span>
                  <ChevronDown size={16} className={`accordion-icon ${openDropdown === 'iqac' ? 'rotated' : ''}`} />
                </button>
                {openDropdown === 'iqac' && (
                  <ul className="mobile-sub-menu">
                    <li><Link to="/iqac">IQAC Cell Composition & Mandate</Link></li>
                    <li><Link to="/iqac">Annual Quality Assurance Reports (AQAR)</Link></li>
                    <li><Link to="/iqac">Minutes of Meetings & Action Taken (ATR)</Link></li>
                    <li><Link to="/iqac">Student & Stakeholder Feedback</Link></li>
                    <li><Link to="/iqac">Institutional Best Practices</Link></li>
                  </ul>
                )}
              </li>

              {/* NAAC Portal */}
              <li className="mobile-nav-menu-item">
                <button 
                  type="button"
                  className={`mobile-accordion-toggle ${openDropdown === 'naac' ? 'open' : ''}`}
                  onClick={() => toggleDropdown('naac')}
                >
                  <span className={isActive('/naac') ? 'active-label' : ''}>NAAC Portal</span>
                  <ChevronDown size={16} className={`accordion-icon ${openDropdown === 'naac' ? 'rotated' : ''}`} />
                </button>
                {openDropdown === 'naac' && (
                  <ul className="mobile-sub-menu">
                    <li><Link to="/naac">NAAC Accreditation Hub</Link></li>
                    <li><Link to="/naac">Self Study Report (SSR)</Link></li>
                    <li><Link to="/naac">Criterion 1: Curricular Aspects</Link></li>
                    <li><Link to="/naac">Criterion 2: Teaching-Learning & Evaluation</Link></li>
                    <li><Link to="/naac">Criterion 3: Research, Innovations & Extension</Link></li>
                    <li><Link to="/naac">Criterion 4: Infrastructure & Learning Resources</Link></li>
                    <li><Link to="/naac">Criterion 5: Student Support & Progression</Link></li>
                    <li><Link to="/naac">Criterion 6: Governance, Leadership & Management</Link></li>
                    <li><Link to="/naac">Criterion 7: Institutional Values & Best Practices</Link></li>
                  </ul>
                )}
              </li>

              {/* Faculty & Staff */}
              <li className="mobile-nav-menu-item">
                <Link to="/faculty" className={`mobile-nav-menu-link ${isActive('/faculty') ? 'active' : ''}`}>
                  Faculty & Staff
                </Link>
              </li>

              {/* Student Corner */}
              <li className="mobile-nav-menu-item">
                <button 
                  type="button"
                  className={`mobile-accordion-toggle ${openDropdown === 'student' ? 'open' : ''}`}
                  onClick={() => toggleDropdown('student')}
                >
                  <span className={isActive('/student-corner') || isActive('/exam-hub') ? 'active-label' : ''}>Student Corner</span>
                  <ChevronDown size={16} className={`accordion-icon ${openDropdown === 'student' ? 'rotated' : ''}`} />
                </button>
                {openDropdown === 'student' && (
                  <ul className="mobile-sub-menu">
                    <li><Link to="/student-corner">NEP Syllabi Repository</Link></li>
                    <li>
                      <a href="https://erp.ggtuexam.com/" target="_blank" rel="noopener noreferrer">
                        <span>GGTU NEP ERP Portal</span>
                        <ExternalLink size={12} />
                      </a>
                    </li>
                    <li>
                      <a href="#syllabus" onClick={handleOpenGGTUSyllabus}>
                        <span>GGTU Official Syllabi Portal</span>
                        <ExternalLink size={12} />
                      </a>
                    </li>
                    <li><Link to="/student-corner">Examination Schedule &amp; Results</Link></li>
                    <li><Link to="/student-corner">Government Scholarships Guide</Link></li>
                  </ul>
                )}
              </li>

              {/* Compliance & NOC */}
              <li className="mobile-nav-menu-item">
                <button 
                  type="button"
                  className={`mobile-accordion-toggle ${openDropdown === 'disclosures' ? 'open' : ''}`}
                  onClick={() => toggleDropdown('disclosures')}
                >
                  <span className={isActive('/disclosures') ? 'active-label' : ''}>Compliance &amp; NOC</span>
                  <ChevronDown size={16} className={`accordion-icon ${openDropdown === 'disclosures' ? 'rotated' : ''}`} />
                </button>
                {openDropdown === 'disclosures' && (
                  <ul className="mobile-sub-menu">
                    <li><Link to="/disclosures">Mandatory Disclosures Hub</Link></li>
                    <li><Link to="/disclosures">GGTU Affiliation Orders (All Sessions)</Link></li>
                    <li><Link to="/disclosures">Raj. Govt. Permanent NOC (B.A. &amp; B.Sc.)</Link></li>
                    <li><Link to="/disclosures">Anti-Ragging Policy &amp; Committee</Link></li>
                    <li><Link to="/disclosures">Grievance Redressal Form</Link></li>
                  </ul>
                )}
              </li>

              {/* Contact Us */}
              <li className="mobile-nav-menu-item">
                <Link to="/contact" className={`mobile-nav-menu-link ${isActive('/contact') ? 'active' : ''}`}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick Helpline & CTA Drawer Footer */}
          <div className="mobile-drawer-footer">
            <Link to="/admissions" className="btn btn-gold btn-block" style={{ textAlign: 'center', marginBottom: '14px' }}>
              Apply Now 2026-27
            </Link>
            <div className="mobile-helpline-box">
              <div className="mobile-helpline-title">Admission Helpline</div>
              <a href={`tel:${settings.phone_primary}`} className="mobile-helpline-link">
                <Phone size={14} /> {settings.phone_primary}
              </a>
              <a href={`tel:${settings.phone_secondary}`} className="mobile-helpline-link">
                <Phone size={14} /> {settings.phone_secondary}
              </a>
              <a href={`mailto:${settings.email_info}`} className="mobile-helpline-link">
                <Mail size={14} /> {settings.email_info}
              </a>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}

