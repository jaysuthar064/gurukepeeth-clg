import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck, Award, School } from 'lucide-react';
import { getSettings } from '../../api/wordpress';

export default function Footer() {
  const [settings, setSettings] = useState({
    college_name: 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH',
    college_hindi: 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ',
    college_subtitle: 'Run by Shree Narayan Shiksha Seva Samiti Peeth • Affiliated to GGTU Banswara',
    trust_name: 'Shree Narayan Shiksha Seva Samiti Peeth',
    tagline: 'Nurturing Intellect, Cultivating Character, Empowering Society',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    aishe_code: 'C-48902',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
    phone_primary: '+91 95874 33001',
    phone_secondary: '+91 96105 87077',
    email_info: 'gurukripa.peeth@gmail.com',
    address: 'Gurukripa Shikshan Sansthan College, Peeth, Tehsil Simalwara, Dungarpur, Rajasthan - 314001, India',
  });

  useEffect(() => {
    let isMounted = true;
    const loadFooter = () => {
      getSettings().then(s => { if (isMounted && s) setSettings(s); });
    };

    loadFooter();
    window.addEventListener('focus', loadFooter);
    const interval = setInterval(loadFooter, 3000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', loadFooter);
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Institutional Overview */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: '#ffffff', borderRadius: '10px', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                <img src="/images/college-logo.png" alt="Gurukripa Shikshan Sansthan College Emblem" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '15px', letterSpacing: '0.02em', lineHeight: 1.25 }}>{settings.college_name}</h4>
                <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 600, marginTop: '2px' }}>{settings.college_hindi || 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ'}</div>
              </div>
            </div>
            <p style={{ fontSize: '12.5px', lineHeight: '1.65', color: '#cbd5e1', marginBottom: '12px' }}>
              Managed by <strong style={{ color: '#fbbf24' }}>Shree Narayan Shiksha Seva Samiti Peeth</strong> (Reg. No. 55/DUNGARPUR/2013-14). Premier higher education institution dedicated to academic excellence, tribal empowerment, and scientific learning.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '3px' }} />
                <span>{settings.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>Secretary: <a href="tel:+919587433001" style={{ color: '#cbd5e1' }}>+91 95874 33001</a> (Mr. Vipin Kumar Labana)</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>Chairman: <a href="tel:+919610587077" style={{ color: '#cbd5e1' }}>+91 96105 87077</a> (Mr. Kalu Ram Labana)</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <a href={`mailto:${settings.email_info}`} style={{ color: '#cbd5e1' }}>{settings.email_info}</a>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Disciplines */}
          <div className="footer-col">
            <h4>Academic Programs</h4>
            <ul>
              <li><Link to="/academics">Bachelor of Arts (B.A. - 160 Seats)</Link></li>
              <li><Link to="/academics">Bachelor of Science (B.Sc. Bio - 140 Seats)</Link></li>
              <li><Link to="/admissions">Admissions Guidelines 2026-27</Link></li>
              <li><Link to="/faculty">Faculty & Department Chairs</Link></li>
              <li><Link to="/student-corner">Student Corner & Syllabi</Link></li>
              <li><Link to="/disclosures">Affiliations & NOC Hub</Link></li>
            </ul>
          </div>

          {/* Col 3: Statutory Disclosures & Quality Assurance */}
          <div className="footer-col">
            <h4>Governance &amp; Statutory</h4>
            <ul>
              <li><Link to="/about#society" style={{ color: '#fbbf24', fontWeight: 600 }}>Managing Society &amp; Trust</Link></li>
              <li><Link to="/naac">NAAC Accreditation Hub</Link></li>
              <li><Link to="/naac">Institutional SSR (7 Criteria)</Link></li>
              <li><Link to="/iqac">IQAC Cell & Annual Reports (AQAR)</Link></li>
              <li><Link to="/iqac">Action Taken Reports (ATR)</Link></li>
              <li><Link to="/about">Right to Information (RTI)</Link></li>
              <li><Link to="/about">Anti-Ragging Committee & Squad</Link></li>
              <li><Link to="/about">Internal Complaints Committee (ICC)</Link></li>
            </ul>
          </div>

          {/* Col 4: Affiliation & Regulatory Portals */}
          <div className="footer-col">
            <h4>Official Portals</h4>
            <ul>
              <li>
                <a href="https://erp.ggtuexam.com/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 600 }}>
                  GGTU NEP ERP Portal <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.ggtu.ac.in/Syllabus.php" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  GGTU Syllabus Portal <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://ggtu.ac.in" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  GGTU University Official <ExternalLink size={12} />
                </a>
              </li>

              <li>
                <a href="https://sso.rajasthan.gov.in" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Rajasthan SSO Portal <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://hte.rajasthan.gov.in" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  HTE Rajasthan <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://naac.gov.in" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  NAAC Bengaluru <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {settings.college_name}, Dungarpur. Run by Shree Narayan Shiksha Seva Samiti Peeth.
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>Affiliated to GGTU Banswara</span>
            <span>AISHE: {settings.aishe_code}</span>
            <span>Accreditation: {settings.naac_grade ? settings.naac_grade.split('/')[0].trim() : 'NAAC B+'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
