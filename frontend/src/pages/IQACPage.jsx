import React, { useState, useEffect } from 'react';
import { Award, FileText, Download, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { getIqacReports } from '../api/wordpress';

export default function IQACPage() {
  const [activeTab, setActiveTab] = useState('aqar');
  const [reports, setReports] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getIqacReports().then(res => {
        if (isMounted && Array.isArray(res)) {
          setReports(res);
          setLoaded(true);
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

  const fallbackAqarReports = [
    { id: 1, type: 'AQAR Report', session: '2024-25', title: 'Annual Quality Assurance Report (AQAR) 2024-25', status: 'Submitted to NAAC', pdf_url: '#' },
    { id: 2, type: 'AQAR Report', session: '2023-24', title: 'Annual Quality Assurance Report (AQAR) 2023-24', status: 'Accepted & Verified', pdf_url: '#' },
    { id: 3, type: 'AQAR Report', session: '2022-23', title: 'Annual Quality Assurance Report (AQAR) 2022-23', status: 'Accepted & Verified', pdf_url: '#' },
    { id: 4, type: 'AQAR Report', session: '2021-22', title: 'Annual Quality Assurance Report (AQAR) 2021-22', status: 'Accepted & Verified', pdf_url: '#' },
  ];

  const allReports = loaded ? reports : fallbackAqarReports;
  const aqarReports = allReports.filter(r => r.type === 'AQAR Report' || !r.type);
  const minutesReports = allReports.filter(r => r.type === 'Meeting Minutes' || r.type === 'Action Taken Report' || r.type === 'Feedback Analysis' || r.type === 'Best Practices');

  const fallbackMeetings = [
    { session: '2025-26', title: 'Review of NEP 2020 Course Structure & Outcome-Based Assessment Metrics', status: 'Committees formed for continuous internal evaluation', pdf_url: '#' },
    { session: '2025-26', title: 'Annual Academic Audit & Faculty Development Workshop Planning', status: 'Faculty FDP conducted from 1-7 June 2026', pdf_url: '#' },
    { session: '2025-26', title: 'Green Campus & Energy Audit Execution Review', status: 'Solar panels installed and waste segregation implemented', pdf_url: '#' },
  ];

  const displayMinutes = minutesReports.length > 0 ? minutesReports : (loaded ? [] : fallbackMeetings);

  return (
    <div className="iqac-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Quality Assurance</span>
          <h1 className="page-hero-title">Internal Quality Assurance Cell (IQAC)</h1>
          <p className="page-hero-desc">
            Nodal cell driving academic standards, continuous evaluation, faculty development, and annual institutional quality reporting as mandated by NAAC.
          </p>
        </div>
      </div>

      <div className="section section-white">
        <div className="container">
          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '32px' }}>
            <button 
              onClick={() => setActiveTab('aqar')} 
              style={{ padding: '12px 20px', border: 'none', background: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: activeTab === 'aqar' ? '#b8860b' : '#64748b', borderBottom: activeTab === 'aqar' ? '3px solid #b8860b' : 'none', marginBottom: '-2px' }}
            >
              📊 Annual AQAR Reports ({aqarReports.length})
            </button>
            <button 
              onClick={() => setActiveTab('minutes')} 
              style={{ padding: '12px 20px', border: 'none', background: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: activeTab === 'minutes' ? '#b8860b' : '#64748b', borderBottom: activeTab === 'minutes' ? '3px solid #b8860b' : 'none', marginBottom: '-2px' }}
            >
              📝 Meeting Minutes & ATR ({displayMinutes.length})
            </button>
            <button 
              onClick={() => setActiveTab('committee')} 
              style={{ padding: '12px 20px', border: 'none', background: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: activeTab === 'committee' ? '#b8860b' : '#64748b', borderBottom: activeTab === 'committee' ? '3px solid #b8860b' : 'none', marginBottom: '-2px' }}
            >
              👥 Cell Composition
            </button>
          </div>

          {/* Tab 1: AQAR */}
          {activeTab === 'aqar' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>Annual Quality Assurance Reports (AQAR)</h3>
                <a 
                  href="http://localhost:8884/wp-admin/admin.php?page=gurukapeeth-manager&tab=iqac" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ fontSize: '12px', color: '#b8860b', fontWeight: 700 }}
                >
                  ⚙️ Manage IQAC in CMS →
                </a>
              </div>
              <table className="statutory-table">
                <thead>
                  <tr>
                    <th>Academic Session</th>
                    <th>Report Title</th>
                    <th>Submission Status</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {aqarReports.length > 0 ? (
                    aqarReports.map((r, i) => (
                      <tr key={r.id || i}>
                        <td><strong>{r.session}</strong></td>
                        <td>{r.title}</td>
                        <td><span style={{ background: '#ecfdf5', color: '#065f46', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>{r.status || 'Verified'}</span></td>
                        <td>
                          <a 
                            href={r.pdf_url || '#'} 
                            target={r.pdf_url && r.pdf_url !== '#' ? '_blank' : '_self'}
                            rel="noreferrer"
                            className="pdf-download-link"
                          >
                            <Download size={14} /> Download AQAR PDF
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>No AQAR reports uploaded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 2: Minutes */}
          {activeTab === 'minutes' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>IQAC Meeting Proceedings & Action Taken Reports (ATR)</h3>
                <a 
                  href="http://localhost:8884/wp-admin/admin.php?page=gurukapeeth-manager&tab=iqac" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ fontSize: '12px', color: '#b8860b', fontWeight: 700 }}
                >
                  ⚙️ Manage Minutes in CMS →
                </a>
              </div>
              <table className="statutory-table">
                <thead>
                  <tr>
                    <th>Academic Session</th>
                    <th>Key Agenda / Title</th>
                    <th>Status / Action Taken (ATR)</th>
                    <th>Proceedings PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {displayMinutes.length > 0 ? (
                    displayMinutes.map((m, i) => (
                      <tr key={m.id || i}>
                        <td><strong>{m.session || m.date || 'Current'}</strong></td>
                        <td>
                          {m.type && m.type !== 'Meeting Minutes' && (
                            <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, marginRight: '6px' }}>
                              {m.type}
                            </span>
                          )}
                          {m.title || m.agenda}
                        </td>
                        <td style={{ color: '#059669', fontSize: '13px' }}>✓ {m.status || m.atr || 'Implemented'}</td>
                        <td>
                          <a 
                            href={m.pdf_url || '#'} 
                            target={m.pdf_url && m.pdf_url !== '#' ? '_blank' : '_self'}
                            rel="noreferrer" 
                            className="pdf-download-link"
                          >
                            <Download size={14} /> Download PDF
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>No meeting proceedings uploaded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Composition */}
          {activeTab === 'committee' && (
            <div>
              <h3 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '16px' }}>IQAC Advisory & Executive Committee (Session 2026-27)</h3>
              <table className="statutory-table">
                <thead>
                  <tr>
                    <th>Designation in IQAC</th>
                    <th>Name</th>
                    <th>Institutional Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Chairperson</strong></td>
                    <td>Dr. Rajesh Sharma</td>
                    <td>Principal & Head of Institution</td>
                  </tr>
                  <tr>
                    <td><strong>IQAC Coordinator</strong></td>
                    <td>Dr. Meenakshi Joshi</td>
                    <td>Associate Professor, Dept. of Chemistry</td>
                  </tr>
                  <tr>
                    <td><strong>Teacher Representative</strong></td>
                    <td>Prof. Suresh Kumar Patel</td>
                    <td>Assistant Professor, Faculty of Arts</td>
                  </tr>
                  <tr>
                    <td><strong>Management Representative</strong></td>
                    <td>Shri Narendra Mehta</td>
                    <td>Member, Governing Council</td>
                  </tr>
                  <tr>
                    <td><strong>Administrative Officer</strong></td>
                    <td>Shri B.L. Sharma</td>
                    <td>Office Superintendent</td>
                  </tr>
                  <tr>
                    <td><strong>Student Nominee</strong></td>
                    <td>Ms. Priya Sharma</td>
                    <td>B.Ed. Final Year Student</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
