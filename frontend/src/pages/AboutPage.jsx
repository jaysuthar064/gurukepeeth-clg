import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Award, Target, Eye, Users, BookOpen, Quote, Library, 
  Monitor, FlaskConical, Trophy, Building, ShieldAlert, FileText, 
  Building2, Download, ExternalLink, Search, CheckCircle2 
} from 'lucide-react';
import { getSettings, getLeadership } from '../api/wordpress';

export default function AboutPage() {
  const [settings, setSettings] = useState({
    college_name: 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH',
    college_hindi: 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ',
    trust_name: 'Shree Narayan Shiksha Seva Samiti Peeth',
    trust_hindi: 'श्री नारायण शिक्षा सेवा समिति, पीठ',
    college_subtitle: 'Undergraduate Degree College (Arts & Science)',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    aishe_code: 'C-48902',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
    address: 'Gurukripa Peeth College, Peeth, Tehsil Simalwara, Dungarpur, Rajasthan - 314001, India',
  });

  const [leadership, setLeadership] = useState([]);
  const [societySearch, setSocietySearch] = useState('');
  const [showCertModal, setShowCertModal] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, []);

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
    { 
      id: 1, 
      name: "Chairman & Director's Desk", 
      role_title: 'Director / Chairman', 
      qualifications: 'Mr. Kalu Ram Labana', 
      message: 'Gurukripa Peeth College is committed to delivering quality higher education in Arts and Science to the youth of Southern Rajasthan. Our mission is to combine academic excellence, moral integrity, and regional development to shape empowered leaders for the nation.' 
    },
    { 
      id: 2, 
      name: "Secretary's Desk", 
      role_title: 'Secretary', 
      qualifications: 'Mr. Vipin Kumar Labana', 
      message: 'We prioritize learner-centric infrastructure, transparent administration, and comprehensive student support. Gurukripa Peeth stands as a beacon of opportunity for tribal and rural scholars to achieve excellence in higher education and academic careers.' 
    },
    { 
      id: 3, 
      name: "Principal's Desk", 
      role_title: 'Principal & Head of Institution', 
      qualifications: 'Dr. Hari Shanker Maru, Ph.D., M.A. (Hindi)', 
      message: 'Welcome to Gurukripa Peeth College. Our academic framework integrates curricular rigor with ethical character building, experiential learning, and community engagement under GGTU and UGC standards.' 
    },
  ];

  const displayLeaders = leadership.length >= 3 ? leadership : fallbackLeadership;

  const societyMembers = [
    { sn: 1, name: 'श्री कालूराम लबाना', nameEn: 'Mr. Kalu Ram Labana', relation: 'श्री नारायण लबाना', role: 'अध्यक्ष (President)', isOfficer: true, dob: '15/09/1972', occ: 'कृषि (Agriculture)', address: 'मु.पो. पीठ, तहसील सीमलवाड़ा, जिला डूंगरपुर' },
    { sn: 2, name: 'श्री विपिन कुमार लबाना', nameEn: 'Mr. Vipin Kumar Labana', relation: 'श्री कालूराम लबाना', role: 'सचिव / मंत्री (Secretary)', isOfficer: true, dob: '01/06/1990', occ: 'व्यापार (Business)', address: 'मु.पो. पीठ, तहसील सीमलवाड़ा, जिला डूंगरपुर' },
    { sn: 3, name: 'श्रीमती लक्ष्मी लबाना', nameEn: 'Mrs. Laxmi Labana', relation: 'श्री विपिन कुमार लबाना', role: 'कोषाध्यक्ष (Treasurer)', isOfficer: true, dob: '01/07/1995', occ: 'गृह कार्य (Household)', address: 'मु.पो. पीठ, तहसील सीमलवाड़ा, जिला डूंगरपुर' },
    { sn: 4, name: 'श्री अमुल कुमार लबाना', nameEn: 'Mr. Amul Kumar Labana', relation: 'श्री कालूराम लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '15/09/1995', occ: 'व्यापार (Business)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 5, name: 'श्रीमती बबली बेन लबाना', nameEn: 'Mrs. Babli Ben Labana', relation: 'श्री कालूराम लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '20/07/1978', occ: 'गृह कार्य (Household)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 6, name: 'श्री ईश्वरलाल लबाना', nameEn: 'Mr. Ishwarlal Labana', relation: 'श्री नाथा लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '07/07/1962', occ: 'कृषि (Agriculture)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 7, name: 'सुश्री खुशबू कुमारी लबाना', nameEn: 'Ms. Khushbu Kumari Labana', relation: 'श्री कालूराम लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '25/07/2000', occ: 'अध्ययन (Student)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 8, name: 'श्रीमती माया लबाना', nameEn: 'Mrs. Maya Labana', relation: 'श्री ईश्वरलाल लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '07/07/1970', occ: 'गृह कार्य (Household)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 9, name: 'श्रीमती नीता देवी मिश्रा', nameEn: 'Mrs. Nita Devi Mishra', relation: 'श्री मुकेश कुमार शर्मा', role: 'सदस्य (Member)', isOfficer: false, dob: '01/08/1982', occ: 'गृह कार्य (Household)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 10, name: 'श्री पंकज लबाना', nameEn: 'Mr. Pankaj Labana', relation: 'श्री ईश्वरलाल लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '15/05/1996', occ: 'व्यापार (Business)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 11, name: 'श्री प्रकाश चन्द्र लबाना', nameEn: 'Mr. Prakash Chandra Labana', relation: 'श्री शंकरलाल लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '12/08/1978', occ: 'व्यापार (Business)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 12, name: 'श्रीमती सावित्री लबाना', nameEn: 'Mrs. Savitri Labana', relation: 'श्री शंकरलाल लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '15/08/1960', occ: 'गृह कार्य (Household)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 13, name: 'श्री सुशील कुमार पंड्या', nameEn: 'Mr. Sushil Kumar Pandya', relation: 'श्री कांतिलाल पंड्या', role: 'सदस्य (Member)', isOfficer: false, dob: '02/07/1978', occ: 'व्यापार (Business)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 14, name: 'सुश्री टिंकल लबाना', nameEn: 'Ms. Tinkal Labana', relation: 'श्री कालूराम लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '25/06/1998', occ: 'अध्ययन (Student)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 15, name: 'श्रीमती विद्या लबाना', nameEn: 'Mrs. Vidhya Labana', relation: 'श्री प्रकाशचन्द्र लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '18/06/1986', occ: 'गृह कार्य (Household)', address: 'मु.पो. पीठ, डूंगरपुर' },
    { sn: 16, name: 'श्री विवेक लबाना', nameEn: 'Mr. Vivek Labana', relation: 'श्री प्रकाशचन्द्र लबाना', role: 'सदस्य (Member)', isOfficer: false, dob: '15/05/2003', occ: 'अध्ययन (Student)', address: 'मु.पो. पीठ, डूंगरपुर' },
  ];

  const filteredSociety = societyMembers.filter(m => {
    if (!societySearch.trim()) return true;
    const q = societySearch.toLowerCase();
    return m.name.toLowerCase().includes(q) ||
           m.nameEn.toLowerCase().includes(q) ||
           m.relation.toLowerCase().includes(q) ||
           m.role.toLowerCase().includes(q) ||
           m.occ.toLowerCase().includes(q);
  });

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
      desc: 'Fully equipped experimental workstations for Chemistry, Botany, Zoology, and foundational scientific inquiry.',
    },
    {
      icon: <BookOpen size={24} style={{ color: '#7c3aed' }} />,
      title: 'Seminar Hall & Activity Center',
      desc: 'Multi-functional activity center for academic symposia, literary society debates, NSS orientation, and personality development.',
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
            {settings.college_subtitle}. A premier institution of higher education in Dungarpur, Southern Rajasthan, affiliated with {settings.affiliating_univ}.
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
                Established with the vision of bridging the higher educational divide in Southern Rajasthan, {settings.college_name} has grown into a renowned center for undergraduate studies in Arts and Science (B.A. & B.Sc.).
              </p>
              <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
                The college holds Permanent NOC from the Government of Rajasthan and maintains permanent affiliation with {settings.affiliating_univ}. Our curriculum combines academic rigor with ethical grounding, character development, and community engagement through NSS and cultural cells.
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
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                    {settings.college_hindi}
                  </div>
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Managing Society &amp; Trust</div>
                  <strong style={{ color: '#0f172a' }}>{settings.trust_name}</strong>
                  <div style={{ fontSize: '11.5px', color: '#b45309', fontWeight: 600, marginTop: '2px' }}>
                    {settings.trust_hindi}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    Reg. No: <strong>55/DUNGARPUR/2013-14</strong> (Raj. Societies Registration Act, 1958)
                  </div>
                  <div style={{ fontSize: '11px', color: '#1e40af', marginTop: '5px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="/documents/society-executive-committee-2023-24.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <FileText size={11} /> Executive Committee PDF
                    </a>
                    <a href="/documents/society-registration-certificate.jpeg" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Award size={11} /> Registration Certificate
                    </a>
                    <a href="#society" style={{ color: '#b45309', fontWeight: 700, textDecoration: 'none' }}>
                      View Full Member List ↓
                    </a>
                  </div>
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

            <div className="grid-3" style={{ gap: '24px' }}>
              {displayLeaders.map((lead) => {
                const isPrin = (lead.role_title || lead.name).toLowerCase().includes('principal');
                const isSec = (lead.role_title || lead.name).toLowerCase().includes('secretary');
                const badge = isPrin ? 'P' : isSec ? 'S' : 'DIR';
                return (
                  <div key={lead.id} style={{ background: '#f8fafc', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: '#0f172a', color: '#f59e0b', border: '2px solid #b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: badge.length > 1 ? '14px' : '18px', flexShrink: 0 }}>
                        {badge}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '17px', color: '#0f172a', fontWeight: 700, margin: '0 0 4px 0' }}>{lead.name}</h3>
                        <div style={{ fontSize: '12.5px', color: '#b8860b', fontWeight: 600 }}>{lead.role_title} {lead.qualifications ? `• ${lead.qualifications}` : ''}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '13.5px', lineHeight: '1.7', color: '#475569', margin: 0, fontStyle: 'italic', flex: 1 }}>
                      "{lead.message}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================
              MANAGING SOCIETY & GOVERNING BODY (TRUST)
              ============================================================ */}
          <section id="society" style={{ scrollMarginTop: '100px', marginBottom: '56px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}>
              
              {/* Header & Quick Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    <Building2 size={14} /> Sponsoring Trust &amp; Society
                  </div>
                  <h2 style={{ fontSize: '28px', color: '#0f172a', fontWeight: 800, margin: '0 0 6px 0', fontFamily: 'var(--font-heading)' }}>
                    Shree Narayan Shiksha Seva Samiti Peeth
                  </h2>
                  <div style={{ fontSize: '18px', color: '#b45309', fontWeight: 700, marginBottom: '8px' }}>
                    श्री नारायण शिक्षा सेवा समिति, पीठ
                  </div>
                  <p style={{ color: '#475569', fontSize: '14px', margin: 0, maxWidth: '720px', lineHeight: '1.6' }}>
                    Registered under the <strong>Rajasthan Societies Registration Act, 1958</strong> (Registration No: <strong>55/DUNGARPUR/2013-14</strong>). Approved and recorded by the Office of Assistant Registrar, Cooperative Societies, Dungarpur, Government of Rajasthan.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a 
                    href="/documents/society-executive-committee-2023-24.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-gold"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 18px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}
                  >
                    <Download size={16} /> Executive Committee Order (PDF)
                  </a>
                  <button 
                    type="button"
                    onClick={() => setShowCertModal(true)}
                    className="btn btn-outline"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 18px', fontSize: '13.5px', fontWeight: 600, background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1', cursor: 'pointer' }}
                  >
                    <Award size={16} /> View Society Certificate
                  </button>
                </div>
              </div>

              {/* Society Office Bearers Feature Cards */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} style={{ color: '#b45309' }} /> Key Society Office Bearers (मुख्य पदाधिकारी)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                  
                  {/* President */}
                  <div style={{ background: '#ffffff', border: '2px solid #fde68a', borderRadius: '14px', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                        President / अध्यक्ष
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>DOB: 15/09/1972</span>
                    </div>
                    <h4 style={{ fontSize: '19px', color: '#0f172a', fontWeight: 800, margin: '0 0 4px 0' }}>
                      श्री कालूराम लबाना
                    </h4>
                    <div style={{ fontSize: '13.5px', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>
                      Mr. Kalu Ram Labana
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      पिता: श्री नारायण लबाना • व्यवसाय: कृषि
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                      निवास: मु.पो. पीठ, तहसील सीमलवाड़ा (डूंगरपुर)
                    </div>
                  </div>

                  {/* Secretary */}
                  <div style={{ background: '#ffffff', border: '2px solid #bae6fd', borderRadius: '14px', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                        Secretary / सचिव / मंत्री
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>DOB: 01/06/1990</span>
                    </div>
                    <h4 style={{ fontSize: '19px', color: '#0f172a', fontWeight: 800, margin: '0 0 4px 0' }}>
                      श्री विपिन कुमार लबाना
                    </h4>
                    <div style={{ fontSize: '13.5px', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>
                      Mr. Vipin Kumar Labana
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      पिता: श्री कालूराम लबाना • व्यवसाय: व्यापार
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                      निवास: मु.पो. पीठ, तहसील सीमलवाड़ा (डूंगरपुर)
                    </div>
                  </div>

                  {/* Treasurer */}
                  <div style={{ background: '#ffffff', border: '2px solid #bbf7d0', borderRadius: '14px', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                        Treasurer / कोषाध्यक्ष
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>DOB: 01/07/1995</span>
                    </div>
                    <h4 style={{ fontSize: '19px', color: '#0f172a', fontWeight: 800, margin: '0 0 4px 0' }}>
                      श्रीमती लक्ष्मी लबाना
                    </h4>
                    <div style={{ fontSize: '13.5px', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>
                      Mrs. Laxmi Labana
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      पति: श्री विपिन कुमार लबाना • व्यवसाय: गृह कार्य
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                      निवास: मु.पो. पीठ, तहसील सीमलवाड़ा (डूंगरपुर)
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Verification Banner */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', marginBottom: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div 
                    onClick={() => setShowCertModal(true)} 
                    style={{ position: 'relative', width: '130px', height: '170px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #b45309', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    title="Click to view full certificate"
                  >
                    <img 
                      src="/documents/society-registration-certificate.jpeg" 
                      alt="Society Registration Certificate" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(15,23,42,0.85)', color: '#fff', fontSize: '10px', textAlign: 'center', padding: '4px 2px', fontWeight: 700 }}>
                      🔍 Click to Zoom
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#047857', background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>
                      Verified State Certificate
                    </span>
                    <h4 style={{ fontSize: '17px', color: '#0f172a', fontWeight: 700, margin: '6px 0 6px 0' }}>
                      Official Certificate of Registration
                    </h4>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 10px 0' }}>
                      Statutory registration certificate under Rajasthan Societies Registration Act, 1958 with serial seal of Registrar, Dungarpur.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button 
                        type="button" 
                        onClick={() => setShowCertModal(true)} 
                        className="btn btn-outline" 
                        style={{ fontSize: '12px', padding: '6px 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Eye size={13} /> View High-Res
                      </button>
                      <a 
                        href="/documents/society-registration-certificate.jpeg" 
                        download="society-registration-certificate.jpeg" 
                        className="btn btn-gold" 
                        style={{ fontSize: '12px', padding: '6px 12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Download size={13} /> Download JPEG
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '10px', border: '1px solid #edf2f7', fontSize: '12.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b' }}>Institution / Society:</span>
                    <strong style={{ color: '#0f172a' }}>Shree Narayan Shiksha Seva Samiti Peeth</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b' }}>Registration Number:</span>
                    <strong style={{ color: '#b45309' }}>55/DUNGARPUR/2013-14</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b' }}>Statutory Authority:</span>
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>Registrar of Societies, Dungarpur</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px' }}>
                    <span style={{ color: '#64748b' }}>Governing Act:</span>
                    <span style={{ color: '#047857', fontWeight: 700 }}>Rajasthan Societies Act, 1958</span>
                  </div>
                </div>
              </div>

              {/* 16-Member Executive Committee (नवीन कार्यकारिणी 2023-24) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 800, margin: '0 0 2px 0' }}>
                      Executive Committee (नवीन कार्यकारिणी 2023-24)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                      Certified 16-Member Governing Body as per Office of Assistant Registrar, Cooperative Societies, Dungarpur
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '6px 12px', minWidth: '240px' }}>
                    <Search size={14} style={{ color: '#64748b' }} />
                    <input 
                      type="text" 
                      placeholder="Filter members by name, role..." 
                      value={societySearch}
                      onChange={(e) => setSocietySearch(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '13px', width: '100%', background: 'transparent' }}
                    />
                  </div>
                </div>

                <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff', borderBottom: '2px solid #b45309' }}>
                        <th style={{ padding: '12px 14px', fontWeight: 700, width: '40px' }}>#</th>
                        <th style={{ padding: '12px 14px', fontWeight: 700 }}>सदस्य का नाम (Member Name)</th>
                        <th style={{ padding: '12px 14px', fontWeight: 700 }}>पिता / पति का नाम</th>
                        <th style={{ padding: '12px 14px', fontWeight: 700 }}>पद (Designation)</th>
                        <th style={{ padding: '12px 14px', fontWeight: 700 }}>जन्म तिथि</th>
                        <th style={{ padding: '12px 14px', fontWeight: 700 }}>व्यवसाय</th>
                        <th style={{ padding: '12px 14px', fontWeight: 700 }}>निवास स्थान</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSociety.map((member) => (
                        <tr 
                          key={member.sn} 
                          style={{ 
                            borderBottom: '1px solid #f1f5f9',
                            background: member.isOfficer ? '#fffbeb' : '#ffffff' 
                          }}
                        >
                          <td style={{ padding: '12px 14px', fontWeight: 700, color: member.isOfficer ? '#b45309' : '#64748b' }}>
                            {member.sn}
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <strong style={{ color: '#0f172a', display: 'block' }}>{member.name}</strong>
                            <span style={{ fontSize: '11.5px', color: '#64748b' }}>{member.nameEn}</span>
                          </td>
                          <td style={{ padding: '12px 14px', color: '#334155' }}>
                            {member.relation}
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <span 
                              style={{ 
                                display: 'inline-block',
                                padding: '3px 8px', 
                                borderRadius: '4px', 
                                fontSize: '11.5px', 
                                fontWeight: 700,
                                background: member.role.includes('अध्यक्ष') 
                                  ? '#fef3c7' 
                                  : member.role.includes('सचिव') 
                                    ? '#e0f2fe' 
                                    : member.role.includes('कोषाध्यक्ष') 
                                      ? '#dcfce7' 
                                      : '#f1f5f9',
                                color: member.role.includes('अध्यक्ष') 
                                  ? '#92400e' 
                                  : member.role.includes('सचिव') 
                                    ? '#0369a1' 
                                    : member.role.includes('कोषाध्यक्ष') 
                                      ? '#15803d' 
                                      : '#475569'
                              }}
                            >
                              {member.role}
                            </span>
                          </td>
                          <td style={{ padding: '12px 14px', color: '#475569', whiteSpace: 'nowrap' }}>
                            {member.dob}
                          </td>
                          <td style={{ padding: '12px 14px', color: '#334155' }}>
                            {member.occ}
                          </td>
                          <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px' }}>
                            {member.address}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', flexWrap: 'wrap', gap: '8px' }}>
                  <span>Showing {filteredSociety.length} of {societyMembers.length} verified executive members</span>
                  <span>Source: Office of Assistant Registrar, Cooperative Societies, Dungarpur (Order: 26-01-2024)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Certificate Zoom Modal */}
          {showCertModal && (
            <div 
              onClick={() => setShowCertModal(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '20px',
              }}
            >
              <div 
                onClick={(e) => e.stopPropagation()} 
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  maxWidth: '750px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#0f172a', color: '#ffffff' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f59e0b' }}>
                      Shree Narayan Shiksha Seva Samiti Peeth
                    </h3>
                    <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
                      Registration Certificate (Reg. No: 55/DUNGARPUR/2013-14)
                    </span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowCertModal(false)}
                    style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '24px', cursor: 'pointer', lineHeight: 1 }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ padding: '16px', overflowY: 'auto', textAlign: 'center', background: '#f8fafc' }}>
                  <img 
                    src="/documents/society-registration-certificate.jpeg" 
                    alt="Registration Certificate full view" 
                    style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderTop: '1px solid #e2e8f0', background: '#ffffff' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Rajasthan Societies Registration Act, 1958
                  </span>
                  <a 
                    href="/documents/society-registration-certificate.jpeg" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-gold" 
                    style={{ fontSize: '12px', padding: '6px 14px', textDecoration: 'none' }}
                  >
                    Open Full Image in New Tab ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Statutory Cells & Safety Oversight */}
          <div style={{ padding: '24px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ShieldAlert size={28} style={{ color: '#059669' }} />
              <div>
                <h4 style={{ fontSize: '15px', color: '#0f172a', margin: 0, fontWeight: 700 }}>Statutory Cells & Student Safety</h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>
                  Zero-Tolerance Anti-Ragging Cell, Internal Complaints Committee (ICC), and Student Grievance Redressal Committee active as per UGC & State Government norms.
                </p>
              </div>
            </div>
            <a href="mailto:gurukripa.peeth@gmail.com" className="btn btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}>
              Contact Grievance Officer ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
