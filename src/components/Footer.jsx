import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MessageSquare, Sparkles, ArrowUpLeft, Copy, Check, ArrowUp, Award } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

export default function Footer() {
  const { personalInfo } = usePortfolioData();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (personalInfo?.email) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const avatarSource = personalInfo?.avatar || personalInfo?.avatarUrl || "/assets/profile/seif-portrait-avatar.jpg";
  const displayName = personalInfo?.nameAr || personalInfo?.name || "سيف الدين محمد";
  const displayTitle = personalInfo?.titleEn || personalInfo?.roleAr || "Backend Software Engineer | DEPI Top 1 Scholar";
  const displayBio = personalInfo?.bioAr || personalInfo?.bioEn;

  return (
    <footer 
      style={{
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        padding: '4.5rem 1rem 2.5rem',
        marginTop: '6rem',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Col 1: Bio & Dynamic Branding */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div 
                className="brand-avatar-frame" 
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px',
                  border: '2px solid #2563eb',
                  padding: '2px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)'
                }} 
                title={displayName}
              >
                <img 
                  src={avatarSource} 
                  alt={displayName} 
                  className="brand-avatar-img" 
                  style={{ borderRadius: '8px', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {displayName}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#2563eb', fontWeight: '700' }}>
                  {displayTitle}
                </p>
              </div>
            </div>

            {/* DEPI Top 1 Badge */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#fef3c7',
                border: '1px solid #fde68a',
                color: '#b45309',
                padding: '0.3rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: '800',
                marginBottom: '1.25rem'
              }}
            >
              <Award size={14} />
              <span>المركز الأول على مستوى الجمهورية (DEPI - وزارة الاتصالات) 🏆</span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              {displayBio}
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a 
                href={personalInfo?.github || "https://github.com/seif-elmuselmani"} 
                target="_blank" 
                rel="noreferrer"
                className="social-btn-hover"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <Github size={19} />
              </a>
              <a 
                href={personalInfo?.linkedin || "https://www.linkedin.com/in/seif-elmuselmani"} 
                target="_blank" 
                rel="noreferrer"
                className="social-btn-hover"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <Linkedin size={19} />
              </a>
              <a 
                href={personalInfo?.whatsapp || "https://wa.me/201223817860"} 
                target="_blank" 
                rel="noreferrer"
                className="social-btn-hover"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="WhatsApp Contact"
                title="WhatsApp"
              >
                <MessageSquare size={19} />
              </a>
              <a 
                href={`mailto:${personalInfo?.email || 'eldenseif645@gmail.com'}`}
                className="social-btn-hover"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-primary)',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="Direct Email"
                title="Direct Email"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* Col 2: Dynamic Site Map */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              تصفح الموقع والروابط السريعة
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <Link to="/" className="footer-nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}>
                الرئيسية
              </Link>
              <Link to="/projects" className="footer-nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}>
                المشاريع الهندسية
              </Link>
              <Link to="/credentials" className="footer-nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}>
                الشهادات والاعتمادات
              </Link>
              <Link to="/testimonials" className="footer-nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}>
                التوصيات والآراء
              </Link>
              <Link to="/teaching" className="footer-nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}>
                التدريس و iSchool
              </Link>
              <Link to="/presentations" className="footer-nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}>
                عروض الـ Decks
              </Link>
              <Link to="/about" className="footer-nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}>
                عن سيف وسيرته
              </Link>
              <Link to="/contact" className="footer-nav-link" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', transition: 'var(--transition-smooth)' }}>
                تواصل مباشر
              </Link>
            </div>
          </div>

          {/* Col 3: Elevated Hiring CTA Card */}
          <div 
            className="corporate-card" 
            style={{ 
              padding: '1.75rem', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #cbd5e1', 
              borderRadius: '16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.04)',
              position: 'relative'
            }}
          >
            {/* Live Availability Status Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span 
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.2)',
                  display: 'inline-block'
                }} 
              />
              <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#047857' }}>
                متاح حالياً للفرص الاستراتيجية والعمل الحر
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-primary)', marginBottom: '0.4rem' }}>
              <Sparkles size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>جاهز للتوظيف والمشاريع</span>
            </div>
            
            <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
              هل تبحث عن مهندس ذو كفاءة مثبتة؟
            </h4>
            
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              يسعدني مناقشة انضمامي لفريق العمل أو التعاون في تطوير أنظمة برمجية متقدمة وعالية الأداء.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ flex: '1 1 auto', justifyContent: 'center', padding: '0.75rem 1.25rem' }}>
                <span>تواصل معي الآن</span>
                <ArrowUpLeft size={16} />
              </Link>
              
              <button
                type="button"
                onClick={handleCopyEmail}
                style={{
                  backgroundColor: copied ? '#ecfdf5' : '#ffffff',
                  border: copied ? '1px solid #10b981' : '1px solid #cbd5e1',
                  color: copied ? '#047857' : 'var(--text-primary)',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
                title="نسخ البريد الإلكتروني"
              >
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copied ? 'تم النسخ!' : 'نسخ البريد'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div 
          style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.88rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {displayName}.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              هندسة وتطوير برمجيات موثوقة وعالية الأداء
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="العودة لأعلى الصفحة"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

