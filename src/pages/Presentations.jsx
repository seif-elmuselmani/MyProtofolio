import React from 'react';
import { Presentation, Sparkles, Layers, CheckCircle2, Lock, Clock, ExternalLink, Download } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import SlideViewer from '../components/SlideViewer';

export default function Presentations() {
  const { presentationDecks } = usePortfolioData();

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="pill-badge pill-gold" style={{ marginBottom: '0.75rem' }}>
            <Presentation size={15} />
            <span>العروض التقديمية والـ Pitch Decks</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            عروض التحكيم التقنية والـ Pitch Decks
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto' }}>
            نماذج لعروض الإقناع التقني ومناقشات المشاريع التي نالت المركز الأول على مستوى الجمهورية وإشادة لجان التحكيم.
          </p>
        </div>

        {/* Decks List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {(presentationDecks || []).map((deck) => {
            const isLive = deck.hasLiveSlides || (deck.slides && deck.slides.length > 0) || Boolean(deck.slidesFolder);

            return (
              <div key={deck.id} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Deck Info Bar */}
                <div className="corporate-card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', backgroundColor: '#ffffff' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span className="pill-badge pill-gold">{deck.category}</span>
                      <span className="pill-badge pill-slate">{deck.slidesCount} سلايد</span>
                      {isLive ? (
                        <span className="pill-badge pill-emerald" style={{ fontSize: '0.75rem' }}>
                          🟢 عرض لايف مباشر
                        </span>
                      ) : (
                        <span className="pill-badge pill-gold" style={{ fontSize: '0.75rem', backgroundColor: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }}>
                          <Clock size={12} />
                          قريباً - قيد التوثيق
                        </span>
                      )}
                    </div>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>{deck.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem', maxWidth: '650px', lineHeight: 1.6 }}>
                      {deck.description}
                    </p>

                    {/* Action Links */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      {deck.presentationUrl && (
                        <a
                          href={deck.presentationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', gap: '0.3rem' }}
                        >
                          <ExternalLink size={12} />
                          <span>المستودع الرسمي</span>
                        </a>
                      )}
                      {deck.presentationFile && (
                        <a
                          href={deck.presentationFile}
                          download
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', gap: '0.3rem', borderColor: '#10b981', color: '#047857' }}
                        >
                          <Download size={12} />
                          <span>تحميل PPTX</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="pill-badge pill-emerald" style={{ padding: '0.66rem 1.25rem', fontSize: '0.85rem', fontWeight: '700' }}>
                    <CheckCircle2 size={16} />
                    <span>الأثر: {deck.impact}</span>
                  </div>
                </div>

                {/* Interactive Viewer Component OR Pending Upload Banner */}
                {isLive ? (
                  <SlideViewer deck={deck} />
                ) : (
                  <div 
                    style={{
                      padding: '2.5rem 2rem',
                      borderRadius: '20px',
                      backgroundColor: '#f8fafc',
                      border: '2px dashed #cbd5e1',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={22} />
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                      شرائح العرض قيد التنسيق والتحضير للرفع
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: 0 }}>
                      العرض التقديمي الخاص بـ ({deck.title}) جاري تحضير شرائحه بدقة عالية لرفعها مباشرة من لوحة التحكم.
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}