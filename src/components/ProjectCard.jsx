import React, { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProjectCard({ project }) {
  const [showCaseStudy, setShowCaseStudy] = useState(false);

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

        {/* Clean Action Buttons Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            
            {/* Live Demo */}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', gap: '0.35rem' }}
              >
                <span>الموقع الحي</span>
                <ExternalLink size={13} />
              </a>
            )}

            {/* GitHub Repositories */}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', gap: '0.35rem' }}
              >
                <Github size={13} />
                <span>مستودعات GitHub</span>
              </a>
            )}

          </div>

          {/* Case Study Toggle */}
          {project.caseStudy && (
            <button
              onClick={() => setShowCaseStudy(!showCaseStudy)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--brand-primary)',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.5rem',
                borderRadius: '6px'
              }}
            >
              <span>{showCaseStudy ? 'إخفاء الدراسة' : 'تفاصيل المشروع (Case Study)'}</span>
              {showCaseStudy ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          )}
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
              <div style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', fontWeight: '700' }}>الحل الهندسي:</div>
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
    </div>
  );
}