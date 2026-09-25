import React, { useState } from 'react';
import { Send, MessageSquare, Mail, Phone, MapPin, CheckCircle2, Copy, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
// Static fallback removed, dynamic hook enabled
import Toast from '../components/Toast';

export default function Contact() {
  const { personalInfo, trustPartners, webProjects, certificatesList, credentialsList, testimonialsList, presentationDecks, teachingExperience, skillsMatrix, categories } = usePortfolioData();

  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'فرصة عمل / مشروع Backend جديد',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="pill-badge pill-blue" style={{ marginBottom: '0.75rem' }}>
            <Send size={15} />
            <span>تواصل واستشارات برمجية مباشرة</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            دعنا نبدأ التعاون ومناقشة مشروعك
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            سواء كنت ترغب في توظيف مهندس Backend، بناء نظام برمجي جديد، أو تنسيق ورشة تدريبية.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', marginBottom: '4rem' }} className="contact-grid">
          
          {/* Direct Channels (5 Cols) */}
          <div style={{ gridColumn: 'span 5' }} className="contact-channels-col">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              قنوات التواصل المباشر
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              
              {/* WhatsApp Card */}
              <div 
                className="corporate-card"
                style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff' }}
              >
                <a 
                  href={personalInfo.whatsapp} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--text-primary)', flexGrow: 1 }}
                >
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'var(--brand-emerald-light)', color: 'var(--brand-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--brand-emerald)', fontWeight: '700' }}>محادثة فورية (مفضل)</div>
                    <div style={{ fontSize: '1.02rem', fontWeight: '800' }}>تواصل عبر WhatsApp</div>
                  </div>
                </a>
                <button
                  onClick={() => copyToClipboard(personalInfo.phone, 'رقم الواتساب')}
                  title="نسخ الرقم"
                  style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* Email Card */}
              <div 
                className="corporate-card"
                style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff' }}
              >
                <a 
                  href={`mailto:${personalInfo.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--text-primary)', flexGrow: 1 }}
                >
              <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}><Mail size={20} /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>البريد الإلكتروني المباشر</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '800' }}>{personalInfo.email}</div>
                  </div>
                </a>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'البريد الإلكتروني')}
                  title="نسخ الإيميل"
                  style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* Location Card */}
              <div 
                className="corporate-card"
                style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#ffffff' }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>المقر والجاهزية</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>{personalInfo.location}</div>
                </div>
              </div>

            </div>

            {/* Response Time Guarantee */}
            <div className="corporate-card" style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-emerald)', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.92rem' }}>
                <Clock size={18} />
                <span>سرعة الرد والاستجابة</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                أقوم بالرد على جميع الرسائل واستفسارات العمل في غضون 24 ساعة كحد أقصى.
              </p>
            </div>
          </div>

          {/* Form (7 Cols) */}
          <div style={{ gridColumn: 'span 7' }} className="contact-form-col">
            <div className="corporate-card" style={{ padding: '2.5rem', backgroundColor: '#ffffff' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }} className="animate-fade-in">
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--brand-emerald-light)', color: 'var(--brand-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    تم استلام رسالتك بنجاح!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    شكراً لتواصلك، سأقوم بمراجعة التفاصيل والتواصل معك في أقرب وقت.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">
                    إرسال استفسار آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    أرسل رسالة أو تفاصيل الفرصة
                  </h3>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '700' }}>الاسم بالكامل</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: م. أحمد مصطفى" 
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '700' }}>البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com" 
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '700' }}>نوع الطلب / الموضوع</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="فرصة عمل Full-time أو Remote">فرصة عمل (Full-time / Remote / Hybrid)</option>
                      <option value="تطوير نظام Backend / Web API">تطوير نظام Backend أو Web API كامل (.NET / MEAN)</option>
                      <option value="جلسة تدريب أو ورشة عمل">تنظيم ورشة عمل برمجية أو تدريب تقني</option>
                      <option value="استشارة معمارية برمجيات">استشارة تقنية / مراجعة كود ومعمارية</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '700' }}>الرسالة والتفاصيل</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اشرح باختصار متطلباتك أو طبيعة الفرصة..." 
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.85rem' }}>
                    <Send size={16} />
                    <span>إرسال الرسالة الآن</span>
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      <Toast message={toastMessage} visible={toastVisible} />

      <style>{`
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