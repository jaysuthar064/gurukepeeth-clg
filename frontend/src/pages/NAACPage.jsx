import React, { useState, useEffect } from 'react';
import { Award, FileText, Download, CheckCircle2, ChevronRight, Shield } from 'lucide-react';
import { getNaacDocuments, getSettings } from '../api/wordpress';

export default function NAACPage() {
  const [selectedCriterion, setSelectedCriterion] = useState(1);
  const [naacDocs, setNaacDocs] = useState([]);
  const [settings, setSettings] = useState({
    aishe_code: 'C-48902',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
  });

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getSettings().then(s => {
        if (isMounted && s) setSettings(s);
      });
      getNaacDocuments().then(res => {
        if (isMounted && Array.isArray(res)) {
          setNaacDocs(res);
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

  const criteria = [
    { num: 1, title: 'Curricular Aspects', desc: 'Curriculum design, academic flexibility, feedback system on syllabus', metrics: ['1.1 Curriculum Planning & Delivery', '1.2 Academic Flexibility & Electives', '1.3 Curriculum Enrichment & Cross-Cutting Values', '1.4 Feedback System on Academic Quality'] },
    { num: 2, title: 'Teaching-Learning & Evaluation', desc: 'Student enrollment, catering to diversity, teaching processes, evaluation reforms', metrics: ['2.1 Student Enrollment Profile & Reservation', '2.2 Catering to Student Diversity & Slow Learners', '2.3 Teaching-Learning Process & Experiential ICT', '2.4 Teacher Profile, Quality & Doctorate Ratio', '2.5 Evaluation Process & Examination Reforms', '2.6 Student Performance & Learning Outcomes (PO/CO)'] },
    { num: 3, title: 'Research, Innovations & Extension', desc: 'Resource mobilization, innovation ecosystem, research publications, extension activities', metrics: ['3.1 Resource Mobilization for Research & Grants', '3.2 Innovation Ecosystem & Incubation', '3.3 Research Publications & UGC Care Journals', '3.4 Extension Activities & NSS Community Outreach', '3.5 Collaboration & Institutional MoUs'] },
    { num: 4, title: 'Infrastructure & Learning Resources', desc: 'Physical facilities, ICT-enabled classrooms, library resources, IT infrastructure', metrics: ['4.1 Physical Infrastructure & Laboratories', '4.2 Library as a Learning Resource & NDL', '4.3 IT Infrastructure & High-Speed Wi-Fi', '4.4 Maintenance of Campus Facilities'] },
    { num: 5, title: 'Student Support & Progression', desc: 'Student mentoring, scholarships, capability enhancement, alumni engagement', metrics: ['5.1 Student Support, Freeships & Schemes', '5.2 Student Progression to Higher Education', '5.3 Student Participation in Sports & Culture', '5.4 Alumni Association & Contribution'] },
    { num: 6, title: 'Governance, Leadership & Management', desc: 'Institutional vision, strategy, faculty empowerment, financial management', metrics: ['6.1 Institutional Vision & Decentralization', '6.2 Strategy Development & E-Governance', '6.3 Faculty Empowerment & Professional Development', '6.4 Financial Management & Resource Mobilization', '6.5 Internal Quality Assurance System (IQAC)'] },
    { num: 7, title: 'Institutional Values & Best Practices', desc: 'Gender equity, environmental consciousness, human values, institutional distinctiveness', metrics: ['7.1 Institutional Values & Social Responsibilities', '7.2 Institutional Best Practices (Practices I & II)', '7.3 Institutional Distinctiveness in Rural Education'] },
  ];

  const current = criteria.find(c => c.num === selectedCriterion) || criteria[0];

  return (
    <div className="naac-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">National Assessment & Accreditation Council</span>
          <h1 className="page-hero-title">NAAC Portal & Self Study Report (SSR)</h1>
          <p className="page-hero-desc">
            Public disclosure of institutional SSR criteria documentation, IIQA statutory undertakings, Data Validation and Verification (DVV), and Peer Team inspection reports.
          </p>
        </div>
      </div>

      <div className="section section-white">
        <div className="container">
          {/* Statutory Highlights Banner */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>NAAC Track ID</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>RJCOGN104231</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>AISHE Code</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>{settings.aishe_code || 'C-48902'}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Current Status</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>{settings.naac_grade || 'Accredited B+'}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Self Study Report</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#b8860b', marginTop: '4px' }}>SSR Active</div>
            </div>
          </div>

          <h2 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '20px' }}>
            Seven Assessment Criteria of Higher Education
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
            {/* Sidebar of Criteria */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {criteria.map((c) => (
                <button
                  key={c.num}
                  onClick={() => setSelectedCriterion(c.num)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: selectedCriterion === c.num ? '#b8860b' : '#e2e8f0',
                    background: selectedCriterion === c.num ? '#fffbeb' : '#fff',
                    color: selectedCriterion === c.num ? '#92400e' : '#334155',
                    fontWeight: selectedCriterion === c.num ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '13px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span><strong>Criterion {c.num}:</strong> {c.title}</span>
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>

            {/* Content for Selected Criterion */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
              <span className="section-tag">NAAC Criterion {current.num}</span>
              <h3 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '8px' }}>{current.title}</h3>
              <p style={{ color: '#64748b', marginBottom: '24px' }}>{current.desc}</p>

              <h4 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '14px' }}>Key Metrics & Supporting Data Templates</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Dynamically uploaded documents from WP CMS for this criterion */}
                {naacDocs
                  .filter(doc => String(doc.criterion || '').includes(String(current.num)))
                  .map((doc) => (
                    <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ecfdf5', padding: '14px 18px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle2 size={16} style={{ color: '#059669' }} />
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#065f46' }}>{doc.title}</div>
                          <div style={{ fontSize: '12px', color: '#047857' }}>Metric: {doc.metric || doc.metric_no} • Session: {doc.session || doc.academic_year}</div>
                        </div>
                      </div>
                      <a 
                        href={doc.pdf_url || '#'} 
                        target={doc.pdf_url && doc.pdf_url !== '#' ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="pdf-download-link"
                        style={{ background: '#059669', color: '#fff' }}
                      >
                        <Download size={13} /> Download SSR PDF
                      </a>
                    </div>
                  ))}

                {/* Standard criterion metrics */}
                {current.metrics.map((m, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle2 size={16} style={{ color: '#059669' }} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{m}</span>
                    </div>
                    <a href="#" className="pdf-download-link">
                      <Download size={13} /> Metric Evidence PDF
                    </a>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--surface-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Institutional documentation is maintained in compliance with the National Assessment and Accreditation Council (NAAC) guidelines.
                </span>
                <a 
                  href="https://naac.gov.in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-outline" 
                  style={{ fontSize: '12px', padding: '6px 14px' }}
                >
                  NAAC Official Portal ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
