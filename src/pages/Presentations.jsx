import React from 'react';
import { Presentation, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
// Static fallback removed, dynamic hook enabled
import SlideViewer from '../components/SlideViewer';

export default function Presentations() {
  const { personalInfo, trustPartners, webProjects, certificatesList, credentialsList, testimonialsList, presentationDecks, teachingExperience, skillsMatrix, categories } = usePortfolioData();

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
          {presentationDecks.map((deck) => (
            <div key={deck.id} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Deck Info Bar */}
              <div className="corporate-card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', backgroundColor: '#ffffff' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span className="pill-badge pill-gold">{deck.category}</span>
                    <span className="pill-badge pill-slate">{deck.slidesCount} سلايد</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>{deck.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem', maxWidth: '600px' }}>{deck.description}</p>
                </div>

                <div className="pill-badge pill-emerald" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '700' }}>
                  <CheckCircle2 size={16} />
                  <span>الأثر: {deck.impact}</span>
                </div>
              </div>

              {/* Interactive Viewer Component */}
              <SlideViewer deck={deck} />

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}