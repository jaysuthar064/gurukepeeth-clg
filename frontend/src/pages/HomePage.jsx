import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, Users, Award, ChevronRight, FileText, 
  ExternalLink, Calendar, CheckCircle2, ShieldCheck, Building2,
  FileCheck, Download, School, Compass, ArrowUpRight
} from 'lucide-react';
import { getHomepageData } from '../api/wordpress';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeNoticeTab, setActiveNoticeTab] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getHomepageData().then(res => {
        if (isMounted && res) {
          setData(res);
          setLoading(false);
        }
      });
    };

    load();
    window.addEventListener('focus', load);
    const interval = setInterval(load, 3000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', load);
      clearInterval(interval);
    };
  }, []);

  const hero = data?.hero || {
    heading: 'Empowering Minds, Cultivating Excellence in Southern Rajasthan',
    subheading: 'Affiliated with Govind Guru Tribal University (GGTU), Banswara & Recognized by NCTE (WRC Bhopal). Dedicated to academic distinction and holistic teacher education.',
    badge: 'Admissions Open 2026-27',
  };

  const stats = data?.statistics || {
    students: '2,400+',
    faculty: '48+',
    programs: '12+',
    pass_rate: '94%',
  };

  const notices = data?.notices || [
    { id: 1, title: 'Online Admission Form Submission Schedule 2026-27 for Undergraduate Programs', date: '23 Sep 2026', category: 'Admissions', pdf_url: '#' },
    { id: 2, title: 'Submission of B.Ed. & Integrated B.A.-B.Ed. Examination Forms for Session 2025-26', date: '22 Sep 2026', category: 'Examinations', pdf_url: '#' },
    { id: 3, title: 'IQAC Workshop on NEP 2020 Implementation & Outcome Based Education', date: '20 Sep 2026', category: 'IQAC', pdf_url: '#' },
    { id: 4, title: 'Chief Minister Higher Education Scholarship Applications Open on SSO Portal', date: '18 Sep 2026', category: 'Scholarship', pdf_url: '#' },
    { id: 5, title: 'NCTE Revised Norms Compliance & AISHE Data Submission Confirmation', date: '15 Sep 2026', category: 'Statutory', pdf_url: '#' },
  ];

  const programs = data?.programs || [
    { id: 1, title: 'Bachelor of Arts (B.A.)', stream: 'Faculty of Arts', duration: '3 Years', intake: '160 Seats', description: 'Comprehensive degree in Humanities and Social Sciences with specializations in Hindi Literature, Sanskrit, Political Science, History, and Geography.' },
    { id: 2, title: 'Bachelor of Science (B.Sc.)', stream: 'Faculty of Science', duration: '3 Years', intake: '120 Seats', description: 'Rigorous scientific training in Physics, Chemistry, Mathematics (PCM) and Chemistry, Botany, Zoology (CBZ) with advanced digital laboratory facilities.' },
    { id: 3, title: 'Bachelor of Education (B.Ed.)', stream: 'Teacher Education', duration: '2 Years', intake: '100 Seats', description: 'NCTE recognized professional secondary teacher preparation program focusing on pedagogical mastery, educational psychology, and school internships.' },
    { id: 4, title: 'Integrated B.A.-B.Ed. (4-Year)', stream: 'Dual Degree Academy', duration: '4 Years', intake: '50 Seats', description: 'Innovative dual-degree curriculum structured under NEP guidelines, combining an undergraduate degree in Humanities with professional teacher preparation.' },
  ];

  const leaders = data?.leadership || [
    { id: 1, name: "Principal's Desk", role_title: 'Principal', qualifications: 'Dr. Rajesh Sharma, Ph.D., M.Ed.', message: 'Welcome to Gurukripa Peeth College. Our pedagogical approach blends traditional Indian scholarship with modern digital competencies, ensuring our graduates emerge as intellectually enlightened and socially responsible educators and citizens.' },
    { id: 2, name: "Managing Director's Vision", role_title: 'Managing Director', qualifications: 'Er. Virendra Singh, M.B.A., B.Tech.', message: 'At Gurukripa Peeth, our foundational mission is to bridge educational disparities in Southern Rajasthan. We offer rural and tribal youth access to world-class learning infrastructure, value-based mentorship, and university distinction.' },
  ];

  const filteredNotices = notices.filter(n => {
    if (activeNoticeTab === 'All') return true;
    if (activeNoticeTab === 'Admissions') return n.category?.toLowerCase().includes('admiss');
    if (activeNoticeTab === 'Exams') return n.category?.toLowerCase().includes('exam');
    if (activeNoticeTab === 'IQAC') return n.category?.toLowerCase().includes('iqac') || n.category?.toLowerCase().includes('naac');
    return true;
  });

  return (
    <div className="home-page-container">
      {/* ============================================================
          ZONE 1: ACADEMIC GATEWAY HERO
          ============================================================ */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Left Text Column */}
          <div className="hero-text-col">
            <div className="hero-badge-tag">
              <ShieldCheck size={14} /> {hero.badge || 'Admissions Open 2026-27'}
            </div>
            
            <h1 className="hero-title">{hero.heading}</h1>
            
            <p className="hero-subtitle">{hero.subheading}</p>

            <div className="hero-btn-row">
              <Link to="/admissions" className="btn btn-gold btn-large">
                Apply for Admission 2026-27 <ChevronRight size={16} />
              </Link>
              <Link to="/academics" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)' }}>
                Academic Programs & Syllabi
              </Link>
              <Link to="/naac" className="btn btn-outline" style={{ color: '#fde68a', borderColor: 'rgba(253,230,138,0.4)', background: 'rgba(180,83,9,0.15)' }}>
                🏛️ NAAC SSR Portal
              </Link>
            </div>

            <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '12px', color: '#94a3b8' }}>
              <div><strong>AISHE Code:</strong> C-48902</div>
              <div><strong>NCTE Approval:</strong> WRC/APW05814/323363</div>
              <div><strong>Affiliation:</strong> GGTU Banswara</div>
              <div><strong>District:</strong> Dungarpur, Rajasthan</div>
            </div>
          </div>

          {/* Right Notice Board Column */}
          <div className="hero-notice-col">
            <div className="hero-card-panel">
              <div className="hero-card-header">
                <h3>
                  <FileText size={16} style={{ color: '#f59e0b' }} /> Official Notices & Circulars
                </h3>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                  LIVE CMS SYNC
                </span>
              </div>

              {/* Categorized Tabs */}
              <div className="hero-notice-tabs">
                {['All', 'Admissions', 'Exams', 'IQAC'].map(tab => (
                  <button 
                    key={tab} 
                    className={`notice-tab-btn ${activeNoticeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveNoticeTab(tab)}
                  >
                    {tab === 'All' ? 'All Notices' : tab}
                  </button>
                ))}
              </div>

              {/* Notice List */}
              <div className="hero-notice-list">
                {filteredNotices.length > 0 ? (
                  filteredNotices.slice(0, 5).map((n) => (
                    <div key={n.id} className={`hero-notice-item ${n.category === 'Admissions' ? 'urgent' : ''}`}>
                      <div className="date-tag">
                        <span>{n.date}</span>
                        <span style={{ background: '#f4f3ef', padding: '1px 6px', borderRadius: '3px', fontSize: '10px' }}>{n.category || 'General'}</span>
                      </div>
                      {n.pdf_url && n.pdf_url !== '#' ? (
                        <a href={n.pdf_url} target="_blank" rel="noreferrer" title="Click to View Document">
                          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <span>{n.title}</span>
                            <span className="pdf-download-link" style={{ padding: '2px 6px', fontSize: '11px' }}>
                              PDF <ArrowUpRight size={12} />
                            </span>
                          </p>
                        </a>
                      ) : (
                        <p>{n.title}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '24px', color: '#64748b', fontSize: '13px' }}>
                    No notices currently listed under this category.
                  </div>
                )}
              </div>

              <div className="hero-card-footer">
                <span style={{ color: '#64748b' }}>Updated in real-time from WordPress</span>
                <Link to="/admissions" style={{ color: '#b45309', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  View All Archives <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ZONE 2: STUDENT & STATUTORY SERVICES GATEWAY (6 CARDS)
          ============================================================ */}
      <section className="gateway-strip">
        <div className="container">
          <div className="gateway-grid">
            <Link to="/admissions" className="gateway-card">
              <div className="gateway-icon"><GraduationCap size={22} /></div>
              <div className="gateway-title">Online Admission 2026</div>
            </Link>

            <Link to="/academics" className="gateway-card">
              <div className="gateway-icon"><BookOpen size={22} /></div>
              <div className="gateway-title">Curriculum & Syllabi</div>
            </Link>

            <Link to="/naac" className="gateway-card">
              <div className="gateway-icon"><ShieldCheck size={22} /></div>
              <div className="gateway-title">NAAC Accreditation Hub</div>
            </Link>

            <Link to="/iqac" className="gateway-card">
              <div className="gateway-icon"><FileCheck size={22} /></div>
              <div className="gateway-title">IQAC Quality Reports</div>
            </Link>

            <a href="https://sso.rajasthan.gov.in" target="_blank" rel="noreferrer" className="gateway-card">
              <div className="gateway-icon"><Award size={22} /></div>
              <div className="gateway-title">Scholarships (SSO)</div>
            </a>

            <Link to="/about" className="gateway-card">
              <div className="gateway-icon"><Compass size={22} /></div>
              <div className="gateway-title">Anti-Ragging & RTI Cell</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          ZONE 3: VERIFIED INSTITUTIONAL STATISTICS BAND
          ============================================================ */}
      <section className="stats-band">
        <div className="container stats-grid">
          <div className="stat-box">
            <div className="stat-box-icon"><Users size={26} /></div>
            <div className="stat-box-info">
              <div className="num">{stats.students}</div>
              <div className="label">Regular Enrolled Students</div>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box-icon"><School size={26} /></div>
            <div className="stat-box-info">
              <div className="num">{stats.faculty}</div>
              <div className="label">UGC & NCTE Qualified Faculty</div>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box-icon"><BookOpen size={26} /></div>
            <div className="stat-box-info">
              <div className="num">{stats.programs}</div>
              <div className="label">Affiliated Programs (GGTU)</div>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box-icon"><Award size={26} /></div>
            <div className="stat-box-info">
              <div className="num">{stats.pass_rate}</div>
              <div className="label">Annual University Result</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ZONE 4: ACADEMIC FACULTIES & PROGRAMS
          ============================================================ */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Disciplines & Faculties</span>
            <h2 className="section-title">Undergraduate & Teacher Education Programs</h2>
            <p className="section-desc">
              All courses are recognized by the National Council for Teacher Education (NCTE) and affiliated with Govind Guru Tribal University (GGTU), Banswara.
            </p>
          </div>

          <div className="grid-4">
            {programs.map((prog) => (
              <div key={prog.id} className="program-card">
                <span className="program-badge">{prog.stream || 'Affiliated GGTU'}</span>
                <h3 className="program-title">{prog.title}</h3>
                <p className="program-desc">{prog.description}</p>
                <div className="program-meta-list">
                  <div><strong>Course Duration:</strong> {prog.duration}</div>
                  <div><strong>Approved Intake:</strong> {prog.intake}</div>
                  <div><strong>Governing Body:</strong> NCTE / GGTU</div>
                </div>
                <Link to="/admissions" className="btn btn-outline" style={{ marginTop: 'auto', textAlign: 'center' }}>
                  Admission Details & Criteria →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ZONE 5: LEADERSHIP DESK (PRINCIPAL & MANAGING DIRECTOR)
          ============================================================ */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Academic Stewardship</span>
            <h2 className="section-title">From the Desk of College Leadership</h2>
            <p className="section-desc">Guiding the institutional journey with academic discipline, integrity, and student-centered commitment.</p>
          </div>

          <div className="grid-2">
            {leaders.map((lead) => (
              <div key={lead.id} className="leader-card">
                <div className="leader-header">
                  <div className="leader-emblem-seal">
                    {lead.name.includes('Principal') ? 'P' : 'MD'}
                  </div>
                  <div className="leader-meta">
                    <h3>{lead.name}</h3>
                    <div className="leader-designation">{lead.role_title}</div>
                    <div className="leader-credentials">{lead.qualifications}</div>
                  </div>
                </div>
                <p className="leader-quote-text">
                  "{lead.message}"
                </p>
                <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #f4f3ef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Gurukripa Peeth College, Dungarpur</span>
                  <Link to="/about" style={{ fontSize: '13px', color: '#b45309', fontWeight: 700 }}>
                    Read Full Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ZONE 6: STATUTORY NAAC & QUALITY ASSURANCE PORTAL
          ============================================================ */}
      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <span className="section-tag" style={{ color: '#fde68a' }}>Statutory Public Disclosure</span>
            <h2 className="section-title">NAAC Accreditation & Quality Assurance Hub</h2>
            <p className="section-desc" style={{ marginBottom: '32px' }}>
              Gurukripa Peeth College adheres strictly to UGC and NAAC quality frameworks. Complete institutional self-study documents, 7 Criterion matrices, and Annual Quality Assurance Reports (AQAR) are publicly accessible for institutional transparency.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/naac" className="btn btn-gold btn-large">
                Explore NAAC SSR 7 Criteria Hub
              </Link>
              <Link to="/iqac" className="btn btn-outline" style={{ color: '#ffffff', borderColor: '#475569', background: 'rgba(255,255,255,0.06)' }}>
                View IQAC Composition & AQAR Reports
              </Link>
              <a 
                href="http://localhost:8884/wp-admin/admin.php?page=gurukapeeth-manager&tab=naac" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-outline" 
                style={{ color: '#fde68a', borderColor: '#d97706', background: 'rgba(180,83,9,0.2)' }}
              >
                🔐 Upload Documents via Headless CMS →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
