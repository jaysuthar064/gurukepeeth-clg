import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, GraduationCap, Sparkles, Compass, CheckCircle2, ArrowRight, Download } from 'lucide-react';
import { getPrograms } from '../api/wordpress';

export default function AcademicsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [selectedStream, setSelectedStream] = useState('all');

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getPrograms().then(res => {
        if (isMounted && Array.isArray(res)) {
          setPrograms(res);
          setLoaded(true);
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

  const fallbackPrograms = [
    {
      id: 1,
      stream: 'Faculty of Arts',
      title: { rendered: 'Bachelor of Arts (B.A.)' },
      content: { rendered: 'Three-year undergraduate degree in Humanities & Social Sciences offering diverse subject combinations in Hindi Literature, English Literature, Sanskrit, Political Science, History, Geography, Economics, and Sociology under the NEP credit system.' },
      meta: { duration: '3 Years (6 Semesters)', intake: '160 Seats', eligibility: '10+2 Pass in any stream with minimum 45% marks' },
    },
    {
      id: 2,
      stream: 'Faculty of Science (Bio Group)',
      title: { rendered: 'Bachelor of Science (B.Sc. - Biology / CBZ)' },
      content: { rendered: 'Rigorous 3-year foundational science degree with specialized laboratory training in Chemistry, Botany, and Zoology (CBZ group). Exclusively biological sciences with modern digital laboratory apparatus and practical research orientation.' },
      meta: { duration: '3 Years (6 Semesters)', intake: '140 Seats', eligibility: '10+2 with Science (PCB) with minimum 50% marks' },
    },
  ];

  const rawList = loaded ? programs : fallbackPrograms;

  const filteredPrograms = rawList.filter((prog) => {
    if (selectedStream === 'all') return true;
    const stream = (prog.stream || '').toLowerCase();
    const title = (typeof prog.title === 'string' ? prog.title : (prog.title?.rendered || '')).toLowerCase();
    if (selectedStream === 'arts') {
      return stream.includes('arts') || title.includes('b.a.') || title.includes('humanities');
    }
    if (selectedStream === 'science') {
      return stream.includes('science') || title.includes('b.sc.');
    }
    return true;
  });

  const nepPillars = [
    {
      title: 'Multidisciplinary Choice (CBCS)',
      desc: 'Flexibility to choose Major, Minor, and Open Electives across Arts, Languages, and Natural Sciences.',
    },
    {
      title: 'Skill Enhancement Courses (SEC)',
      desc: 'Hands-on practical modules in digital literacy, regional crafts, communication skills, and environmental studies.',
    },
    {
      title: 'Continuous Evaluation (CCE)',
      desc: 'Transparent internal continuous assessment combining midterm tests, seminar presentations, and project work.',
    },
    {
      title: 'Field Projects & Practical Work',
      desc: 'Hands-on laboratory experiments, field study surveys, and research orientation in Humanities and Natural Sciences.',
    },
  ];

  return (
    <div className="academics-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Curriculum & Degrees</span>
          <h1 className="page-hero-title">Academic Programs & Departments</h1>
          <p className="page-hero-desc">
            Approved by Govind Guru Tribal University (GGTU), Banswara in accordance with the National Education Policy (NEP).
          </p>
        </div>
      </div>

      <div className="section section-light">
        <div className="container">
          {/* Stream Filter Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => setSelectedStream('all')}
              className={`filter-chip ${selectedStream === 'all' ? 'filter-chip--active' : ''}`}
            >
              All Academic Programs ({rawList.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStream('arts')}
              className={`filter-chip ${selectedStream === 'arts' ? 'filter-chip--active' : ''}`}
            >
              Faculty of Arts (Humanities)
            </button>
            <button
              type="button"
              onClick={() => setSelectedStream('science')}
              className={`filter-chip ${selectedStream === 'science' ? 'filter-chip--active' : ''}`}
            >
              Faculty of Science (Biology)
            </button>
          </div>

          {/* Programs Grid */}
          <div className="grid-3" style={{ gap: '28px' }}>
            {filteredPrograms.map((prog) => {
              const rawTitle = typeof prog.title === 'string' ? prog.title : (prog.title?.rendered || prog.post_title || 'Academic Program');
              const isBA = rawTitle.toLowerCase().includes('b.a.') || (prog.stream || '').toLowerCase().includes('arts');
              const title = isBA ? 'Bachelor of Arts (B.A.)' : 'Bachelor of Science (B.Sc. - Biology / CBZ)';
              const rawHtml = prog.description || prog.content?.rendered || prog.post_content || '';
              const cleanDesc = typeof rawHtml === 'string' 
                ? rawHtml.replace(/<[^>]+>/g, '') 
                : (isBA 
                    ? 'Three-year undergraduate degree in Humanities & Social Sciences offering diverse subject combinations under the NEP credit system.' 
                    : 'Rigorous 3-year foundational science degree with specialized laboratory training in Chemistry, Botany, and Zoology (CBZ group).');
              const meta = prog.meta || {};
              const duration = prog.duration || meta.duration || '3 Years (6 Semesters)';
              const intake = isBA ? (prog.intake || meta.intake || '160 Seats') : '140 Seats';
              const eligibility = isBA ? '10+2 Pass in any stream with minimum 45% marks' : '10+2 with Science (PCB) with minimum 50% marks';
              const stream = isBA ? (prog.stream || 'Faculty of Arts') : 'Faculty of Science (Bio Group)';

              return (
                <div key={prog.id} className="program-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span className="program-badge">{stream}</span>
                    {title.toLowerCase().includes('b.a.') && (
                      <a
                        href="/documents/noc/rajasthan-govt-permanent-noc-ba-arts.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '11px', fontWeight: 600, color: '#047857',
                          background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px',
                          textDecoration: 'none', border: '1px solid #a7f3d0',
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                        }}
                        title="View Rajasthan Govt. Permanent NOC for B.A."
                      >
                        <CheckCircle2 size={11} /> Raj. Govt. PNOC
                      </a>
                    )}
                    {title.toLowerCase().includes('b.sc.') && (
                      <a
                        href="/documents/noc/rajasthan-govt-permanent-noc-bsc-biology.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '11px', fontWeight: 600, color: '#047857',
                          background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px',
                          textDecoration: 'none', border: '1px solid #a7f3d0',
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                        }}
                        title="View Rajasthan Govt. Permanent NOC for B.Sc. Biology"
                      >
                        <CheckCircle2 size={11} /> Raj. Govt. PNOC
                      </a>
                    )}
                  </div>
                  <h3 className="program-title" dangerouslySetInnerHTML={{ __html: title }} />
                  <p className="program-desc">{cleanDesc}</p>
                  
                  <div className="program-meta-list" style={{ marginTop: 'auto', marginBottom: '20px' }}>
                    <div><strong>Duration:</strong> {duration}</div>
                    <div><strong>Intake:</strong> {intake}</div>
                    <div><strong>Eligibility:</strong> {eligibility}</div>
                  </div>

                  <Link to="/admissions" className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    Apply for Program <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Official Course & Subject Distribution from University Framework */}
          <div style={{ marginTop: '48px', background: '#ffffff', borderRadius: '16px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ marginBottom: '24px' }}>
              <span className="section-tag">Approved Course Matrix</span>
              <h2 className="section-title">Official Subjects &amp; Degree Specializations</h2>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>
                Conforming to the Govind Guru Tribal University (GGTU) curriculum framework for Undergraduate Part I, II &amp; III.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              {/* B.A. Subjects */}
              <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700, margin: 0 }}>Bachelor of Arts (B.A.)</h3>
                  <span style={{ fontSize: '12px', fontWeight: 700, background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px' }}>3 Years</span>
                </div>
                <div style={{ fontSize: '13px', color: '#475569', marginBottom: '12px', fontWeight: 600 }}>Elective Subjects Offered (Choose Any 3):</div>
                <ol style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13.5px', lineHeight: '1.9' }}>
                  <li><strong>Hindi Literature</strong> (हिन्दी साहित्य)</li>
                  <li><strong>English Literature</strong> (अंग्रेजी साहित्य)</li>
                  <li><strong>Political Science</strong> (राजनीति विज्ञान)</li>
                  <li><strong>Geography</strong> (भूगोल)</li>
                  <li><strong>History</strong> (इतिहास)</li>
                  <li><strong>Economics</strong> (अर्थशास्त्र)</li>
                  <li><strong>Sociology</strong> (समाजशास्त्र)</li>
                  <li><strong>Sanskrit Literature</strong> (संस्कृत साहित्य)</li>
                </ol>
              </div>

              {/* B.Sc. Subjects */}
              <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700, margin: 0 }}>Bachelor of Science (B.Sc.)</h3>
                  <span style={{ fontSize: '12px', fontWeight: 700, background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '12px' }}>3 Years</span>
                </div>
                <div style={{ fontSize: '13px', color: '#475569', marginBottom: '12px', fontWeight: 600 }}>Biology (CBZ) Group Subjects:</div>
                <ol style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13.5px', lineHeight: '1.9' }}>
                  <li><strong>Zoology</strong> (प्राणी विज्ञान)</li>
                  <li><strong>Botany</strong> (वनस्पति विज्ञान)</li>
                  <li><strong>Chemistry</strong> (रसायन विज्ञान)</li>
                </ol>
                <div style={{ marginTop: '20px', padding: '12px 16px', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                  <span style={{ fontSize: '12px', color: '#065f46', fontWeight: 600 }}>
                    ✓ Practical laboratory batches with modern scientific equipment &amp; museum specimens.
                  </span>
                </div>
              </div>
            </div>

            {/* Compulsory Subjects for UG Part-I */}
            <div style={{ background: '#f1f5f9', padding: '20px 24px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
                Compulsory Foundation Subjects (For All UG Part-I Students)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                  1. General Hindi (सामान्य हिन्दी)
                </div>
                <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                  2. General English (सामान्य अंग्रेजी)
                </div>
                <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                  3. Environmental Studies (पर्यावरण अध्ययन)
                </div>
                <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                  4. Elementary Computer Application
                </div>
              </div>
            </div>
          </div>

          {/* Statutory University Affiliation & Govt NOC Download Strip */}
          <div style={{ marginTop: '48px', background: '#f8fafc', borderRadius: '16px', padding: '32px', border: '1px solid #cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
              <div>
                <span className="section-tag">Statutory Approvals</span>
                <h3 style={{ fontSize: '20px', color: '#0f172a', fontWeight: 700, margin: '4px 0 6px' }}>
                  University Affiliations &amp; Rajasthan Govt. Permanent NOCs
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0, maxWidth: '720px' }}>
                  Gurukripa Peeth College operates under permanent recognition and affiliation. Official government orders and annual affiliation letters are accessible for public verification.
                </p>
              </div>
              <Link to="/disclosures" className="btn-outline-sm" style={{ fontWeight: 600, padding: '8px 18px', background: '#fff' }}>
                All Disclosures &amp; Compliance ↗
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>State Government NOC</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '4px 0' }}>B.A. (Arts) Permanent NOC</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>Directorate of College Ed., Jaipur (Order: 1128)</div>
                <a href="/documents/noc/rajasthan-govt-permanent-noc-ba-arts.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-sm" style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Download size={12} /> Download B.A. NOC PDF
                </a>
              </div>

              <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>State Government NOC</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '4px 0' }}>B.Sc. (Biology) Permanent NOC</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>Directorate of College Ed., Jaipur (Order: 20)</div>
                <a href="/documents/noc/rajasthan-govt-permanent-noc-bsc-biology.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-sm" style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Download size={12} /> Download B.Sc. NOC PDF
                </a>
              </div>

              <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4679', textTransform: 'uppercase' }}>GGTU Affiliation</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '4px 0' }}>Session 2025-26 &amp; 2024-25</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>Affiliation Orders: 1992 &amp; 731-39</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href="/documents/affiliation/ggtu-affiliation-2025-26.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-sm" style={{ fontSize: '11px' }}>
                    2025-26 PDF
                  </a>
                  <a href="/documents/affiliation/ggtu-affiliation-2024-25.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-sm" style={{ fontSize: '11px' }}>
                    2024-25 PDF
                  </a>
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4679', textTransform: 'uppercase' }}>GGTU Affiliation</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '4px 0' }}>Session 2022-23 &amp; 2021-22</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>Affiliation Orders: 626 &amp; 230-236</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href="/documents/affiliation/ggtu-affiliation-2022-23.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-sm" style={{ fontSize: '11px' }}>
                    2022-23 PDF
                  </a>
                  <a href="/documents/affiliation/ggtu-affiliation-2021-22.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-sm" style={{ fontSize: '11px' }}>
                    2021-22 PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* NEP 2020 Pedagogical Framework */}
          <div style={{ marginTop: '64px', background: '#ffffff', borderRadius: '16px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)' }}>
            <div style={{ textAlign: 'left', marginBottom: '28px' }}>
              <span className="section-tag">National Education Policy</span>
              <h2 className="section-title">NEP 2020 Academic Architecture</h2>
              <p className="section-desc">
                Gurukripa Peeth College implements the University Grants Commission (UGC) and GGTU curriculum framework for holistic student development.
              </p>
            </div>

            <div className="grid-4" style={{ gap: '20px' }}>
              {nepPillars.map((pillar, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
                    <h4 style={{ fontSize: '15px', color: '#0f172a', fontWeight: 700, margin: 0 }}>{pillar.title}</h4>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Counseling CTA */}
          <div style={{ marginTop: '48px', textAlign: 'center', padding: '32px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', color: '#0f172a', fontWeight: 700, marginBottom: '8px' }}>
              Academic Counseling & Program Inquiries
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '600px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
              Have questions regarding subject combinations, CBCS elective choice, or 10+2 merit score eligibility? Our academic coordinators are here to assist.
            </p>
            <Link to="/contact" className="btn btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Inquire with Academic Coordinator <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
