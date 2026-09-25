import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  X,
  Presentation
} from 'lucide-react';

export default function SlideViewer({ deck, onClose }) {
  const slides = (deck.slides && deck.slides.length > 0)
    ? deck.slides 
    : (deck.slidesFolder && deck.slidesCount)
      ? Array.from({ length: deck.slidesCount }, (_, i) => ({
          id: i + 1,
          title: `الشريحة رقم ${i + 1}`,
          image: `${deck.slidesFolder}slide_${String(i + 1).padStart(2, '0')}.png`
        }))
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = slides[currentIndex];

  const handleNext = () => {
    if (slides.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  };

  const handlePrev = () => {
    if (slides.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  return (
    <div 
      className="corporate-card slide-viewer-container"
      style={{
        position: isFullscreen ? 'fixed' : 'relative',
        inset: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 99999 : 1,
        backgroundColor: '#ffffff',
        borderRadius: isFullscreen ? 0 : '20px',
        overflow: 'hidden',
        boxShadow: isFullscreen ? 'none' : 'var(--shadow-modal)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Light Enterprise Header Bar */}
      <div 
        style={{
          padding: '1.1rem 1.6rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(37,99,235,0.08)'
            }}
          >
            <Presentation size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.15rem', flexWrap: 'wrap' }}>
              <span className="pill-badge pill-gold" style={{ fontSize: '0.78rem' }}>
                {deck.category || 'Graduation Defense Deck'}
              </span>
              <span className="pill-badge pill-slate" style={{ fontSize: '0.78rem' }}>
                الشريحة {currentIndex + 1} من {slides.length}
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
              {deck.title}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn-secondary"
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.82rem',
              gap: '0.35rem',
              borderRadius: '10px'
            }}
            title={isFullscreen ? 'الخروج من العرض الكامل' : 'عرض بملء الشاشة'}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            <span>{isFullscreen ? 'تصغير' : 'ملء الشاشة'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#ef4444',
                padding: '0.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'var(--transition-smooth)'
              }}
              title="إغلاق العارض"
            >
              <X size={18} />
            </button>
          )}

        </div>
      </div>

      {/* Light Canvas Slide Display Stage */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          flexGrow: 1,
          minHeight: isFullscreen ? '78vh' : '500px',
          backgroundColor: '#f8fafc',
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.75rem',
          overflow: 'hidden'
        }}
      >
        {/* Previous Button */}
        {slides.length > 1 && (
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              right: '1.25rem',
              zIndex: 10,
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: 'var(--text-primary)',
              padding: '0.75rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
              transition: 'var(--transition-smooth)'
            }}
            title="الشريحة السابقة (السهم الأيمن)"
          >
            <ChevronRight size={22} color="var(--brand-primary)" />
          </button>
        )}

        {/* Current Slide Image with Clean Surface Frame */}
        {currentSlide ? (
          <div 
            style={{ 
              position: 'relative', 
              maxWidth: '100%', 
              maxHeight: '100%', 
              display: 'flex', 
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              padding: '0.5rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)'
            }}
          >
            <img 
              src={currentSlide.image} 
              alt={`Slide ${currentIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: isFullscreen ? '80vh' : '460px',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            لا توجد شرائح متاحة في هذا العرض
          </div>
        )}

        {/* Next Button */}
        {slides.length > 1 && (
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              left: '1.25rem',
              zIndex: 10,
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: 'var(--text-primary)',
              padding: '0.75rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
              transition: 'var(--transition-smooth)'
            }}
            title="الشريحة التالية (السهم الأيسر)"
          >
            <ChevronLeft size={22} color="var(--brand-primary)" />
          </button>
        )}
      </div>

      {/* Light Enterprise Thumbnails Strip */}
      {slides.length > 1 && (
        <div 
          style={{
            padding: '0.85rem 1.5rem',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            gap: '0.65rem',
            overflowX: 'auto',
            alignItems: 'center'
          }}
        >
          {slides.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                position: 'relative',
                flexShrink: 0,
                cursor: 'pointer',
                borderRadius: '10px',
                overflow: 'hidden',
                border: currentIndex === idx ? '2px solid #2563eb' : '1px solid #e2e8f0',
                opacity: currentIndex === idx ? 1 : 0.65,
                transition: 'var(--transition-smooth)',
                boxShadow: currentIndex === idx ? '0 4px 12px rgba(37,99,235,0.2)' : 'none',
                backgroundColor: '#f8fafc'
              }}
            >
              <img 
                src={s.image} 
                alt={`thumb-${idx}`} 
                style={{ width: '75px', height: '48px', objectFit: 'cover' }}
              />
              <span 
                style={{ 
                  position: 'absolute', 
                  bottom: 2, 
                  right: 2, 
                  backgroundColor: currentIndex === idx ? '#2563eb' : 'rgba(15, 23, 42, 0.75)', 
                  color: '#ffffff', 
                  fontSize: '0.65rem', 
                  padding: '0.1rem 0.35rem', 
                  borderRadius: '4px',
                  fontWeight: '700'
                }}
              >
                {idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}