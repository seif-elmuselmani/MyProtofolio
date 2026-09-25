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
  // Dynamic Slide Generation based on deck's explicit slidesFolder or slides array
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
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="slide-viewer-container"
      style={{
        position: isFullscreen ? 'fixed' : 'relative',
        inset: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 99999 : 1,
        backgroundColor: '#0f172a',
        borderRadius: isFullscreen ? 0 : '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header Bar */}
      <div 
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#1e293b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            style={{
              padding: '0.45rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(37, 99, 235, 0.15)',
              color: '#60a5fa',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Presentation size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="pill-badge pill-gold" style={{ fontSize: '0.75rem', padding: '0.15rem 0.6rem' }}>
                {deck.category || 'Graduation Defense Deck'}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>
                الشريحة {currentIndex + 1} من {slides.length}
              </span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', margin: '0.2rem 0 0' }}>
              {deck.title}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: '#ffffff',
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
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
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '0.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="إغلاق العارض"
            >
              <X size={16} />
            </button>
          )}

        </div>
      </div>

      {/* Main Slide Display Stage */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          flexGrow: 1,
          minHeight: isFullscreen ? '75vh' : '480px',
          backgroundColor: '#090d16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          overflow: 'hidden'
        }}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            right: '1.25rem',
            zIndex: 10,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            padding: '0.75rem',
            borderRadius: '9999px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            transition: 'all 0.2s ease'
          }}
          title="الشريحة السابقة (السهم الأيمن)"
        >
          <ChevronRight size={24} />
        </button>

        {/* Current Slide Image */}
        <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={currentSlide.image} 
            alt={`Slide ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: isFullscreen ? '78vh' : '450px',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
            }}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            left: '1.25rem',
            zIndex: 10,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            padding: '0.75rem',
            borderRadius: '9999px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            transition: 'all 0.2s ease'
          }}
          title="الشريحة التالية (السهم الأيسر)"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Thumbnails Row Bar */}
      <div 
        style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#0f172a',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: '0.6rem',
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
              borderRadius: '8px',
              overflow: 'hidden',
              border: currentIndex === idx ? '2px solid #3b82f6' : '2px solid transparent',
              opacity: currentIndex === idx ? 1 : 0.6,
              transition: 'all 0.2s ease',
              boxShadow: currentIndex === idx ? '0 0 12px rgba(59, 130, 246, 0.5)' : 'none'
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
                backgroundColor: 'rgba(0,0,0,0.75)', 
                color: '#fff', 
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

    </div>
  );
}