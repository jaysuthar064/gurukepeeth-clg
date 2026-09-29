import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, GraduationCap } from 'lucide-react';
import { getPrograms } from '../api/wordpress';

export default function AcademicsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

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
      title: { rendered: 'Bachelor of Arts (B.A.)' },
      content: { rendered: 'Three-year undergraduate program in Humanities and Social Sciences offering specializations in Hindi Literature, Sanskrit, Political Science, History, and Geography. Affiliated with GGTU Banswara under NEP curriculum.' },
      meta: { duration: '3 Years (6 Semesters)', intake: '160 Seats', eligibility: '10+2 Pass in any stream with minimum 45% marks' },
    },
    {
      id: 2,
      title: { rendered: 'Bachelor of Science (B.Sc. - Bio & Maths)' },
      content: { rendered: 'Three-year undergraduate program providing comprehensive theoretical and laboratory training in Physics, Chemistry, Mathematics, Botany, and Zoology with modern digital laboratories.' },
      meta: { duration: '3 Years (6 Semesters)', intake: '120 Seats', eligibility: '10+2 with Science (PCM/PCB) with minimum 50% marks' },
    },
    {
      id: 3,
      title: { rendered: 'Bachelor of Education (B.Ed.)' },
      content: { rendered: 'Two-year professional teacher education degree approved by National Council for Teacher Education (NCTE) and affiliated with Govind Guru Tribal University (GGTU), Banswara.' },
      meta: { duration: '2 Years (Annual Scheme)', intake: '100 Seats', eligibility: 'Graduation with minimum 50% marks (45% for SC/ST/OBC) through PTET exam' },
    },
    {
      id: 4,
      title: { rendered: 'Integrated B.A.-B.Ed. (4-Year)' },
      content: { rendered: 'Four-year composite dual-degree teacher preparation program saving one academic year for students aspiring to secondary school teaching professions.' },
      meta: { duration: '4 Years (8 Semesters)', intake: '50 Seats', eligibility: '10+2 Senior Secondary with minimum 50% through PTET' },
    },
    {
      id: 5,
      title: { rendered: 'Diploma in Elementary Education (D.El.Ed. / BSTC)' },
      content: { rendered: 'Two-year professional diploma training primary and upper primary school teachers in pedagogy, child development, and practical school internship.' },
      meta: { duration: '2 Years', intake: '50 Seats', eligibility: '10+2 through Pre D.El.Ed. (BSTC) entrance exam' },
    },
  ];

  const displayList = loaded ? programs : fallbackPrograms;

  return (
    <div className="academics-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Curriculum & Degrees</span>
          <h1 className="page-hero-title">Academic Programs & Departments</h1>
          <p className="page-hero-desc">
            Structured in compliance with the National Education Policy (NEP) and approved by Govind Guru Tribal University & NCTE.
          </p>
        </div>
      </div>

      <div className="section section-light">
        <div className="container">
          <div className="grid-3">
            {displayList.map((prog) => {
              const title = typeof prog.title === 'string' ? prog.title : (prog.title?.rendered || prog.post_title || 'Academic Program');
              const rawHtml = prog.description || prog.content?.rendered || prog.post_content || '';
              const cleanDesc = typeof rawHtml === 'string' ? rawHtml.replace(/<[^>]+>/g, '') : '';
              const meta = prog.meta || {};
              const duration = prog.duration || meta.duration || '3 Years';
              const intake = prog.intake || meta.intake || '100+ Seats';
              const eligibility = prog.eligibility || meta.eligibility || 'Senior Secondary (10+2)';
              const stream = prog.stream || 'Affiliated GGTU';

              return (
                <div key={prog.id} className="program-card">
                  <span className="program-badge">{stream}</span>
                  <h3 className="program-title" dangerouslySetInnerHTML={{ __html: title }} />
                  <p className="program-desc">{cleanDesc}</p>
                  
                  <div className="program-meta-list">
                    <div><strong>Duration:</strong> {duration}</div>
                    <div><strong>Intake:</strong> {intake}</div>
                    <div><strong>Eligibility:</strong> {eligibility}</div>
                  </div>

                  <Link to="/admissions" className="btn btn-gold" style={{ marginTop: 'auto' }}>
                    Apply for Program →
                  </Link>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '48px', textAlign: 'center', padding: '28px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--surface-200)' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--primary-900)', marginBottom: '8px' }}>
              Academic Counseling & Program Inquiries
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '600px', margin: '0 auto 16px auto' }}>
              Have questions regarding subject combinations, NEP choice-based credit system (CBCS), or seat reservations? Contact our academic counseling desk.
            </p>
            <Link to="/contact" className="btn btn-gold">
              Inquire with Academic Coordinator →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
