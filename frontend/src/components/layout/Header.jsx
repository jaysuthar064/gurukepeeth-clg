import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Award, BookOpen, GraduationCap, ChevronDown, Bell, ShieldCheck } from 'lucide-react';
import { getSettings, getMarqueeData } from '../../api/wordpress';

export default function Header() {
  const [settings, setSettings] = useState({
    college_name: 'Gurukripa Peeth College',
    college_hindi: 'गुरुकृपा पीठ महाविद्यालय',
    college_subtitle: 'Post Graduate & Teacher Training College',
    phone_primary: '+91 2964 234567',
    email_info: 'info@gurukripapeeth.in',
    aishe_code: 'C-48902',
    ncte_code: 'WRC/APW05814/323363',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
  });

  const [marquee, setMarquee] = useState({
    announcement: 'Admissions Open 2026-27 for B.A., B.Sc., B.Ed., and Integrated B.A.-B.Ed. Programs — Apply Online Now!',
    notices: [],
  });

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

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <header className="site-header">
      {/* 1. Top Statutory Utility Bar */}
      <div className="topbar-wrapper">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span className="statutory-badge-pill highlight">Affiliated to {settings.affiliating_univ || 'GGTU Banswara'}</span>
            <span className="statutory-badge-pill">NCTE Code: {settings.ncte_code}</span>
            <span className="statutory-badge-pill">AISHE: {settings.aishe_code}</span>
          </div>
          <div className="topbar-right">
            <a href={`tel:${settings.phone_primary}`} className="topbar-contact-item">
              <Phone size={12} /> {settings.phone_primary}
            </a>
            <a href={`mailto:${settings.email_info}`} className="topbar-contact-item">
              <Mail size={12} /> {settings.email_info}
            </a>
            <a 
              href="http://localhost:8884/?gurukapeeth_login=1&token=gurukapeeth-dev-token-001" 
              target="_blank" 
              rel="noreferrer"
              className="topbar-contact-item"
              style={{ color: '#fbbf24', fontWeight: 700 }}
              title="Click for One-Click Auto Login"
            >
              🔐 WP CMS Admin
            </a>
          </div>
        </div>
      </div>

      {/* 2. Marquee Ticker Strip */}
      <div className="marquee-bar">
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="marquee-badge">
            <Bell size={11} /> Notice
          </div>
          <div className="marquee-content">
            <span>{marquee.announcement}</span>
            {marquee.notices && marquee.notices.map((n, i) => (
              <span key={i}>◆ {n.title}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Institutional Brand Header */}
      <div className="main-header">
        <div className="container header-brand-row">
          <Link to="/" className="brand-identity">
            {/* Heraldic Collegiate Seal */}
            <div className="brand-emblem" title="Gurukripa Peeth Institutional Seal">
              <svg viewBox="0 0 100 100" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" stroke="#b45309" strokeWidth="2.5" strokeDasharray="3 3"/>
                <circle cx="50" cy="50" r="41" stroke="#f59e0b" strokeWidth="1.5"/>
                {/* Academic Torch / Lamp & Open Book Motif */}
                <path d="M50 20 L54 30 L50 35 L46 30 Z" fill="#f59e0b"/>
                <circle cx="50" cy="22" r="3" fill="#fbbf24"/>
                {/* Open Book */}
                <path d="M26 62 C34 58 44 59 50 63 C56 59 66 58 74 62 L74 46 C66 42 56 43 50 47 C44 43 34 42 26 46 Z" fill="#ffffff" stroke="#b45309" strokeWidth="1.5"/>
                <line x1="50" y1="47" x2="50" y2="63" stroke="#b45309" strokeWidth="1.5"/>
                {/* Base Pedestal */}
                <path d="M38 72 L62 72 L58 76 L42 76 Z" fill="#f59e0b"/>
                <line x1="32" y1="78" x2="68" y2="78" stroke="#f59e0b" strokeWidth="2"/>
              </svg>
            </div>
            <div className="brand-titles">
              <div className="brand-hindi">{settings.college_hindi || 'गुरुकृपा पीठ महाविद्यालय'}</div>
              <h1>{settings.college_name}</h1>
              <div className="brand-affil">
                <span>{settings.college_subtitle}</span>
                <span>•</span>
                <span>Affiliated with {settings.affiliating_univ || 'GGTU Banswara'}</span>
                <span>•</span>
                <span>NCTE Approved</span>
              </div>
            </div>
          </Link>

          <div className="header-accreditation-badges">
            <div className="stat-seal">
              <span className="seal-name">NAAC</span>
              <span className="seal-desc">{settings.naac_grade ? settings.naac_grade.split('/')[0].trim() : 'Accredited B+'}</span>
            </div>
            <div className="stat-seal">
              <span className="seal-name">NCTE</span>
              <span className="seal-desc">Approved</span>
            </div>
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
        </div>
      </div>

      {/* 4. Sticky Mega Navigation Bar */}
      <nav className="nav-wrapper">
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
                <li><Link to="/about" className="dropdown-link">Principal's Desk</Link></li>
                <li><Link to="/about" className="dropdown-link">Managing Director's Vision</Link></li>
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
                <li><Link to="/academics" className="dropdown-link">Department of Teacher Education (B.Ed.)</Link></li>
                <li><Link to="/academics" className="dropdown-link">4-Year Integrated B.A.-B.Ed.</Link></li>
                <li><Link to="/academics" className="dropdown-link">Diploma in Elementary Education (D.El.Ed.)</Link></li>
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
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
