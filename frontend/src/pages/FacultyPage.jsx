import React, { useState, useEffect } from 'react';
import { Mail, GraduationCap, Award, BookOpen, Briefcase } from 'lucide-react';
import { getFaculty } from '../api/wordpress';

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getFaculty().then(res => {
        if (isMounted && Array.isArray(res)) {
          setFaculty(res);
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

  const fallbackFaculty = [
    {
      id: 1,
      title: { rendered: 'Dr. Rajesh Sharma' },
      meta: {
        designation: 'Principal & Professor of Education',
        qualification: 'Ph.D., M.Ed., M.A. (Hindi), NET',
        experience: '22 Years',
        email: 'principal@gurukripapeeth.in',
        specialization: 'Educational Psychology & Teacher Pedagogy',
      },
    },
    {
      id: 2,
      title: { rendered: 'Dr. Meenakshi Joshi' },
      meta: {
        designation: 'Associate Professor & IQAC Coordinator',
        qualification: 'Ph.D., M.Sc. (Chemistry), CSIR NET',
        experience: '16 Years',
        email: 'iqac@gurukripapeeth.in',
        specialization: 'Organic Chemistry & Quality Assurance',
      },
    },
    {
      id: 3,
      title: { rendered: 'Prof. Suresh Kumar Patel' },
      meta: {
        designation: 'Assistant Professor & HOD Arts',
        qualification: 'M.A. (History), M.Phil., SET',
        experience: '12 Years',
        email: 'history@gurukripapeeth.in',
        specialization: 'Modern Indian History & Tribal Heritage',
      },
    },
    {
      id: 4,
      title: { rendered: 'Dr. Anita Meena' },
      meta: {
        designation: 'Assistant Professor of Education',
        qualification: 'Ph.D. (Education), M.Ed., UGC NET',
        experience: '9 Years',
        email: 'education@gurukripapeeth.in',
        specialization: 'Curriculum Design & ICT in Education',
      },
    },
  ];

  const list = loaded ? faculty : fallbackFaculty;

  return (
    <div className="faculty-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Academic Mentors</span>
          <h1 className="page-hero-title">Faculty & Staff Directory</h1>
          <p className="page-hero-desc">
            Meet our esteemed professors, associate scholars, and teacher educators dedicated to academic excellence.
          </p>
        </div>
      </div>

      <div className="section section-light">
        <div className="container">
          <div className="grid-4">
            {list.map((f) => {
              const name = f.name || f.title?.rendered || f.post_title || 'Faculty Member';
              const designation = f.designation || f.meta?.designation || 'Faculty';
              const qualification = f.qualification || f.meta?.qualification || 'M.A., B.Ed.';
              const specialization = f.specialization || f.meta?.specialization || 'Academic Pedagogy';
              const experience = f.experience || f.meta?.experience || '10+ Years';
              const email = f.email || f.meta?.email || 'info@gurukripapeeth.in';
              const photo = f.photo_url || f.image || '';

              return (
                <div key={f.id} className="faculty-card">
                  {photo ? (
                    <img 
                      src={photo} 
                      alt={name} 
                      className="faculty-avatar-box" 
                      style={{ objectFit: 'cover', padding: 0 }} 
                    />
                  ) : (
                    <div className="faculty-avatar-box">
                      {name.charAt(0)}
                    </div>
                  )}
                  <h3 className="faculty-name">{name}</h3>
                  <div className="faculty-role">{designation} {f.department ? `(${f.department})` : ''}</div>
                  <div className="faculty-qual" style={{ marginBottom: '12px' }}>{qualification}</div>
                  
                  <div style={{ fontSize: '12px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '12px', textAlign: 'left' }}>
                    <div><strong>Specialization:</strong> {specialization}</div>
                    <div><strong>Experience:</strong> {experience}</div>
                    <div style={{ marginTop: '6px' }}>
                      <a href={`mailto:${email}`} style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={12} /> {email}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '48px', textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#475569', fontSize: '14px', marginBottom: '12px' }}>
              Want to add or update faculty profiles? Use the WordPress Headless CMS:
            </p>
            <a 
              href="http://localhost:8884/wp-admin/admin.php?page=gurukapeeth-manager&tab=faculty" 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-gold"
            >
              👨‍🏫 Manage Faculty in Headless CMS Dashboard →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
