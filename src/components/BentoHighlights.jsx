import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Presentation, 
  GraduationCap, 
  Award, 
  ArrowUpLeft, 
  Sparkles,
  Layers,
  Users,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
// Static fallback removed, dynamic hook enabled

export default function BentoHighlights() {
  const { personalInfo, trustPartners, webProjects, certificatesList, credentialsList, testimonialsList, presentationDecks, teachingExperience, skillsMatrix, categories } = usePortfolioData();

  return (
    <section style={{ marginTop: '4rem', marginBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pill-badge pill-blue" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>مراكز الخبرة والتخصص الهندسية</span>
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--text-primary)' }}>
            منظومة عمل متكاملة <span style={{ color: 'var(--brand-primary)' }}>بين الكود والقيادة والتعليم</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
            استكشف المحاور الرئيسية لخبراتي العملية المعتمدة
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.5rem'
          }}
          className="bento-grid"
        >
          
          {/* Card 1: Flagship Web Engineering (8 Cols) */}
          <div 
            className="corporate-card"
            style={{
              gridColumn: 'span 8',
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              backgroundColor: '#ffffff'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div className="brand-avatar-frame" style={{ width: "42px", height: "42px" }} title="سيف الدين محمد"><img src="/assets/profile/seif-portrait-avatar.jpg" alt="سيف الدين محمد" className="brand-avatar-img" /></div>
                <span className="pill-badge pill-gold">
                  🏆 المركز الأول جمهورية (DEPI)
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                هندسة الأنظمة الخلفية والواجهات (.NET & MEAN)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '600px', marginBottom: '1.5rem' }}>
                بناء تطبيقات سحابية وواجهات تفاعلية فائقة السرعة، وتطوير معمارية Clean Architecture و SOLID Principles مع إدارة قواعد بيانات SQL Server و MongoDB بكفاءة عالية.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                <span className="pill-badge pill-slate">ASP.NET Core</span>
                <span className="pill-badge pill-slate">Clean Architecture</span>
                <span className="pill-badge pill-slate">EF Core & SQL</span>
                <span className="pill-badge pill-slate">MEAN Stack</span>
              </div>
              <Link to="/projects" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                <span>تصفح المشاريع</span>
                <ArrowUpLeft size={16} />
              </Link>
            </div>
          </div>

          {/* Card 2: Presentation & Pitch Decks (4 Cols) */}
          <div 
            className="corporate-card"
            style={{
              gridColumn: 'span 4',
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#fffbeb',
              borderColor: '#fef3c7'
            }}
          >
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-prestige)', marginBottom: '1.25rem' }}>
                <Presentation size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#92400e', marginBottom: '0.5rem' }}>
                عروض التحكيم والـ Pitch Decks
              </h3>
              <p style={{ color: '#78350f', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                تصميم وتقديم عروض الإقناع التقنية للجان التحكيم الحكومية والجامعية وتتويجها بجوائز المركز الأول.
              </p>
            </div>

            <Link to="/presentations" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.5rem', fontSize: '0.85rem', backgroundColor: '#ffffff' }}>
              <span>استعراض الـ Decks</span>
              <ArrowUpLeft size={16} />
            </Link>
          </div>

          {/* Card 3: Technical Teaching & iSchool (4 Cols) */}
          <div 
            className="corporate-card"
            style={{
              gridColumn: 'span 4',
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#ecfdf5',
              borderColor: '#d1fae5'
            }}
          >
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-emerald)', marginBottom: '1.25rem' }}>
                <GraduationCap size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#065f46', marginBottom: '0.5rem' }}>
                التدريس التقني في iSchool
              </h3>
              <p style={{ color: '#047857', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                تدريب مئات الطلاب على الخوارزميات وتطبيقات الذكاء الاصطناعي التفاعلية لمبادرة براعم مصر الرقمية (DEMI).
              </p>
            </div>

            <Link to="/teaching" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.5rem', fontSize: '0.85rem', backgroundColor: '#ffffff' }}>
              <span>تفاصيل التدريس التقني</span>
              <ArrowUpLeft size={16} />
            </Link>
          </div>

          {/* Card 4: Verified Certifications & Recommendations (8 Cols) */}
          <div 
            className="corporate-card"
            style={{
              gridColumn: 'span 8',
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#ffffff'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div className="brand-avatar-frame" title="سيف الدين محمد"><img src="/assets/profile/seif-portrait-avatar.jpg" alt="سيف الدين محمد" className="brand-avatar-img" /></div>
                <span className="pill-badge pill-blue">
                  {certificatesList.length} شهادات واعتمادات موثقة
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                الاعتمادات والتوصيات الرسمية (Verified Credentials)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '600px', marginBottom: '1.25rem' }}>
                شهادات معتمدة من Microsoft، وزارة الاتصالات، معهد NTI، معهد ITI، و HackerRank بالإضافة إلى تقييمات العمل الحر 5 نجوم بنسبة إنجاز 100%.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                <span className="pill-badge pill-slate">Microsoft AI</span>
                <span className="pill-badge pill-slate">HackerRank SQL</span>
                <span className="pill-badge pill-slate">NTI Recommendation</span>
                <span className="pill-badge pill-slate">5.0/5.0 Freelance</span>
              </div>
              <Link to="/credentials" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                <span>عرض الشهادات والتحقق</span>
                <ArrowUpLeft size={16} />
              </Link>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-grid > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}