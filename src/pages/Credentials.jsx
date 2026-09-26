import React, { useState } from 'react';
import { Award, ExternalLink, Search, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import CertificateModal from '../components/CertificateModal';

const certCategories = [
  { id: 'all', label: 'جميع الشهادات والاعتمادات' },
  { id: 'mcit', label: 'مبادرات وزارة الاتصالات (DEPI & NTI)' },
  { id: 'academic', label: 'المؤهل الأكاديمي والجامعي' },
  { id: 'ai', label: 'الذكاء الاصطناعي و Microsoft' },
  { id: 'english', label: 'اللغات والمهارات الشخصية' },
  { id: 'databases', label: 'قواعد البيانات و HackerRank' },
  { id: 'tools', label: 'أدوات التطوير و Git/GitHub' }
];

export default function Credentials() {
  const { certificatesList } = usePortfolioData();

  const [selectedCertIndex, setSelectedCertIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = certificatesList.filter(cert => {
    const matchesFilter = activeFilter === 'all' || cert.category === activeFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.description && cert.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getCategoryCount = (catId) => {
    if (catId === 'all') return certificatesList.length;
    return certificatesList.filter(c => c.category === catId).length;
  };

  const selectedCert = selectedCertIndex !== null ? filteredCerts[selectedCertIndex] : null;

  const handleNext = () => {
    if (selectedCertIndex !== null && filteredCerts.length > 0) {
      setSelectedCertIndex((selectedCertIndex + 1) % filteredCerts.length);
    }
  };

  const handlePrev = () => {
    if (selectedCertIndex !== null && filteredCerts.length > 0) {
      setSelectedCertIndex((selectedCertIndex - 1 + filteredCerts.length) % filteredCerts.length);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pill-badge pill-gold" style={{ marginBottom: '0.75rem' }}>
            <Award size={15} />
            <span>سجل الاعتمادات والتكريمات الرسمية</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            الشهادات والاعتمادات الرسمية الموثقة
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto' }}>
            شهادات معتمدة رسمياً وموثقة من وزارة الاتصالات (MCIT)، Berlitz، مايكروسوفت، جامعة الزقازيق، معهد ITI، المعهد القومي للاتصالات NTI، منصة HackerRank، ومبادرة مصر الرقمية (DEPI).
          </p>
        </div>

        {/* Search & Filter Section */}
        <div style={{ maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
          
          {/* Search Box */}
          <div 
            style={{
              position: 'relative',
              marginBottom: '1.25rem'
            }}
          >
            <input 
              type="text"
              placeholder="ابحث عن شهادة، مؤسسة، أو تخصص (مثال: DEPI, Berlitz, SQL, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem 0.85rem 3rem',
                borderRadius: '16px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                transition: 'var(--transition-smooth)'
              }}
            />
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '1.15rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
            />
          </div>

          {/* Filter Pills */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            {certCategories.map((cat) => {
              const isActive = activeFilter === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveFilter(cat.id);
                    setSelectedCertIndex(null);
                  }}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? '700' : '600',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--brand-primary)' : '#ffffff',
                    transition: 'var(--transition-smooth)',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>{cat.label}</span>
                  <span 
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                      color: isActive ? '#ffffff' : 'var(--text-muted)'
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Credentials Grid */}
        {filteredCerts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            لا تتوفر شهادات تطابق البحث الحالي.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredCerts.map((cert, index) => (
              <div 
                key={cert.id}
                className="corporate-card"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', borderRadius: '18px' }}
              >
                {/* Preview Image Container */}
                <div 
                  style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '220px', 
                    backgroundColor: '#0f172a', 
                    overflow: 'hidden',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => setSelectedCertIndex(index)}
                >
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                  {cert.badge && (
                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                      <span className="pill-badge pill-gold" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>
                        {cert.badge}
                      </span>
                    </div>
                  )}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(15, 23, 42, 0.4)',
                      opacity: 0,
                      transition: 'opacity 0.25s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '0.9rem'
                    }}
                    className="card-hover-overlay"
                  >
                    اضغط لمكابرة الشهادة والمعاينة 🔍
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
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

                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>بيانات التحقق والاعتماد:</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--brand-emerald)', fontWeight: '700', marginTop: '0.15rem' }}>
                      {cert.verificationId}
                    </div>
                  </div>

                  {/* Footer Button */}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                    <button
                      onClick={() => setSelectedCertIndex(index)}
                      className="btn-primary"
                      style={{ padding: '0.55rem 0.95rem', fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
                    >
                      <span>معاينة الشهادة والتنقل</span>
                      <ExternalLink size={15} />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal with Navigation */}
      {selectedCertIndex !== null && selectedCert && (
        <CertificateModal 
          cert={selectedCert} 
          onClose={() => setSelectedCertIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          currentIndex={selectedCertIndex}
          totalCount={filteredCerts.length}
        />
      )}
    </div>
  );
}
