import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Layers } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';

export default function ProjectCard({ project }) {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  return (
    <div 
      className="corporate-card" 
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '22px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
        transition: 'all 0.3s ease'
      }}
    >
      <div>
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
          {project.badge && (
            <div 
              style={{
                position: 'absolute',
                top: '0.85rem',
                right: '0.85rem',
                zIndex: 2
              }}
            >
              <span className="pill-badge pill-gold" style={{ boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)', whiteSpace: 'nowrap' }}>
                <Sparkles size={12} />
                {project.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.82rem', color: '#2563eb', fontWeight: '800', marginBottom: '0.35rem' }}>
            {project.subtitle}
          </div>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.65rem', lineHeight: 1.4 }}>
            {project.title}
          </h3>

          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, marginBottom: '1.25rem', fontWeight: '500' }}>
            {project.summary}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            {(project.tags || []).map((tag, idx) => (
              <span 
                key={idx} 
                className="pill-badge pill-slate" 
                style={{ 
                  fontSize: '0.75rem', 
                  padding: '0.25rem 0.6rem', 
                  whiteSpace: 'nowrap',
                  fontWeight: '600'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons Footer */}
      <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', backgroundColor: '#f8fafc' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          
          {/* Live Demo */}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', gap: '0.35rem', whiteSpace: 'nowrap' }}
            >
              <span>الموقع الحي</span>
              <ExternalLink size={13} />
            </a>
          )}

          {/* GitHub Repo */}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', gap: '0.35rem', whiteSpace: 'nowrap' }}
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
          )}

        </div>

        {/* Case Study Modal Trigger Button */}
        {project.caseStudy && (
          <button
            onClick={() => setIsCaseStudyOpen(true)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#2563eb',
              fontSize: '0.82rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '10px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={14} />
            <span>دراسة الحالة ↗</span>
          </button>
        )}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        project={project}
      />
    </div>
  );
}
