import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Layers, Sparkles } from 'lucide-react';

export default function SlideViewer({ deck }) {
  const slides = deck.slides && deck.slides.length > 0 ? deck.slides : [
    {
      title: deck.title,
      caption: deck.description,
      image: deck.coverImage
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides[currentSlideIndex];

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="corporate-card" style={{ overflow: 'hidden', backgroundColor: '#ffffff' }}>
      
      {/* Header of the viewer */}
      <div 
        style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div>
          <span className="pill-badge pill-gold" style={{ marginBottom: '0.25rem' }}>
            {deck.category}
          </span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>{deck.title}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="pill-badge pill-slate" style={{ fontSize: '0.82rem' }}>
            <Layers size={14} color="var(--brand-primary)" />
            <span>عرض تفاعلي</span>
          </div>
        </div>
      </div>

      {/* Main Slide Display Screen */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: '#0f172a',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src={currentSlide.image} 
          alt={currentSlide.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.3s ease'
          }}
        />

        {/* Caption Overlay */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.6) 70%, transparent 100%)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.25rem' }}>
            {currentSlide.title}
          </h4>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0 }}>
            {currentSlide.caption}
          </p>
        </div>
      </div>

    </div>
  );
}