import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Send,
  FileText,
  ChevronDown,
  Sparkles,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import ResumeModal from './ResumeModal';

const navItems = [
  { path: '/', label: 'الرئيسية' },
  { path: '/projects', label: 'المشاريع الهندسية' },
  { path: '/credentials', label: 'الشهادات والاعتمادات' },
  { path: '/testimonials', label: 'التوصيات والآراء' },
  { path: '/teaching', label: 'التدريس التقني' },
  { path: '/presentations', label: 'عروض الـ Decks' },
  { path: '/about', label: 'عن سيف' },
  { path: '/contact', label: 'تواصل معي' },
];

export default function Navbar() {
  const { personalInfo, cvArchive } = usePortfolioData();
  const activeCvs = (cvArchive || []).filter(cv => cv.active !== false);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showCvDropdown, setShowCvDropdown] = useState(false);

  const cvDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowCvDropdown(false);
  }, [location.pathname]);

  // Click outside listener for CV dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cvDropdownRef.current && !cvDropdownRef.current.contains(e.target)) {
        setShowCvDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cvOptions = [
    {
      title: 'English ATS Resume (PDF)',
      subtitle: 'السيرة الذاتية الرسمية بالإنجليزية للشركات العالمية',
      icon: Briefcase,
      link: '/assets/documents/Resume_FullStack_Engineer_English_ATS.pdf'
    },
    {
      title: 'Full-Stack & Backend Official CV 2026',
      subtitle: 'السيرة الذاتية الشاملة المعتمدة 2026 (.NET & MEAN)',
      icon: CheckCircle2,
      link: '/assets/documents/CV_FullStack_Software_Engineer_Official_2026.pdf'
    },
    {
      title: 'Computer Science & ICT Tutor CV',
      subtitle: 'سيرة الخبرات التعليمية والتدريب التقني (iSchool & DEMI)',
      icon: GraduationCap,
      link: '/assets/documents/CV_Computer_Science_And_ICT_Tutor.pdf'
    }
  ];

  return (
    <>
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '0.65rem 1rem' : '1rem 1rem',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(248, 250, 252, 0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 20px -2px rgba(15, 23, 42, 0.06)' : 'none'
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Real Portrait Avatar & Brand Identity */}
          <Link 
            to="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.85rem', 
              textDecoration: 'none',
              color: 'var(--text-primary)' 
            }}
          >
            {/* Real Cutout Portrait Frame */}
            <div className="brand-avatar-frame" title="سيف الدين محمد">
              <img 
                src={personalInfo.avatar || "/assets/profile/seif-portrait-avatar.jpg"} 
                alt={personalInfo.name || "سيف الدين محمد"} 
                className="brand-avatar-img"
              />
            </div>

            <div>
              <div style={{ fontWeight: '800', fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#0f172a' }}>
                <span>{personalInfo.name || 'سيف الدين محمد'}</span>
                
                {/* Live Pulse Status Badge */}
                <span className="pill-badge pill-emerald" style={{ padding: '0.15rem 0.6rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span className="live-pulse-dot"></span>
                  <span>متاح للعمل</span>
                </span>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', whiteSpace: 'nowrap' }}>
                {personalInfo.title || 'Full-Stack Software Engineer | Tech Instructor'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav 
            style={{ 
              display: 'none', 
              alignItems: 'center', 
              gap: '0.2rem',
              backgroundColor: 'rgba(241, 245, 249, 0.85)',
              padding: '0.35rem 0.6rem',
              borderRadius: '9999px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '9999px',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? '800' : '600',
                    color: isActive ? '#2563eb' : '#475569',
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.12)' : 'none',
                    textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* Multi-CV Dropdown Trigger */}
            <div style={{ position: 'relative' }} ref={cvDropdownRef}>
              <button
                type="button"
                onClick={() => setShowCvDropdown(!showCvDropdown)}
                className="admin-btn admin-btn-secondary"
                style={{
                  padding: '0.5rem 0.95rem',
                  fontSize: '0.84rem',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <FileText size={16} color="#2563eb" />
                <span className="hidden-mobile">السيرة الذاتية (CV)</span>
                <ChevronDown size={14} style={{ transform: showCvDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
              </button>

              {/* Glass Dropdown Menu */}
              {showCvDropdown && (
                <div className="glass-dropdown">
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', padding: '0.3rem 0.6rem 0.5rem', textTransform: 'uppercase' }}>
                    اختر النسخة المطلوبة من الـ CV
                  </div>
                  {activeCvs.map((cv, i) => {
                    const Icon = typeof cv.icon === 'function' ? cv.icon : FileText;
                    return (
                      <a
                        key={i}
                        href={cv.fileUrl}
                        download
                        className="glass-dropdown-item"
                        onClick={() => setShowCvDropdown(false)}
                      >
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <div style={{ color: '#0f172a', fontWeight: '700', fontSize: '0.84rem' }}>{cv.title}</div>
                          <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.1rem' }}>{cv.subtitle}</div>
                        </div>
                      </a>
                    );
                  })}
                  <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '0.4rem', paddingTop: '0.4rem' }}>
                    <button
                      onClick={() => {
                        setShowCvDropdown(false);
                        setShowResume(true);
                      }}
                      className="glass-dropdown-item"
                      style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}
                    >
                      <Sparkles size={16} color="#d97706" />
                      <span>معاينة السيرة الذاتية التفاعلية (Web Resume)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Contact CTA */}
            <Link
              to="/contact"
              className="admin-btn admin-btn-primary"
              style={{
                padding: '0.5rem 1.15rem',
                fontSize: '0.84rem',
                borderRadius: '12px'
              }}
            >
              <Send size={15} />
              <span>تواصل مباشر</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'none',
                padding: '0.5rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
              aria-label="القائمة"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isOpen && (
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              padding: '1.25rem 1.5rem',
              marginTop: '0.75rem',
              borderRadius: '0 0 20px 20px',
              boxShadow: '0 20px 30px -5px rgba(15, 23, 42, 0.12)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {/* Mobile CV Quick Section */}
              <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#2563eb', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={15} />
                  <span>السيرة الذاتية المعتمدة (CV & Resume)</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {activeCvs.map((cv, idx) => (
                    <a
                      key={idx}
                      href={cv.fileUrl}
                      download
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        color: '#0f172a',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        textDecoration: 'none'
                      }}
                    >
                      <span>{cv.title}</span>
                      <Download size={14} color="#2563eb" />
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowResume(true);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.55rem',
                      borderRadius: '8px',
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      marginTop: '0.2rem'
                    }}
                  >
                    <Sparkles size={14} />
                    <span>السيرة الذاتية التفاعلية المعاينة (Web CV)</span>
                  </button>
                </div>
              </div>

              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      fontSize: '0.92rem',
                      fontWeight: isActive ? '800' : '600',
                      color: isActive ? '#2563eb' : '#334155',
                      backgroundColor: isActive ? '#eff6ff' : 'transparent',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }}></span>}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Style for responsive nav display */}
      <style>{`
        @media (min-width: 1120px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 1119px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .hidden-mobile {
            display: none;
          }
        }
      `}</style>

      {/* Resume Modal */}
      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
    </>
  );
}
