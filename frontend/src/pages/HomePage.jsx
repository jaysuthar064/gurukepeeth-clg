import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, Users, Award, ChevronRight, FileText, 
  ExternalLink, Calendar, CheckCircle2, ShieldCheck, Building2,
  FileCheck, Download, School, Compass, ArrowUpRight, BellRing
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

  const rawHero = data?.hero || {
    heading: 'Empowering Minds, Cultivating Excellence in Southern Rajasthan',
    subheading: 'Affiliated with Govind Guru Tribal University (GGTU), Banswara. Dedicated to academic distinction and holistic development in Arts & Science education.',
    badge: 'Admissions Open 2026-27',
  };

  const hero = {
    ...rawHero,
    subheading: (rawHero.subheading || '')
      .replace(/&\s*Recognized by NCTE/gi, '')
      .replace(/Recognized by NCTE/gi, '')
      .replace(/NCTE/gi, '')
      .trim() || 'Affiliated with Govind Guru Tribal University (GGTU), Banswara & Approved by Govt. of Rajasthan.',
  };

  const stats = data?.statistics || {
    students: '2,400+',
    faculty: '48+',
    programs: '2',
    pass_rate: '94%',
  };

  const notices = data?.notices || [
    { id: 1, title: 'Online Admission Form Submission Schedule 2026-27 for Undergraduate Programs', date: '23 Sep 2026', category: 'Admissions', pdf_url: '#' },
    { id: 2, title: 'Submission of B.A. & B.Sc. Examination Forms for Session 2025-26', date: '22 Sep 2026', category: 'Examinations', pdf_url: '#' },
    { id: 3, title: 'IQAC Workshop on NEP 2020 Implementation & Outcome Based Education', date: '20 Sep 2026', category: 'IQAC', pdf_url: '#' },
    { id: 4, title: 'Chief Minister Higher Education Scholarship Applications Open on SSO Portal', date: '18 Sep 2026', category: 'Scholarship', pdf_url: '#' },
    { id: 5, title: 'AISHE Data Submission Confirmation for Session 2025-26', date: '15 Sep 2026', category: 'Statutory', pdf_url: '#' },
  ];

  const fallbackPrograms = [
    {
      id: 1,
      title: 'Bachelor of Arts (B.A.)',
      stream: 'Faculty of Arts',
      duration: '3 Years (6 Semesters)',
      intake: '160 Seats',
      subjects: ['Hindi Literature', 'English Literature', 'Political Science', 'Geography', 'History', 'Economics', 'Sociology', 'Sanskrit'],
      description: 'Comprehensive degree in Humanities and Social Sciences offering diverse elective combinations under Govind Guru Tribal University (GGTU) NEP curriculum framework.',
      eligibility: '10+2 Pass in any stream (Min 45%)',
    },
    {
      id: 2,
      title: 'Bachelor of Science (B.Sc. - Biology / CBZ)',
      stream: 'Faculty of Science (Bio Group)',
      duration: '3 Years (6 Semesters)',
      intake: '140 Seats',
      subjects: ['Zoology (प्राणी विज्ञान)', 'Botany (वनस्पति विज्ञान)', 'Chemistry (रसायन विज्ञान)'],
      description: 'Foundational natural sciences degree with intensive practical laboratory training in Chemistry, Botany, and Zoology (CBZ). Exclusively biological science group with modern laboratory apparatus.',
      eligibility: '10+2 with Science (PCB) (Min 50%)',
    },
  ];

  const rawPrograms = data?.programs && data.programs.length > 0 ? data.programs : fallbackPrograms;

  // Guarantee that ONLY legitimate B.A. and B.Sc. (Only Bio - 140 Seats) programs are displayed
  const programs = rawPrograms
    .filter(prog => {
      const title = (typeof prog.title === 'string' ? prog.title : (prog.title?.rendered || '')).toLowerCase();
      const stream = (prog.stream || '').toLowerCase();
      return !title.includes('b.ed') && !title.includes('d.el.ed') && !title.includes('bstc') && !title.includes('integrated') && !stream.includes('teacher');
    })
    .map(prog => {
      const titleStr = typeof prog.title === 'string' ? prog.title : (prog.title?.rendered || '');
      const isBA = titleStr.toLowerCase().includes('b.a.') || (prog.stream || '').toLowerCase().includes('arts');
      return {
        ...prog,
        title: isBA ? 'Bachelor of Arts (B.A.)' : 'Bachelor of Science (B.Sc. - Biology / CBZ)',
        stream: isBA ? (prog.stream || 'Faculty of Arts') : 'Faculty of Science (Bio Group)',
        intake: isBA ? (prog.intake || '160 Seats') : '140 Seats',
        subjects: isBA 
          ? ['Hindi Literature', 'English Literature', 'Political Science', 'Geography', 'History', 'Economics', 'Sociology', 'Sanskrit']
          : ['Zoology (प्राणी विज्ञान)', 'Botany (वनस्पति विज्ञान)', 'Chemistry (रसायन विज्ञान)'],
        eligibility: isBA ? '10+2 Pass in any stream with minimum 45% marks' : '10+2 with Science (PCB) with minimum 50% marks',
        description: isBA
          ? (prog.description || 'Comprehensive undergraduate curriculum offering specializations in Hindi Literature, Sanskrit, Political Science, History, and Geography under NEP guidelines.')
          : 'Comprehensive theoretical and practical laboratory training in Zoology, Botany, and Chemistry (CBZ group) under Govind Guru Tribal University NEP curriculum.',
      };
    });

  const leaders = data?.leadership && data.leadership.length >= 3 ? data.leadership : [
    { 
      id: 1, 
      name: "Chairman & Director's Desk", 
      role_title: 'Director / Chairman', 
      qualifications: 'Mr. Kalu Ram Labana', 
      message: 'Gurukripa Peeth College is committed to delivering quality higher education and teacher training to the youth of Southern Rajasthan. Our mission is to combine academic excellence, moral integrity, and regional development to shape empowered leaders for the nation.' 
    },
    { 
      id: 2, 
      name: "Secretary's Desk", 
      role_title: 'Secretary', 
      qualifications: 'Mr. Vipin Kumar Labana', 
      message: 'We prioritize learner-centric infrastructure, transparent administration, and comprehensive student support. Gurukripa Peeth stands as a beacon of opportunity for tribal and rural scholars to achieve excellence in higher education and pedagogical careers.' 
    },
    { 
      id: 3, 
      name: "Principal's Desk", 
      role_title: 'Principal & Head of Institution', 
      qualifications: 'Dr. Hari Shanker Maru, Ph.D., M.A. (Hindi)', 
      message: 'Welcome to Gurukripa Peeth College. Our academic framework integrates curricular rigor with ethical character building, experiential learning, and community engagement under GGTU standards.' 
    },
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
          ZONE 1: ACADEMIC GATEWAY HERO WITH CAMPUS ARCHITECTURE
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
            </div>

            <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '12px', color: '#cbd5e1' }}>
              <div><strong>Managed By:</strong> Shree Narayan Shiksha Seva Samiti Peeth</div>
              <div><strong>AISHE Code:</strong> C-48902</div>
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
                  VERIFIED NOTIFICATIONS
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
                <span style={{ color: '#64748b' }}>Reference: GPC/ADMIN/2026-27 • Updated Daily</span>
                <Link to="/admissions" style={{ color: '#b45309', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  View All Archives <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROMOTIONAL BANNER: ADMISSIONS NOTIFICATION 2026-27
          ============================================================ */}
      <section className="admissions-promo-banner">
        <div className="container admissions-promo-grid">
          <div className="admissions-promo-info">
            <div className="admissions-promo-badge">
              <GraduationCap size={15} /> ADMISSIONS 2026-27
            </div>
            <div className="admissions-promo-text">
              <h3>Online Admissions Open for Undergraduate Programs</h3>
              <p>Admissions Open for B.A. and B.Sc. Programs — Counseling & Document Verification Active</p>
            </div>
          </div>
          <div className="admissions-promo-actions">
            <Link to="/admissions" className="btn btn-gold" style={{ background: '#ffffff', color: '#78350f', border: 'none', fontWeight: 700 }}>
              Apply Online Now ↗
            </Link>
            <Link to="/admissions" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.6)' }}>
              <Download size={14} /> Prospectus & Fee Details
            </Link>
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

            <Link to="/student-corner" className="gateway-card">
              <div className="gateway-icon"><BookOpen size={22} /></div>
              <div className="gateway-title">Student Corner &amp; Syllabi</div>
            </Link>

            <a href="https://erp.ggtuexam.com/" target="_blank" rel="noreferrer" className="gateway-card">
              <div className="gateway-icon"><Award size={22} /></div>
              <div className="gateway-title">GGTU NEP ERP Portal ↗</div>
            </a>

            <Link to="/disclosures" className="gateway-card">
              <div className="gateway-icon"><ShieldCheck size={22} /></div>
              <div className="gateway-title">Affiliations &amp; NOC Hub</div>
            </Link>

            <Link to="/naac" className="gateway-card">
              <div className="gateway-icon"><FileCheck size={22} /></div>
              <div className="gateway-title">NAAC Accreditation Hub</div>
            </Link>

            <Link to="/about#society" className="gateway-card">
              <div className="gateway-icon"><Building2 size={22} /></div>
              <div className="gateway-title">Managing Trust &amp; Society</div>
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
              <div className="label">UGC Qualified Faculty</div>
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
            <h2 className="section-title">Undergraduate Academic Programs</h2>
            <p className="section-desc">
              All courses are affiliated with Govind Guru Tribal University (GGTU), Banswara and approved by the Commissionerate of College Education, Govt. of Rajasthan.
            </p>
          </div>

          <div className="home-programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {programs.map((prog) => (
              <div key={prog.id} className="program-card" style={{ display: 'flex', flexDirection: 'column', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="program-badge" style={{ background: '#fef3c7', color: '#92400e', fontWeight: 700, fontSize: '11.5px', padding: '4px 10px', borderRadius: '6px' }}>
                    {prog.stream || 'Affiliated GGTU'}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#047857', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                    Raj. Govt. PNOC
                  </span>
                </div>

                <h3 className="program-title" style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                  {prog.title}
                </h3>
                <p className="program-desc" style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                  {prog.description}
                </p>

                {prog.subjects && (
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                      Key Subjects / Course Group:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {prog.subjects.map((sub, sIdx) => (
                        <span key={sIdx} style={{ fontSize: '12px', background: '#f1f5f9', color: '#1e293b', padding: '3px 9px', borderRadius: '4px', border: '1px solid #e2e8f0', fontWeight: 500 }}>
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="program-meta-list" style={{ marginTop: 'auto', marginBottom: '20px', background: '#f8fafc', padding: '14px 16px', borderRadius: '8px', border: '1px solid #edf2f7', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#64748b' }}>Duration:</span>
                    <strong style={{ color: '#0f172a' }}>{prog.duration || '3 Years (6 Semesters)'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#64748b' }}>Intake:</span>
                    <strong style={{ color: '#0f172a' }}>{prog.intake || '80 Seats'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Eligibility:</span>
                    <strong style={{ color: '#0f172a' }}>{prog.eligibility}</strong>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Link to="/academics" className="btn btn-outline" style={{ textAlign: 'center', fontSize: '13px', padding: '9px 12px' }}>
                    View Syllabus →
                  </Link>
                  <Link to="/admissions" className="btn btn-gold" style={{ textAlign: 'center', fontSize: '13px', padding: '9px 12px' }}>
                    Apply Online
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ZONE 5: LEADERSHIP DESK (DIRECTOR, SECRETARY & PRINCIPAL)
          ============================================================ */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Academic Stewardship</span>
            <h2 className="section-title">From the Desk of College Leadership</h2>
            <p className="section-desc">Guiding the institutional journey with academic discipline, integrity, and student-centered commitment.</p>
          </div>

          <div className="grid-3">
            {leaders.map((lead) => {
              const isPrin = (lead.role_title || lead.name).toLowerCase().includes('principal');
              const isSec = (lead.role_title || lead.name).toLowerCase().includes('secretary');
              const initials = isPrin ? 'P' : isSec ? 'S' : 'DIR';
              return (
                <div key={lead.id} className="leader-card">
                  <div className="leader-header">
                    <div className="leader-emblem-seal" style={{ fontSize: initials.length > 1 ? '15px' : '20px' }}>
                      {initials}
                    </div>
                    <div className="leader-meta">
                      <h3>{lead.name}</h3>
                      <div className="leader-designation">{lead.role_title}</div>
                      <div className="leader-credentials">{lead.qualifications}</div>
                    </div>
                  </div>
                  <p className="leader-quote-text" style={{ flex: 1, fontStyle: 'italic', color: '#475569', lineHeight: 1.7, fontSize: '14px' }}>
                    "{lead.message}"
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #f4f3ef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Gurukripa Peeth College</span>
                    <Link to="/about" style={{ fontSize: '13px', color: '#b45309', fontWeight: 700 }}>
                      Read Profile →
                    </Link>
                  </div>
                </div>
              );
            })}
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
              <Link to="/about" className="btn btn-outline" style={{ color: '#fde68a', borderColor: '#d97706', background: 'rgba(180,83,9,0.2)' }}>
                RTI Statutory Disclosures & Mandatory Committees →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
