import React, { useState, useEffect } from 'react';
import { Calendar, FileText, CheckCircle2, AlertCircle, Download, Send, RefreshCw, UserCheck, Info } from 'lucide-react';
import { getAdmissions, getPrograms, submitInquiry } from '../api/wordpress';

export default function AdmissionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
    percentage: '',
    message: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitError('Please provide your full name and 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await submitInquiry({
        type: 'Admission',
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        program: formData.program || 'Undergraduate / Teacher Education',
        percentage: formData.percentage.trim(),
        message: formData.message.trim() || `Online admission inquiry for ${formData.program || 'Degree program'}.`,
      });

      if (res && res.success) {
        setSubmissionResult(res);
        setSubmitted(true);
      } else {
        setSubmitError(res?.message || 'Could not register inquiry. Please try again.');
      }
    } catch (err) {
      setSubmitError('Unable to connect to the admission portal. Please call the admission helpline directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmissionResult(null);
    setSubmitError(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      program: '',
      percentage: '',
      message: '',
    });
  };

  const fallbackMeritLists = [
    { id: 1, session: '2026-27', stream: 'Faculty of Arts (B.A. - 160 Seats)', list: '1st Provisional Merit List', date: '20 Sep 2026', cutoff: '72.4%', pdf_url: '#' },
    { id: 2, session: '2026-27', stream: 'Faculty of Science (B.Sc. Bio - 140 Seats)', list: '1st Provisional Merit List', date: '21 Sep 2026', cutoff: '78.2%', pdf_url: '#' },
    { id: 3, session: '2026-27', stream: 'Faculty of Arts (B.A. - 160 Seats)', list: '2nd Waiting List', date: '28 Sep 2026', cutoff: '68.0%', pdf_url: '#' },
    { id: 4, session: '2026-27', stream: 'Faculty of Science (B.Sc. Bio - 140 Seats)', list: '2nd Waiting List', date: '29 Sep 2026', cutoff: '74.5%', pdf_url: '#' },
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
          <div className="grid-2" style={{ gap: '48px', alignItems: 'flex-start' }}>
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

              <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                * Merit lists are updated in accordance with Rajasthan State Higher Education Directorate & GGTU admission calendar.
              </div>

              <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} style={{ color: '#059669' }} /> Direct Admission Verification
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  Admissions to 3-Year B.A. and B.Sc. degree programs are processed through 10+2 merit scores in accordance with Directorate of College Education, Rajasthan and GGTU norms.
                </p>
              </div>
            </div>

            {/* Right: Admission Inquiry Form */}
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)' }}>
              <span className="section-tag">Direct Application</span>
              <h3 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '8px' }}>Online Admission Inquiry 2026-27</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                Fill out the inquiry form below and our admission counselor will contact you regarding document verification, seats, and fees.
              </p>

              {submitted && submissionResult ? (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 style={{ color: '#065f46', fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Inquiry Registered Successfully!</h4>
                  <p style={{ color: '#047857', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                    Your application has been logged into the central admissions registry.
                  </p>
                  
                  <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '14px', margin: '0 0 20px 0', textAlign: 'left' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 600 }}>Your Application Reference Number</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em', marginTop: '4px' }}>
                      {submissionResult.reference_number || 'GPC-ADM-2026-REG'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '8px' }}>
                      <strong>Student:</strong> {formData.name} • <strong>Course:</strong> {formData.program || 'Not specified'}
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#065f46', marginBottom: '20px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Info size={14} /> Please preserve this reference number. Our admission officer will contact you within 24 working hours to guide your document submission.
                  </p>

                  <button 
                    type="button" 
                    onClick={resetForm} 
                    className="btn btn-outline" 
                    style={{ fontSize: '13px', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <RefreshCw size={14} /> Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {submitError && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '8px', color: '#b91c1c', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} /> {submitError}
                    </div>
                  )}

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Student Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kumar Verma" 
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Mobile Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number" 
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="student@example.com" 
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Select Program of Interest *</label>
                    <select 
                      name="program"
                      required 
                      value={formData.program}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px' }}
                    >
                      <option value="">-- Choose Academic Program --</option>
                      {programs.length > 0 ? (
                        programs.map(p => {
                          const rawTitle = typeof p.title === 'string' ? p.title : (p.title?.rendered || 'Program');
                          const isBA = rawTitle.toLowerCase().includes('b.a.') || (p.stream || '').toLowerCase().includes('arts');
                          const title = isBA ? 'Bachelor of Arts (B.A. - 160 Seats)' : 'Bachelor of Science (B.Sc. Bio - 140 Seats)';
                          return (
                            <option key={p.id} value={title}>
                              {title}
                            </option>
                          );
                        })
                      ) : (
                        <>
                          <option value="Bachelor of Arts (B.A. - 160 Seats)">Bachelor of Arts (B.A. - 160 Seats)</option>
                          <option value="Bachelor of Science (B.Sc. Bio - 140 Seats)">Bachelor of Science (B.Sc. Bio - 140 Seats)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Previous Percentage / Qualifying Marks</label>
                    <input 
                      type="text" 
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleInputChange}
                      placeholder="e.g. 76.5% in 12th Board / Graduation" 
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Any Specific Query / Subject Combinations</label>
                    <textarea 
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Ask about hostel, fee installments, or subject preferences..." 
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="btn btn-gold" 
                    style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {submitting ? (
                      <>
                        <RefreshCw size={16} className="spin" /> Registering Inquiry...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Submit Admission Inquiry 2026-27
                      </>
                    )}
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
