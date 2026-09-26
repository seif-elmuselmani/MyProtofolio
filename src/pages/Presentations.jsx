import React from 'react';
import { 
  Presentation, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Download,
  Award,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import SlideViewer from '../components/SlideViewer';

export default function Presentations() {
  const { presentationDecks } = usePortfolioData();
  const featuredDeck = (presentationDecks || [])[0];

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem', backgroundColor: '#f8fafc' }}>
      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pill-badge pill-gold" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <Presentation size={16} />
            <span>العروض التقديمية والـ Pitch Decks</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', color: '#0f172a', marginBottom: '0.85rem', lineHeight: 1.25 }}>
            عروض التحكيم التقنية والمناقشات الأكاديمية
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.75, fontWeight: '500' }}>
            استعراض تفاعلي كامل لشرائح مناقشة مشروع التخرج والتصميم المفهومي والمعماري لمنظومة الذكاء الاصطناعي.
          </p>
        </div>

        {/* Highlighted Deck Specifications & Summary Card */}
        {featuredDeck && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Executive Summary Card */}
            <div 
              className="corporate-card" 
              style={{ 
                padding: '2.5rem 2.25rem', 
                backgroundColor: '#ffffff', 
                borderRadius: '24px', 
                border: '1px solid #cbd5e1',
                boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.75rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span className="pill-badge pill-blue" style={{ fontSize: '0.82rem', fontWeight: '800' }}>
                      🎓 {featuredDeck.category}
                    </span>
                    <span className="pill-badge pill-emerald" style={{ fontSize: '0.82rem', fontWeight: '800' }}>
                      🟢 {featuredDeck.slidesCount} شرائح تفاعلية بالكامل
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', color: '#0f172a', lineHeight: 1.35, marginBottom: '0.65rem' }}>
                    {featuredDeck.title}
                  </h2>
                  <p style={{ color: '#475569', fontSize: '1.02rem', maxWidth: '780px', lineHeight: 1.8, fontWeight: '500' }}>
                    {featuredDeck.description}
                  </p>
                </div>

                <div className="pill-badge pill-emerald" style={{ padding: '0.85rem 1.35rem', fontSize: '0.9rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} />
                  <span>{featuredDeck.impact}</span>
                </div>
              </div>

              {/* Tools & Specifications Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0', marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Cpu size={15} />
                  <span>التقنيات المستخدمة بالعرض:</span>
                </span>
                {(featuredDeck.tools || []).map((tool, tIdx) => (
                  <span 
                    key={tIdx}
                    style={{ 
                      backgroundColor: '#f1f5f9', 
                      color: '#334155', 
                      padding: '0.35rem 0.85rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.82rem', 
                      fontWeight: '700',
                      border: '1px solid #e2e8f0' 
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Download PPTX & GitHub Presentation Repo */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {featuredDeck.presentationFile && (
                  <a
                    href={featuredDeck.presentationFile}
                    download
                    className="btn-primary"
                    style={{
                      padding: '0.85rem 1.85rem',
                      fontSize: '0.95rem',
                      fontWeight: '800',
                      backgroundColor: '#059669',
                      color: '#ffffff',
                      borderRadius: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      textDecoration: 'none',
                      boxShadow: '0 8px 20px -4px rgba(5, 150, 105, 0.35)'
                    }}
                  >
                    <Download size={18} />
                    <span>تحميل ملف العرض الأصلي (PPTX)</span>
                  </a>
                )}

                {featuredDeck.presentationUrl && (
                  <a
                    href={featuredDeck.presentationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{
                      padding: '0.85rem 1.65rem',
                      fontSize: '0.95rem',
                      fontWeight: '800',
                      backgroundColor: '#ffffff',
                      color: '#2563eb',
                      border: '1.5px solid #2563eb',
                      borderRadius: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={18} />
                    <span>مستودع العرض على GitHub ↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Interactive Slide Deck Player Container */}
            <div 
              className="corporate-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #cbd5e1',
                padding: '1.25rem',
                boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.05)'
              }}
            >
              <SlideViewer deck={featuredDeck} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
