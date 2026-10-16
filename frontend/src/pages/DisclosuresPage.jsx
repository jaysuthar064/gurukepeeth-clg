import React, { useState, useEffect } from 'react';
import {
  Award,
  Building2,
  FileText,
  ShieldCheck,
  Flame,
  Building,
  CheckCircle2,
  Coins,
  ShieldAlert,
  Scale,
  Download,
  Phone,
  Send,
  AlertCircle,
  FileCheck,
  ExternalLink,
} from 'lucide-react';
import { getDisclosures, submitGrievance } from '../api/wordpress';

const CATEGORY_ICONS = {
  affiliation: Award,
  govt_noc: Building2,
  ncte_order: FileText,
  registration: ShieldCheck,
  fire_safety: Flame,
  building_noc: Building,
  ugc_approval: CheckCircle2,
  fee_structure: Coins,
  anti_ragging: ShieldAlert,
  icc: Scale,
};

const DISCLOSURE_CATEGORIES = [
  { key: 'affiliation', label: 'GGTU Affiliation Orders', color: 'var(--primary-700)' },
  { key: 'govt_noc', label: 'Raj. Govt Permanent NOC (B.A. & B.Sc.)', color: 'var(--emerald-700)' },
  { key: 'ncte_order', label: 'NCTE Recognition Order', color: 'var(--gold-600)' },
  { key: 'registration', label: 'Society & Trust Registration', color: 'var(--primary-800)' },
  { key: 'fire_safety', label: 'Fire Safety Certificate', color: 'var(--crimson-700)' },
  { key: 'building_noc', label: 'Building Safety & Stability NOC', color: 'var(--emerald-800)' },
  { key: 'ugc_approval', label: 'UGC 2(f) & 12(B) Status', color: 'var(--primary-900)' },
  { key: 'fee_structure', label: 'Fee Structure & Refund Policy', color: 'var(--gold-700)' },
  { key: 'anti_ragging', label: 'Anti-Ragging Committee & Policy', color: 'var(--crimson-800)' },
  { key: 'icc', label: 'Internal Complaints Committee (ICC)', color: 'var(--primary-700)' },
];

function DisclosuresPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [grievanceForm, setGrievanceForm] = useState({
    name: '',
    contact: '',
    category: 'Anti-Ragging',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: '' });

  useEffect(() => {
    async function load() {
      const res = await getDisclosures();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleGrievanceSubmit = async (e) => {
    e.preventDefault();
    if (!grievanceForm.name || !grievanceForm.contact || !grievanceForm.message) {
      setFormStatus({ submitting: false, success: false, error: 'Please fill all required fields.' });
      return;
    }
    setFormStatus({ submitting: true, success: false, error: '' });
    try {
      await submitGrievance(grievanceForm);
      setFormStatus({ submitting: false, success: true, error: '' });
      setGrievanceForm({ name: '', contact: '', category: 'Anti-Ragging', message: '' });
    } catch (err) {
      setFormStatus({ submitting: false, success: false, error: err.message || 'Submission failed.' });
    }
  };

  const disclosures = data?.documents || [];
  const filtered =
    activeCategory === 'all'
      ? disclosures
      : disclosures.filter((d) => d.category === activeCategory);

  return (
    <div className="page-wrapper">
      {/* 1. Institutional Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">UGC / NCTE / AISHE Regulatory Compliance</span>
          <h1 className="page-hero-title">Mandatory Statutory Disclosures</h1>
          <p className="page-hero-desc">
            Public disclosure of regulatory affiliation orders, Rajasthan Government permanent NOCs,
            safety certificates, and institutional compliance records as mandated by the University
            Grants Commission (UGC) and National Council for Teacher Education (NCTE).
          </p>
        </div>
      </div>

      {/* 2. Institutional Compliance Metrics Bar */}
      <div
        style={{
          background: 'var(--surface-0)',
          borderBottom: '1px solid var(--surface-200)',
          padding: '24px 0',
        }}
      >
        <div className="container">
          <div className="naac-stats-grid" style={{ marginBottom: 0 }}>
            <div className="stat-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--primary-900)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {loading ? '—' : disclosures.length}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 4 }}>
                Statutory Documents
              </div>
            </div>

            <div className="stat-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: 'var(--emerald-700)',
                  fontFamily: 'var(--font-heading)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <CheckCircle2 size={24} /> Compliant
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 4 }}>
                Anti-Ragging Regulations
              </div>
            </div>

            <div className="stat-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: 'var(--gold-600)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                NCTE
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 4 }}>
                Recognized Teacher Education
              </div>
            </div>

            <div className="stat-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: 'var(--primary-700)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                GGTU
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 4 }}>
                Affiliated University
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Chips */}
      <div style={{ padding: '32px 0 0', background: 'var(--surface-50)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              borderBottom: '1px solid var(--surface-200)',
              paddingBottom: 20,
            }}
          >
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`filter-chip ${activeCategory === 'all' ? 'filter-chip--active' : ''}`}
            >
              <FileCheck size={14} /> All Documents ({disclosures.length})
            </button>
            {DISCLOSURE_CATEGORIES.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.key] || FileText;
              const count = disclosures.filter((d) => d.category === cat.key).length;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`filter-chip ${activeCategory === cat.key ? 'filter-chip--active' : ''}`}
                >
                  <IconComp size={14} />
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <span
                      style={{
                        fontSize: 11,
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)',
                        background: activeCategory === cat.key ? 'rgba(255,255,255,0.2)' : 'var(--surface-200)',
                        color: activeCategory === cat.key ? '#fff' : 'var(--text-muted)',
                      }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Document Cards Grid */}
      <div style={{ padding: '28px 0 64px', background: 'var(--surface-50)' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>
              <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
              <p style={{ fontSize: 14 }}>Loading disclosure records…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '56px 24px',
                background: '#ffffff',
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed var(--surface-300)',
              }}
            >
              <FileText size={36} color="var(--primary-700)" style={{ margin: '0 auto 12px' }} />
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 18,
                  color: 'var(--primary-900)',
                  marginBottom: 6,
                }}
              >
                No Documents in This Category
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: 0 }}>
                Records will appear here once published by the institutional compliance cell.
              </p>
            </div>
          ) : (
            <div className="grid-3" style={{ gap: 20 }}>
              {filtered.map((doc, idx) => {
                const cat = DISCLOSURE_CATEGORIES.find((c) => c.key === doc.category) || {};
                const IconComp = CATEGORY_ICONS[doc.category] || FileText;
                return (
                  <div
                    key={doc.id || idx}
                    className="program-card"
                    style={{
                      borderTop: `4px solid ${cat.color || 'var(--primary-800)'}`,
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--surface-100)',
                          color: cat.color || 'var(--primary-800)',
                          flexShrink: 0,
                        }}
                      >
                        <IconComp size={18} />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: cat.color || 'var(--primary-800)',
                        }}
                      >
                        {cat.label || doc.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 17,
                        fontWeight: 700,
                        color: 'var(--primary-900)',
                        marginBottom: 8,
                        lineHeight: 1.4,
                      }}
                    >
                      {doc.title}
                    </h3>

                    {doc.description && (
                      <p
                        style={{
                          fontSize: 13,
                          color: 'var(--text-muted)',
                          marginBottom: 16,
                          lineHeight: 1.55,
                          flexGrow: 1,
                        }}
                      >
                        {doc.description}
                      </p>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid var(--surface-100)',
                        paddingTop: 14,
                        marginTop: 'auto',
                      }}
                    >
                      <span style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 500 }}>
                        {doc.issued_date || 'Current Session'}
                      </span>
                      {doc.pdf_url && doc.pdf_url !== '#' ? (
                        <a
                          href={doc.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline-sm"
                          style={{ fontSize: 12 }}
                        >
                          <Download size={12} /> Download PDF
                        </a>
                      ) : (
                        <span
                          style={{
                            fontSize: 11.5,
                            color: 'var(--text-light)',
                            fontStyle: 'italic',
                          }}
                        >
                          Available on request
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 5. Anti-Ragging Statutory Declaration */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--crimson-800) 0%, var(--crimson-700) 100%)',
          color: '#ffffff',
          padding: '52px 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div style={{ maxWidth: 740 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <ShieldAlert size={26} color="#fecaca" />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#fecaca',
                  }}
                >
                  Statutory Declaration &amp; Zero Tolerance Policy
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 10,
                }}
              >
                Anti-Ragging Committee &amp; Student Safety Mandate
              </h2>
              <p style={{ color: '#fee2e2', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                Gurukripa Peeth College maintains strict compliance with <strong>UGC Regulation 2009</strong> and
                the Hon'ble Supreme Court directives. An Anti-Ragging Committee and Squad are constituted annually.
                All enrolled students and guardians must submit the statutory anti-ragging undertaking.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href="tel:18001805522"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 22px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 700,
                  fontSize: 13.5,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <Phone size={16} /> National Helpline: 1800-180-5522
              </a>
              <span style={{ fontSize: 11.5, color: '#fecaca', textAlign: 'center' }}>
                Toll Free • 24x7 National Anti-Ragging Desk
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Confidential Grievance Redressal Form */}
      <div style={{ padding: '64px 0', background: 'var(--surface-100)' }}>
        <div className="container">
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ marginBottom: 28, textAlign: 'center' }}>
              <span className="section-tag">Student Grievance Cell</span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 26,
                  fontWeight: 700,
                  color: 'var(--primary-900)',
                  marginBottom: 6,
                }}
              >
                Confidential Grievance Submission Portal
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                As mandated by the UGC (Grievance Redressal) Regulations, students may submit any concern
                confidentially. All inquiries are investigated and disposed of by the Committee within 15 working days.
              </p>
            </div>

            {formStatus.success ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '44px 24px',
                  background: 'var(--emerald-50)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--emerald-600)',
                }}
              >
                <CheckCircle2 size={40} color="var(--emerald-700)" style={{ margin: '0 auto 12px' }} />
                <h3
                  style={{
                    color: 'var(--emerald-800)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  Grievance Registered Successfully
                </h3>
                <p style={{ color: 'var(--emerald-700)', fontSize: 13.5, margin: 0 }}>
                  Your grievance has been logged confidentially into the institutional portal. The Committee
                  convenor will contact you within the statutory timeframe.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleGrievanceSubmit}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  padding: 32,
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--surface-200)',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        marginBottom: 6,
                      }}
                    >
                      Your Full Name <span style={{ color: 'var(--crimson-600)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={grievanceForm.name}
                      onChange={(e) => setGrievanceForm({ ...grievanceForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--surface-300)',
                        fontSize: 13.5,
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        marginBottom: 6,
                      }}
                    >
                      Contact Phone / Email <span style={{ color: 'var(--crimson-600)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={grievanceForm.contact}
                      onChange={(e) => setGrievanceForm({ ...grievanceForm, contact: e.target.value })}
                      placeholder="Phone or official email"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--surface-300)',
                        fontSize: 13.5,
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      marginBottom: 6,
                    }}
                  >
                    Grievance Category
                  </label>
                  <select
                    value={grievanceForm.category}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--surface-300)',
                      fontSize: 13.5,
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      background: '#ffffff',
                    }}
                  >
                    <option>Anti-Ragging</option>
                    <option>Internal Complaints (ICC / Prevention of Harassment)</option>
                    <option>Academic &amp; Evaluation Grievance</option>
                    <option>Fee Structure &amp; Refund Rules</option>
                    <option>Examination &amp; Results</option>
                    <option>Campus Facilities &amp; Infrastructure</option>
                    <option>Other Institutional Concern</option>
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      marginBottom: 6,
                    }}
                  >
                    Describe Your Concern in Detail <span style={{ color: 'var(--crimson-600)' }}>*</span>
                  </label>
                  <textarea
                    value={grievanceForm.message}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, message: e.target.value })}
                    placeholder="Provide relevant facts, dates, and course/department context. All disclosures are treated with strict confidentiality."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--surface-300)',
                      fontSize: 13.5,
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {formStatus.error && (
                  <div
                    style={{
                      padding: '10px 14px',
                      marginBottom: 16,
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--crimson-50)',
                      color: 'var(--crimson-700)',
                      fontSize: 13,
                      border: '1px solid var(--crimson-600)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <AlertCircle size={15} /> {formStatus.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: formStatus.submitting ? 'not-allowed' : 'pointer',
                    justifyContent: 'center',
                  }}
                >
                  <Send size={15} /> {formStatus.submitting ? 'Submitting Grievance…' : 'Submit Confidential Grievance'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisclosuresPage;
