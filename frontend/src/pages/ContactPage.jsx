import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { getSettings } from '../api/wordpress';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [settings, setSettings] = useState({
    college_name: 'Gurukripa Peeth College',
    phone_primary: '+91 2964 234567',
    phone_secondary: '+91 94140 12345',
    email_info: 'info@gurukripapeeth.in',
    email_principal: 'principal@gurukripapeeth.in',
    address: 'Gurukripa Peeth College, Pratapgarh Road, Dungarpur, Rajasthan - 314001, India',
  });

  useEffect(() => {
    let isMounted = true;
    const load = () => {
      getSettings().then(s => {
        if (isMounted && s) setSettings(s);
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

  return (
    <div className="contact-page">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Institutional Communication</span>
          <h1 className="page-hero-title">Contact Us & Campus Location</h1>
          <p className="page-hero-desc">
            Get in touch with the administrative office, admission cell, or IQAC directorate.
          </p>
        </div>
      </div>

      <div className="section section-white">
        <div className="container">
          <div className="grid-2" style={{ gap: '48px' }}>
            {/* Contact Details */}
            <div>
              <span className="section-tag">Campus Address</span>
              <h2 className="section-title">Visit {settings.college_name}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#fffbeb', color: '#b8860b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>Campus Location</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                      {settings.address}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>Phone & Helpline</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Primary: <a href={`tel:${settings.phone_primary}`} style={{ color: '#2563eb' }}>{settings.phone_primary}</a></p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Admission Cell: <a href={`tel:${settings.phone_secondary}`} style={{ color: '#2563eb' }}>{settings.phone_secondary}</a></p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>Official Email</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}><a href={`mailto:${settings.email_info}`} style={{ color: '#2563eb' }}>{settings.email_info}</a></p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}><a href={`mailto:${settings.email_principal}`} style={{ color: '#2563eb' }}>{settings.email_principal}</a></p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>Office Hours</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Monday – Saturday: 10:00 AM to 05:00 PM</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Sunday & Gazetted Holidays: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <span className="section-tag">Direct Inquiry</span>
              <h3 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '18px' }}>Send Us a Message</h3>

              {sent ? (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                  <CheckCircle2 size={40} style={{ color: '#059669', margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: '#065f46', fontSize: '18px' }}>Message Sent Successfully!</h4>
                  <p style={{ color: '#047857', fontSize: '14px', marginTop: '6px' }}>
                    Thank you for reaching out. The college administrative office will respond to your query shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Your Name *</label>
                    <input type="text" required placeholder="Enter full name" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Email Address *</label>
                    <input type="email" required placeholder="your.name@example.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Phone Number</label>
                    <input type="tel" placeholder="Mobile number" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Your Message / Query *</label>
                    <textarea required rows={4} placeholder="Type your query regarding admissions, syllabus, or statutory disclosures..." style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>

                  <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '12px' }}>
                    <Send size={15} /> Submit Inquiry
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
