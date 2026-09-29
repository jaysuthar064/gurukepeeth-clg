import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Target, Eye, Users, BookOpen, Quote } from 'lucide-react';
import { getSettings, getLeadership } from '../api/wordpress';

export default function AboutPage() {
  const [settings, setSettings] = useState({
    college_name: 'Gurukripa Peeth College',
    college_subtitle: 'Post Graduate & Teacher Training College',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    ncte_code: 'WRC/APW05814/323363',
    aishe_code: 'C-48902',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
    address: 'Gurukripa Peeth College, Pratapgarh Road, Dungarpur, Rajasthan - 314001, India',
  });

  const [leadership, setLeadership] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getSettings().then(s => {
        if (isMounted && s) setSettings(s);
      });
      getLeadership().then(l => {
        if (isMounted && Array.isArray(l)) setLeadership(l);
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

  const fallbackLeadership = [
    { id: 1, name: "Principal's Desk", role_title: 'Principal & Head of Institution', qualifications: 'Dr. Rajesh Sharma, Ph.D., M.Ed.', message: 'Welcome to Gurukripa Peeth College. Our focus is learner-centric education emphasizing experiential learning, digital literacy, and holistic personality development. We are dedicated to preparing educators and scholars with ethical fortitude.' },
    { id: 2, name: "Managing Director's Vision", role_title: 'Managing Director', qualifications: 'M.B.A., B.Tech.', message: 'At Gurukripa Peeth, our vision has always been to bring quality, values-driven higher education to the youth of Southern Rajasthan, empowering them for national distinction.' },
  ];

  const displayLeaders = leadership.length > 0 ? leadership : fallbackLeadership;

  return (
    <div className="about-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Institutional Profile</span>
          <h1 className="page-hero-title">About {settings.college_name}</h1>
          <p className="page-hero-desc">
            {settings.college_subtitle}. A premier institution of higher education and teacher training in Dungarpur, Southern Rajasthan, affiliated with {settings.affiliating_univ}.
          </p>
        </div>
      </div>

      <div className="section section-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', marginBottom: '48px' }}>
            <div>
              <span className="section-tag">Legacy & Commitment</span>
              <h2 className="section-title">Fostering Excellence in Rural & Tribal Higher Education</h2>
              <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
                Established with the vision of bridging the higher educational divide in Southern Rajasthan, {settings.college_name} has grown into a renowned center for undergraduate studies in Arts, Science, and Teacher Education (B.Ed. & Integrated B.A.-B.Ed.).
              </p>
              <p style={{ color: '#475569', lineHeight: '1.8' }}>
                The college is fully recognized by the National Council for Teacher Education (NCTE) and maintains permanent affiliation with {settings.affiliating_univ}. Our curriculum combines academic rigor with ethical grounding, character development, and community engagement through NSS and cultural cells.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', color: '#0f172a', marginBottom: '16px' }}>Key Institutional Disclosures</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div><strong>Institution Name:</strong> {settings.college_name}</div>
                <div><strong>Affiliation:</strong> {settings.affiliating_univ}</div>
                <div><strong>NCTE Order Code:</strong> {settings.ncte_code}</div>
                <div><strong>AISHE Code:</strong> {settings.aishe_code}</div>
                <div><strong>College Type:</strong> Co-Educational College</div>
                <div><strong>NAAC Status:</strong> {settings.naac_grade}</div>
                <div><strong>Location:</strong> {settings.address}</div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid-2" style={{ marginBottom: '48px' }}>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Eye size={24} style={{ color: '#b8860b' }} />
                <h3 style={{ fontSize: '20px', color: '#92400e' }}>Institutional Vision</h3>
              </div>
              <p style={{ color: '#78350f', lineHeight: '1.8' }}>
                To emerge as a center of pedagogical excellence, character formation, and holistic learning that empowers youth from all social strata with intellectual competence, ethical integrity, and civic commitment.
              </p>
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Target size={24} style={{ color: '#059669' }} />
                <h3 style={{ fontSize: '20px', color: '#065f46' }}>Institutional Mission</h3>
              </div>
              <p style={{ color: '#064e3b', lineHeight: '1.8' }}>
                To provide accessible, high-quality degree and professional teacher training education, integrate digital tools and student-centric pedagogy, and instill democratic values, national pride, and environmental awareness.
              </p>
            </div>
          </div>

          {/* Leadership Desks */}
          <div>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
              <span className="section-tag">Institutional Guidance</span>
              <h2 className="section-title">Messages from the Desk of Leadership</h2>
              <p className="section-desc">Insights and perspectives driving academic standards and student empowerment.</p>
            </div>

            <div className="grid-2">
              {displayLeaders.map((lead) => (
                <div key={lead.id} style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#0f172a', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                      {lead.name ? lead.name.charAt(0) : 'L'}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', color: '#0f172a' }}>{lead.name}</h3>
                      <div style={{ fontSize: '13px', color: '#b8860b', fontWeight: 600 }}>{lead.role_title} {lead.qualifications ? `• ${lead.qualifications}` : ''}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#475569' }}>
                    "{lead.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
