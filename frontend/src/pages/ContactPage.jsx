import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { getSettings, submitInquiry } from '../api/wordpress';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setSubmitError('Please provide your name and message.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await submitInquiry({
        type: 'General',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'N/A',
        subject: formData.subject.trim() || 'General Institutional Communication',
        message: formData.message.trim(),
      });

      if (res && res.success) {
        setSubmissionResult(res);
        setSent(true);
      } else {
        setSubmitError(res?.message || 'Could not send message. Please try again.');
      }
    } catch (err) {
      setSubmitError('Unable to transmit inquiry. Please call the administrative helpline directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setSubmissionResult(null);
    setSubmitError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

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
          <div className="grid-2" style={{ gap: '48px', alignItems: 'flex-start' }}>
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
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)' }}>
              <span className="section-tag">Direct Inquiry</span>
              <h3 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '8px' }}>Send Us a Message</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
                Submit your query regarding admissions, institutional disclosures, or student support.
              </p>

              {sent && submissionResult ? (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 style={{ color: '#065f46', fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Message Dispatched!</h4>
                  <p style={{ color: '#047857', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                    Thank you for reaching out. The college administrative office has received your message.
                  </p>

                  <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '14px', margin: '0 0 20px 0', textAlign: 'left' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 600 }}>Inquiry Reference Number</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em', marginTop: '4px' }}>
                      {submissionResult.reference_number || 'GPC-GEN-2026-REG'}
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={resetForm} 
                    className="btn btn-outline" 
                    style={{ fontSize: '13px', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <RefreshCw size={14} /> Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {submitError && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '8px', color: '#b91c1c', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} /> {submitError}
                    </div>
                  )}

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Your Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name" 
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com" 
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number" 
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Subject / Department</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Admission Query, TC/Character Certificate, Fee Receipt" 
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Your Message / Query *</label>
                    <textarea 
                      name="message"
                      required 
                      rows={4} 
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your query regarding admissions, syllabus, or statutory disclosures..." 
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="btn btn-gold" 
                    style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {submitting ? (
                      <>
                        <RefreshCw size={16} className="spin" /> Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Submit Inquiry
                      </>
                    )}
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
