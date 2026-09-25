import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code2, 
  ExternalLink,
  FileText,
  Eye,
  CheckCircle2,
  Sparkles,
  FolderArchive
} from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

export default function ResumeModal({ isOpen, onClose }) {
  const { personalInfo, certificatesList, skillsMatrix, cvArchive } = usePortfolioData();

  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' | 'pdf'
  
  // Filter active CVs only for public display
  const activeCvs = (cvArchive || []).filter(cv => cv.active !== false);
  const [selectedCv, setSelectedCv] = useState(activeCvs[0] || (cvArchive && cvArchive[0]));

  const modalBodyRef = useRef(null);

  // Lock body scroll when open and auto-scroll modal body to top
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Auto-scroll body to top when tab or selected CV changes
  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [activeTab, selectedCv]);

  if (!isOpen) return null;

  const currentCv = selectedCv || activeCvs[0];

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 250,
        backgroundColor: 'rgba(15, 23, 42, 0.78)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        className="animate-fade-in"
        style={{
          maxWidth: '1020px',
          width: '96%',
          height: '88vh',
          maxHeight: '880px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Sticky Header */}
        <div 
          style={{
            padding: '1.15rem 1.75rem',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            flexShrink: 0
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={22} color="#2563eb" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0 }}>
                السيرة الذاتية والاعتمادات الرسمية (CV & Resume)
              </h2>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
              تصفح وحمل النسخ المعتمدة لسيرة المهندس سيف الدين محمد المحدثة لعام 2026.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#e2e8f0', padding: '0.35rem', borderRadius: '12px' }}>
            <button
              onClick={() => setActiveTab('interactive')}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9px',
                fontSize: '0.86rem',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'interactive' ? '#ffffff' : 'transparent',
                color: activeTab === 'interactive' ? '#2563eb' : '#64748b',
                boxShadow: activeTab === 'interactive' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              🌐 السيرة التفاعلية (Web)
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9px',
                fontSize: '0.86rem',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'pdf' ? '#ffffff' : 'transparent',
                color: activeTab === 'pdf' ? '#2563eb' : '#64748b',
                boxShadow: activeTab === 'pdf' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              📄 معاينة PDF مباشرة
            </button>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '0.45rem',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#e2e8f0',
              color: '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic CV Selector Header - Fixed Top */}
        <div style={{ padding: '1rem 1.75rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#475569', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FolderArchive size={16} color="#2563eb" />
            <span>اختر من خزان السير الذاتية المتاحة (Active CVs):</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
            {activeCvs.map((cv) => {
              const isSelected = currentCv && currentCv.id === cv.id;
              return (
                <div
                  key={cv.id}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    backgroundColor: isSelected ? '#eff6ff' : '#f8fafc',
                    boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.12)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.6rem',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedCv(cv)}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span 
                        style={{ 
                          fontSize: '0.72rem', 
                          fontWeight: '800', 
                          color: '#ffffff', 
                          backgroundColor: cv.badgeColor || '#2563eb', 
                          padding: '0.15rem 0.5rem', 
                          borderRadius: '6px' 
                        }}
                      >
                        {cv.badge || 'Official'}
                      </span>
                      {cv.isDefault && (
                        <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#059669', backgroundColor: '#d1fae5', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
                          ★ الأساسي
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '0.94rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.2rem', lineHeight: 1.3 }}>
                      {cv.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                      {cv.subtitle}
                    </p>
                  </div>

                  {/* Actions Row */}
                  <div style={{ display: 'flex', gap: '0.45rem', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
                    <a
                      href={cv.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        padding: '0.45rem 0.75rem',
                        borderRadius: '9px',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={13} />
                      <span>تحميل الـ PDF</span>
                    </a>

                    <a
                      href={cv.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.45rem 0.75rem',
                        borderRadius: '9px',
                        backgroundColor: '#ffffff',
                        color: '#334155',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem'
                      }}
                      title="فتح في تبويب مستقل"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={13} />
                      <span>عرض</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body (Always Starts at Top) */}
        <div ref={modalBodyRef} style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>

          {activeTab === 'pdf' ? (
            <div style={{ height: '100%', minHeight: '520px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
              {currentCv ? (
                <iframe
                  src={`${currentCv.fileUrl}#toolbar=1`}
                  title={currentCv.title}
                  style={{ width: '100%', height: '100%', minHeight: '520px', border: 'none' }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#64748b' }}>
                  لا يوجد ملف CV محدد للمعاينة
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Interactive Web Resume View */}
              <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '2px dashed #e2e8f0' }}>
                <h1 style={{ fontSize: '2.1rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {personalInfo.nameAr}
                </h1>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--brand-primary)', marginBottom: '0.75rem' }}>
                  {personalInfo.roleAr} • الحائز على المركز الأول على مستوى الجمهورية (DEPI)
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Mail size={15} color="var(--brand-primary)" />
                    {personalInfo.email}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Phone size={15} color="var(--brand-primary)" />
                    {personalInfo.phone}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={15} color="var(--brand-primary)" />
                    مصر، الشرقية / القاهرة
                  </span>
                </div>
              </div>

              {/* Education */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap size={20} color="var(--brand-primary)" />
                  التعليم والمؤهل الأكاديمي (Education)
                </h3>
                <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '1.02rem' }}>{personalInfo.education.degree}</strong>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: '700', fontSize: '0.9rem' }}>{personalInfo.education.period}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                    {personalInfo.education.university} — التقدير العام: <strong>{personalInfo.education.grade}</strong> (GPA: {personalInfo.education.gpa})
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                    مشروع التخرج: <strong>{personalInfo.education.gradProjectGrade}</strong>
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={20} color="var(--brand-primary)" />
                  الخبرات والتدريبات التقنية (Experience & Training)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Main Technical Coding Tutor</strong>
                      <span style={{ color: 'var(--brand-primary)', fontSize: '0.85rem', fontWeight: '700' }}>يونيو 2026 - حتى الآن</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>iSchool & Digital Egypt Cubs Initiative (DEMI) • وزارة الاتصالات</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                      إدارة الجلسات التدريبية المباشرة في البرمجة والذكاء الاصطناعي والروبوتات للأجيال الصاعدة وتطبيق مناهج عملية في الخوارزميات والتفكير الحسابي.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Full Stack .NET Developer Trainee & 1st Place Winner</strong>
                      <span style={{ color: 'var(--brand-primary)', fontSize: '0.85rem', fontWeight: '700' }}>يونيو 2025 - ديسمبر 2025</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>Digital Egypt Pioneers Initiative (DEPI) • وزارة الاتصالات وتكنولوجيا المعلومات</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                      تطوير خوادم وواجهات منصة شريان لبنوك الدم والمستشفيات، والفوز بالمركز الأول على مستوى الجمهورية (Top 1 Nationwide).
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>MEAN Stack Developer Intern (210 Hours)</strong>
                      <span style={{ color: 'var(--brand-primary)', fontSize: '0.85rem', fontWeight: '700' }}>فبراير 2026 - يونيو 2026</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>المعهد القومي للاتصالات (NTI)</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                      تطوير تطبيقات متكاملة بـ Node.js, Express, Angular, MongoDB، والحصول على توصيات إشادة وتوجيه رسمي من إدارة المعهد.
                    </p>
                  </div>

                </div>
              </div>

              {/* Key Skills */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code2 size={20} color="var(--brand-primary)" />
                  المهارات والتقنيات الأساسية (Key Skills)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {(skillsMatrix || []).map((matrix, idx) => (
                    <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{matrix.category}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {(matrix.skills || []).map((s, i) => (
                          <span key={i} className="pill-badge pill-slate" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} color="var(--brand-primary)" />
                  الشهادات والاعتمادات الرسمية الموثقة
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {(certificatesList || []).map((c) => (
                    <div key={c.id} style={{ padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>{c.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--brand-primary)', fontWeight: '600' }}>{c.issuer}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.verificationId}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>,
    document.body
  );
}
