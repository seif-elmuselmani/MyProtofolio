import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Award, CheckCircle2, Calendar, ShieldCheck, Download } from 'lucide-react';

export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    if (cert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cert]);

  if (!cert) return null;

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
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div 
        className="animate-fade-in"
        style={{
          maxWidth: '750px',
          width: '95%',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#f1f5f9',
            border: '1px solid #e2e8f0',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-smooth)'
          }}
          aria-label="إغلاق"
        >
          <X size={20} />
        </button>

        {/* Certificate Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div 
            style={{
              padding: '0.65rem',
              borderRadius: '12px',
              backgroundColor: 'var(--brand-primary-light)',
              color: 'var(--brand-primary)'
            }}
          >
            <Award size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              {cert.issuer}
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {cert.title}
            </h3>
          </div>
        </div>

        {/* Certificate Image Preview */}
        <div 
          style={{
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            marginBottom: '1.25rem',
            maxHeight: '420px',
            backgroundColor: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img 
            src={cert.image} 
            alt={cert.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'contain', display: 'block' }} 
          />
        </div>

        {/* Details Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <Calendar size={16} color="var(--brand-primary)" />
            <span>التاريخ: <strong>{cert.date || cert.issueDate}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={16} color="var(--brand-emerald)" />
            <span>التحقق: <strong>{cert.verificationId || cert.credentialId}</strong></span>
          </div>
        </div>

        {/* Description */}
        {cert.description && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              تفاصيل الاعتماد والمهارات:
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {cert.description}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
          {cert.pdfUrl && (
            <a 
              href={cert.pdfUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.15rem' }}
            >
              <Download size={15} />
              <span>تحميل المستند الرسمي (PDF)</span>
            </a>
          )}
          <a 
            href={cert.image} 
            target="_blank" 
            rel="noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1.15rem' }}
          >
            <ExternalLink size={15} />
            <span>فتح الصورة بالحجم الكامل</span>
          </a>
        </div>

      </div>
    </div>,
    document.body
  );
}
