import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MessageSquare, Sparkles, ArrowUpLeft } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

export default function Footer() {
  const { personalInfo } = usePortfolioData();

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
          {/* Col 1: Bio & Branding */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="brand-avatar-frame" style={{ width: '42px', height: '42px' }} title="سيف الدين محمد">
                <img src="/assets/profile/seif-portrait-avatar.jpg" alt="سيف الدين محمد" className="brand-avatar-img" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-primary)' }}>{personalInfo.name || 'سيف الدين محمد'}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full-Stack Software Engineer | Tech Instructor</p>
              </div>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              {personalInfo.bio || personalInfo.bioAr}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href={personalInfo.whatsapp} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="WhatsApp"
              >
                <MessageSquare size={18} />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-primary)',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Site Map */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              خريطة الموقع الأقسام
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>الرئيسية</Link>
              <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>المشاريع الهندسية</Link>
              <Link to="/credentials" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>الشهادات والاعتمادات</Link>
              <Link to="/testimonials" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>التوصيات والآراء</Link>
              <Link to="/teaching" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>التدريس و iSchool</Link>
              <Link to="/presentations" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>عروض الـ Decks</Link>
              <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}>عن سيف وسيرته</Link>
              <Link to="/contact" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800' }}>تواصل مباشر</Link>
            </div>
          </div>

          {/* Col 3: CTA Card */}
          <div className="corporate-card" style={{ padding: '1.75rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>
              <Sparkles size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>جاهز للتوظيف والمشاريع</span>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
              هل تبحث عن مهندس ذو كفاءة مثبتة؟
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              يسعدني مناقشة انضمامي لفريق العمل أو التعاون في تطوير أنظمة برمجية متقدمة.
            </p>
            <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <span>تواصل معي الآن</span>
              <ArrowUpLeft size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '1.5rem',
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
            جميع الحقوق محفوظة © {new Date().getFullYear()} {personalInfo.name || 'سيف الدين محمد'}.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>هندسة وتطوير برمجيات موثوقة وعالية الأداء</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
