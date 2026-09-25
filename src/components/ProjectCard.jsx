import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  Presentation, 
  Download, 
  Images, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Code2
} from 'lucide-react';

export default function ProjectCard({ project }) {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeTab, setActiveTab] = useState('doctor');
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const galleries = project.galleries || null;
  const galleryKeys = galleries ? Object.keys(galleries) : [];

  const currentCategoryImages = (galleries && galleries[activeTab]) ? galleries[activeTab] : [];
  const activeImage = currentCategoryImages[selectedImgIndex] || currentCategoryImages[0] || null;

  const handleNextImage = () => {
    if (currentCategoryImages.length > 0) {
      setSelectedImgIndex((prev) => (prev + 1) % currentCategoryImages.length);
    }
  };

  const handlePrevImage = () => {
    if (currentCategoryImages.length > 0) {
      setSelectedImgIndex((prev) => (prev - 1 + currentCategoryImages.length) % currentCategoryImages.length);
    }
  };

  return (
    <div className="corporate-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* Project Thumbnail */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#0f172a' }}>
        <img 
          src={project.image} 
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
          {project.badge && (
            <span className="pill-badge pill-gold" style={{ boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)' }}>
              <Sparkles size={12} />
              {project.badge}
            </span>
          )}
        </div>

        {galleries && (
          <button
            onClick={() => {
              setActiveTab(galleryKeys[0] || 'doctor');
              setSelectedImgIndex(0);
              setShowGalleryModal(true);
            }}
            style={{
              position: 'absolute',
              bottom: '0.85rem',
              left: '0.85rem',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            <Images size={14} color="#60a5fa" />
            <span>تصفح واجهات النظام (Screenshots)</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--brand-primary)', fontWeight: '700', marginBottom: '0.35rem' }}>
          {project.subtitle}
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
          {project.summary}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {project.tags.map((tag, idx) => (
            <span key={idx} className="pill-badge pill-slate" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Multi-Link Action Buttons Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            
            {/* Live Demo */}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', gap: '0.35rem' }}
                title="الموقع الحي المنشور على الإنترنت"
              >
                <ExternalLink size={13} />
                <span>الموقع الحي</span>
              </a>
            )}

            {/* GitHub Organization / Repository */}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', gap: '0.35rem' }}
                title="مستودعات المشروع على GitHub"
              >
                <Github size={13} />
                <span>{project.githubFrontendUrl ? "Backend (.NET 8)" : "مستودعات GitHub"}</span>
              </a>
            )}

            {/* Frontend Repo (if specified) */}
            {project.githubFrontendUrl && (
              <a 
                href={project.githubFrontendUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', gap: '0.35rem', borderColor: '#3b82f6', color: '#1d4ed8' }}
                title="مستودع كود الـ Frontend"
              >
                <Code2 size={13} />
                <span>Frontend</span>
              </a>
            )}

            {/* Presentation Repo / Download */}
            {project.presentationUrl && (
              <a 
                href={project.presentationUrl} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  padding: '0.45rem 0.85rem', 
                  fontSize: '0.8rem', 
                  gap: '0.35rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  backgroundColor: '#fef3c7',
                  color: '#b45309',
                  border: '1px solid #fcd34d',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
                title="عرض ومستودع السلايدات والـ PowerPoint"
              >
                <Presentation size={13} />
                <span>البريزنتيشن (GitHub)</span>
              </a>
            )}

            {project.presentationFile && (
              <a 
                href={project.presentationFile} 
                download
                style={{ 
                  padding: '0.45rem 0.85rem', 
                  fontSize: '0.8rem', 
                  gap: '0.35rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  backgroundColor: '#ecfdf5',
                  color: '#047857',
                  border: '1px solid #6ee7b7',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
                title="تحميل ملف الـ PowerPoint المباشر (.pptx)"
              >
                <Download size={13} />
                <span>تحميل PPTX</span>
              </a>
            )}

          </div>

          {/* Case Study Toggle */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
            {project.caseStudy && (
              <button
                onClick={() => setShowCaseStudy(!showCaseStudy)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--brand-primary)',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '6px'
                }}
              >
                <span>{showCaseStudy ? 'إخفاء الدراسة' : 'تفاصيل المعمارية والدراسة (Case Study)'}</span>
                {showCaseStudy ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            )}
          </div>

        </div>

        {/* Collapsible Case Study */}
        {showCaseStudy && project.caseStudy && (
          <div 
            style={{
              marginTop: '1.25rem',
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0'
            }}
            className="animate-fade-in"
          >
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--brand-prestige)', fontWeight: '700' }}>التحدي والمشكلة:</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: 1.5 }}>{project.caseStudy.challenge}</p>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', fontWeight: '700' }}>الحل الهندسي المعماري:</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: 1.5 }}>{project.caseStudy.solution}</p>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--brand-emerald)', fontWeight: '700' }}>أبرز النتائج والمؤشرات:</div>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.3rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {project.caseStudy.highlights.map((h, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <CheckCircle2 size={15} color="var(--brand-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>

      {/* Screenshot Gallery Modal */}
      {showGalleryModal && galleries && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setShowGalleryModal(false)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1100px',
              backgroundColor: '#1e293b',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.15)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              style={{ 
                padding: '1rem 1.5rem', 
                borderBottom: '1px solid rgba(255,255,255,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                backgroundColor: '#0f172a'
              }}
            >
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>
                  معرض شاشات وواجهات {project.title}
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0.2rem 0 0' }}>
                  تصفح شاشات الواجهة الحقيقية مقسمة حسب المستخدم
                </p>
              </div>

              <button
                onClick={() => setShowGalleryModal(false)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Tabs */}
            <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '0.5rem' }}>
              {galleryKeys.map((catKey) => {
                const tabLabels = {
                  doctor: '🩺 واجهة الطبيب (Doctor Portal)',
                  patient: '👤 واجهة المريض (Patient Portal)',
                  verifier: '📊 واجهة المدقق الإداري (Verifier)'
                };
                return (
                  <button
                    key={catKey}
                    onClick={() => {
                      setActiveTab(catKey);
                      setSelectedImgIndex(0);
                    }}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      border: 'none',
                      backgroundColor: activeTab === catKey ? '#2563eb' : 'rgba(255,255,255,0.06)',
                      color: activeTab === catKey ? '#ffffff' : '#cbd5e1',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tabLabels[catKey] || catKey}
                  </button>
                );
              })}
            </div>

            {/* Image Stage */}
            <div style={{ position: 'relative', flexGrow: 1, backgroundColor: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', minHeight: '400px', overflow: 'hidden' }}>
              {activeImage ? (
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  
                  {/* Prev Button */}
                  {currentCategoryImages.length > 1 && (
                    <button
                      onClick={handlePrevImage}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        zIndex: 10,
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#ffffff',
                        padding: '0.65rem',
                        borderRadius: '9999px',
                        cursor: 'pointer'
                      }}
                    >
                      <ChevronRight size={22} />
                    </button>
                  )}

                  {/* Main Image */}
                  <img 
                    src={activeImage} 
                    alt="Project Screenshot"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '60vh',
                      objectFit: 'contain',
                      borderRadius: '10px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                  />

                  {/* Next Button */}
                  {currentCategoryImages.length > 1 && (
                    <button
                      onClick={handleNextImage}
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        zIndex: 10,
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#ffffff',
                        padding: '0.65rem',
                        borderRadius: '9999px',
                        cursor: 'pointer'
                      }}
                    >
                      <ChevronLeft size={22} />
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ color: '#94a3b8' }}>لا توجد صور متاحة في هذا القسم</div>
              )}
            </div>

            {/* Thumbnails Row */}
            {currentCategoryImages.length > 1 && (
              <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0f172a', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
                {currentCategoryImages.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt="thumb"
                    onClick={() => setSelectedImgIndex(idx)}
                    style={{
                      width: '70px',
                      height: '45px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border: selectedImgIndex === idx ? '2px solid #2563eb' : '2px solid transparent',
                      opacity: selectedImgIndex === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}