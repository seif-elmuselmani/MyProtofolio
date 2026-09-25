import React, { useState } from 'react';
import { Award, CheckCircle2, ExternalLink, Calendar, ShieldCheck, Sparkles, Download, FileCheck } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
// Static fallback removed, dynamic hook enabled
import CertificateModal from '../components/CertificateModal';

const certCategories = [
  { id: 'all', nameAr: 'جميع الشهادات والاعتمادات' },
  { id: 'gov', nameAr: 'مبادرات وزارة الاتصالات (DEPI & NTI)' },
  { id: 'academic', nameAr: 'المؤهل الأكاديمي والجامعة' },
  { id: 'ai', nameAr: 'الذكاء الاصطناعي و Microsoft' },
  { id: 'database', nameAr: 'قواعد البيانات و HackerRank' },
  { id: 'tools', nameAr: 'الأدوات و Git/GitHub' }
];

export default function Credentials() {
  const { personalInfo, trustPartners, webProjects, certificatesList, credentialsList, testimonialsList, presentationDecks, teachingExperience, skillsMatrix, categories } = usePortfolioData();

  const [selectedCert, setSelectedCert] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCerts = certificatesList.filter(c => {
    if (activeFilter === 'all') return true;
    return c.category === activeFilter;
  });

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="pill-badge pill-gold" style={{ marginBottom: '0.75rem' }}>
            <Award size={15} />
            <span>سجل الاعتمادات والتكريمات الرسمية</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            الشهادات والاعتمادات الرسمية الموثقة
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
            شهادات معتمدة رسمياً وموثقة من وزارة الاتصالات، Microsoft، جامعة الزقازيق، HackerRank، ومنصة مهارة-تك (ITI).
          </p>
        </div>

        {/* Filter Pills */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '3rem'
          }}
        >
          {certCategories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '700' : '600',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--brand-primary)' : '#ffffff',
                  transition: 'var(--transition-smooth)',
                  border: '1px solid #e2e8f0'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Credentials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {filteredCerts.map((cert) => (
            <div 
              key={cert.id}
              className="corporate-card"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}
            >
              {/* Preview Image */}
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '210px', 
                  backgroundColor: '#f8fafc', 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setSelectedCert(cert)}
              >
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
                {cert.badge && (
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    <span className="pill-badge pill-gold">
                      {cert.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-primary)', fontWeight: '700' }}>
                    {cert.issuer}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {cert.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.65rem', lineHeight: 1.4 }}>
                  {cert.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                  {cert.description}
                </p>

                <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>بيانات التحقق والاعتماد:</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--brand-emerald)', fontWeight: '700', marginTop: '0.15rem' }}>
                    {cert.verificationId}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="btn-primary"
                    style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', width: '100%', justifyContent: 'center' }}
                  >
                    <span>معاينة الشهادة والتحقق</span>
                    <ExternalLink size={14} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
}