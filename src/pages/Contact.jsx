import React, { useState } from 'react';
import { Send, MessageSquare, Mail, MapPin, CheckCircle2, Copy, Sparkles, Clock, Linkedin, Briefcase, Code, GraduationCap, ArrowUpLeft } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import Toast from '../components/Toast';

export default function Contact() {
  const { personalInfo } = usePortfolioData();

  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`تم نسخ ${label} إلى الحافظة بنجاح!`);
  };

  const handlePersonaSelect = (topicTitle) => {
    setFormData((prev) => ({ ...prev, subject: topicTitle }));
    showToast(`تم تحديد خيار: "${topicTitle}"`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Psychological Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div 
            className="pill-badge pill-blue" 
            style={{ 
              marginBottom: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem'
            }}
          >
            <Sparkles size={16} />
            <span>تواصل واستشارات مباشرة</span>
          </div>

          <h1 
            style={{ 
              fontSize: '2.5rem', 
              fontWeight: '900', 
              color: 'var(--text-primary)', 
              marginBottom: '1rem',
              lineHeight: 1.3
            }}
          >
            سواء كنت تبحث عن تعيين مهندس Backend، بناء مشروع متكامل، أو تدريب تقني...
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
            اختر نوع الفرصة أدناه لملء الموضوع فوراً، أو تواصل معي عبر الواتساب للمحادثة التفاعلية السريعة.
          </p>
        </div>

        {/* 3 Interactive Psychological Persona Chips */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '1.25rem', 
            marginBottom: '3.5rem' 
          }}
        >
          {/* Chip 1: Hiring */}
          <button
            type="button"
            onClick={() => handlePersonaSelect('انضمام لفريق العمل كـ Backend Engineer')}
            style={{
              backgroundColor: formData.subject.includes('انضمام') ? '#eff6ff' : '#ffffff',
              border: formData.subject.includes('انضمام') ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.35rem',
              textAlign: 'right',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              transition: 'all 0.25s ease'
            }}
            className="persona-chip-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                تضمين مهندس Backend
              </h4>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              بحث عن مهندس متمرس لبناء وبناء أنظمة خلفية صلبة وعالية الأداء.
            </p>
          </button>

          {/* Chip 2: Building Project */}
          <button
            type="button"
            onClick={() => handlePersonaSelect('تطوير وبناء مشروع / نظام متكامل')}
            style={{
              backgroundColor: formData.subject.includes('تطوير') ? '#eff6ff' : '#ffffff',
              border: formData.subject.includes('تطوير') ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.35rem',
              textAlign: 'right',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              transition: 'all 0.25s ease'
            }}
            className="persona-chip-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                بناء مشروع / موقع متكامل
              </h4>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              لديك فكرة أو مشروع ترغب في تنفيذه بأحدث معايير الأمان والسرعة.
            </p>
          </button>

          {/* Chip 3: Instructor / Workshop */}
          <button
            type="button"
            onClick={() => handlePersonaSelect('تدريب تقني وتنسيق ورشة عمل برمجية')}
            style={{
              backgroundColor: formData.subject.includes('تدريب') ? '#eff6ff' : '#ffffff',
              border: formData.subject.includes('تدريب') ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.35rem',
              textAlign: 'right',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              transition: 'all 0.25s ease'
            }}
            className="persona-chip-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fff7ed', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                محاضر وتدريب تقني
              </h4>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              طلب مدرب معتمد لقيادة معسكرات برمجية أو تدريب فرق التطوير.
            </p>
          </button>
        </div>

        {/* Main Grid: Channels & Form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', marginBottom: '4rem' }} className="contact-grid">
          
          {/* Direct Channels (5 Cols) */}
          <div style={{ gridColumn: 'span 5' }} className="contact-channels-col">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              قنوات التواصل المباشر
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              
              {/* Highlighted Live WhatsApp Card */}
              <div 
                className="corporate-card"
                style={{ 
                  padding: '1.5rem', 
                  backgroundColor: '#ffffff', 
                  border: '2px solid #10b981',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.08)'
                }}
              >
                {/* Live Online Pulse Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <span 
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.25)',
                      display: 'inline-block'
                    }} 
                  />
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#047857' }}>
                    متصل الآن • الرد السريع عبر WhatsApp
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <a 
                    href={personalInfo?.whatsapp || "https://wa.me/201223817860"} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--text-primary)', flexGrow: 1 }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: '700' }}>محادثة فورية مباشرة (Fast Track)</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>تواصل عبر WhatsApp ↗</div>
                    </div>
                  </a>

                  <button
                    onClick={() => copyToClipboard(personalInfo?.phone || '+201223817860', 'رقم الواتساب')}
                    title="نسخ الرقم"
                    style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.6rem', borderRadius: '10px' }}
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              {/* LinkedIn Profile Card */}
              <div 
                className="corporate-card"
                style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', borderRadius: '16px' }}
              >
                <a 
                  href={personalInfo?.linkedin || "https://www.linkedin.com/in/seif-elmuselmani"} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--text-primary)', flexGrow: 1 }}
                >
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Linkedin size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>شبكة الأعمال والتواصل الرسمي</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-primary)' }}>صفحة LinkedIn الرسمية ↗</div>
                  </div>
                </a>
              </div>

              {/* Executive Location Card */}
              <div 
                className="corporate-card"
                style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#ffffff', borderRadius: '16px' }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>المقر والتغطية الاستشارية</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {personalInfo?.location || "مصر (توقيت القاهرة GMT+3 • العمل عن بُعد واستشارات الأنظمة المتقدمة)"}
                  </div>
                </div>
              </div>

            </div>

            {/* Response Guarantee */}
            <div className="corporate-card" style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.92rem' }}>
                <Clock size={18} />
                <span>التزام بالسرعة والاحترافية</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                أقوم بمراجعة كافة الاستفسارات والفرص الوردة والرد عليها باهتمام بالغة في غضون ساعات قليلة.
              </p>
            </div>
          </div>

          {/* Form (7 Cols) */}
          <div style={{ gridColumn: 'span 7' }} className="contact-form-col">
            <div className="corporate-card" style={{ padding: '2.5rem', backgroundColor: '#ffffff', borderRadius: '20px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }} className="animate-fade-in">
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    تم استلام تفاصيل رسالتك بنجاح!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    شكراً لتواصلك، سأقوم بمراجعة الموضوع والتواصل معك في أقرب وقت ممكن.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">
                    إرسال استفسار آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    أرسل رسالة تفصيلية
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    اكتب تفاصيل طلبك أو الفرصة، وسأتواصل معك مباشرة.
                  </p>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '700' }}>الاسم بالكامل</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: م. أحمد مصطفى" 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '700' }}>موضوع الرسالة / نطاق التعاون</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="اكتب موضوع الرسالة هنا (أو اختر من البطاقات الثلاث أعلاه)..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '700' }}>
                      البريد الإلكتروني <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>(اختياري للرد)</span>
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com" 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '700' }}>الرسالة والتفاصيل</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اشرح باختصار متطلباتك أو طبيعة الفرصة أو النظام الذي ترغب في بنائه..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.9rem', justifyContent: 'center' }}>
                    <span>إرسال الرسالة الآن</span>
                    <ArrowUpLeft size={18} />
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      <Toast message={toastMessage} visible={toastVisible} />

      <style>{`
        .persona-chip-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.06) !important;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-channels-col, .contact-form-col {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}