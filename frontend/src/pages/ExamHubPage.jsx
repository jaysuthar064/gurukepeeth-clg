import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  ExternalLink,
  Search,
  Download,
  School,
  Sparkles,
  CheckCircle2,
  FileText,
  Clock,
  Building2,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { getExamHub, getPrograms } from '../api/wordpress';

const SESSION_TABS = ['2026-27', '2025-26', '2024-25'];

function ExamHubPage() {
  const [examData, setExamData] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSession, setActiveSession] = useState('2026-27');
  const [activeTab, setActiveTab] = useState('syllabi');
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenGGTUSyllabus = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // GGTU's server (Syllabus.php) requires an HTTP POST request with payload 'link=Syllabus'.
    // Direct GET requests cause GGTU's legacy PHP script to output "Page not found".
    // Submitting a dynamically created POST form with target="_blank" opens the official syllabus page properly.
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.ggtu.ac.in/Syllabus.php';
    form.target = '_blank';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'link';
    input.value = 'Syllabus';
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  useEffect(() => {
    async function load() {
      const [examRes, progRes] = await Promise.all([getExamHub(), getPrograms()]);
      setExamData(examRes);
      setPrograms(progRes || []);
      setLoading(false);
    }
    load();
  }, []);

  const syllabi = (examData?.syllabi || []).filter(
    (s) =>
      s.session === activeSession &&
      (searchTerm === '' ||
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.program.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const examSchedules = (examData?.schedules || []).filter(
    (s) => s.session === activeSession
  );

  const scholarships = examData?.scholarships || [];

  return (
    <div className="page-wrapper">
      {/* 1. Standard Institutional Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Academic Resources &amp; Examination Portal</span>
          <h1 className="page-hero-title">Syllabus Hub &amp; Examination Portal</h1>
          <p className="page-hero-desc">
            NEP 2020 compliant syllabi, university exam schedules, admit cards, and government
            scholarship information — all in one centralized institutional resource centre.
          </p>
        </div>
      </div>

      {/* 2. Sub-Navigation & Session Switcher Strip */}
      <div className="subnav-strip">
        <div className="container subnav-inner">
          {/* Academic Session Switcher */}
          <div className="session-switcher">
            <span className="session-label">Session:</span>
            {SESSION_TABS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setActiveSession(s)}
                className={`session-pill ${activeSession === s ? 'active' : ''}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Section Tabs */}
          <div className="hub-tabs">
            <button
              type="button"
              onClick={() => setActiveTab('syllabi')}
              className={`hub-tab-btn ${activeTab === 'syllabi' ? 'active' : ''}`}
            >
              <BookOpen size={16} />
              <span>Syllabi Repository</span>
              {!loading && (
                <span className="hub-tab-badge">
                  {examData?.syllabi?.length || 0}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('exams')}
              className={`hub-tab-btn ${activeTab === 'exams' ? 'active' : ''}`}
            >
              <Calendar size={16} />
              <span>Exam Schedule</span>
              {!loading && (
                <span className="hub-tab-badge">
                  {examData?.schedules?.length || 0}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('scholarships')}
              className={`hub-tab-btn ${activeTab === 'scholarships' ? 'active' : ''}`}
            >
              <GraduationCap size={16} />
              <span>Scholarships</span>
              {!loading && (
                <span className="hub-tab-badge">
                  {examData?.scholarships?.length || 0}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="section section-light" style={{ padding: '40px 0 64px' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>
              <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
              <p style={{ fontSize: 14 }}>Loading academic resources…</p>
            </div>
          ) : (
            <>
              {/* TAB 1: Syllabi Repository */}
              {activeTab === 'syllabi' && (
                <div>
                  {/* Action Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 24,
                      flexWrap: 'wrap',
                      gap: 16,
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 24,
                          fontWeight: 700,
                          color: 'var(--primary-900)',
                          marginBottom: 4,
                        }}
                      >
                        NEP-Compliant Syllabi Repository
                      </h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>
                        Download semester-wise syllabi for session {activeSession} or browse the central university portal.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={handleOpenGGTUSyllabus}
                        className="btn-gold"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '9px 18px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        <ExternalLink size={14} /> GGTU Official Syllabus Portal
                      </button>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          background: '#fff',
                          border: '1px solid var(--surface-300)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0 12px',
                        }}
                      >
                        <Search size={15} color="var(--text-muted)" />
                        <input
                          type="text"
                          placeholder="Search subject / program…"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            padding: '9px 0',
                            border: 'none',
                            fontSize: 13.5,
                            fontFamily: 'var(--font-body)',
                            outline: 'none',
                            minWidth: 200,
                            background: 'transparent',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* University Official Syllabus Link Notice */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 16,
                      background: 'var(--surface-0)',
                      border: '1px solid var(--surface-200)',
                      borderLeft: '4px solid var(--gold-500)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '16px 20px',
                      marginBottom: 24,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, maxWidth: 760 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--gold-50)',
                          color: 'var(--gold-600)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <School size={22} />
                      </div>
                      <div>
                        <strong
                          style={{
                            fontSize: 14.5,
                            color: 'var(--primary-900)',
                            display: 'block',
                            marginBottom: 2,
                          }}
                        >
                          Govind Guru Tribal University (GGTU) Central Syllabus Directory
                        </strong>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                          Official course frameworks for B.A., B.Sc., and NEP degree curricula.
                          <br />
                          <span style={{ color: 'var(--gold-600)', fontWeight: 600 }}>
                            Tip: On the GGTU website, navigate to: Examination → Syllabus.
                          </span>
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={handleOpenGGTUSyllabus}
                        className="btn-outline-sm"
                        style={{ fontSize: 12.5 }}
                      >
                        <ExternalLink size={13} /> Open GGTU Syllabus
                      </button>
                      <a
                        href="https://www.ggtu.ac.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-sm"
                        style={{ fontSize: 12.5 }}
                      >
                        <School size={13} /> GGTU Home Page
                      </a>
                    </div>
                  </div>

                  {/* Syllabi Table */}
                  {syllabi.length === 0 ? (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        background: 'var(--surface-0)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px dashed var(--surface-300)',
                      }}
                    >
                      <BookOpen size={36} color="var(--gold-500)" style={{ margin: '0 auto 12px' }} />
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 18,
                          color: 'var(--primary-900)',
                          marginBottom: 6,
                        }}
                      >
                        No Syllabi Found for Session {activeSession}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: 0 }}>
                        {searchTerm
                          ? `No results found for "${searchTerm}".`
                          : `Curriculum documents for session ${activeSession} will be uploaded soon. You may also access the GGTU portal.`}
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        background: 'var(--surface-0)',
                        border: '1px solid var(--surface-200)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                          <thead>
                            <tr style={{ background: 'var(--primary-900)', color: '#ffffff' }}>
                              <th style={thStyle}>Program</th>
                              <th style={thStyle}>Semester / Year</th>
                              <th style={thStyle}>Subject &amp; Course Title</th>
                              <th style={thStyle}>Framework</th>
                              <th style={{ ...thStyle, textAlign: 'center' }}>Document</th>
                            </tr>
                          </thead>
                          <tbody>
                            {syllabi.map((s, idx) => (
                              <tr
                                key={s.id || idx}
                                style={{
                                  background: idx % 2 === 0 ? '#ffffff' : 'var(--surface-50)',
                                  borderBottom: '1px solid var(--surface-200)',
                                }}
                              >
                                <td style={tdStyle}>
                                  <strong style={{ color: 'var(--primary-900)' }}>{s.program}</strong>
                                </td>
                                <td style={tdStyle}>{s.semester}</td>
                                <td style={tdStyle}>
                                  <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{s.title}</span>
                                </td>
                                <td style={tdStyle}>
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      padding: '3px 10px',
                                      borderRadius: 'var(--radius-full)',
                                      fontSize: 11,
                                      fontWeight: 700,
                                      letterSpacing: '0.03em',
                                      background: s.nep_compliant ? 'var(--emerald-50)' : 'var(--surface-100)',
                                      color: s.nep_compliant ? 'var(--emerald-700)' : 'var(--text-muted)',
                                      border: `1px solid ${
                                        s.nep_compliant ? 'rgba(5, 150, 105, 0.2)' : 'var(--surface-300)'
                                      }`,
                                    }}
                                  >
                                    {s.nep_compliant ? 'NEP 2020' : 'Annual'}
                                  </span>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                  {s.pdf_url && s.pdf_url !== '#' ? (
                                    s.pdf_url.includes('Syllabus.php') ? (
                                      <button
                                        type="button"
                                        onClick={handleOpenGGTUSyllabus}
                                        className="btn-outline-sm"
                                        style={{ fontSize: 12, padding: '5px 12px' }}
                                        title="Open official GGTU Syllabus directory"
                                      >
                                        <ExternalLink size={12} /> View on GGTU
                                      </button>
                                    ) : (
                                      <a
                                        href={s.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline-sm"
                                        style={{ fontSize: 12, padding: '5px 12px' }}
                                      >
                                        <Download size={12} /> Download PDF
                                      </a>
                                    )
                                  ) : (
                                    <span style={{ fontSize: 12, color: 'var(--text-light)' }}>—</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Browse by Program Quick Cards */}
                  {programs.length > 0 && (
                    <div style={{ marginTop: 36 }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 18,
                          fontWeight: 700,
                          color: 'var(--primary-900)',
                          marginBottom: 16,
                        }}
                      >
                        Filter by Department &amp; Program
                      </h3>
                      <div className="grid-3">
                        {programs.map((prog, idx) => (
                          <div
                            key={prog.id || idx}
                            style={{
                              padding: '16px 20px',
                              borderRadius: 'var(--radius-sm)',
                              background: '#fff',
                              border: '1px solid var(--surface-200)',
                              cursor: 'pointer',
                              transition: 'all var(--transition-fast)',
                              boxShadow: 'var(--shadow-sm)',
                            }}
                            onClick={() => {
                              setSearchTerm(prog.title.split('(')[0].trim());
                            }}
                          >
                            <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--primary-900)', display: 'block' }}>
                              {prog.title}
                            </span>
                            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                              {prog.duration} · {prog.intake}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Exam Schedule & Results */}
              {activeTab === 'exams' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 24,
                        fontWeight: 700,
                        color: 'var(--primary-900)',
                        marginBottom: 4,
                      }}
                    >
                      Examination Schedules &amp; University ERP Portal
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>
                      Official timetables, admit card releases, result links, and ERP access for session {activeSession}.
                    </p>
                  </div>

                  {/* Featured GGTU Student ERP Banner */}
                  <div
                    style={{
                      marginBottom: 32,
                      padding: '28px 32px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'linear-gradient(135deg, var(--primary-950) 0%, var(--primary-900) 60%, var(--primary-800) 100%)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 24,
                      }}
                    >
                      <div style={{ maxWidth: 660 }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            background: 'var(--gold-400)',
                            color: 'var(--primary-950)',
                            marginBottom: 12,
                          }}
                        >
                          Official Student NEP ERP Portal
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 24,
                            color: '#ffffff',
                            fontWeight: 700,
                            marginBottom: 8,
                          }}
                        >
                          GGTU Student ERP Examination Portal
                        </h3>
                        <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>
                          Govind Guru Tribal University provides a single-window ERP portal (erp.ggtuexam.com)
                          for all student examination activities: Student Login, Exam Form submission, Admit Card
                          downloads, Semester Results, and Online Revaluation.
                        </p>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                          <a
                            href="https://erp.ggtuexam.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '10px 22px',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: 13.5,
                              fontWeight: 700,
                              textDecoration: 'none',
                            }}
                          >
                            <ExternalLink size={15} /> Open GGTU ERP Portal
                          </a>
                          <button
                            type="button"
                            onClick={handleOpenGGTUSyllabus}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '10px 20px',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(255, 255, 255, 0.12)',
                              color: '#ffffff',
                              fontSize: 13,
                              textDecoration: 'none',
                              fontWeight: 600,
                              border: '1px solid rgba(255, 255, 255, 0.25)',
                              cursor: 'pointer',
                            }}
                          >
                            <BookOpen size={15} /> GGTU Syllabi Repository
                          </button>
                        </div>
                      </div>

                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '20px 24px',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          minWidth: 240,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            color: 'var(--gold-300)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            marginBottom: 10,
                          }}
                        >
                          Direct Online Services
                        </div>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            fontSize: 13,
                            color: '#f1f5f9',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                          }}
                        >
                          <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircle2 size={14} color="#34d399" /> Student Online Login
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircle2 size={14} color="#34d399" /> Examination Form Filling
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircle2 size={14} color="#34d399" /> Admit Card Downloads
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircle2 size={14} color="#34d399" /> Semester Results &amp; Marksheets
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircle2 size={14} color="#34d399" /> Online Revaluation / Scrutiny
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Schedules Cards Grid */}
                  {examSchedules.length === 0 ? (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        background: '#ffffff',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px dashed var(--surface-300)',
                      }}
                    >
                      <Calendar size={36} color="var(--primary-700)" style={{ margin: '0 auto 12px' }} />
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 18,
                          color: 'var(--primary-900)',
                          marginBottom: 6,
                        }}
                      >
                        No Timetables Currently Listed for {activeSession}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: 0 }}>
                        Exam notifications are updated in real-time as released by GGTU Banswara. Please check the ERP portal above.
                      </p>
                    </div>
                  ) : (
                    <div className="grid-2" style={{ gap: 20 }}>
                      {examSchedules.map((exam, idx) => (
                        <div
                          key={exam.id || idx}
                          className="program-card"
                          style={{
                            borderTop: 'none',
                            borderLeft: `4px solid ${
                              exam.type === 'Admit Card'
                                ? 'var(--gold-500)'
                                : exam.type === 'Result'
                                ? 'var(--emerald-600)'
                                : 'var(--primary-700)'
                            }`,
                            padding: '20px 24px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: 10,
                            }}
                          >
                            <span
                              style={{
                                padding: '3px 10px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: 11,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                background:
                                  exam.type === 'Admit Card'
                                    ? 'var(--gold-100)'
                                    : exam.type === 'Result'
                                    ? 'var(--emerald-50)'
                                    : 'var(--surface-100)',
                                color:
                                  exam.type === 'Admit Card'
                                    ? 'var(--gold-700)'
                                    : exam.type === 'Result'
                                    ? 'var(--emerald-700)'
                                    : 'var(--primary-700)',
                              }}
                            >
                              {exam.type}
                            </span>
                            <span style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 500 }}>
                              {exam.date}
                            </span>
                          </div>

                          <h3
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: 18,
                              fontWeight: 700,
                              color: 'var(--primary-900)',
                              marginBottom: 6,
                            }}
                          >
                            {exam.title}
                          </h3>

                          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, flexGrow: 1 }}>
                            <strong>{exam.program}</strong> — {exam.description || ''}
                          </p>

                          {exam.url && exam.url !== '#' && (
                            <div style={{ marginTop: 'auto' }}>
                              <a
                                href={exam.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline-sm"
                                style={{ fontSize: 12 }}
                              >
                                <ExternalLink size={12} />
                                {exam.type === 'Admit Card'
                                  ? 'Download Admit Card'
                                  : exam.type === 'Result'
                                  ? 'View Result'
                                  : exam.type === 'NEP Portal'
                                  ? 'Open GGTU ERP'
                                  : 'View Timetable'}
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* University Quick Links Strip */}
                  <div
                    style={{
                      marginTop: 36,
                      padding: '24px 28px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--primary-900)',
                      color: '#ffffff',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 18,
                        fontWeight: 700,
                        color: 'var(--gold-300)',
                        marginBottom: 14,
                      }}
                    >
                      Official Rajasthan University &amp; Higher Education Portals
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {[
                        { label: 'GGTU NEP Student ERP', url: 'https://erp.ggtuexam.com/' },
                        { label: 'GGTU Central Syllabus', url: 'https://www.ggtu.ac.in/Syllabus.php' },
                        { label: 'GGTU Official Website', url: 'https://ggtu.ac.in' },
                        { label: 'Rajasthan SSO Portal', url: 'https://sso.rajasthan.gov.in' },
                        { label: 'DigiLocker / ABC ID Portal', url: 'https://digilocker.gov.in' },
                      ].map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '7px 16px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#ffffff',
                            fontSize: 12.5,
                            textDecoration: 'none',
                            fontWeight: 600,
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <ExternalLink size={12} /> {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Scholarships Guide */}
              {activeTab === 'scholarships' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 24,
                        fontWeight: 700,
                        color: 'var(--primary-900)',
                        marginBottom: 4,
                      }}
                    >
                      Government Scholarship Welfare Schemes
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>
                      Financial assistance and merit scholarships for eligible students of Gurukripa Peeth College.
                    </p>
                  </div>

                  {scholarships.length === 0 ? (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        background: '#ffffff',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px dashed var(--surface-300)',
                      }}
                    >
                      <GraduationCap size={36} color="var(--gold-500)" style={{ margin: '0 auto 12px' }} />
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 18,
                          color: 'var(--primary-900)',
                          marginBottom: 6,
                        }}
                      >
                        Scholarship Details Being Updated
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: 0 }}>
                        Information on state and central scholarships will be published shortly.
                      </p>
                    </div>
                  ) : (
                    <div className="grid-2" style={{ gap: 20 }}>
                      {scholarships.map((sch, idx) => (
                        <div
                          key={sch.id || idx}
                          className="program-card"
                          style={{
                            borderTop: '3px solid var(--gold-500)',
                            padding: '24px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <div
                              style={{
                                width: 42,
                                height: 42,
                                borderRadius: 'var(--radius-sm)',
                                background: 'var(--gold-50)',
                                color: 'var(--gold-600)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Award size={22} />
                            </div>
                            <div>
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.06em',
                                  color: 'var(--gold-600)',
                                  display: 'block',
                                }}
                              >
                                {sch.sponsor}
                              </span>
                              <h3
                                style={{
                                  fontFamily: 'var(--font-heading)',
                                  fontSize: 17,
                                  fontWeight: 700,
                                  color: 'var(--primary-900)',
                                  margin: 0,
                                }}
                              >
                                {sch.title}
                              </h3>
                            </div>
                          </div>

                          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5, flexGrow: 1 }}>
                            {sch.description}
                          </p>

                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: 12,
                              padding: '12px 14px',
                              background: 'var(--surface-50)',
                              borderRadius: 'var(--radius-sm)',
                              marginBottom: 16,
                              fontSize: 12.5,
                            }}
                          >
                            <div>
                              <span style={{ color: 'var(--text-light)', fontSize: 11, display: 'block' }}>Eligibility</span>
                              <strong style={{ color: 'var(--text-body)' }}>{sch.eligibility}</strong>
                            </div>
                            <div>
                              <span style={{ color: 'var(--text-light)', fontSize: 11, display: 'block' }}>Last Date</span>
                              <strong style={{ color: 'var(--text-body)' }}>{sch.last_date || 'Ongoing'}</strong>
                            </div>
                          </div>

                          {sch.apply_url && sch.apply_url !== '#' && (
                            <div style={{ marginTop: 'auto' }}>
                              <a
                                href={sch.apply_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline-sm"
                                style={{ fontSize: 12 }}
                              >
                                <ExternalLink size={12} /> Apply via Portal
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Application Process Guidelines */}
                  <div
                    style={{
                      marginTop: 36,
                      padding: '24px 28px',
                      borderRadius: 'var(--radius-sm)',
                      background: '#ffffff',
                      border: '1px solid var(--surface-200)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 18,
                        fontWeight: 700,
                        color: 'var(--primary-900)',
                        marginBottom: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <FileText size={18} color="var(--gold-600)" />
                      Standard Procedure for Government Scholarship Application
                    </h4>
                    <ol
                      style={{
                        paddingLeft: 20,
                        color: 'var(--text-body)',
                        fontSize: 13.5,
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      <li>Register or log in to the <strong>Rajasthan SSO Portal</strong> (sso.rajasthan.gov.in).</li>
                      <li>Navigate to the <strong>Scholarship (SJED / CEG)</strong> application dashboard.</li>
                      <li>Select the eligible scheme (Post-Matric SC/ST/OBC, Chief Minister Higher Education, etc.).</li>
                      <li>Enter your college enrollment details and verified Jan Aadhaar / Aadhaar credentials.</li>
                      <li>Upload scanned proofs of income certificate, caste certificate, and previous year marksheet.</li>
                      <li>Submit the application and submit a printed copy to the College Scholarship Desk for biometric verification.</li>
                    </ol>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '12px 18px',
  fontSize: 12,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontFamily: 'var(--font-body)',
};

const tdStyle = {
  padding: '14px 18px',
  fontSize: 13.5,
  color: 'var(--text-body)',
  fontFamily: 'var(--font-body)',
};

export default ExamHubPage;
