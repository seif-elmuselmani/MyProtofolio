import React from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, CheckCircle2, ExternalLink, Github, Target, Lightbulb, TrendingUp, Layers } from 'lucide-react';

export default function CaseStudyModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  const caseStudy = project.caseStudy || {};

  return createPortal(
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem'
        }}
        onClick={onClose}
        className="animate-fade-in"
      >
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '740px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(15, 23, 42, 0.25)',
            border: '1px solid #cbd5e1'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div 
            style={{
              padding: '1.5rem 1.75rem',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.45rem', backgroundColor: '#eff6ff', borderRadius: '10px', color: '#2563eb' }}>
                <Layers size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  دراسة حالة هندسية: {project.title}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600', marginTop: '0.15rem' }}>
                  {project.subtitle}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Content Scrollable Area */}
          <div style={{ padding: '1.75rem', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Tags & Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {project.badge && (
                <span className="pill-badge pill-gold" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', whiteSpace: 'nowrap' }}>
                  <Sparkles size={13} />
                  {project.badge}
                </span>
              )}
              {(project.tags || []).map((tag, idx) => (
                <span key={idx} className="pill-badge pill-slate" style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem', whiteSpace: 'nowrap' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* The Challenge Block */}
            {caseStudy.challenge && (
              <div 
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: '#fff7ed',
                  border: '1.5px solid #fed7aa',
                  boxShadow: '0 2px 10px rgba(234, 88, 12, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.92rem', color: '#c2410c', fontWeight: '800', marginBottom: '0.45rem' }}>
                  <Target size={18} />
                  <span>التحدي والمشكلة (The Challenge)</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.75, margin: 0, fontWeight: '500' }}>
                  {caseStudy.challenge}
                </p>
              </div>
            )}

            {/* The Solution Block */}
            {caseStudy.solution && (
              <div 
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: '#eff6ff',
                  border: '1.5px solid #bfdbfe',
                  boxShadow: '0 2px 10px rgba(37, 99, 235, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.92rem', color: '#1d4ed8', fontWeight: '800', marginBottom: '0.45rem' }}>
                  <Lightbulb size={18} />
                  <span>الحل الهندسي (The Engineering Solution)</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.75, margin: 0, fontWeight: '500' }}>
                  {caseStudy.solution}
                </p>
              </div>
            )}

            {/* Key Results & Impact List */}
            {caseStudy.highlights && caseStudy.highlights.length > 0 && (
              <div 
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: '#f0fdf4',
                  border: '1.5px solid #bbf7d0',
                  boxShadow: '0 2px 10px rgba(22, 163, 74, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.92rem', color: '#15803d', fontWeight: '800', marginBottom: '0.75rem' }}>
                  <TrendingUp size={18} />
                  <span>أبرز النتائج والمؤشرات الهندسية (Key Results & Impact)</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {caseStudy.highlights.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                      <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.6, fontWeight: '600' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div 
            style={{
              padding: '1.25rem 1.75rem',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    padding: '0.6rem 1.3rem',
                    fontSize: '0.88rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '700'
                  }}
                >
                  <span>زيارة الموقع الحي ↗</span>
                  <ExternalLink size={15} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Github size={15} />
                  <span>مستودعات GitHub</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.6rem 1.35rem', fontSize: '0.88rem' }}
            >
              إغلاق النافذة
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
