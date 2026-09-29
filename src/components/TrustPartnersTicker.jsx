import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, FileCheck, ExternalLink, Download, X, Award, ArrowUpLeft, Eye } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

export default function TrustPartnersTicker() {
  const { trustPartners } = usePortfolioData();
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
            <span>الشركاء والجهات المعتمدة رسمياً</span>
          </div>
          <h2 style={{ fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            مؤسسات الاعتماد والجهات الرسمية الراعية
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto' }}>
            اعتمادات وتكريمات موثقة رسمياً من وزارة الاتصالات، مايكروسوفت، جامعة الزقازيق، معهد NTI، ومبادرة مصر الرقمية.
          </p>

          {/* Swipe Hint for Mobile Touch Devices */}
          <div className="swipe-hint-badge" style={{ marginTop: '0.85rem' }}>
            <span>👈 اسحب للأفق لمشاهدة كافة الجهات والاعتمادات الرسمية 👉</span>
          </div>
        </div>

        {/* Partners Carousel / Grid */}
        <div className="partners-grid-wrapper">
          <div className="partners-grid">
            {trustPartners.map((partner) => (
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
                    alt={partner.name}
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                      {partner.name}
                    </span>
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                  </div>

                  {partner.badge && (
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
                      {partner.badge}
                    </span>
                  )}
                </div>

                {/* Bottom Actions: Internal Link + Proof Modal */}
                <div className="partner-actions-box">
                  
                  {/* Internal Section Router Link */}
                  <Link
                    to={partner.linkUrl || '/credentials'}
                    className="btn-primary partner-btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    <span>{partner.linkText || 'استعراض الاعتماد'}</span>
                    <ArrowUpLeft size={15} />
                  </Link>

                  {/* Proof Document Modal Button */}
                  <button
                    onClick={() => {
                      if (partner.id === 'ischool' || partner.proofType === 'route') {
                        navigate(partner.linkUrl || '/teaching');
                      } else {
                        setSelectedProof(partner);
                      }
                    }}
                    className="btn-secondary partner-btn-secondary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Eye size={14} />
                    <span>معاينة الوثيقة الرسمية</span>
                  </button>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Proof Document Modal */}
      {selectedProof && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 250,
            backgroundColor: 'rgba(15, 23, 42, 0.82)',
            backdropFilter: 'blur(12px)',
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
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.45)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FileCheck size={24} color="var(--brand-primary)" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                    {selectedProof.proofTitle || `وثيقة توثيق اعتماد ${selectedProof.name}`}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.15rem 0 0' }}>
                    إثبات معتمد ورسمي صادر من {selectedProof.name} ({selectedProof.enName})
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedProof(null)}
                style={{
                  padding: '0.45rem',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="إغلاق"
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
                  style={{ width: '100%', height: '520px', border: 'none', borderRadius: '12px' }}
                />
              ) : (
                <img 
                  src={selectedProof.proofUrl} 
                  alt={selectedProof.name}
                  style={{ maxWidth: '100%', maxHeight: '550px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                />
              )}
            </div>

            {/* Modal Footer */}
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

                <button
                  onClick={() => {
                    const url = selectedProof.linkUrl || '/credentials';
                    setSelectedProof(null);
                    navigate(url);
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                >
                  <ExternalLink size={15} />
                  <span>الانتقال لقسم التوثيق بالموقع</span>
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
