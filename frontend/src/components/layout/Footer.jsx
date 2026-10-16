import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck, Award, School } from 'lucide-react';
import { getSettings } from '../../api/wordpress';

export default function Footer() {
  const [settings, setSettings] = useState({
    college_name: 'Gurukripa Peeth College',
    college_subtitle: 'Post Graduate & Teacher Training College',
    tagline: 'Nurturing Intellect, Cultivating Character, Empowering Society',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    ncte_code: 'WRC/APW05814/323363',
    aishe_code: 'C-48902',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
    phone_primary: '+91 2964 234567',
    email_info: 'info@gurukripapeeth.in',
    address: 'Gurukripa Peeth College, Pratapgarh Road, Dungarpur, Rajasthan - 314001, India',
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
            <h4>{settings.college_name}</h4>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#94a3b8', marginBottom: '16px' }}>
              {settings.tagline}. A premier higher education institution in Southern Rajasthan dedicated to intellectual empowerment, scientific inquiry, and ethical teacher preparation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '3px' }} />
                <span>{settings.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>{settings.phone_primary}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>{settings.email_info}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Disciplines */}
          <div className="footer-col">
            <h4>Academic Programs</h4>
            <ul>
              <li><Link to="/academics">Bachelor of Arts (B.A.)</Link></li>
              <li><Link to="/academics">Bachelor of Science (B.Sc.)</Link></li>
              <li><Link to="/academics">Bachelor of Education (B.Ed.)</Link></li>
              <li><Link to="/academics">Integrated B.A.-B.Ed. (4-Year)</Link></li>
              <li><Link to="/academics">Diploma in Elementary Ed (D.El.Ed.)</Link></li>
              <li><Link to="/admissions">Admissions Guidelines 2026-27</Link></li>
              <li><Link to="/faculty">Faculty & Department Chairs</Link></li>
            </ul>
          </div>

          {/* Col 3: Statutory Disclosures & Quality Assurance */}
          <div className="footer-col">
            <h4>Statutory & Quality Hub</h4>
            <ul>
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
                <a href="https://ncte.gov.in" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  NCTE Official Portal <ExternalLink size={12} />
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
            © {new Date().getFullYear()} {settings.college_name}, Dungarpur. Affiliated to {settings.affiliating_univ || 'Govind Guru Tribal University (GGTU), Banswara'} & Approved by NCTE (WRC Bhopal).
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>NCTE: {settings.ncte_code}</span>
            <span>AISHE: {settings.aishe_code}</span>
            <span>Accreditation: {settings.naac_grade ? settings.naac_grade.split('/')[0].trim() : 'NAAC B+'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
