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
      content: { rendered: 'Three-year undergraduate degree in Humanities & Social Sciences offering diverse subject combinations in Hindi Literature, Sanskrit, Political Science, History, and Geography under the NEP credit system.' },
      meta: { duration: '3 Years (6 Semesters)', intake: '160 Seats', eligibility: '10+2 Pass in any stream with minimum 45% marks' },
    },
    {
      id: 2,
      stream: 'Faculty of Science',
      title: { rendered: 'Bachelor of Science (B.Sc. - Bio & Maths)' },
      content: { rendered: 'Rigorous 3-year foundational science degree with specialized laboratory training in Physics, Chemistry, Mathematics, Botany, and Zoology with digital scientific apparatus.' },
      meta: { duration: '3 Years (6 Semesters)', intake: '120 Seats', eligibility: '10+2 with Science (PCM/PCB) with minimum 50% marks' },
    },
    {
      id: 3,
      stream: 'Department of Education',
      title: { rendered: 'Bachelor of Education (B.Ed.)' },
      content: { rendered: 'Two-year professional teacher education degree approved by National Council for Teacher Education (NCTE) and affiliated with Govind Guru Tribal University (GGTU), Banswara.' },
      meta: { duration: '2 Years (Annual Scheme)', intake: '100 Seats', eligibility: 'Graduation with minimum 50% marks (45% for SC/ST/OBC) through State PTET' },
    },
    {
      id: 4,
      stream: 'Department of Education',
      title: { rendered: 'Integrated B.A.-B.Ed. (4-Year)' },
      content: { rendered: 'Four-year composite dual-degree teacher preparation program saving one academic year for students aspiring to secondary and senior secondary school teaching careers.' },
      meta: { duration: '4 Years (8 Semesters)', intake: '50 Seats', eligibility: '10+2 Senior Secondary with minimum 50% through State PTET' },
    },
    {
      id: 5,
      stream: 'Department of Education',
      title: { rendered: 'Diploma in Elementary Education (D.El.Ed. / BSTC)' },
      content: { rendered: 'Two-year professional diploma training primary and upper primary school teachers in child psychology, classroom management, and practical school internship.' },
      meta: { duration: '2 Years', intake: '50 Seats', eligibility: '10+2 through Rajasthan Pre D.El.Ed. (BSTC) entrance examination' },
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
    if (selectedStream === 'education') {
      return stream.includes('education') || title.includes('b.ed') || title.includes('d.el.ed') || title.includes('bstc');
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
      title: 'School Internship & Field Work',
      desc: 'Mandatory 16-week mentored school internship for teacher trainees in government secondary schools.',
    },
  ];

  return (
    <div className="academics-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Curriculum & Degrees</span>
          <h1 className="page-hero-title">Academic Programs & Departments</h1>
          <p className="page-hero-desc">
            Approved by Govind Guru Tribal University (GGTU), Banswara & NCTE New Delhi in accordance with the National Education Policy (NEP).
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
              Faculty of Science (Bio &amp; Maths)
            </button>
            <button
              type="button"
              onClick={() => setSelectedStream('education')}
              className={`filter-chip ${selectedStream === 'education' ? 'filter-chip--active' : ''}`}
            >
              Department of Teacher Education (B.Ed. / BSTC)
            </button>
          </div>

          {/* Programs Grid */}
          <div className="grid-3" style={{ gap: '28px' }}>
            {filteredPrograms.map((prog) => {
              const title = typeof prog.title === 'string' ? prog.title : (prog.title?.rendered || prog.post_title || 'Academic Program');
              const rawHtml = prog.description || prog.content?.rendered || prog.post_content || '';
              const cleanDesc = typeof rawHtml === 'string' ? rawHtml.replace(/<[^>]+>/g, '') : '';
              const meta = prog.meta || {};
              const duration = prog.duration || meta.duration || '3 Years';
              const intake = prog.intake || meta.intake || '100+ Seats';
              const eligibility = prog.eligibility || meta.eligibility || 'Senior Secondary (10+2)';
              const stream = prog.stream || 'Affiliated GGTU';

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
              Have questions regarding subject combinations, CBCS elective choice, or PTET seat allocation? Our academic coordinators are here to assist.
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
