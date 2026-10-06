import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, FileCheck, ExternalLink, Download, X, Award, ArrowUpLeft, Eye } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import { useLanguage } from '../context/LanguageContext';

export default function TrustPartnersTicker() {
  const { trustPartners } = usePortfolioData();
  const { isRTL, t } = useLanguage();
  const [selectedProof, setSelectedProof] = useState(null);
  const navigate = useNavigate();

  if (!trustPartners || trustPartners.length === 0) return null;

  return (
    <section className="trust-partners-section">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="trust-partners-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="pill-badge pill-gold" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={14} />
            <span>{isRTL ? 'الشركاء والجهات المعتمدة رسمياً' : 'Official Partners & Accrediting Bodies'}</span>
          </div>
          <h2 style={{ fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {t('partners.title')}
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto' }}>
            {t('partners.subtitle')}
          </p>

          {/* Swipe Hint for Mobile Touch Devices */}
          <div className="swipe-hint-badge" style={{ marginTop: '0.85rem' }}>
            <span>{isRTL ? '👈 اسحب للأفق لمشاهدة كافة الجهات والاعتمادات الرسمية 👉' : '👈 Swipe horizontally to view all official partners 👉'}</span>
          </div>
        </div>

        {/* Partners Carousel / Grid */}
        <div className="partners-grid-wrapper">
          <div className="partners-grid">
            {trustPartners.map((partner) => {
              const partnerName = isRTL 
                ? (partner.nameAr || partner.name || partner.nameEn || partner.enName) 
                : (partner.nameEn || partner.enName || partner.name || partner.nameAr);

              const partnerBadge = isRTL 
                ? (partner.badgeAr || partner.badge || partner.role || partner.categoryAr) 
                : (partner.badgeEn || partner.enBadge || partner.badge || partner.role || partner.badgeAr);

              const linkText = isRTL 
                ? (partner.linkTextAr || partner.linkText || 'استعراض الاعتماد') 
                : (partner.linkTextEn || partner.enLinkText || partner.linkText || 'View Credentials');

              return (
                <div
                  key={partner.id}
                  className="corporate-card partner-card"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  {/* Top: Brand Logo Box */}
                  <div className="partner-logo-box">
                    <img 
                      src={partner.logo} 
                      alt={partnerName}
                      loading="lazy"
                      decoding="async"
                      style={{
                        maxHeight: '48px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.04))'
                      }}
                    />
                  </div>

                  {/* Middle: Partner Title & Badge */}
                  <div className="partner-info-box">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.4rem', textAlign: 'center' }}>
                      <span style={{ fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.3', fontSize: '0.92rem' }}>
                        {partnerName}
                      </span>
                      <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                    </div>

                    {partnerBadge && (
                      <span 
                        style={{ 
                          fontSize: '0.78rem', 
                          fontWeight: '800', 
                          color: partner.color || '#2563eb', 
                          backgroundColor: partner.bgColor || '#eff6ff', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px',
                          display: 'inline-block',
                          marginTop: '0.2rem'
                        }}
                      >
                        {partnerBadge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Actions: Internal Link + Proof Modal */}
                  <div className="partner-actions-box">
                    
                    {/* Internal Section Router Link */}
                    <Link
                      to={partner.linkUrl || "/credentials"}
                      className="partner-link-btn"
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: '800', color: '#2563eb' }}
                    >
                      <span>{linkText}</span>
                      <ArrowUpLeft size={14} style={{ transform: isRTL ? 'none' : 'rotate(90deg)' }} />
                    </Link>

                    {/* Proof Document Trigger Button */}
                    {partner.proofUrl && (
                      <button
                        onClick={() => {
                          if (partner.proofType === 'route') {
                            navigate(partner.proofUrl);
                          } else {
                            setSelectedProof(partner);
                          }
                        }}
                        className="partner-proof-btn"
                        title={isRTL ? "معاينة إثبات الاعتماد والشهادة" : "View Proof Certificate"}
                        style={{
                          padding: '0.35rem 0.65rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: '#475569',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.3rem',
                          width: '100%'
                        }}
                      >
                        <Eye size={13} color="#2563eb" />
                        <span>{isRTL ? "معاينة الإثبات" : "View Proof"}</span>
                      </button>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Proof Viewer Portal Modal */}
      {selectedProof && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(15, 23, 42, 0.82)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
          onClick={() => setSelectedProof(null)}
          className="animate-fade-in"
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(15, 23, 42, 0.3)',
              border: '1px solid #cbd5e1'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <FileCheck size={20} color="#2563eb" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {isRTL 
                    ? (selectedProof.proofTitleAr || selectedProof.proofTitle || `إثبات واعتماد رسمى - ${selectedProof.nameAr || selectedProof.name}`) 
                    : (selectedProof.proofTitleEn || selectedProof.enProofTitle || selectedProof.proofTitle || `Official Proof - ${selectedProof.nameEn || selectedProof.enName || selectedProof.name}`)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body: Image / Content */}
            <div style={{ padding: '1.25rem', overflowY: 'auto', flexGrow: 1, backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={selectedProof.proofUrl} 
                alt={selectedProof.proofTitleAr || selectedProof.proofTitle}
                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
              />
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1rem 1.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a 
                href={selectedProof.proofUrl} 
                target="_blank" 
                rel="noreferrer"
                style={{ fontSize: '0.85rem', fontWeight: '800', color: '#2563eb', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <span>{isRTL ? 'فتح الصورة بالدقة الكاملة ↗' : 'Open Full Resolution Image ↗'}</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => setSelectedProof(null)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
              >
                {isRTL ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
