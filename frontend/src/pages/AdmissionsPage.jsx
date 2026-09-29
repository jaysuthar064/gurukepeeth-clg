import React, { useState, useEffect } from 'react';
import { Calendar, FileText, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { getAdmissions, getPrograms } from '../api/wordpress';

export default function AdmissionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [admissions, setAdmissions] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getAdmissions().then(res => {
        if (isMounted && Array.isArray(res)) {
          setAdmissions(res);
          setLoaded(true);
        }
      });
      getPrograms().then(res => {
        if (isMounted && Array.isArray(res)) {
          setPrograms(res);
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

  const fallbackMeritLists = [
    { id: 1, session: '2026-27', stream: 'Faculty of Arts (B.A.)', list: '1st Provisional Merit List', date: '20 Sep 2026', cutoff: '72.4%', pdf_url: '#' },
    { id: 2, session: '2026-27', stream: 'Faculty of Science (B.Sc.)', list: '1st Provisional Merit List', date: '21 Sep 2026', cutoff: '78.2%', pdf_url: '#' },
    { id: 3, session: '2025-26', stream: 'B.Ed. 2-Year Program', list: 'PTET Final Allotment List', date: '15 Aug 2025', cutoff: 'PTET Rank', pdf_url: '#' },
    { id: 4, session: '2025-26', stream: 'Integrated B.A.-B.Ed.', list: 'PTET 2nd Round Allotment', date: '25 Aug 2025', cutoff: 'PTET Rank', pdf_url: '#' },
  ];

  const displayLists = loaded ? admissions : fallbackMeritLists;

  return (
    <div className="admissions-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Enrolment & Cutoffs</span>
          <h1 className="page-hero-title">Admissions 2026-27 & Merit Lists</h1>
          <p className="page-hero-desc">
            Complete details on eligibility, merit cutoff lists, online inquiry, and reservation norms as per Government of Rajasthan and GGTU Banswara.
          </p>
        </div>
      </div>

      <div className="section section-white">
        <div className="container">
          <div className="grid-2" style={{ gap: '48px' }}>
            {/* Left: Merit Lists Table */}
            <div>
              <span className="section-tag">Official Publications</span>
              <h2 className="section-title">Merit & Cutoff Lists</h2>
              <p style={{ color: '#64748b', marginBottom: '24px' }}>
                Download official PDF lists published by the admission committee for the academic session 2026-27.
              </p>

              <table className="statutory-table">
                <thead>
                  <tr>
                    <th>Stream</th>
                    <th>List Type</th>
                    <th>Cutoff</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayLists.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td><strong>{item.stream}</strong><br/><span style={{ fontSize: '12px', color: '#64748b' }}>Session {item.session}</span></td>
                      <td>{item.list_type || item.list || 'Merit List'}<br/><span style={{ fontSize: '12px', color: '#64748b' }}>Date: {item.date}</span></td>
                      <td><span style={{ background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '12px' }}>{item.cutoff}</span></td>
                      <td>
                        <a 
                          href={item.pdf_url || '#'} 
                          target={item.pdf_url && item.pdf_url !== '#' ? '_blank' : '_self'}
                          rel="noreferrer"
                          className="pdf-download-link"
                        >
                          <Download size={14} /> PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '16px', textAlign: 'right' }}>
                <a 
                  href="http://localhost:8884/wp-admin/admin.php?page=gurukapeeth-manager&tab=admissions" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: '12px', color: '#b8860b', fontWeight: 700 }}
                >
                  📝 Manage Cutoffs & Merit PDFs in Headless CMS →
                </a>
              </div>

              <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} style={{ color: '#d97706' }} /> Important Note for B.Ed. Aspirants
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                  Admissions to B.Ed. (2-Year) and Integrated B.A.-B.Ed. (4-Year) programs are strictly conducted through the State-level PTET Entrance Test organized by the designated State University.
                </p>
              </div>
            </div>

            {/* Right: Admission Inquiry Form */}
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <span className="section-tag">Direct Application</span>
              <h3 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '8px' }}>Online Admission Inquiry</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                Fill out the inquiry form below and our admission counselor will contact you regarding document verification and fees.
              </p>

              {submitted ? (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                  <CheckCircle2 size={36} style={{ color: '#059669', margin: '0 auto 10px auto' }} />
                  <h4 style={{ color: '#065f46', fontSize: '16px' }}>Inquiry Submitted Successfully!</h4>
                  <p style={{ color: '#047857', fontSize: '13px', marginTop: '6px' }}>
                    Our counselor will call you within 24 working hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Student Full Name *</label>
                    <input type="text" required placeholder="Enter full name" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Mobile Number *</label>
                    <input type="tel" required placeholder="10-digit mobile number" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Select Program of Interest *</label>
                    <select required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
                      <option value="">-- Choose Program --</option>
                      {programs.length > 0 ? (
                        programs.map(p => (
                          <option key={p.id} value={typeof p.title === 'string' ? p.title : (p.title?.rendered || 'Program')}>
                            {typeof p.title === 'string' ? p.title : (p.title?.rendered || 'Program')}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="ba">Bachelor of Arts (B.A.)</option>
                          <option value="bsc">Bachelor of Science (B.Sc.)</option>
                          <option value="bed">Bachelor of Education (B.Ed.)</option>
                          <option value="babed">Integrated B.A.-B.Ed. (4-Year)</option>
                          <option value="deled">Diploma in Elementary Ed (BSTC)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Previous Percentage / Marks (10+2 or Graduation)</label>
                    <input type="text" placeholder="e.g. 74.5%" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>

                  <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '12px' }}>
                    Submit Admission Inquiry 2026-27
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
