import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Target, Eye, Users, BookOpen, Quote, Library, Monitor, FlaskConical, Trophy, Building, ShieldAlert, FileText } from 'lucide-react';
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

  const coreValues = [
    {
      title: 'Pedagogical Rigor & Competency',
      desc: 'Committed to sound academic foundations, evidence-based teaching methodology, and outcome-oriented course delivery.',
    },
    {
      title: 'Inclusive Regional Access',
      desc: 'Providing equitable access to higher education for rural, tribal, and marginalized youth of Southern Rajasthan.',
    },
    {
      title: 'Ethical & Civic Stewardship',
      desc: 'Inculcating constitutional values, human rights awareness, gender equity, and civic responsibility through NSS.',
    },
    {
      title: 'Continuous Quality Enhancement',
      desc: 'Dynamic quality monitoring through the Internal Quality Assurance Cell (IQAC), feedback systems, and faculty development.',
    },
  ];

  const campusFacilities = [
    {
      icon: <Library size={24} style={{ color: '#b45309' }} />,
      title: 'Central Library & Reading Hall',
      desc: 'Over 14,000 reference volumes, peer-reviewed journals, INFLIBNET N-LIST e-resource subscriptions, and quiet study carrels.',
    },
    {
      icon: <Monitor size={24} style={{ color: '#2563eb' }} />,
      title: 'Smart ICT Classrooms',
      desc: 'Interactive digital podiums, ceiling projection systems, and campus-wide high-speed optical fiber connectivity.',
    },
    {
      icon: <FlaskConical size={24} style={{ color: '#059669' }} />,
      title: 'Multi-disciplinary Science Labs',
      desc: 'Fully equipped experimental workstations for Physics, Chemistry, Botany, Zoology, and B.Ed. Science Education.',
    },
    {
      icon: <BookOpen size={24} style={{ color: '#7c3aed' }} />,
      title: 'Psychology & Curriculum Resource Center',
      desc: 'Standardized psychological test batteries, teaching aids, and learning material kits for prospective school teachers.',
    },
    {
      icon: <Trophy size={24} style={{ color: '#d97706' }} />,
      title: 'Sports Grounds & Fitness Center',
      desc: 'Multi-sport outdoor facilities for volleyball, athletics, cricket, and table tennis promoting physical fitness.',
    },
    {
      icon: <Building size={24} style={{ color: '#0f172a' }} />,
      title: 'Multipurpose Assembly Hall',
      desc: '350-seat acoustic auditorium for national seminars, orientation programs, cultural fests, and guest lectures.',
    },
  ];

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
          <div className="grid-2" style={{ alignItems: 'flex-start', marginBottom: '56px', gap: '48px' }}>
            <div>
              <span className="section-tag">Legacy & Commitment</span>
              <h2 className="section-title">Fostering Excellence in Rural & Tribal Higher Education</h2>
              <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
                Established with the vision of bridging the higher educational divide in Southern Rajasthan, {settings.college_name} has grown into a renowned center for undergraduate studies in Arts, Science, and Teacher Education (B.Ed. & Integrated B.A.-B.Ed.).
              </p>
              <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
                The college is fully recognized by the National Council for Teacher Education (NCTE) and maintains permanent affiliation with {settings.affiliating_univ}. Our curriculum combines academic rigor with ethical grounding, character development, and community engagement through NSS and cultural cells.
              </p>
              <p style={{ color: '#475569', lineHeight: '1.8' }}>
                With a state-of-the-art campus, dedicated senior faculty members, and student-focused mentoring, we prepare graduates who lead with competence, integrity, and social empathy in education, public service, and industry.
              </p>
            </div>
            
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)' }}>
              <h3 style={{ fontSize: '18px', color: '#0f172a', marginBottom: '16px', fontWeight: 700 }}>Statutory Institutional Registry</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Legal Entity Name</div>
                  <strong style={{ color: '#0f172a' }}>{settings.college_name}</strong>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Affiliating University &amp; Orders</div>
                  <strong style={{ color: '#0f172a' }}>{settings.affiliating_univ}</strong>
                  <div style={{ fontSize: '11px', color: '#1e40af', marginTop: '3px' }}>
                    <a href="/documents/affiliation/ggtu-affiliation-2025-26.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', marginRight: 8 }}>Order 2025-26</a>
                    <a href="/documents/affiliation/ggtu-affiliation-2024-25.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', marginRight: 8 }}>Order 2024-25</a>
                    <a href="/documents/affiliation/ggtu-affiliation-2022-23.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', marginRight: 8 }}>Order 2022-23</a>
                    <a href="/documents/affiliation/ggtu-affiliation-2021-22.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Order 2021-22</a>
                  </div>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>State Government Permanent NOC</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#047857' }}>
                    Rajasthan Govt. Permanent NOC (B.A. Arts &amp; B.Sc. Biology)
                  </div>
                  <div style={{ fontSize: '11px', marginTop: '4px', display: 'flex', gap: 12 }}>
                    <a href="/documents/noc/rajasthan-govt-permanent-noc-ba-arts.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#047857', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <FileText size={12} /> B.A. NOC (Order 1128)
                    </a>
                    <a href="/documents/noc/rajasthan-govt-permanent-noc-bsc-biology.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#047857', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <FileText size={12} /> B.Sc. NOC (Order 20)
                    </a>
                  </div>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>NCTE Statutory Recognition</div>
                  <strong style={{ color: '#b45309' }}>{settings.ncte_code}</strong>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>MHRD AISHE Institution Code</div>
                  <strong style={{ color: '#0f172a' }}>{settings.aishe_code}</strong>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>NAAC Accreditation</div>
                  <span style={{ background: '#ecfdf5', color: '#065f46', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, display: 'inline-block', marginTop: '2px' }}>
                    {settings.naac_grade}
                  </span>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Campus Address</div>
                  <span style={{ color: '#334155' }}>{settings.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid-2" style={{ marginBottom: '56px', gap: '28px' }}>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Eye size={22} />
                </div>
                <h3 style={{ fontSize: '20px', color: '#92400e', fontWeight: 700, margin: 0 }}>Institutional Vision</h3>
              </div>
              <p style={{ color: '#78350f', lineHeight: '1.8', fontSize: '14px' }}>
                To emerge as an acclaimed seat of pedagogical excellence, character formation, and holistic learning that empowers students from all socio-economic backgrounds with intellectual capability, professional competence, and national consciousness.
              </p>
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={22} />
                </div>
                <h3 style={{ fontSize: '20px', color: '#065f46', fontWeight: 700, margin: 0 }}>Institutional Mission</h3>
              </div>
              <p style={{ color: '#064e3b', lineHeight: '1.8', fontSize: '14px' }}>
                To deliver value-oriented undergraduate education and secondary teacher training, blend innovative digital pedagogy with experiential classroom teaching, and nurture responsible citizens committed to community enrichment and sustainability.
              </p>
            </div>
          </div>

          {/* Core Institutional Values */}
          <div style={{ marginBottom: '56px' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '28px' }}>
              <span className="section-tag">Guiding Principles</span>
              <h2 className="section-title">Core Institutional Values</h2>
              <p className="section-desc">The ethical and pedagogical pillars underpinning all campus activities and governance.</p>
            </div>

            <div className="grid-4" style={{ gap: '20px' }}>
              {coreValues.map((val, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#b45309', marginBottom: '8px' }}>0{idx + 1}</div>
                  <h4 style={{ fontSize: '16px', color: '#0f172a', fontWeight: 700, marginBottom: '8px' }}>{val.title}</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Facilities & Learning Infrastructure */}
          <div style={{ marginBottom: '56px' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '28px' }}>
              <span className="section-tag">Learning Environment</span>
              <h2 className="section-title">Campus Infrastructure & Facilities</h2>
              <p className="section-desc">Modern physical and digital resources designed to empower student success and teacher development.</p>
            </div>

            <div className="grid-3" style={{ gap: '24px' }}>
              {campusFacilities.map((fac, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px' }}>
                  <div style={{ marginBottom: '14px' }}>{fac.icon}</div>
                  <h4 style={{ fontSize: '16px', color: '#0f172a', fontWeight: 700, marginBottom: '8px' }}>{fac.title}</h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: 0 }}>{fac.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Desks */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
              <span className="section-tag">Institutional Guidance</span>
              <h2 className="section-title">Messages from the Desk of Leadership</h2>
              <p className="section-desc">Insights and perspectives driving academic standards and student empowerment.</p>
            </div>

            <div className="grid-2" style={{ gap: '28px' }}>
              {displayLeaders.map((lead) => (
                <div key={lead.id} style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#0f172a', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>
                      {lead.name ? lead.name.charAt(0) : 'L'}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700, margin: '0 0 4px 0' }}>{lead.name}</h3>
                      <div style={{ fontSize: '13px', color: '#b8860b', fontWeight: 600 }}>{lead.role_title} {lead.qualifications ? `• ${lead.qualifications}` : ''}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#475569', margin: 0, fontStyle: 'normal' }}>
                    "{lead.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Cells & Safety Oversight */}
          <div style={{ padding: '24px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ShieldAlert size={28} style={{ color: '#059669' }} />
              <div>
                <h4 style={{ fontSize: '15px', color: '#0f172a', margin: 0, fontWeight: 700 }}>Statutory Cells & Student Safety</h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>
                  Zero-Tolerance Anti-Ragging Cell, Internal Complaints Committee (ICC), and Student Grievance Redressal Committee active as per UGC & NCTE norms.
                </p>
              </div>
            </div>
            <a href="mailto:info@gurukripapeeth.in" className="btn btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}>
              Contact Grievance Officer ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
