import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Search, 
  LayoutGrid, 
  ListOrdered, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { getFaculty } from '../api/wordpress';

// Explicit photo mapping for faculty members who uploaded portrait images
const FACULTY_PHOTO_MAP = {
  4: '/images/faculty/ashok-kumar-damor.jpeg',
  6: '/images/faculty/priyanka-rathore.jpeg',
  8: '/images/faculty/mithun-kumar-damor.jpeg',
  9: '/images/faculty/bhuralal-damor.jpeg',
  10: '/images/faculty/shilpa-labana.jpeg',
  11: '/images/faculty/pratap-singh-damor.jpeg',
  12: '/images/faculty/divya-kalal.jpeg',
};

// Robust resolver ensuring photos load reliably regardless of CMS API format
const resolveFacultyPhoto = (f) => {
  const seniority = Number(f.seniority || f.id);
  if (FACULTY_PHOTO_MAP[seniority]) {
    return FACULTY_PHOTO_MAP[seniority];
  }

  const name = (f.name || '').toLowerCase();
  if (name.includes('ashok')) return '/images/faculty/ashok-kumar-damor.jpeg';
  if (name.includes('rathore')) return '/images/faculty/priyanka-rathore.jpeg';
  if (name.includes('mithun')) return '/images/faculty/mithun-kumar-damor.jpeg';
  if (name.includes('bhura')) return '/images/faculty/bhuralal-damor.jpeg';
  if (name.includes('shilpa')) return '/images/faculty/shilpa-labana.jpeg';
  if (name.includes('pratap')) return '/images/faculty/pratap-singh-damor.jpeg';
  if (name.includes('divya')) return '/images/faculty/divya-kalal.jpeg';

  const raw = f.photo_url || f.image || f.image_url || '';
  if (raw) {
    if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
    if (raw.includes('/faculty/')) {
      const filename = raw.split('/faculty/').pop();
      return `/images/faculty/${filename}`;
    }
    return raw;
  }

  return '';
};

// Reusable avatar component with graceful fallback
function FacultyAvatar({ photo, name, initials, size = 'card' }) {
  const [error, setError] = useState(false);

  if (photo && !error) {
    return (
      <img
        src={photo}
        alt={name}
        className={size === 'card' ? 'faculty-photo-img' : 'faculty-table-thumb-img'}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div className={size === 'card' ? 'faculty-photo-fallback' : 'faculty-table-thumb-fallback'}>
      <span className={size === 'card' ? 'initials' : 'thumb-initials'}>{initials}</span>
      {size === 'card' && <span className="monogram-sub">Gurukripa</span>}
    </div>
  );
}

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [deptFilter, setDeptFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Official Approved Seniority Roster (1 to 12) per GGTU & College Affiliation Records
  const fallbackFaculty = [
    {
      id: 1,
      seniority: 1,
      name: 'Dr. Hari Shanker Maru',
      designation: 'Principal',
      post_category: 'PRINCIPAL',
      subject: 'Hindi Literature',
      department: 'Administration & Faculty of Arts',
      stream: 'arts',
      qualification: 'Retd. Govt. Principal, Ph.D., M.A. (Hindi)',
      experience: '28+ Years',
      email: 'principal@gurukripapeeth.in',
      specialization: 'Hindi Literature & Institutional Governance',
      photo_url: '',
      initials: 'HM',
    },
    {
      id: 2,
      seniority: 2,
      name: 'Mrs. Priyanka Pandya',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Political Science',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed., M.Lib.',
      experience: '8+ Years',
      email: 'priyanka.pandya@gurukripapeeth.in',
      specialization: 'Political Science & Library Information Systems',
      photo_url: '',
      initials: 'PP',
    },
    {
      id: 3,
      seniority: 3,
      name: 'Mr. Rajesh Kumar Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Sanskrit Literature',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '8+ Years',
      email: 'rajesh.damor@gurukripapeeth.in',
      specialization: 'Classical Sanskrit Literature & Vedic Grammar',
      photo_url: '',
      initials: 'RD',
    },
    {
      id: 4,
      seniority: 4,
      name: 'Mr. Ashok Kumar Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Geography',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '8+ Years',
      email: 'ashok.damor@gurukripapeeth.in',
      specialization: 'Physical Geography & Regional Cartography',
      photo_url: '/images/faculty/ashok-kumar-damor.jpeg',
      initials: 'AD',
    },
    {
      id: 5,
      seniority: 5,
      name: 'Mr. Ramesh Chandra Pargi',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'History',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'B.A., B.Ed.',
      experience: '7+ Years',
      email: 'ramesh.pargi@gurukripapeeth.in',
      specialization: 'Indian History & Tribal Heritage Studies',
      photo_url: '',
      initials: 'RP',
    },
    {
      id: 6,
      seniority: 6,
      name: 'Mrs. Priyanka Rathore',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - B.Sc',
      subject: 'Zoology',
      department: 'Faculty of Science',
      stream: 'science',
      qualification: 'M.Sc., B.Ed.',
      experience: '7+ Years',
      email: 'priyanka.rathore@gurukripapeeth.in',
      specialization: 'Cell Biology, Entomology & Animal Physiology',
      photo_url: '/images/faculty/priyanka-rathore.jpeg',
      initials: 'PR',
    },
    {
      id: 7,
      seniority: 7,
      name: 'Ms. Laxmi Labana',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'English Literature',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '7+ Years',
      email: 'laxmi.labana@gurukripapeeth.in',
      specialization: 'English Literature & Applied Linguistics',
      photo_url: '',
      initials: 'LL',
    },
    {
      id: 8,
      seniority: 8,
      name: 'Mr. Mithun Kumar Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Economics',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '6+ Years',
      email: 'mithun.damor@gurukripapeeth.in',
      specialization: 'Development Economics & Tribal Financial Studies',
      photo_url: '/images/faculty/mithun-kumar-damor.jpeg',
      initials: 'MD',
    },
    {
      id: 9,
      seniority: 9,
      name: 'Mr. Bhura Lal Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Political Science',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '6+ Years',
      email: 'bhuralal.damor@gurukripapeeth.in',
      specialization: 'Indian Political Thought & Constitutional Governance',
      photo_url: '/images/faculty/bhuralal-damor.jpeg',
      initials: 'BD',
    },
    {
      id: 10,
      seniority: 10,
      name: 'Ms. Shilpa Kumari Labana',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - B.Sc',
      subject: 'Botany',
      department: 'Faculty of Science',
      stream: 'science',
      qualification: 'M.Sc., B.Ed.',
      experience: '5+ Years',
      email: 'shilpa.labana@gurukripapeeth.in',
      specialization: 'Plant Physiology, Cytology & Taxonomy',
      photo_url: '/images/faculty/shilpa-labana.jpeg',
      initials: 'SL',
    },
    {
      id: 11,
      seniority: 11,
      name: 'Mr. Pratap Singh Damor',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - BA',
      subject: 'Hindi Literature',
      department: 'Faculty of Arts',
      stream: 'arts',
      qualification: 'M.A., B.Ed.',
      experience: '5+ Years',
      email: 'pratap.damor@gurukripapeeth.in',
      specialization: 'Modern Hindi Literature & Folk Pedagogy',
      photo_url: '/images/faculty/pratap-singh-damor.jpeg',
      initials: 'PD',
    },
    {
      id: 12,
      seniority: 12,
      name: 'Ms. Divya Kalal',
      designation: 'Assistant Professor',
      post_category: 'ASST. PROF. - B.Sc',
      subject: 'Chemistry',
      department: 'Faculty of Science',
      stream: 'science',
      qualification: 'M.Sc., B.Ed.',
      experience: '5+ Years',
      email: 'divya.kalal@gurukripapeeth.in',
      specialization: 'Inorganic Chemistry & Analytical Chemical Methods',
      photo_url: '/images/faculty/divya-kalal.jpeg',
      initials: 'DK',
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getFaculty().then((res) => {
        if (isMounted && Array.isArray(res) && res.length > 0) {
          setFaculty(res);
          setLoaded(true);
        } else if (isMounted) {
          setFaculty(fallbackFaculty);
          setLoaded(true);
        }
      }).catch(() => {
        if (isMounted) {
          setFaculty(fallbackFaculty);
          setLoaded(true);
        }
      });
    };

    load();
    window.addEventListener('focus', load);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', load);
    };
  }, []);

  const rawList = (loaded && faculty && faculty.length > 0) ? faculty : fallbackFaculty;

  // Filter logic
  const filteredFaculty = rawList.filter((f) => {
    const name = (f.name || f.title?.rendered || f.post_title || '').toLowerCase();
    const dept = (f.department || '').toLowerCase();
    const stream = (f.stream || '').toLowerCase();
    const desig = (f.designation || f.meta?.designation || '').toLowerCase();
    const subj = (f.subject || f.meta?.subject || '').toLowerCase();
    const qual = (f.qualification || f.meta?.qualification || '').toLowerCase();

    // Dept match
    if (deptFilter !== 'all') {
      if (deptFilter === 'leadership') {
        if (!desig.includes('principal') && Number(f.seniority || f.id) !== 1) return false;
      } else if (deptFilter === 'arts') {
        if (stream !== 'arts' && !dept.includes('arts') && !subj.includes('hindi') && !subj.includes('history') && !subj.includes('pol') && !subj.includes('sanskrit') && !subj.includes('geography') && !subj.includes('economics') && !subj.includes('english')) return false;
      } else if (deptFilter === 'science') {
        if (stream !== 'science' && !dept.includes('science') && !subj.includes('zoology') && !subj.includes('botany') && !subj.includes('chemistry')) return false;
      }
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return name.includes(q) || dept.includes(q) || desig.includes(q) || subj.includes(q) || qual.includes(q);
    }

    return true;
  });

  return (
    <div className="faculty-page">
      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Academic Faculty & Mentors</span>
          <h1 className="page-hero-title">Teaching Staff & Seniority Register</h1>
          <p className="page-hero-desc">
            Official roster of approved academic faculty members at Gurukripa Peeth College, organized strictly in order of institutional seniority in compliance with university statutes (GGTU, Banswara).
          </p>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building2 size={18} style={{ color: '#fde047' }} />
              <span style={{ fontSize: '13px', color: '#e2e8f0' }}>
                <strong style={{ color: '#ffffff', fontSize: '16px' }}>12</strong> Appointed Faculty Members
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={18} style={{ color: '#fde047' }} />
              <span style={{ fontSize: '13px', color: '#e2e8f0' }}>
                <strong style={{ color: '#ffffff', fontSize: '16px' }}>8</strong> Arts Faculty (B.A.)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={18} style={{ color: '#fde047' }} />
              <span style={{ fontSize: '13px', color: '#e2e8f0' }}>
                <strong style={{ color: '#ffffff', fontSize: '16px' }}>3</strong> Science Faculty (B.Sc.)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} style={{ color: '#fde047' }} />
              <span style={{ fontSize: '13px', color: '#e2e8f0' }}>
                <strong style={{ color: '#ffffff', fontSize: '16px' }}>100%</strong> UGC &amp; GGTU Qualified
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="section section-light">
        <div className="container">
          {/* Controls: Search, Filters, and View Switcher */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setDeptFilter('all')}
                className={`filter-chip ${deptFilter === 'all' ? 'filter-chip--active' : ''}`}
              >
                All Faculty ({rawList.length})
              </button>
              <button
                type="button"
                onClick={() => setDeptFilter('arts')}
                className={`filter-chip ${deptFilter === 'arts' ? 'filter-chip--active' : ''}`}
              >
                Faculty of Arts (8)
              </button>
              <button
                type="button"
                onClick={() => setDeptFilter('science')}
                className={`filter-chip ${deptFilter === 'science' ? 'filter-chip--active' : ''}`}
              >
                Faculty of Science (3)
              </button>
              <button
                type="button"
                onClick={() => setDeptFilter('leadership')}
                className={`filter-chip ${deptFilter === 'leadership' ? 'filter-chip--active' : ''}`}
              >
                Principal & Administration (1)
              </button>
            </div>

            {/* Right Group: Search Box + View Mode Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Search Box */}
              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search faculty or subject..."
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 34px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    background: '#ffffff',
                    color: '#0f172a',
                  }}
                />
              </div>

              {/* View Toggle */}
              <div className="faculty-view-toggle">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`faculty-view-btn ${viewMode === 'grid' ? 'faculty-view-btn--active' : ''}`}
                  title="Grid Cards View"
                >
                  <LayoutGrid size={15} />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`faculty-view-btn ${viewMode === 'table' ? 'faculty-view-btn--active' : ''}`}
                  title="Official Seniority Register Table View"
                >
                  <ListOrdered size={15} />
                  <span>Seniority Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Count Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
              Showing {filteredFaculty.length} of {rawList.length} faculty members sorted strictly by approved seniority rank.
            </span>
            <span style={{ fontSize: '12px', color: '#b45309', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <UserCheck size={14} /> GGTU Affiliated Roster
            </span>
          </div>

          {/* Zero Results State */}
          {filteredFaculty.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '56px 24px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b' }}>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>No faculty members found</p>
              <p style={{ margin: '6px 0 16px 0', fontSize: '13px' }}>No matches found for "{searchQuery}". Try searching by another name or clear your filters.</p>
              <button
                type="button"
                onClick={() => { setDeptFilter('all'); setSearchQuery(''); }}
                className="btn btn-primary"
                style={{ fontSize: '13px', padding: '8px 18px' }}
              >
                Clear Search & Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* VIEW 1: Grid Cards View */
            <div className="grid-3" style={{ gap: '24px' }}>
              {filteredFaculty.map((f) => {
                const name = f.name || f.title?.rendered || f.post_title || 'Faculty Member';
                const designation = f.designation || f.meta?.designation || 'Assistant Professor';
                const postCat = f.post_category || f.meta?.post_category || designation;
                const department = f.department || '';
                const subject = f.subject || f.meta?.subject || 'Academics';
                const qualification = f.qualification || f.meta?.qualification || 'M.A., B.Ed.';
                const specialization = f.specialization || f.meta?.specialization || 'Academic Pedagogy';
                const experience = f.experience || f.meta?.experience || '5+ Years';
                const email = f.email || f.meta?.email || 'info@gurukripapeeth.in';
                const seniority = Number(f.seniority || f.id);
                const initials = f.initials || name.replace(/Dr\.|Mr\.|Mrs\.|Ms\./g, '').trim().split(' ').map(w => w[0]).slice(0, 2).join('');
                const resolvedPhoto = resolveFacultyPhoto(f);

                const isPrincipal = seniority === 1 || designation.toLowerCase().includes('principal');
                const isMLib = qualification.includes('M.Lib');

                return (
                  <div key={f.id || seniority} className="faculty-card">
                    {/* Card Header: Seniority Rank & Post Tag */}
                    <div className="faculty-card-header">
                      <span className={`seniority-badge ${isPrincipal ? 'seniority-badge--principal' : ''}`}>
                        Seniority #{String(seniority).padStart(2, '0')}
                      </span>
                      <span className="faculty-post-tag">
                        {postCat}
                      </span>
                    </div>

                    {/* Card Body Row: Photo Frame + Name / Subject / Dept */}
                    <div className="faculty-body-row">
                      <div className="faculty-photo-frame">
                        <FacultyAvatar
                          photo={resolvedPhoto}
                          name={name}
                          initials={initials}
                          size="card"
                        />
                      </div>

                      <div className="faculty-meta-col">
                        <h3 className="faculty-name">{name}</h3>
                        <div className="faculty-role">{designation}</div>
                        <div className="faculty-subject-tag">
                          <strong>Subject:</strong> {subject}
                        </div>
                        {department && (
                          <div className="faculty-dept-sub">
                            {department}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Badges Row */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {isPrincipal && (
                        <span style={{ background: '#fef2f2', color: '#991b1b', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Award size={12} /> Institutional Head
                        </span>
                      )}
                      {isMLib && (
                        <span style={{ background: '#eff6ff', color: '#1e40af', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <BookOpen size={12} /> M.Lib. Degree
                        </span>
                      )}
                      <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} /> {experience}
                      </span>
                    </div>

                    {/* Qualification & Specialization Block */}
                    <div style={{ fontSize: '13px', color: '#334155', marginBottom: '8px', lineHeight: '1.45' }}>
                      <strong style={{ color: '#0f172a' }}>Qualification:</strong> {qualification}
                    </div>

                    <div style={{ fontSize: '12.5px', color: '#475569', marginBottom: '16px', lineHeight: '1.4' }}>
                      <strong style={{ color: '#0f172a' }}>Specialization:</strong> {specialization}
                    </div>
                    
                    {/* Card Footer: Official Mail */}
                    <div style={{ marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                      <a href={`mailto:${email}`} style={{ color: '#2563eb', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                        <Mail size={13} /> {email}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* VIEW 2: Official Seniority Register Table View */
            <div className="faculty-table-wrap">
              <table className="faculty-seniority-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>S.R.</th>
                    <th style={{ width: '70px', textAlign: 'center' }}>Photo</th>
                    <th>Name of Faculty</th>
                    <th>Post / Faculty</th>
                    <th>Subject</th>
                    <th>Academic Qualification</th>
                    <th>Department</th>
                    <th>Official Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFaculty.map((f) => {
                    const name = f.name || f.title?.rendered || f.post_title || 'Faculty Member';
                    const designation = f.designation || f.meta?.designation || 'Assistant Professor';
                    const postCat = f.post_category || f.meta?.post_category || designation;
                    const department = f.department || '';
                    const subject = f.subject || f.meta?.subject || 'Academics';
                    const qualification = f.qualification || f.meta?.qualification || 'M.A., B.Ed.';
                    const email = f.email || f.meta?.email || 'info@gurukripapeeth.in';
                    const seniority = Number(f.seniority || f.id);
                    const initials = f.initials || name.replace(/Dr\.|Mr\.|Mrs\.|Ms\./g, '').trim().split(' ').map(w => w[0]).slice(0, 2).join('');
                    const resolvedPhoto = resolveFacultyPhoto(f);
                    const isPrincipal = seniority === 1;

                    return (
                      <tr key={f.id || seniority}>
                        {/* Seniority S.R. */}
                        <td style={{ textAlign: 'center' }}>
                          <span className={`seniority-badge ${isPrincipal ? 'seniority-badge--principal' : ''}`} style={{ fontSize: '11px', padding: '3px 7px' }}>
                            {String(seniority).padStart(2, '0')}
                          </span>
                        </td>

                        {/* Photo Thumbnail */}
                        <td style={{ textAlign: 'center' }}>
                          <div className="faculty-table-thumb-wrap">
                            <FacultyAvatar
                              photo={resolvedPhoto}
                              name={name}
                              initials={initials}
                              size="table"
                            />
                          </div>
                        </td>

                        {/* Name */}
                        <td>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14.5px' }}>{name}</div>
                          {isPrincipal && (
                            <span style={{ fontSize: '10.5px', background: '#fee2e2', color: '#991b1b', padding: '1px 6px', borderRadius: '3px', fontWeight: 700 }}>
                              Institutional Principal
                            </span>
                          )}
                        </td>

                        {/* Post / Faculty */}
                        <td>
                          <span style={{ fontWeight: 600, color: '#b45309', fontSize: '12.5px' }}>
                            {postCat}
                          </span>
                        </td>

                        {/* Subject */}
                        <td style={{ fontWeight: 600, color: '#0f2d59' }}>
                          {subject}
                        </td>

                        {/* Qualification */}
                        <td style={{ color: '#334155' }}>
                          {qualification}
                        </td>

                        {/* Department */}
                        <td style={{ color: '#64748b', fontSize: '12.5px' }}>
                          {department}
                        </td>

                        {/* Contact */}
                        <td>
                          <a href={`mailto:${email}`} style={{ color: '#2563eb', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Mail size={12} /> {email.split('@')[0]}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Institutional Statutory Certification Box */}
          <div style={{ marginTop: '56px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ background: '#f0fdf4', color: '#166534', padding: '14px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={32} />
              </div>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700, margin: '0 0 6px 0' }}>
                  Statutory Compliance & Seniority Approval
                </h3>
                <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                  This seniority roster of the teaching staff at Gurukripa Peeth College (Peeth, Simalwara, Dungarpur) is maintained in strict conformity with Govind Guru Tribal University (GGTU), Banswara statutes and the Directorate of College Education, Govt. of Rajasthan. All faculty members are duly approved for Undergraduate Degree instructional roles.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <a href="mailto:gurukripa.peeth@gmail.com" className="btn btn-primary" style={{ fontSize: '13px', padding: '8px 18px' }}>
                    Contact Principal's Secretariat
                  </a>
                  <a href="/disclosures" className="btn btn-outline" style={{ fontSize: '13px', padding: '8px 18px' }}>
                    View Statutory Disclosures
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
