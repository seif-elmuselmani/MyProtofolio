import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MessageSquare, Sparkles, ArrowUpLeft, Copy, Check, ArrowUp, Award } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { personalInfo } = usePortfolioData();
  const { isRTL, t } = useLanguage();
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
  const displayName = isRTL ? (personalInfo?.nameAr || "سيف الدين محمد") : (personalInfo?.nameEn || "Seif Elden Mohamed");
  const displayTitle = isRTL ? (personalInfo?.roleAr || "مهندس برمجيات Full-Stack") : (personalInfo?.roleEn || "Full-Stack Software Engineer");
  const displayBio = isRTL ? (personalInfo?.bioAr) : (personalInfo?.bioEn);

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
              <span>{isRTL ? 'المركز الأول على مستوى الجمهورية (DEPI - وزارة الاتصالات) 🏆' : '1st Place Winner Nationwide (DEPI - MCIT Egypt) 🏆'}</span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              {displayBio}
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href={personalInfo?.github || "https://github.com/seif-elmuselmani"} 
                target="_blank" 
                rel="noreferrer"
                className="social-btn"
                title="GitHub"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#334155',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Github size={18} />
              </a>
              <a 
                href={personalInfo?.linkedin || "https://www.linkedin.com/in/seif-elmuselmani"} 
                target="_blank" 
                rel="noreferrer"
                className="social-btn"
                title="LinkedIn"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Linkedin size={18} />
              </a>
              <a 
                href={personalInfo?.whatsapp || "https://wa.me/201223817860"} 
                target="_blank" 
                rel="noreferrer"
                className="social-btn"
                title="WhatsApp"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <MessageSquare size={18} />
              </a>
              <a 
                href={`mailto:${personalInfo?.email || "eldenseif645@gmail.com"}`}
                className="social-btn"
                title="Email"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dc2626',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              {isRTL ? 'روابط التنقل السريعة' : 'Quick Navigation'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600' }}>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600' }}>
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link to="/credentials" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600' }}>
                  {t('nav.credentials')}
                </Link>
              </li>
              <li>
                <Link to="/teaching" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600' }}>
                  {t('nav.teaching')}
                </Link>
              </li>
              <li>
                <Link to="/presentations" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600' }}>
                  {t('nav.presentations')}
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600' }}>
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Box */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              {isRTL ? 'معلومات التواصل المباشر' : 'Direct Contact Info'}
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
              {isRTL 
                ? 'متاح للمناقشات البرمجية، الفرص الوظيفية المتقدمة، والاستشارات التقنية عن بعد.' 
                : 'Available for engineering roles, technical leadership, and remote consultancy.'}
            </p>

            {/* Email Copy Card */}
            <div 
              onClick={handleCopyEmail}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                marginBottom: '1rem',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#2563eb" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>
                  {personalInfo?.email || "eldenseif645@gmail.com"}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: copied ? '#059669' : '#64748b' }}>
                {copied ? (isRTL ? 'تم النسخ! ✓' : 'Copied! ✓') : (isRTL ? 'نسخ' : 'Copy')}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div 
          style={{
            borderTop: '1px solid #f1f5f9',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            {t('footer.copyright')}
          </p>

          <button
            onClick={scrollToTop}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#475569',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <ArrowUp size={14} />
            <span>{isRTL ? 'للأعلى' : 'Top'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
