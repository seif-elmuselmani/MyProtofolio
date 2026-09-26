import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, FileCheck, ExternalLink, Download, X, Award } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

export default function TrustPartnersTicker() {
  const { trustPartners } = usePortfolioData();
  const [selectedProof, setSelectedProof] = useState(null);

  if (!trustPartners || trustPartners.length === 0) return null;

  return (
    <section 
      style={{ 
        padding: '4.5rem 0', 
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pill-badge pill-gold" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={14} />
            <span>الشركاء والجهات المعتمدة رسمياً</span>
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            مؤسسات الاعتماد والجهات الرسمية الراعية
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
            اعتمادات وتكريمات موثقة رسمياً من وزارة الاتصالات، مايكروسوفت، جامعة الزقازيق، معهد NTI، ومبادرة مصر الرقمية.
          </p>
        </div>

        {/* Partners Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {trustPartners.map((partner) => (
            <div
              key={partner.id}
              className="corporate-card"
              style={{
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
              }}
            >
              {/* Top: Brand Logo Box */}
              <div 
                style={{
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  padding: '0.5rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #f1f5f9'
                }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  style={{
                    maxHeight: '38px',
                    maxWidth: '170px',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Middle: Partner Info & Badge */}
              <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {partner.name}
                  </span>
                  <CheckCircle2 size={16} color="#10b981" />
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
                      display: 'inline-block'
                    }}
                  >
                    {partner.badge}
                  </span>
                )}
              </div>

              {/* Bottom: Action Button */}
              <button
                onClick={() => setSelectedProof(partner)}
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.55rem 1rem',
                  fontSize: '0.85rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1'
                }}
              >
                <span>استعراض التوثيق المعتمد</span>
                <ExternalLink size={14} />
              </button>

            </div>
          ))}
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

    </section>
  );
}
