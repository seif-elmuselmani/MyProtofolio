import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Award, Calendar, ShieldCheck, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CertificateModal({ cert, onClose, onNext, onPrev, currentIndex, totalCount }) {
  const { isRTL } = useLanguage();

  useEffect(() => {
    if (cert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (!cert) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (isRTL ? onPrev : onNext) (isRTL ? onPrev : onNext)();
      } else if (e.key === 'ArrowLeft') {
        if (isRTL ? onNext : onPrev) (isRTL ? onNext : onPrev)();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose, onNext, onPrev, isRTL]);

  if (!cert) return null;

  const certTitle = isRTL ? (cert.titleAr || cert.title) : (cert.titleEn || cert.title);
  const certIssuer = isRTL ? (cert.issuerAr || cert.issuer) : (cert.issuerEn || cert.issuer);
  const certDesc = isRTL ? (cert.descriptionAr || cert.description) : (cert.descriptionEn || cert.description);

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 250,
        backgroundColor: 'rgba(15, 23, 42, 0.82)',
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
          maxWidth: '820px',
          width: '95%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.45)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {typeof currentIndex === 'number' && typeof totalCount === 'number' && totalCount > 1 && (
              <span className="pill-badge pill-gold" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
                {currentIndex + 1} {isRTL ? 'من' : 'of'} {totalCount}
              </span>
            )}
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ({isRTL ? 'يمكن التنقل بأسهم الكيبورد ➔ ⬅' : 'Navigate using keyboard arrow keys ⬅ ➔'})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Prev Button */}
            {onPrev && (
              <button
                onClick={onPrev}
                title={isRTL ? "الشهادة السابقة" : "Previous Credential"}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '10px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {isRTL ? (
                  <><span>السابقة</span><ChevronRight size={18} /></>
                ) : (
                  <><ChevronLeft size={18} /><span>Prev</span></>
                )}
              </button>
            )}

            {/* Next Button */}
            {onNext && (
              <button
                onClick={onNext}
                title={isRTL ? "الشهادة التالية" : "Next Credential"}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '10px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {isRTL ? (
                  <><ChevronLeft size={18} /><span>التالية</span></>
                ) : (
                  <><span>Next</span><ChevronRight size={18} /></>
                )}
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                color: '#dc2626',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-smooth)'
              }}
              aria-label={isRTL ? "إغلاق" : "Close"}
            >
              <X size={20} />
            </button>
          </div>

        </div>

        {/* Certificate Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div 
            style={{
              padding: '0.65rem',
              borderRadius: '12px',
              backgroundColor: 'var(--brand-primary-light)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Award size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              {certIssuer}
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {certTitle}
            </h3>
          </div>
        </div>

        {/* Certificate Image Preview Container with Side Overlay Nav Buttons */}
        <div 
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            marginBottom: '1.25rem',
            maxHeight: '460px',
            backgroundColor: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img 
            src={cert.image} 
            alt={certTitle} 
            style={{ width: '100%', height: 'auto', maxHeight: '460px', objectFit: 'contain', display: 'block' }} 
          />

          {/* Side Nav Overlays */}
          {onPrev && (
            <button
              onClick={onPrev}
              style={{
                position: 'absolute',
                right: isRTL ? '10px' : 'auto',
                left: isRTL ? 'auto' : '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
              title={isRTL ? "الشهادة السابقة" : "Previous"}
            >
              {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              style={{
                position: 'absolute',
                left: isRTL ? '10px' : 'auto',
                right: isRTL ? 'auto' : '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
              title={isRTL ? "الشهادة التالية" : "Next"}
            >
              {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          )}
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
            <span>{isRTL ? 'التاريخ:' : 'Date:'} <strong>{cert.date || cert.issueDate}</strong></span>
          </div>
          {(cert.verificationId || cert.credentialId) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--brand-emerald)" />
              <span>{isRTL ? 'التحقق الرقمي:' : 'Credential Verification:'} <strong>{cert.verificationId || cert.credentialId}</strong></span>
            </div>
          )}
        </div>

        {/* Description */}
        {certDesc && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              {isRTL ? 'تفاصيل الاعتماد والمهارات:' : 'Credential & Skill Details:'}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {certDesc}
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
              <span>{isRTL ? 'تحميل المستند الرسمي (PDF)' : 'Download Official PDF'}</span>
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
            <span>{isRTL ? 'فتح الصورة بالحجم الكامل' : 'Open Full High-Res Image'}</span>
          </a>
        </div>

      </div>
    </div>,
    document.body
  );
}
