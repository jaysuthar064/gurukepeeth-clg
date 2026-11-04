import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  FileText,
  User,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Printer,
  ShieldCheck,
  Search,
  Lock,
  Phone,
  Calendar,
  RefreshCw,
  Check,
  UploadCloud,
  Trash2,
  Eye,
  Image as ImageIcon,
  FileCheck,
  X,
  AlertTriangle
} from 'lucide-react';
import {
  getSettings,
  submitAdmissionApplication,
  createAdmissionOrder,
  verifyAdmissionPayment,
  getAdmissionStatus
} from '../api/wordpress';

export default function AdmissionPortalPage({ defaultTab = 'apply' }) {
  const [activeTab, setActiveTab] = useState(defaultTab); // 'apply' | 'status'
  const [step, setStep] = useState(1); // 1: Personal, 2: Academic, 3: Documents, 4: Review & Pay, 5: Confirmation
  const [loading, setLoading] = useState(false);

  // Non-alert Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
  const toastTimeoutRef = useRef(null);

  const showToast = (message, type = 'error') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: '', type: 'error' });
    }, 4000);
  };

  // Field-Level Validation Errors State (No alert!)
  const [fieldErrors, setFieldErrors] = useState({});

  // Institutional Settings & Fees
  const [settings, setSettings] = useState({
    college_name: 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH',
    college_hindi: 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    phone_primary: '+91 95874 33001',
    phone_admission: '+91 82092 77580',
    email_info: 'gurukripa.peeth@gmail.com',
    address: 'Peeth, Tehsil Simalwara, Dungarpur, Rajasthan - 314406',
    admission_fee_ba: '3500',
    admission_fee_bsc: '4500',
    razorpay_key_id: 'rzp_test_5173GURUKRIPA',
  });

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    name: '',
    father_name: '',
    mother_name: '',
    dob: '',
    gender: 'Male',
    category: 'General',
    aadhar: '',
    phone: '',
    email: '',
    address: '',
    district: 'Dungarpur',
    state: 'Rajasthan',
    pincode: '314406',

    // Step 2: Academic
    program: 'B.A.',
    subjects: ['Hindi Literature', 'Political Science', 'History'],
    prev_board: 'RBSE',
    prev_school: '',
    prev_roll_no: '',
    prev_passing_year: '2026',
    prev_marks_obtained: '',
    prev_total_marks: '500',
    prev_percentage: '',

    // Step 3: Real Document Uploads (Files stored as base64 + metadata)
    documents: {
      photo: null,          // { name, size_formatted, type, data, previewUrl }
      signature: null,
      marksheet_10th: null,
      marksheet_12th: null,
      aadhar: null,
      caste_cert: null,
      tc_migration: null,
    },
    declaration_checked: true,
  });

  // Submission & Payment Result State
  const [applicationResult, setApplicationResult] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState(null);

  // Status Tracker State
  const [trackerRef, setTrackerRef] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackedApp, setTrackedApp] = useState(null);
  const [trackerError, setTrackerError] = useState('');

  useEffect(() => {
    getSettings().then(s => {
      if (s) {
        setSettings(prev => ({
          ...prev,
          ...s,
          admission_fee_ba: s.admission_fee_ba || '3500',
          admission_fee_bsc: s.admission_fee_bsc || '4500',
          razorpay_key_id: s.razorpay_key_id || 'rzp_test_5173GURUKRIPA',
        }));
      }
    });
  }, []);

  // Update percentage automatically when marks change
  useEffect(() => {
    const obt = parseFloat(formData.prev_marks_obtained);
    const tot = parseFloat(formData.prev_total_marks);
    if (!isNaN(obt) && !isNaN(tot) && tot > 0) {
      const pct = ((obt / tot) * 100).toFixed(2);
      setFormData(prev => ({ ...prev, prev_percentage: pct }));
      if (fieldErrors.prev_marks_obtained) {
        setFieldErrors(prev => ({ ...prev, prev_marks_obtained: '' }));
      }
    }
  }, [formData.prev_marks_obtained, formData.prev_total_marks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field-level error as user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubjectToggle = (subj) => {
    setFormData(prev => {
      const current = prev.subjects || [];
      if (current.includes(subj)) {
        return { ...prev, subjects: current.filter(s => s !== subj) };
      } else {
        if (current.length >= 3) {
          showToast('You can select a maximum of 3 elective subjects for Bachelor of Arts.', 'warning');
          return prev;
        }
        return { ...prev, subjects: [...current, subj] };
      }
    });
    if (fieldErrors.subjects) {
      setFieldErrors(prev => ({ ...prev, subjects: '' }));
    }
  };

  // Helper to format bytes
  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    if (bytes < k) return bytes + ' B';
    if (bytes < k * k) return (bytes / k).toFixed(1) + ' KB';
    return (bytes / (k * k)).toFixed(1) + ' MB';
  };

  // Convert File to Base64
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Handle Document Upload
  const handleFileUpload = async (docKey, file, maxMb = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']) => {
    if (!file) return;

    // 1. Validate File Size
    const maxBytes = maxMb * 1024 * 1024;
    if (file.size > maxBytes) {
      setFieldErrors(prev => ({ ...prev, [docKey]: `File exceeds maximum limit of ${maxMb} MB. Please upload a smaller file.` }));
      showToast(`Selected file is too large (${formatBytes(file.size)}). Maximum allowed size is ${maxMb} MB.`, 'error');
      return;
    }

    // 2. Validate File Type
    const isAllowed = allowedTypes.some(t => file.type === t || file.name.toLowerCase().endsWith(t.replace('application/', '.').replace('image/', '.')));
    if (!isAllowed) {
      const friendlyTypes = allowedTypes.map(t => t.split('/')[1]?.toUpperCase()).join(', ');
      setFieldErrors(prev => ({ ...prev, [docKey]: `Invalid file format. Allowed formats: ${friendlyTypes}` }));
      showToast(`Invalid file type. Please upload a ${friendlyTypes} document.`, 'error');
      return;
    }

    try {
      const base64 = await readFileAsBase64(file);
      const isImg = file.type.startsWith('image/');

      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [docKey]: {
            name: file.name,
            size_formatted: formatBytes(file.size),
            type: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'),
            data: base64,
            previewUrl: isImg ? base64 : null,
          },
        },
      }));

      // Clear error for this document
      setFieldErrors(prev => ({ ...prev, [docKey]: '' }));
      showToast(`${file.name} uploaded successfully!`, 'success');
    } catch (err) {
      setFieldErrors(prev => ({ ...prev, [docKey]: 'Failed to read file. Please try another file.' }));
      showToast('Could not process selected file. Please try again.', 'error');
    }
  };

  // Remove uploaded document
  const handleRemoveFile = (docKey) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docKey]: null,
      },
    }));
    setFieldErrors(prev => ({ ...prev, [docKey]: '' }));
  };

  // Fee calculation helper
  const getFeeAmount = () => {
    const isBsc = formData.program.includes('B.Sc');
    return isBsc ? parseFloat(settings.admission_fee_bsc || 4500) : parseFloat(settings.admission_fee_ba || 3500);
  };

  // Step 1 Validation (Field-by-field, no alert)
  const validateStep1 = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Candidate Full Name is required as per 10th certificate.';
    if (!formData.father_name.trim()) errors.father_name = "Father's Name is required.";
    if (!formData.mother_name.trim()) errors.mother_name = "Mother's Name is required.";
    if (!formData.dob) errors.dob = 'Date of Birth is required.';

    const phoneClean = formData.phone.trim();
    if (!phoneClean) {
      errors.phone = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(phoneClean)) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    const aadharClean = formData.aadhar.trim();
    if (!aadharClean) {
      errors.aadhar = 'Aadhaar card number is required.';
    } else if (!/^\d{12}$/.test(aadharClean)) {
      errors.aadhar = 'Aadhaar number must contain exactly 12 digits.';
    }

    if (!formData.address.trim()) errors.address = 'Residential permanent address is required.';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      errors.pincode = 'Please enter a valid 6-digit PIN code.';
    }

    return errors;
  };

  // Step 2 Validation (Field-by-field, no alert)
  const validateStep2 = () => {
    const errors = {};
    if (!formData.prev_school.trim()) errors.prev_school = 'School / Junior college name is required.';
    if (!formData.prev_roll_no.trim()) errors.prev_roll_no = '12th Roll Number is required.';

    const obt = parseFloat(formData.prev_marks_obtained);
    const tot = parseFloat(formData.prev_total_marks);
    if (isNaN(obt) || obt <= 0) {
      errors.prev_marks_obtained = 'Enter valid marks obtained in 12th.';
    } else if (obt > tot) {
      errors.prev_marks_obtained = 'Marks obtained cannot exceed total marks.';
    }

    if (formData.program === 'B.A.' && formData.subjects.length !== 3) {
      errors.subjects = 'Please choose exactly 3 elective subjects for B.A.';
    }

    return errors;
  };

  // Step 3 Validation (Document uploads checking)
  const validateStep3 = () => {
    const errors = {};
    if (!formData.documents.photo) {
      errors.photo = 'Candidate Passport Photograph is mandatory. Please upload.';
    }
    if (!formData.documents.signature) {
      errors.signature = 'Candidate Signature scan is mandatory. Please upload.';
    }
    if (!formData.documents.marksheet_10th) {
      errors.marksheet_10th = 'Class 10th Marksheet is mandatory. Please upload PDF or image.';
    }
    if (!formData.documents.marksheet_12th) {
      errors.marksheet_12th = 'Class 12th Marksheet is mandatory. Please upload PDF or image.';
    }
    if (!formData.documents.aadhar) {
      errors.aadhar_doc = 'Aadhaar Card copy is mandatory. Please upload.';
    }
    if (formData.category !== 'General' && !formData.documents.caste_cert) {
      errors.caste_cert = `Caste certificate is required for ${formData.category} category.`;
    }
    if (!formData.declaration_checked) {
      errors.declaration = 'You must confirm the truthfulness of documents by checking the declaration.';
    }

    return errors;
  };

  const handleNextStep = () => {
    setFieldErrors({});

    if (step === 1) {
      const errors = validateStep1();
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        showToast('Please correct the highlighted fields in personal details.', 'error');
        // Scroll to first error
        const firstErr = Object.keys(errors)[0];
        const el = document.getElementById(`field-${firstErr}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const errors = validateStep2();
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        showToast('Please complete the highlighted academic information.', 'error');
        const firstErr = Object.keys(errors)[0];
        const el = document.getElementById(`field-${firstErr}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      const errors = validateStep3();
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        showToast('Please upload all mandatory documents before proceeding.', 'error');
        const firstErr = Object.keys(errors)[0];
        const el = document.getElementById(`doc-card-${firstErr}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      setStep(4);
    }
    window.scrollTo({ top: 260, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setFieldErrors({});
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 260, behavior: 'smooth' });
    }
  };

  // Step 4: Submit Application and Initiate Payment
  const handleInitiatePayment = async () => {
    setLoading(true);

    try {
      // 1. Submit application form + uploaded documents to WordPress backend
      const appRes = await submitAdmissionApplication({
        ...formData,
        program: formData.program === 'B.A.' ? 'Bachelor of Arts (B.A.)' : 'Bachelor of Science (B.Sc. Bio / CBZ)',
        subjects: formData.program === 'B.A.' ? formData.subjects : ['Chemistry', 'Botany', 'Zoology'],
      });

      if (!appRes || !appRes.success) {
        throw new Error(appRes?.message || 'Could not save admission form. Please retry.');
      }

      setApplicationResult(appRes.application);
      const appId = appRes.application.ref || appRes.application_id;

      // 2. Create Razorpay Payment Order on Backend
      const orderRes = await createAdmissionOrder(appId);
      if (!orderRes || !orderRes.success) {
        throw new Error(orderRes?.message || 'Could not initialize payment order.');
      }

      setPendingOrderData(orderRes);

      const isMock = orderRes.is_mock;
      const keyId = orderRes.key_id;

      if (isMock || !window.Razorpay) {
        // Open interactive Sandbox modal so user can test seamlessly with zero friction
        setShowSandboxModal(true);
        setLoading(false);
        return;
      }

      // 3. Launch Real Razorpay Checkout Popup
      const options = {
        key: keyId,
        amount: orderRes.amount_paise,
        currency: orderRes.currency || 'INR',
        name: settings.college_name,
        description: `Admission Fee 2026-27 (${orderRes.program})`,
        image: '/images/college-logo.png',
        order_id: orderRes.order_id,
        handler: async function (response) {
          try {
            setLoading(true);
            const verifyRes = await verifyAdmissionPayment({
              application_id: appId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes && verifyRes.success) {
              setPaymentResult(verifyRes);
              setStep(5); // Confirmation screen
              showToast('Payment verified successfully! Welcome to Gurukripa Peeth.', 'success');
            } else {
              showToast('Payment verification failed. Please contact admission office with your transaction ID.', 'error');
            }
          } catch (vErr) {
            showToast('Server verification returned an error. Your payment is safe; please contact helpdesk.', 'error');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email || 'student@admission.ac.in',
          contact: formData.phone,
        },
        theme: {
          color: '#0f2b48',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        showToast(`Payment Failed: ${response.error.description || 'Transaction declined'}`, 'error');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Error occurred while contacting admission portal.', 'error');
      setLoading(false);
    }
  };

  // Complete Sandbox / Test Mode Payment simulation
  const handleCompleteSandboxPayment = async () => {
    if (!pendingOrderData) return;
    setLoading(true);
    setShowSandboxModal(false);

    try {
      const mockPaymentId = 'pay_mock_' + Math.random().toString(36).substring(2, 12).toUpperCase();
      const verifyRes = await verifyAdmissionPayment({
        application_id: pendingOrderData.application_ref || pendingOrderData.application_id,
        razorpay_payment_id: mockPaymentId,
        razorpay_order_id: pendingOrderData.order_id,
        razorpay_signature: 'mock_signature',
      });

      if (verifyRes && verifyRes.success) {
        setPaymentResult(verifyRes);
        setStep(5); // Confirmation screen
        showToast('Test payment verified! Application confirmed.', 'success');
      } else {
        showToast('Could not verify simulated test payment.', 'error');
      }
    } catch (err) {
      showToast('Error completing test payment verification.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Status Tracker Lookup
  const handleTrackApplication = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!trackerRef.trim()) {
      setTrackerError('Please enter your Application Reference Number.');
      return;
    }

    setTrackingLoading(true);
    setTrackerError('');
    setTrackedApp(null);

    try {
      const res = await getAdmissionStatus(trackerRef.trim());
      if (res && res.success && res.application) {
        setTrackedApp(res.application);
      } else {
        setTrackerError(res?.message || 'No admission record found with this reference number.');
      }
    } catch (err) {
      setTrackerError('Unable to connect to admissions database. Please try again.');
    } finally {
      setTrackingLoading(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const currentFee = getFeeAmount();

  // Reusable File Upload Dropzone Component
  const renderDocumentDropzone = ({
    docKey,
    title,
    subtitle,
    required = false,
    maxMb = 5,
    isImageOnly = false,
  }) => {
    const doc = formData.documents[docKey];
    const hasError = !!fieldErrors[docKey];
    const allowedMime = isImageOnly
      ? ['image/jpeg', 'image/png', 'image/webp']
      : ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

    return (
      <div
        id={`doc-card-${docKey}`}
        style={{
          border: hasError ? '2px solid #ef4444' : doc ? '2px solid #10b981' : '1px solid #cbd5e1',
          background: hasError ? '#fff5f5' : doc ? '#f0fdf4' : '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ fontSize: '15px', color: '#0f172a' }}>{title}</strong>
              {required ? (
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', background: '#fef2f2', padding: '2px 8px', borderRadius: '4px' }}>
                  Required *
                </span>
              ) : (
                <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                  Optional
                </span>
              )}
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
              {subtitle} • Max: {maxMb} MB ({isImageOnly ? 'JPG, PNG' : 'PDF, JPG, PNG'})
            </p>
          </div>

          {doc && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#059669', background: '#dcfce7', padding: '4px 10px', borderRadius: '20px' }}>
              <Check size={14} /> Ready
            </span>
          )}
        </div>

        {/* Upload Zone or Uploaded File Details */}
        {!doc ? (
          <div>
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: hasError ? '2px dashed #f87171' : '2px dashed #94a3b8',
                borderRadius: '8px',
                padding: '24px 16px',
                cursor: 'pointer',
                background: hasError ? '#fff' : '#f8fafc',
                transition: 'all 0.2s ease',
              }}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(docKey, e.dataTransfer.files[0], maxMb, allowedMime);
                }
              }}
            >
              <UploadCloud size={32} style={{ color: hasError ? '#ef4444' : '#64748b', marginBottom: '8px' }} />
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f2b48' }}>
                Click to browse or drag &amp; drop file here
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                {isImageOnly ? 'Clear color photo or scanned signature' : 'Clear document scan in PDF or High-Resolution image'}
              </div>
              <input
                type="file"
                accept={allowedMime.join(', ')}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(docKey, e.target.files[0], maxMb, allowedMime);
                  }
                }}
                style={{ display: 'none' }}
              />
            </label>
            {hasError && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={14} /> {fieldErrors[docKey]}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {doc.previewUrl ? (
                <img
                  src={doc.previewUrl}
                  alt={doc.name}
                  style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                />
              ) : (
                <div style={{ width: '44px', height: '44px', borderRadius: '6px', background: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={24} />
                </div>
              )}
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#0f172a', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {doc.name}
                </strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {doc.size_formatted} • {doc.type.toUpperCase().replace('APPLICATION/', '')}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleRemoveFile(docKey)}
                title="Remove file and select another"
                style={{
                  background: 'transparent',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  color: '#dc2626',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Trash2 size={13} /> Change
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="admission-portal-page">
      {/* Floating Animated Toast Banner (Zero alert() calls) */}
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: toast.type === 'success' ? '#065f46' : toast.type === 'warning' ? '#92400e' : '#991b1b',
            color: '#ffffff',
            padding: '14px 20px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontSize: '14px',
            fontWeight: 600,
            animation: 'slideInRight 0.3s ease-out',
            maxWidth: '450px',
          }}
        >
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : toast.type === 'warning' ? <AlertTriangle size={20} /> : <AlertCircle size={20} />}
          <div style={{ flex: 1 }}>{toast.message}</div>
          <button
            type="button"
            onClick={() => setToast({ show: false, message: '', type: 'error' })}
            style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 0 }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 1. Official Institutional Hero Header */}
      <div className="page-hero-banner" style={{ background: 'linear-gradient(135deg, #091a2c 0%, #0f2b48 60%, #1e3a8a 100%)', paddingBottom: '32px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="page-hero-tag" style={{ background: '#b45309', color: '#fff' }}>Official Enrolment 2026-27</span>
            <span style={{ fontSize: '12px', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} /> GGTU Affiliated &amp; Rajasthan Govt Approved
            </span>
          </div>

          <h1 className="page-hero-title" style={{ fontSize: '32px', marginBottom: '8px' }}>
            Online Admission &amp; Fee Payment Portal
          </h1>
          <p className="page-hero-desc" style={{ maxWidth: '800px', fontSize: '15px', color: '#cbd5e1' }}>
            Gurukripa Shikshan Sansthan College Peeth — Direct admission registration for Bachelor of Arts (B.A.) and Bachelor of Science (B.Sc. Bio). Complete your multi-step application, upload mandatory marksheets, and submit fees securely through Razorpay.
          </p>

          {/* Portal Sub-tabs: Apply vs Status */}
          <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.1)', padding: '4px', borderRadius: '8px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('apply'); setFieldErrors({}); }}
              style={{
                background: activeTab === 'apply' ? '#ffffff' : 'transparent',
                color: activeTab === 'apply' ? '#0f2b48' : '#ffffff',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <FileText size={15} /> New Admission Application
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('status'); setFieldErrors({}); }}
              style={{
                background: activeTab === 'status' ? '#ffffff' : 'transparent',
                color: activeTab === 'status' ? '#0f2b48' : '#ffffff',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <Search size={15} /> Track Application &amp; Receipt
            </button>
          </div>
        </div>
      </div>

      <div className="section section-white" style={{ paddingTop: '36px', paddingBottom: '70px', background: '#f8fafc' }}>
        <div className="container">

          {/* ============================================================== */}
          {/* TAB 1: NEW ADMISSION APPLICATION FORM WIZARD                    */}
          {/* ============================================================== */}
          {activeTab === 'apply' && (
            <div style={{ maxWidth: '880px', margin: '0 auto' }}>

              {/* Step Tracker Indicator */}
              {step <= 4 && (
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 24px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', position: 'relative' }}>
                    {[
                      { num: 1, title: 'Personal Details', icon: User },
                      { num: 2, title: 'Academic & Program', icon: BookOpen },
                      { num: 3, title: 'Document Uploads', icon: UploadCloud },
                      { num: 4, title: 'Fee & Payment', icon: CreditCard },
                    ].map(st => {
                      const Icon = st.icon;
                      const isDone = step > st.num;
                      const isCurrent = step === st.num;
                      return (
                        <div key={st.num} style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              margin: '0 auto 8px auto',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '14px',
                              background: isDone ? '#059669' : isCurrent ? '#0f2b48' : '#e2e8f0',
                              color: isDone || isCurrent ? '#ffffff' : '#64748b',
                              boxShadow: isCurrent ? '0 0 0 4px rgba(15, 43, 72, 0.15)' : 'none',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {isDone ? <Check size={18} /> : st.num}
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#0f2b48' : '#64748b' }}>
                            {st.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'var(--font-display, Cinzel, serif)' }}>
                      Step 1: Student Personal Details
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                      Enter personal details exactly as printed in your Class 10th (Secondary) Certificate.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div id="field-name" style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.name ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        Candidate Full Name (छात्र का पूरा नाम) *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Kumar Verma"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.name ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                          outline: 'none',
                        }}
                      />
                      {fieldErrors.name && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>

                    <div id="field-father_name">
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.father_name ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        Father's Name (पिता का नाम) *
                      </label>
                      <input
                        type="text"
                        name="father_name"
                        value={formData.father_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Suresh Verma"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.father_name ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.father_name && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.father_name}
                        </span>
                      )}
                    </div>

                    <div id="field-mother_name">
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.mother_name ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        Mother's Name (माता का नाम) *
                      </label>
                      <input
                        type="text"
                        name="mother_name"
                        value={formData.mother_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Santosh Devi"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.mother_name ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.mother_name && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.mother_name}
                        </span>
                      )}
                    </div>

                    <div id="field-dob">
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.dob ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        Date of Birth (जन्म तिथि) *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.dob ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.dob && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.dob}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Gender (लिंग) *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      >
                        <option value="Male">Male (पुरुष)</option>
                        <option value="Female">Female (महिला)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Social Category (श्रेणी) *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      >
                        <option value="General">General / Unreserved</option>
                        <option value="ST">ST (Scheduled Tribe - TSP Area)</option>
                        <option value="SC">SC (Scheduled Caste)</option>
                        <option value="OBC">OBC (Other Backward Classes)</option>
                        <option value="MBC">MBC (Most Backward Classes)</option>
                        <option value="EWS">EWS (Economically Weaker Section)</option>
                      </select>
                    </div>

                    <div id="field-aadhar">
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.aadhar ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        12-Digit Aadhaar Number (आधार कार्ड संख्या) *
                      </label>
                      <input
                        type="text"
                        name="aadhar"
                        maxLength={12}
                        value={formData.aadhar}
                        onChange={handleInputChange}
                        placeholder="12 digits without spaces"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.aadhar ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.aadhar && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.aadhar}
                        </span>
                      )}
                    </div>

                    <div id="field-phone">
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.phone ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        Candidate Mobile Number (मोबाइल नंबर) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit calling & WhatsApp number"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.phone ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.phone && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Email Address (ईमेल पता)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. candidate@gmail.com"
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>

                    <div id="field-address" style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.address ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        Permanent Residential Address (स्थाई पता) *
                      </label>
                      <textarea
                        name="address"
                        rows={2}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Village / Ward / Tehsil / Post Office"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.address ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.address && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.address}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Home District (जिला) *
                      </label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      >
                        <option value="Dungarpur">Dungarpur (डूंगरपुर)</option>
                        <option value="Banswara">Banswara (बांसवाड़ा)</option>
                        <option value="Udaipur">Udaipur (उदयपुर)</option>
                        <option value="Pratapgarh">Pratapgarh (प्रतापगढ़)</option>
                        <option value="Salumbar">Salumbar (सलूंबर)</option>
                        <option value="Other">Other Rajasthan District</option>
                      </select>
                    </div>

                    <div id="field-pincode">
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.pincode ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        PIN Code (पिन कोड) *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="e.g. 314406"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.pincode ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.pincode && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.pincode}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-gold"
                      style={{ padding: '12px 28px', fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      Continue to Academic Records <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Details */}
              {step === 2 && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'var(--font-display, Cinzel, serif)' }}>
                      Step 2: Program Choice &amp; Qualifying Marks
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                      Select degree course and enter your Senior Secondary (10+2) board exam scores.
                    </p>
                  </div>

                  {/* Program Selection Cards */}
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>
                    Select Degree Program (पाठ्यक्रम चुनें) *
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                    {/* B.A. Card */}
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, program: 'B.A.' }))}
                      style={{
                        border: formData.program === 'B.A.' ? '2px solid #b45309' : '1px solid #e2e8f0',
                        background: formData.program === 'B.A.' ? '#fffbeb' : '#ffffff',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: 800, background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px' }}>
                            Faculty of Arts
                          </span>
                          <h3 style={{ margin: '8px 0 2px 0', fontSize: '18px', color: '#0f172a' }}>
                            Bachelor of Arts (B.A.)
                          </h3>
                        </div>
                        <input
                          type="radio"
                          name="program_radio"
                          checked={formData.program === 'B.A.'}
                          onChange={() => {}}
                          style={{ accentColor: '#b45309', transform: 'scale(1.2)' }}
                        />
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px 0' }}>
                        3-Year Undergraduate Degree affiliated with GGTU Banswara.
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px' }}>
                        <span style={{ color: '#475569' }}>Sanctioned Seats: <strong>160</strong></span>
                        <span style={{ color: '#b45309', fontWeight: 700 }}>Fee: ₹{settings.admission_fee_ba}</span>
                      </div>
                    </div>

                    {/* B.Sc. Bio Card */}
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, program: 'B.Sc. Bio' }))}
                      style={{
                        border: formData.program.includes('B.Sc') ? '2px solid #b45309' : '1px solid #e2e8f0',
                        background: formData.program.includes('B.Sc') ? '#fffbeb' : '#ffffff',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: 800, background: '#ecfdf5', color: '#065f46', padding: '2px 8px', borderRadius: '4px' }}>
                            Faculty of Science
                          </span>
                          <h3 style={{ margin: '8px 0 2px 0', fontSize: '18px', color: '#0f172a' }}>
                            B.Sc. (Biology / CBZ)
                          </h3>
                        </div>
                        <input
                          type="radio"
                          name="program_radio"
                          checked={formData.program.includes('B.Sc')}
                          onChange={() => {}}
                          style={{ accentColor: '#b45309', transform: 'scale(1.2)' }}
                        />
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px 0' }}>
                        Chemistry, Botany, Zoology with fully equipped laboratories.
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px' }}>
                        <span style={{ color: '#475569' }}>Sanctioned Seats: <strong>140</strong></span>
                        <span style={{ color: '#b45309', fontWeight: 700 }}>Fee: ₹{settings.admission_fee_bsc}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subject Combination Selection */}
                  {formData.program === 'B.A.' ? (
                    <div id="field-subjects" style={{ background: '#f8fafc', padding: '18px', borderRadius: '10px', border: fieldErrors.subjects ? '1.5px solid #ef4444' : '1px solid #e2e8f0', marginBottom: '28px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <strong style={{ fontSize: '13px', color: '#0f172a' }}>Select 3 Elective Subjects (ऐच्छिक विषय): *</strong>
                        <span style={{ fontSize: '12px', color: formData.subjects.length === 3 ? '#059669' : '#b45309', fontWeight: 600 }}>
                          Selected: {formData.subjects.length} / 3
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        {[
                          'Hindi Literature',
                          'Political Science',
                          'History',
                          'Economics',
                          'Geography',
                          'Sanskrit Literature'
                        ].map(subj => {
                          const checked = formData.subjects.includes(subj);
                          return (
                            <label
                              key={subj}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                background: checked ? '#eff6ff' : '#ffffff',
                                border: checked ? '1px solid #3b82f6' : '1px solid #cbd5e1',
                                fontSize: '13px',
                                cursor: 'pointer',
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleSubjectToggle(subj)}
                              />
                              {subj}
                            </label>
                          );
                        })}
                      </div>
                      {fieldErrors.subjects && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '8px' }}>
                          {fieldErrors.subjects}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '28px' }}>
                      <strong style={{ fontSize: '13px', color: '#0f172a' }}>Fixed CBZ Subject Combination:</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#059669', fontWeight: 600 }}>
                        ✓ Chemistry (रसायन शास्त्र) • Botany (वनस्पति विज्ञान) • Zoology (प्राणी विज्ञान)
                      </p>
                    </div>
                  )}

                  {/* 10+2 Exam Scores */}
                  <h3 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    Senior Secondary (10+2 / 12वीं) Examination Record
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Board of Examination (शिक्षा बोर्ड) *
                      </label>
                      <select
                        name="prev_board"
                        value={formData.prev_board}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      >
                        <option value="RBSE">Board of Secondary Education Rajasthan (RBSE, Ajmer)</option>
                        <option value="CBSE">Central Board of Secondary Education (CBSE)</option>
                        <option value="RSOS">Rajasthan State Open School (RSOS)</option>
                        <option value="Other">Other State Board</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Passing Year (उत्तीर्ण वर्ष) *
                      </label>
                      <select
                        name="prev_passing_year"
                        value={formData.prev_passing_year}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      >
                        <option value="2026">2026 (Appeared / Passed)</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023 or Earlier</option>
                      </select>
                    </div>

                    <div id="field-prev_school" style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.prev_school ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        School / Junior College Name (विद्यालय का नाम) *
                      </label>
                      <input
                        type="text"
                        name="prev_school"
                        value={formData.prev_school}
                        onChange={handleInputChange}
                        placeholder="e.g. Govt. Senior Secondary School, Peeth"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.prev_school ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.prev_school && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.prev_school}
                        </span>
                      )}
                    </div>

                    <div id="field-prev_roll_no">
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: fieldErrors.prev_roll_no ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                        12th Roll Number (अनुक्रमांक) *
                      </label>
                      <input
                        type="text"
                        name="prev_roll_no"
                        value={formData.prev_roll_no}
                        onChange={handleInputChange}
                        placeholder="e.g. 2489102"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: fieldErrors.prev_roll_no ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                      {fieldErrors.prev_roll_no && (
                        <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                          {fieldErrors.prev_roll_no}
                        </span>
                      )}
                    </div>

                    <div id="field-prev_marks_obtained" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: fieldErrors.prev_marks_obtained ? '#dc2626' : '#334155', marginBottom: '6px' }}>
                          Marks Obtained *
                        </label>
                        <input
                          type="number"
                          name="prev_marks_obtained"
                          value={formData.prev_marks_obtained}
                          onChange={handleInputChange}
                          placeholder="e.g. 385"
                          style={{
                            width: '100%',
                            padding: '10px 10px',
                            borderRadius: '8px',
                            border: fieldErrors.prev_marks_obtained ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                            fontSize: '14px',
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                          Total Marks *
                        </label>
                        <input
                          type="number"
                          name="prev_total_marks"
                          value={formData.prev_total_marks}
                          onChange={handleInputChange}
                          placeholder="500"
                          style={{ width: '100%', padding: '10px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                          Calculated %
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={formData.prev_percentage ? `${formData.prev_percentage}%` : ''}
                          style={{ width: '100%', padding: '10px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#f1f5f9', fontWeight: 700, color: '#059669' }}
                        />
                      </div>
                      {fieldErrors.prev_marks_obtained && (
                        <div style={{ gridColumn: '1 / -1', color: '#dc2626', fontSize: '12px' }}>
                          {fieldErrors.prev_marks_obtained}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn"
                      style={{ background: '#e2e8f0', color: '#334155', padding: '12px 22px', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-gold"
                      style={{ padding: '12px 28px', fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      Upload Documents <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: REAL DOCUMENT UPLOADS */}
              {step === 3 && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'var(--font-display, Cinzel, serif)' }}>
                      Step 3: Document Uploads &amp; Verification
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                      Upload scanned copies or clear photos of required documents. Files are stored securely on the college server.
                    </p>
                  </div>

                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '14px 18px', marginBottom: '24px' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#1e40af', lineHeight: '1.6' }}>
                      <ShieldCheck size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                      <strong>Upload Instructions:</strong> Please ensure documents are legible and un-cropped. Supported formats: <strong>PDF, JPG, PNG</strong>. Max size: 2MB for photo/signature, 5MB for certificates.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
                    {/* 1. Candidate Passport Photo */}
                    {renderDocumentDropzone({
                      docKey: 'photo',
                      title: 'Candidate Passport Size Photograph (पासपोर्ट फोटो)',
                      subtitle: 'Recent color photograph with white or light background',
                      required: true,
                      maxMb: 2,
                      isImageOnly: true,
                    })}

                    {/* 2. Candidate Signature */}
                    {renderDocumentDropzone({
                      docKey: 'signature',
                      title: 'Candidate Scanned Signature (हस्ताक्षर)',
                      subtitle: 'Sign on white paper with black/blue ink and upload clean scan',
                      required: true,
                      maxMb: 1,
                      isImageOnly: true,
                    })}

                    {/* 3. Class 10th Marksheet */}
                    {renderDocumentDropzone({
                      docKey: 'marksheet_10th',
                      title: 'Class 10th (Secondary) Marksheet & Passing Certificate',
                      subtitle: 'Proof of Date of Birth and matriculation scores (RBSE / CBSE / Other)',
                      required: true,
                      maxMb: 5,
                    })}

                    {/* 4. Class 12th Marksheet */}
                    {renderDocumentDropzone({
                      docKey: 'marksheet_12th',
                      title: 'Class 12th (Senior Secondary) Marksheet',
                      subtitle: 'Qualifying senior secondary examination score sheet',
                      required: true,
                      maxMb: 5,
                    })}

                    {/* 5. Aadhaar Card */}
                    {renderDocumentDropzone({
                      docKey: 'aadhar',
                      title: 'Candidate Aadhaar Card (आधार कार्ड)',
                      subtitle: 'Front and back side scan of Government issued Aadhaar card',
                      required: true,
                      maxMb: 5,
                    })}

                    {/* 6. Caste Certificate (if SC/ST/OBC/MBC/EWS) */}
                    {renderDocumentDropzone({
                      docKey: 'caste_cert',
                      title: `Caste / Category Certificate (${formData.category})`,
                      subtitle: 'Issued by competent Tehsildar / SDO authority of Rajasthan',
                      required: formData.category !== 'General',
                      maxMb: 5,
                    })}

                    {/* 7. Transfer Certificate (T.C.) / Migration */}
                    {renderDocumentDropzone({
                      docKey: 'tc_migration',
                      title: 'Transfer Certificate (T.C.) & Character Certificate',
                      subtitle: 'School leaving certificate from last attended institution',
                      required: false,
                      maxMb: 5,
                    })}
                  </div>

                  {/* Declaration Checkbox */}
                  <div id="doc-card-declaration" style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '10px', border: fieldErrors.declaration ? '1.5px solid #ef4444' : '1px solid #e2e8f0' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.declaration_checked}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, declaration_checked: e.target.checked }));
                          if (fieldErrors.declaration) setFieldErrors(prev => ({ ...prev, declaration: '' }));
                        }}
                        style={{ marginTop: '4px', transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
                        I hereby declare that all uploaded certificates and marksheets are genuine copies of the originals. I undertake to produce all original certificates for physical verification at the college campus whenever summoned.
                      </span>
                    </label>
                    {fieldErrors.declaration && (
                      <span style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '6px' }}>
                        {fieldErrors.declaration}
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn"
                      style={{ background: '#e2e8f0', color: '#334155', padding: '12px 22px', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-gold"
                      style={{ padding: '12px 28px', fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      Review &amp; Pay Fees <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Payment */}
              {step === 4 && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'var(--font-display, Cinzel, serif)' }}>
                      Step 4: Application Review &amp; Fee Payment
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                      Review your complete application, uploaded documents, and submit fees securely.
                    </p>
                  </div>

                  {/* Summary Overview with Candidate Photo */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '16px' }}>
                      {formData.documents.photo?.previewUrl ? (
                        <img
                          src={formData.documents.photo.previewUrl}
                          alt="Candidate"
                          style={{ width: '80px', height: '96px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #cbd5e1' }}
                        />
                      ) : (
                        <div style={{ width: '80px', height: '96px', borderRadius: '8px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                          <User size={32} />
                        </div>
                      )}

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a' }}>{formData.name}</h3>
                            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                              S/D of {formData.father_name} &amp; {formData.mother_name}
                            </p>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 700, background: '#eff6ff', color: '#1e40af', padding: '4px 12px', borderRadius: '20px' }}>
                            {formData.category} ({formData.gender})
                          </span>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '13px', color: '#334155' }}>
                          <strong>Program:</strong> {formData.program === 'B.A.' ? 'Bachelor of Arts (B.A.)' : 'B.Sc. Biology (CBZ)'} • <strong>12th Marks:</strong> {formData.prev_percentage}%
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 24px', fontSize: '13px', borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
                      <div><span style={{ color: '#64748b' }}>Contact Mobile:</span> <strong>+91 {formData.phone}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Aadhaar Number:</span> <strong>{formData.aadhar}</strong></div>
                      <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#64748b' }}>Address:</span> <strong>{formData.address}, {formData.district}, PIN {formData.pincode}</strong></div>
                      {formData.program === 'B.A.' && (
                        <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#64748b' }}>Elective Subjects:</span> <strong style={{ color: '#b45309' }}>{formData.subjects.join(', ')}</strong></div>
                      )}
                    </div>
                  </div>

                  {/* Uploaded Documents List */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', color: '#0f172a', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileCheck size={18} style={{ color: '#059669' }} /> Attached Verification Documents:
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {[
                        { key: 'photo', label: 'Passport Photograph' },
                        { key: 'signature', label: 'Candidate Signature' },
                        { key: 'marksheet_10th', label: 'Class 10th Marksheet' },
                        { key: 'marksheet_12th', label: 'Class 12th Marksheet' },
                        { key: 'aadhar', label: 'Aadhaar Card' },
                        { key: 'caste_cert', label: 'Caste Certificate' },
                        { key: 'tc_migration', label: 'T.C. / Migration' },
                      ].map(d => {
                        const fileObj = formData.documents[d.key];
                        if (!fileObj) return null;
                        return (
                          <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', padding: '6px 10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                            <Check size={14} style={{ color: '#059669' }} />
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{d.label}:</span>
                            <span style={{ color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                              {fileObj.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fee Breakdown Table */}
                  <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
                    <div style={{ background: '#0f2b48', color: '#ffffff', padding: '12px 20px', fontWeight: 700, fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Fee Component Description</span>
                      <span>Amount (INR)</span>
                    </div>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
                      <span>Tuition &amp; College Admission Fee (2026-27)</span>
                      <strong>₹ {(currentFee - 500).toLocaleString('en-IN')}.00</strong>
                    </div>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
                      <span>GGTU University Enrolment &amp; Library Development Fee</span>
                      <strong>₹ 500.00</strong>
                    </div>
                    <div style={{ padding: '18px 20px', background: '#fffbeb', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#b45309' }}>
                      <span>Total Admission Fee Payable Now:</span>
                      <span>₹ {currentFee.toLocaleString('en-IN')}.00</span>
                    </div>
                  </div>

                  {/* Trust & Gateway Assurance */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#f8fafc', padding: '14px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '28px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0f2b48', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={20} />
                    </div>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                      <strong style={{ color: '#0f172a' }}>256-Bit Encrypted Razorpay Gateway:</strong> Supports all Indian UPI apps (Google Pay, PhonePe, Paytm, BHIM), RuPay/Visa/MasterCard Debit &amp; Credit Cards, and Net Banking across 50+ banks.
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handlePrevStep}
                      className="btn"
                      style={{ background: '#e2e8f0', color: '#334155', padding: '12px 22px', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleInitiatePayment}
                      className="btn btn-gold"
                      style={{ padding: '14px 34px', fontSize: '15px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                    >
                      {loading ? (
                        <>
                          <RefreshCw size={18} className="spin-animation" /> Connecting to Gateway...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} /> Pay ₹{currentFee.toLocaleString('en-IN')} &amp; Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Official Confirmation & Printable Receipt */}
              {step === 5 && (paymentResult || applicationResult) && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '40px', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)' }}>
                  
                  {/* Success Top Icon */}
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 0 0 8px #f0fdf4' }}>
                      <CheckCircle2 size={40} />
                    </div>
                    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Payment Confirmed • Admission Registered
                    </span>
                    <h2 style={{ fontSize: '24px', color: '#0f172a', margin: '12px 0 6px 0', fontFamily: 'var(--font-display, Cinzel, serif)' }}>
                      Application Submitted Successfully!
                    </h2>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                      Your admission form, uploaded documents, and fee payment have been recorded in the central college registry.
                    </p>
                  </div>

                  {/* Official Printable Receipt Card */}
                  <div
                    id="official-admission-receipt"
                    style={{
                      border: '2px solid #0f2b48',
                      borderRadius: '12px',
                      padding: '28px',
                      background: '#ffffff',
                      marginBottom: '28px',
                      position: 'relative',
                    }}
                  >
                    {/* Header Seal & College Name */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #0f2b48', paddingBottom: '16px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src="/images/college-logo.png" alt="Emblem" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{settings.college_hindi}</div>
                          <h3 style={{ margin: 0, fontSize: '16px', color: '#0f2b48', fontFamily: 'var(--font-display, Cinzel, serif)' }}>
                            {settings.college_name}
                          </h3>
                          <div style={{ fontSize: '11px', color: '#475569' }}>
                            Affiliated with {settings.affiliating_univ} • AISHE: C-48902
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>OFFICIAL RECEIPT</div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#b45309' }}>SESSION 2026-27</div>
                      </div>
                    </div>

                    {/* Candidate Photo & Reference Banner */}
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '16px 20px', marginBottom: '20px' }}>
                      {formData.documents.photo?.previewUrl && (
                        <img
                          src={formData.documents.photo.previewUrl}
                          alt="Candidate Photo"
                          style={{ width: '64px', height: '76px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #94a3b8' }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Application Reference Number</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em' }}>
                          {paymentResult?.reference_number || applicationResult?.ref || 'GPC-ADM-2026-REG'}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Transaction ID</div>
                        <code style={{ fontSize: '13px', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                          {paymentResult?.payment_id || 'PAY-VERIFIED-OK'}
                        </code>
                      </div>
                    </div>

                    {/* Data Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', fontSize: '13px', marginBottom: '20px' }}>
                      <div><span style={{ color: '#64748b' }}>Student Name:</span> <strong>{formData.name}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Father's Name:</span> <strong>{formData.father_name}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Mother's Name:</span> <strong>{formData.mother_name}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Date of Birth:</span> <strong>{formData.dob}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Program Admitted:</span> <strong style={{ color: '#1e40af' }}>{formData.program === 'B.A.' ? 'Bachelor of Arts (B.A.)' : 'B.Sc. Biology (CBZ)'}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Category / Gender:</span> <strong>{formData.category} / {formData.gender}</strong></div>
                      <div><span style={{ color: '#64748b' }}>12th Percentage:</span> <strong>{formData.prev_percentage}% ({formData.prev_roll_no})</strong></div>
                      <div><span style={{ color: '#64748b' }}>Contact Mobile:</span> <strong>+91 {formData.phone}</strong></div>
                      <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#64748b' }}>Address:</span> <strong>{formData.address}, {formData.district}, PIN {formData.pincode}</strong></div>
                      {formData.program === 'B.A.' && (
                        <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#64748b' }}>Elective Subjects:</span> <strong>{formData.subjects.join(', ')}</strong></div>
                      )}
                    </div>

                    {/* Uploaded Documents Acknowledgment */}
                    <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                      <strong>Uploaded Certificates Verified on Portal:</strong> 10th Marksheet, 12th Marksheet, Aadhaar Card, Passport Photo, Signature{formData.category !== 'General' ? `, ${formData.category} Caste Certificate` : ''}.
                    </div>

                    {/* Amount & Status Bar */}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Amount Paid (In Figures): </span>
                        <strong style={{ fontSize: '18px', color: '#059669' }}>₹ {currentFee.toLocaleString('en-IN')}.00</strong>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {formData.documents.signature?.previewUrl && (
                          <div style={{ textAlign: 'center' }}>
                            <img src={formData.documents.signature.previewUrl} alt="Signature" style={{ height: '32px', objectFit: 'contain' }} />
                            <div style={{ fontSize: '10px', color: '#64748b' }}>Candidate Sign</div>
                          </div>
                        )}
                        <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 800 }}>
                          STATUS: ADMISSION FEE PAID ✓
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps Guidance */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={18} style={{ color: '#b45309' }} /> What to do next:
                    </h4>
                    <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                      <li>Print or download this fee receipt and save the Application Reference Number.</li>
                      <li>Visit the college office in Peeth between <strong>10:00 AM and 03:00 PM</strong> on working days with original documents (10th/12th marksheets, Aadhaar, caste certificate, 4 photos).</li>
                      <li>Physical document verification will be completed in 10 minutes and your student registration ID card will be issued.</li>
                      <li>For any technical assistance or fee inquiries, contact IT & Admission Desk: <strong>+91 82092 77580</strong> (Mr. Ramesh Chandra Pargi) / <strong>{settings.phone_primary}</strong> or email <strong>{settings.email_info}</strong>.</li>
                    </ol>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={handlePrintReceipt}
                      className="btn btn-gold"
                      style={{ padding: '12px 28px', fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Printer size={16} /> Print Official Fee Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackerRef(paymentResult?.reference_number || applicationResult?.ref || '');
                        setActiveTab('status');
                        setStep(1);
                      }}
                      className="btn"
                      style={{ background: '#e2e8f0', color: '#0f172a', padding: '12px 24px', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Search size={16} /> View Status Tracker
                    </button>
                    <Link
                      to="/"
                      className="btn btn-outline"
                      style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: TRACK APPLICATION STATUS                                */}
          {/* ============================================================== */}
          {activeTab === 'status' && (
            <div style={{ maxWidth: '780px', margin: '0 auto' }}>
              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)' }}>
                <h2 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'var(--font-display, Cinzel, serif)' }}>
                  Track Admission Application Status
                </h2>
                <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#64748b' }}>
                  Enter your Application Reference Number (e.g. <code>GPC-ADM-2026-XXXXX</code>) to check your payment status and verification stage.
                </p>

                <form onSubmit={handleTrackApplication} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <input
                    type="text"
                    value={trackerRef}
                    onChange={(e) => setTrackerRef(e.target.value)}
                    placeholder="Enter Reference Number (e.g. GPC-ADM-2026-9E4B1)"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600 }}
                  />
                  <button
                    type="submit"
                    disabled={trackingLoading}
                    className="btn btn-gold"
                    style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    {trackingLoading ? <RefreshCw size={16} className="spin-animation" /> : <Search size={16} />} Search Status
                  </button>
                </form>

                {trackerError && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '14px 18px', color: '#b91c1c', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle size={18} /> {trackerError}
                  </div>
                )}

                {trackedApp && (
                  <div style={{ marginTop: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Application Reference</span>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{trackedApp.ref}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 700,
                          background: trackedApp.status === 'Paid' || trackedApp.status === 'Documents Verified' || trackedApp.status === 'Admitted' ? '#dcfce7' : '#fef3c7',
                          color: trackedApp.status === 'Paid' || trackedApp.status === 'Documents Verified' || trackedApp.status === 'Admitted' ? '#166534' : '#92400e',
                        }}>
                          {trackedApp.status}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', marginBottom: '20px' }}>
                      <div><span style={{ color: '#64748b' }}>Candidate:</span> <strong>{trackedApp.name}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Father's Name:</span> <strong>{trackedApp.father_name}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Program:</span> <strong style={{ color: '#1e40af' }}>{trackedApp.program}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Admission Fee:</span> <strong>₹ {trackedApp.fee_amount} ({trackedApp.status === 'Paid' ? 'Paid' : 'Unpaid'})</strong></div>
                      {trackedApp.payment_id && (
                        <div><span style={{ color: '#64748b' }}>Payment ID:</span> <code>{trackedApp.payment_id}</code></div>
                      )}
                      <div><span style={{ color: '#64748b' }}>Submission Date:</span> <strong>{trackedApp.created_at}</strong></div>
                    </div>

                    {/* Progress Stages */}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                      <strong style={{ fontSize: '12px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                        Admission Progress Stages
                      </strong>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
                        <div style={{ padding: '8px', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                          <div style={{ fontSize: '16px', color: '#059669' }}>✓</div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#065f46' }}>Form Submitted</div>
                        </div>
                        <div style={{ padding: '8px', background: trackedApp.status !== 'Pending Payment' ? '#ecfdf5' : '#fefce8', borderRadius: '6px', border: trackedApp.status !== 'Pending Payment' ? '1px solid #a7f3d0' : '1px solid #fde047' }}>
                          <div style={{ fontSize: '16px', color: trackedApp.status !== 'Pending Payment' ? '#059669' : '#ca8a04' }}>
                            {trackedApp.status !== 'Pending Payment' ? '✓' : '●'}
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: trackedApp.status !== 'Pending Payment' ? '#065f46' : '#854d0e' }}>Fee Payment</div>
                        </div>
                        <div style={{ padding: '8px', background: trackedApp.status === 'Documents Verified' || trackedApp.status === 'Admitted' ? '#ecfdf5' : '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                          <div style={{ fontSize: '16px', color: trackedApp.status === 'Documents Verified' || trackedApp.status === 'Admitted' ? '#059669' : '#94a3b8' }}>
                            {trackedApp.status === 'Documents Verified' || trackedApp.status === 'Admitted' ? '✓' : '○'}
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>Docs Verification</div>
                        </div>
                        <div style={{ padding: '8px', background: trackedApp.status === 'Admitted' ? '#ecfdf5' : '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                          <div style={{ fontSize: '16px', color: trackedApp.status === 'Admitted' ? '#059669' : '#94a3b8' }}>
                            {trackedApp.status === 'Admitted' ? '✓' : '○'}
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>University Enrolment</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Simulated Sandbox / Test Mode Modal */}
      {showSandboxModal && pendingOrderData && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '440px', width: '100%', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>SANDBOX / TEST MODE</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSandboxModal(false)}
                style={{ border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}
              >
                &times;
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
                <CreditCard size={24} />
              </div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', color: '#0f172a' }}>Razorpay Payment Gateway</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                Payable Amount: <strong style={{ color: '#0f172a', fontSize: '16px' }}>₹ {pendingOrderData.amount}.00</strong>
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Order ID:</span> <code>{pendingOrderData.order_id}</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Application Ref:</span> <strong>{pendingOrderData.application_ref}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Program:</span> <strong>{pendingOrderData.program}</strong>
              </div>
            </div>

            <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '12px', color: '#065f46', marginBottom: '20px' }}>
              💡 <strong>Developer / Admin Notice:</strong> Real Razorpay API keys are configured in WordPress Settings. Click below to simulate a successful payment transaction.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                disabled={loading}
                onClick={handleCompleteSandboxPayment}
                className="btn btn-gold"
                style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700, justifyContent: 'center' }}
              >
                {loading ? 'Confirming...' : 'Simulate Successful Payment (Test Flow)'}
              </button>
              <button
                type="button"
                onClick={() => setShowSandboxModal(false)}
                style={{ width: '100%', padding: '10px', fontSize: '13px', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Styles & Animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @media print {
          body * {
            visibility: hidden;
          }
          #official-admission-receipt, #official-admission-receipt * {
            visibility: visible;
          }
          #official-admission-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: 2px solid #000 !important;
            padding: 20px !important;
          }
          .site-header, .site-footer, .page-hero-banner, .btn {
            display: none !important;
          }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
