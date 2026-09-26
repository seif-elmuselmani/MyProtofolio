import React, { useState } from 'react';
import { User, MapPin, Mail, Phone, Download, Send, Award, GraduationCap, CheckCircle2, ExternalLink, Sparkles, BookOpen, ShieldCheck, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import ResumeModal from '../components/ResumeModal';

export default function About() {
  const { personalInfo, skillsMatrix } = usePortfolioData();
  const [showResume, setShowResume] = useState(false);

  const displayStats = [
    { value: '🏆 #1', label: 'المركز الأول جمهورية', enLabel: 'DEPI 1st Place Nationwide' },
    { value: '210+ ساعة', label: 'تدريب مكثف NTI', enLabel: 'MEAN & .NET Accelerator' },
    { value: '+100 طالب', label: 'طلاب ومبتكرين تم تدريبهم', enLabel: 'iSchool & DEMI Students' },
    { value: '6 مهندسين', label: 'قيادة مشروع التخرج (A+)', enLabel: 'NABD Team Leader' },
    { value: '5.0 / 5.0', label: 'تقييم العمل الحر', enLabel: '100% Deal Completion' },
    { value: '+9K', label: 'متابع على LinkedIn', enLabel: 'Tech Network & Community' }
  ];

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Profile Card Hero */}
        <div 
          className="corporate-card"
          style={{
            padding: '3rem 2.5rem',
            marginBottom: '3rem',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem', alignItems: 'center' }} className="about-grid">
            
            {/* Left/Main Column: Bio & Info */}
            <div style={{ gridColumn: 'span 7' }} className="about-text-col">
              <div className="pill-badge pill-blue" style={{ marginBottom: '1rem' }}>
                <User size={14} />
                <span>المسيرة الهندسية والشغف</span>
              </div>
              
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {personalInfo.nameAr}
              </h1>
              <div style={{ fontSize: '1.1rem', color: 'var(--brand-primary)', fontWeight: '700', marginBottom: '1.25rem' }}>
                {personalInfo.roleAr}
              </div>

              {/* Education Card Box */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-prestige)', fontWeight: '800', fontSize: '1rem', marginBottom: '0.35rem' }}>
                  <GraduationCap size={22} />
                  <span>{personalInfo.education.university}</span>
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '700' }}>
                  {personalInfo.education.degree} ({personalInfo.education.period})
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  التقدير العام: <strong style={{ color: 'var(--brand-emerald)' }}>{personalInfo.education.grade} (78.286%)</strong> • المعدل التراكمي: <strong>GPA {personalInfo.education.gpa}</strong> • مشروع التخرج: <strong style={{ color: 'var(--brand-primary)' }}>{personalInfo.education.gradProjectGrade} مع مرتبة الشرف</strong>
                </div>
              </div>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                خريج علوم الحاسب بجامعة الزقازيق ومطور برمجيات متمرس في بيئة <strong>.NET Ecosystem</strong> (C#, ASP.NET Core, Clean Architecture, EF Core, SQL Server) و <strong>MEAN Stack</strong> (Node.js, Express, Angular, MongoDB). أجمع بين التنفيذ البرمجي المتقن للأنظمة الخلفية وتطبيق مبادئ هندسة البرمجيات العالمية، وبين مهارات التواصل والقيادة التي صقلتها كمدرب برمجة في iSchool ومبادرة DEMI بالتعاون مع وزارة الاتصالات.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <MapPin size={16} color="var(--brand-primary)" />
                  <span>{personalInfo.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <Mail size={16} color="var(--brand-primary)" />
                  <span>{personalInfo.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <Phone size={16} color="var(--brand-primary)" />
                  <span>{personalInfo.phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setShowResume(true)}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  <Download size={16} />
                  <span>عرض وتحميل السيرة الذاتية (CV)</span>
                </button>
                <Link to="/contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                  <Send size={16} />
                  <span>تواصل معي</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Formal Photo & Highlights */}
            <div style={{ gridColumn: 'span 5' }} className="about-metrics-col">
              <div 
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                  border: '3px solid #ffffff',
                  backgroundColor: '#f1f5f9',
                  marginBottom: '1.5rem'
                }}
              >
                <img 
                  src="/assets/profile/seif-defense-formal.jpg" 
                  alt="سيف الدين محمد - مهندس برمجيات"
                  style={{ width: '100%', height: '340px', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#38bdf8' }}>سيف الدين محمد</div>
                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Full-Stack Software Engineer</div>
                  </div>
                  <span className="pill-badge pill-gold" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
                    🏆 الأول جمهورية
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Award Spotlight Section */}
        <div 
          className="corporate-card"
          style={{
            padding: '2rem 2.5rem',
            marginBottom: '4rem',
            backgroundColor: '#f8fafc',
            borderRadius: '24px',
            border: '1px solid #cbd5e1'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'center' }} className="award-grid">
            <div style={{ gridColumn: 'span 5' }} className="award-img-col">
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                <img 
                  src="/assets/profile/seif-with-dr-hesham-farouk-depi.png" 
                  alt="تتكريم سيف الدين محمد مع د. هشام فاروق" 
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
            <div style={{ gridColumn: 'span 7' }} className="award-text-col">
              <div className="pill-badge pill-gold" style={{ marginBottom: '0.65rem' }}>
                <Award size={14} />
                <span>التكريم والتميز الرئاسي</span>
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                التكريم الرسمي بالمركز الأول على مستوى الجمهورية (DEPI)
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                تم التكريم بحضور د. هشام فاروق (مستشار وزير الاتصالات وتكنولوجيا المعلومات لتطوير الكوادر التكنولوجية) ود. هدى بركة، عقب تحقيـق المركز الأول جمهورية في مبادرة مصر الرقمية (DEPI Round 3) وتطوير حلول برمجية متكاملة بـ .NET & Cloud Architecture.
              </p>
              <Link to="/credentials" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex' }}>
                <span>استعراض شهادات الاعتماد والتميز</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Grid (6 Balanced Cards) */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--text-primary)' }}>
              أرقام ومؤشرات الأداء الهندسية
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            {displayStats.map((st, i) => (
              <div key={i} className="corporate-card" style={{ padding: '1.5rem 1.25rem', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--brand-primary)' }}>
                  {st.value}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.3rem' }}>{st.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{st.enLabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Matrix */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)' }}>
              مصفوفة المهارات والقدرات التقنية (Technical Toolbox)
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {skillsMatrix.map((cat, idx) => (
              <div key={idx} className="corporate-card" style={{ padding: '1.75rem', backgroundColor: '#ffffff', borderRadius: '18px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                  {cat.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {cat.skills.map((skill, i) => (
                    <span key={i} className="pill-badge pill-slate" style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem' }}>
                      <CheckCircle2 size={13} color="var(--brand-emerald)" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />

      <style>{`
        @media (max-width: 900px) {
          .about-grid, .award-grid {
            grid-template-columns: 1fr !important;
          }
          .about-text-col, .about-metrics-col, .award-img-col, .award-text-col {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
