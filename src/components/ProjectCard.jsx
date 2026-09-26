import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Layers } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';

export default function ProjectCard({ project }) {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="corporate-card" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: isHovered ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
        boxShadow: isHovered ? '0 16px 36px rgba(37, 99, 235, 0.12)' : '0 4px 18px rgba(15, 23, 42, 0.04)',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div>
        {/* Project Thumbnail Image Container (Clean & Crisp - No Dark Box Overlays) */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <img 
            src={project.image} 
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />

          {/* Distinction / Award Gold Badge */}
          {project.badge && (
            <div 
              style={{
                position: 'absolute',
                top: '0.85rem',
                right: '0.85rem',
                zIndex: 2
              }}
            >
              <span className="pill-badge pill-gold" style={{ boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)', whiteSpace: 'nowrap', fontWeight: '800' }}>
                <Sparkles size={13} />
                {project.badge}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div style={{ padding: '1.6rem 1.6rem 1rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.82rem', color: '#2563eb', fontWeight: '800', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {project.subtitle}
          </div>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.65rem', lineHeight: 1.35 }}>
            {project.title}
          </h3>

          <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.75, marginBottom: '1.35rem', fontWeight: '500' }}>
            {project.summary}
          </p>

          {/* Technology Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1rem' }}>
            {(project.tags || []).map((tag, idx) => (
              <span 
                key={idx} 
                style={{ 
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  fontSize: '0.78rem', 
                  padding: '0.3rem 0.7rem', 
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  fontWeight: '700',
                  border: '1px solid #e2e8f0'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card High-Contrast Action Buttons Footer */}
      <div 
        style={{ 
          padding: '1.25rem 1.6rem', 
          borderTop: '1px solid #e2e8f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '0.65rem', 
          backgroundColor: '#f8fafc' 
        }}
      >
        <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Live System Button (Vibrant Green) */}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#059669',
                color: '#ffffff',
                padding: '0.5rem 1.05rem',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.28)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>الموقع الحي</span>
              <ExternalLink size={14} />
            </a>
          )}

          {/* GitHub Repo Button (Corporate Dark Slate) */}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                padding: '0.5rem 0.95rem',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(30, 41, 59, 0.18)',
                transition: 'all 0.2s ease'
              }}
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          )}

        </div>

        {/* Case Study Modal Trigger Button (Premium Brand Blue) */}
        {project.caseStudy && (
          <button
            onClick={() => setIsCaseStudyOpen(true)}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '0.84rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
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
