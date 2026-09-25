import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  Layers, 
  ExternalLink, 
  Download, 
  X,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

export default function TrustPartnersTicker() {
  const { trustPartners } = usePortfolioData();
  const partnersList = (trustPartners && trustPartners.length > 0) ? trustPartners : [];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isGridView, setIsGridView] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (selectedProof) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProof]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const marqueeItems = [...partnersList, ...partnersList, ...partnersList, ...partnersList];

  return (
    <section 
      style={{ 
        padding: '3.5rem 0 4rem', 
        backgroundColor: '#ffffff', 
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container-custom">
        
        {/* Header Bar with Interactive User Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                color: '#1d4ed8',
                fontSize: '0.82rem',
                fontWeight: '800',
                marginBottom: '0.6rem'
              }}
            >
              <ShieldCheck size={16} color="#2563eb" />
              <span>توثيق واعتمادات المؤسسات والجهات الرسمية</span>
            </div>

            <h3 
              style={{ 
                fontSize: '1.6rem', 
                fontWeight: '900', 
                color: 'var(--text-primary)', 
                margin: '0 0 0.35rem',
                lineHeight: 1.3
              }}
            >
              مؤسسات وجهات ومراكز تدريب وثقت في سيف
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, fontWeight: '500' }}>
              اضغط على أي مؤسسة لاستعراض وثيقة إثبات الاعتماد والتكريم الرسمي الموثق.
            </p>
          </div>

          {/* Controls Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f1f5f9', padding: '0.35rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '800',
                border: 'none',
                backgroundColor: isPlaying ? '#ffffff' : '#e2e8f0',
                color: isPlaying ? '#2563eb' : '#64748b',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: isPlaying ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
              title={isPlaying ? 'إيقاف الحركة مؤقتاً' : 'تشغيل الحركة'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}</span>
            </button>

            <button
              onClick={() => setIsGridView(!isGridView)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '800',
                border: 'none',
                backgroundColor: isGridView ? '#2563eb' : '#ffffff',
                color: isGridView ? '#ffffff' : '#475569',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title={isGridView ? 'عرض الشريط المتحرك' : 'عرض كافة المؤسسات في شبكة'}
            >
              {isGridView ? <Layers size={14} /> : <Grid size={14} />}
              <span>{isGridView ? 'عرض الشريط' : 'عرض الكل'}</span>
            </button>

            {!isGridView && (
              <div style={{ display: 'flex', gap: '0.25rem', paddingRight: '0.25rem', borderRight: '1px solid #cbd5e1' }}>
                <button
                  onClick={handleScrollRight}
                  style={{
                    padding: '0.45rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="السابق"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={handleScrollLeft}
                  style={{
                    padding: '0.45rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="التالي"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Display Mode */}
        {isGridView ? (
          /* Grid View Mode */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {partnersList.map((partner) => (
              <div
                key={partner.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: '18px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onClick={() => setSelectedProof(partner)}
              >
                <div style={{ width: '54px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={partner.logo} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>

                <div>
                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>{partner.name}</span>
                    <CheckCircle2 size={13} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span>استعراض التوثيق المعتمد ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Marquee View Mode */
          <div className="marquee-wrapper" ref={scrollRef} style={{ direction: "ltr" }}>
            <div className={`marquee-track ${!isPlaying ? 'paused' : ''}`}>
              {marqueeItems.map((partner, index) => (
                <div 
                  key={`${partner.id}-${index}`}
                  className="marquee-card"
                  style={{
                    direction: 'rtl',
                    padding: '0.75rem 1.15rem',
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexShrink: 0,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedProof(partner)}
                  title="اضغط لاستعراض وثيقة الإثبات المعتمدة"
                >
                  {/* Real Official SVG / PNG Logo Image */}
                  <div 
                    style={{
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      style={{
                        maxHeight: '34px',
                        maxWidth: '120px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Text & Verification Info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.92rem', whiteSpace: 'nowrap' }}>
                        {partner.name}
                      </span>
                      <CheckCircle2 size={13} color="#10b981" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                      {partner.badge && (
                        <span 
                          style={{ 
                            fontSize: '0.68rem', 
                            fontWeight: '800', 
                            color: partner.color || '#2563eb', 
                            backgroundColor: partner.bgColor || '#eff6ff', 
                            padding: '0.1rem 0.45rem', 
                            borderRadius: '6px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {partner.badge}
                        </span>
                      )}
                      <span style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: '700', whiteSpace: 'nowrap' }}>
                        (إثبات)
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Proof Modal (نافذة إثبات الاعتماد والتكريم المعتمد) */}
      {selectedProof && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 220,
            backgroundColor: 'rgba(15, 23, 42, 0.78)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
          onClick={() => setSelectedProof(null)}
        >
          <div 
            className="animate-fade-in"
            style={{
              maxWidth: '820px',
              width: '100%',
              maxHeight: '90vh',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Proof Modal Header */}
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FileCheck size={22} color="#2563eb" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                    {selectedProof.proofTitle || `وثيقة توثيق اعتماد ${selectedProof.name}`}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.15rem 0 0' }}>
                    إثبات معتمد ورسمي صادرة من {selectedProof.name} ({selectedProof.enName})
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedProof(null)}
                style={{
                  padding: '0.45rem',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#e2e8f0',
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Proof Content Viewer */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedProof.proofType === 'pdf' ? (
                <iframe 
                  src={`${selectedProof.proofUrl}#toolbar=1`}
                  title={selectedProof.name}
                  style={{ width: '100%', height: '500px', border: 'none', borderRadius: '12px' }}
                />
              ) : (
                <img 
                  src={selectedProof.proofUrl} 
                  alt={selectedProof.name}
                  style={{ maxWidth: '100%', maxHeight: '550px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                />
              )}
            </div>

            {/* Proof Modal Footer */}
            <div style={{ padding: '1rem 1.75rem', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} />
                <span>وثيقة معتمدة وموثقة برمجياً في الأرشيف الرسمي</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={selectedProof.proofUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <Download size={15} />
                  <span>تنزيل الوثيقة</span>
                </a>

                <a
                  href={selectedProof.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                >
                  <ExternalLink size={15} />
                  <span>عرض بالشاشة الكاملة</span>
                </a>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      <style>{`
        .paused {
          animation-play-state: paused !important;
        }
      `}</style>

    </section>
  );
}
