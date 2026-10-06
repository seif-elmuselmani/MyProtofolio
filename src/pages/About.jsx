import React, { useState } from 'react';
import { User, MapPin, Mail, Phone, Download, Send, Award, GraduationCap, CheckCircle2, ExternalLink, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import { useLanguage } from '../context/LanguageContext';
import ResumeModal from '../components/ResumeModal';
import CertificateModal from '../components/CertificateModal';

export default function About() {
  const { personalInfo, skillsMatrix } = usePortfolioData();
  const { isRTL } = useLanguage();
  const [showResume, setShowResume] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const displayStats = [
    { value: '🏆 #1', label: 'المركز الأول جمهورية', enLabel: 'DEPI 1st Place Nationwide' },
    { value: '210+ H', label: 'تدريب مكثف NTI', enLabel: 'MEAN & .NET Accelerator' },
    { value: '+500', label: 'طلاب ومبتكرين تم تدريبهم', enLabel: 'iSchool & DEMI Students' },
    { value: '6 Engineers', label: 'قيادة مشروع التخرج (A+)', enLabel: 'NABD Team Leader' },
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
            
            {/* Main Bio Text Column */}
            <div style={{ gridColumn: 'span 7' }} className="about-text-col">
              <div className="pill-badge pill-blue" style={{ marginBottom: '1rem' }}>
                <User size={14} />
                <span>{isRTL ? 'المسيرة الهندسية والشغف' : 'Engineering Journey & Passion'}</span>
              </div>
              
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {isRTL ? personalInfo.nameAr : personalInfo.nameEn}
              </h1>
              <div style={{ fontSize: '1.1rem', color: 'var(--brand-primary)', fontWeight: '700', marginBottom: '1.25rem' }}>
                {isRTL ? personalInfo.roleAr : personalInfo.roleEn}
              </div>

              {/* Education Box */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-prestige)', fontWeight: '800', fontSize: '1rem', marginBottom: '0.35rem' }}>
                  <GraduationCap size={22} />
                  <span>{isRTL ? personalInfo.education.university : (personalInfo.education.universityEn || 'Faculty of Computers & Informatics — Zagazig University')}</span>
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '700' }}>
                  {isRTL ? personalInfo.education.degree : (personalInfo.education.degreeEn || 'B.Sc. Computer Science (CS)')} ({personalInfo.education.period})
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  {isRTL ? (
                    <>التقدير العام: <strong style={{ color: 'var(--brand-emerald)' }}>{personalInfo.education.grade} (78.286%)</strong> • المعدل التراكمي: <strong>GPA {personalInfo.education.gpa}</strong> • مشروع التخرج: <strong style={{ color: 'var(--brand-primary)' }}>{personalInfo.education.gradProjectGrade} مع مرتبة الشرف</strong></>
                  ) : (
                    <>General Grade: <strong style={{ color: 'var(--brand-emerald)' }}>Very Good (78.286%)</strong> • Cumulative: <strong>GPA 3.11 / 4.00</strong> • Graduation Project: <strong style={{ color: 'var(--brand-primary)' }}>Excellent (A+) with Honors</strong></>
                  )}
                </div>
              </div>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {isRTL ? (
                  <>خريج علوم الحاسب بجامعة الزقازيق ومطور برمجيات متمرس في بيئة <strong>.NET Ecosystem</strong> (C#, ASP.NET Core, Clean Architecture, EF Core, SQL Server) و <strong>MEAN Stack</strong> (Node.js, Express, Angular, MongoDB). أجمع بين التنفيذ البرمجي المتقن للأنظمة الخلفية وتطبيق مبادئ هندسة البرمجيات العالمية، وبين مهارات التواصل والقيادة التي صقلتها كمدرب برمجة في iSchool ومبادرة DEMI بالتعاون مع وزارة الاتصالات.</>
                ) : (
                  <>Computer Science graduate from Zagazig University and experienced full-stack engineer proficient in the <strong>.NET Ecosystem</strong> (C#, ASP.NET Core, Clean Architecture, EF Core, SQL Server) and <strong>MEAN Stack</strong> (Node.js, Express, Angular, MongoDB). I combine robust backend system execution following SOLID principles with strong leadership and communication skills honed as Lead Coding Tutor at iSchool and MCIT Egypt.</>
                )}
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
                  <span>{isRTL ? 'عرض وتحميل السيرة الذاتية (CV)' : 'View & Download Resume (CV)'}</span>
                </button>
                <Link to="/contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                  <Send size={16} />
                  <span>{isRTL ? 'تواصل معي' : 'Contact Me'}</span>
                </Link>
              </div>

            </div>

            {/* Formal Profile Photo Column */}
            <div style={{ gridColumn: 'span 5' }} className="about-metrics-col">
              <div 
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
                  border: '4px solid #ffffff',
                  backgroundColor: '#0f172a',
                  cursor: 'pointer'
                }}
                onClick={() => setPreviewImage({
                  title: isRTL ? 'سيف الدين محمد - الصورة الشخصية الرسمية' : 'Seif Elden Mohamed - Formal Portrait',
                  issuer: 'Full-Stack Software Engineer',
                  image: '/assets/profile/seif-defense-formal.jpg',
                  description: isRTL ? 'مهندس برمجيات متخصص في .NET & MEAN Stack، الحائز على المركز الأول على مستوى الجمهورية في مبادرة مصر الرقمية DEPI.' : 'Software Engineer specializing in .NET & MEAN Stack, 1st Place Winner Nationwide in DEPI Initiative.'
                })}
              >
                <img 
                  src="/assets/profile/seif-defense-formal.jpg" 
                  alt="Seif Elden Mohamed"
                  style={{ 
                    width: '100%', 
                    maxHeight: '450px', 
                    objectFit: 'cover', 
                    objectPosition: 'center 15%', 
                    display: 'block' 
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 50%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>
                        {isRTL ? personalInfo.nameAr : personalInfo.nameEn}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Full-Stack Software Engineer</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="pill-badge pill-gold" style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}>
                        {isRTL ? '🏆 الأول جمهورية' : '🏆 1st Place Nationwide'}
                      </span>
                      <div 
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Maximize2 size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Presidential Award Section */}
        <div 
          className="corporate-card"
          style={{
            padding: '2.5rem',
            marginBottom: '4rem',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem', alignItems: 'center' }} className="award-grid">
            
            {/* Award Photo Column */}
            <div style={{ gridColumn: 'span 5' }} className="award-img-col">
              <div 
                style={{ 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#0f172a',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
                onClick={() => setPreviewImage({
                  title: isRTL ? 'التكريم الرسمي بالمركز الأول على مستوى الجمهورية (DEPI)' : 'Official 1st Place Nationwide Honor Ceremony (DEPI)',
                  issuer: isRTL ? 'وزارة الاتصالات وتكنولوجيا المعلومات (MCIT)' : 'Ministry of Communications & IT (MCIT Egypt)',
                  image: '/assets/profile/seif-with-dr-hesham-farouk-depi.png',
                  description: isRTL 
                    ? 'صورة التكريم الرسمي بحضور د. هشام فاروق (مستشار وزير الاتصالات لتطوير الكوادر التكنولوجية) ود. هدى بركة، عقب تحقيق المركز الأول جمهورية في مبادرة مصر الرقمية DEPI Round 3.'
                    : 'Official ceremony with Dr. Hesham Farouk (Advisor to MCIT Minister) and Dr. Hoda Baraka celebrating 1st Place Nationwide in DEPI Round 3.'
                })}
              >
                <img 
                  src="/assets/profile/seif-with-dr-hesham-farouk-depi.png" 
                  alt="Official Award Ceremony with Dr. Hesham Farouk" 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    maxHeight: '340px',
                    objectFit: 'contain', 
                    backgroundColor: '#0f172a',
                    display: 'block' 
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: isRTL ? '0.75rem' : 'auto',
                    right: isRTL ? 'auto' : '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Maximize2 size={13} />
                  <span>{isRTL ? 'تكبير الصورة' : 'Expand Image'}</span>
                </div>
              </div>
            </div>

            {/* Award Description Column */}
            <div style={{ gridColumn: 'span 7' }} className="award-text-col">
              <div className="pill-badge pill-gold" style={{ marginBottom: '0.75rem' }}>
                <Award size={14} />
                <span>{isRTL ? 'التكريم والتميز الرئاسي' : 'National Honor & Presidential Recognition'}</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                {isRTL ? 'التكريم الرسمي بالمركز الأول على مستوى الجمهورية (DEPI)' : '1st Place Nationwide Winner Honor Ceremony (DEPI - MCIT)'}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                {isRTL 
                  ? 'لحظة التكريم الرسمي بحضور د. هشام فاروق (مستشار وزير الاتصالات وتكنولوجيا المعلومات لتطوير الكوادر التكنولوجية) ود. هدى بركة، عقب تحقيق المركز الأول على مستوى الجمهورية في مبادرة مصر الرقمية (DEPI Round 3) عن مسار Full Stack Web Development (.NET) بالتعاون مع المعهد القومي للاتصالات NTI.'
                  : 'Official recognition ceremony attended by Dr. Hesham Farouk (Advisor to MCIT Minister) and Dr. Hoda Baraka after securing 1st Place Nationwide in Digital Egypt Pioneers Initiative (DEPI Round 3) for Full Stack .NET Track.'}
              </p>
              <Link to="/credentials" className="btn-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem', display: 'inline-flex' }}>
                <span>{isRTL ? 'استعراض شهادات الاعتماد والتميز' : 'Browse Verified Credentials'}</span>
                <ExternalLink size={15} />
              </Link>
            </div>

          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--text-primary)' }}>
              {isRTL ? 'أرقام ومؤشرات الأداء الهندسية' : 'Engineering Key Performance Indicators'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            {displayStats.map((st, i) => (
              <div key={i} className="corporate-card" style={{ padding: '1.5rem 1.25rem', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--brand-primary)' }}>
                  {st.value}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {isRTL ? st.label : st.enLabel}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {isRTL ? st.enLabel : st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Matrix */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)' }}>
              {isRTL ? 'مصفوفة المهارات والقدرات التقنية (Technical Toolbox)' : 'Technical Toolbox & Skill Matrix'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {skillsMatrix.map((cat, idx) => {
              const categoryName = isRTL ? (cat.categoryAr || cat.category) : (cat.categoryEn || cat.category);
              return (
                <div key={idx} className="corporate-card" style={{ padding: '1.75rem', backgroundColor: '#ffffff', borderRadius: '18px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                    {categoryName}
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
              );
            })}
          </div>
        </div>

      </div>

      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />

      {previewImage && (
        <CertificateModal 
          cert={previewImage} 
          onClose={() => setPreviewImage(null)} 
        />
      )}

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
