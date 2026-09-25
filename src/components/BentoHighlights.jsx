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
  ExternalLink,
  ShieldCheck,
  Trophy,
  Check
} from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

export default function BentoHighlights() {
  const { 
    personalInfo, 
    certificatesList, 
    credentialsList, 
    testimonialsList, 
    presentationDecks, 
    teachingExperience 
  } = usePortfolioData();

  const totalCertificatesCount = certificatesList ? certificatesList.length : 9;

  return (
    <section style={{ marginTop: '4.5rem', marginBottom: '5.5rem' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.25rem' }}>
          <div className="pill-badge pill-blue" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={14} />
            <span>مراكز الخبرة والتخصص الهندسية</span>
          </div>
          <h2 style={{ fontSize: '2.35rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            منظومة عمل متكاملة <span style={{ color: 'var(--brand-primary)' }}>بين الكود والقيادة والتعليم</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0.65rem auto 0', lineHeight: 1.6 }}>
            استكشف المحاور الرئيسية لخبراتي العملية المعتمدة مع حلول الهندسة المتقدمة والتوثيق الرسمي
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
          
          {/* Card 1: Flagship Web Engineering (8 Cols) - Focal Point */}
          <div 
            className="corporate-card bento-card-flagship"
            style={{
              gridColumn: 'span 8',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="brand-avatar-frame" style={{ width: "46px", height: "46px", boxShadow: "0 4px 10px rgba(37,99,235,0.18)" }} title="سيف الدين محمد">
                    <img src="/assets/profile/seif-portrait-avatar.jpg" alt="سيف الدين محمد" className="brand-avatar-img" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                      التخصص الرئيسي (Core Engineering)
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                      Full Stack & Systems Architect
                    </span>
                  </div>
                </div>

                <span className="pill-badge pill-gold bento-badge-interactive" style={{ padding: '0.4rem 0.95rem' }}>
                  <Trophy size={15} color="#d97706" />
                  <span>المركز الأول جمهورية (DEPI)</span>
                </span>
              </div>

              <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                هندسة الأنظمة الخلفية والواجهات (.NET & MEAN)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, maxWidth: '620px', marginBottom: '1.75rem' }}>
                بناء تطبيقات سحابية وواجهات تفاعلية فائقة السرعة، وتطوير معمارية Clean Architecture و SOLID Principles مع إدارة قواعد بيانات SQL Server و MongoDB بكفاءة عالية وفق أعلى معايير الأداء والأمان.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.35rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="pill-badge pill-slate bento-badge-interactive">
                  <CheckCircle2 size={13} color="var(--brand-primary)" />
                  <span>ASP.NET Core 8</span>
                </span>
                <span className="pill-badge pill-slate bento-badge-interactive">
                  <CheckCircle2 size={13} color="var(--brand-primary)" />
                  <span>Clean Architecture</span>
                </span>
                <span className="pill-badge pill-slate bento-badge-interactive">
                  <CheckCircle2 size={13} color="var(--brand-primary)" />
                  <span>EF Core & SQL Server</span>
                </span>
                <span className="pill-badge pill-slate bento-badge-interactive">
                  <CheckCircle2 size={13} color="var(--brand-primary)" />
                  <span>MEAN Stack</span>
                </span>
              </div>

              <Link to="/projects" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}>
                <span>تصفح المشاريع الهندسية</span>
                <ArrowUpLeft size={16} />
              </Link>
            </div>
          </div>

          {/* Card 2: Presentation & Pitch Decks (4 Cols) */}
          <div 
            className="corporate-card bento-card-prestige"
            style={{
              gridColumn: 'span 4',
              padding: '2.35rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.35rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: '#fef3c7', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309', boxShadow: '0 4px 10px rgba(217,119,6,0.12)' }}>
                  <Presentation size={26} />
                </div>
                <span className="pill-badge pill-gold" style={{ fontSize: '0.78rem' }}>
                  عروض الاستثمار والتحكيم
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#92400e', marginBottom: '0.65rem' }}>
                عروض التحكيم والـ Pitch Decks
              </h3>
              <p style={{ color: '#78350f', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                تصميم وتقديم عروض الإقناع التقنية للجان التحكيم الحكومية والجامعية وتتويجها ببروز المهارات الجماهيرية وتصدّر المراكز الأولى.
              </p>
            </div>

            <Link to="/presentations" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.88rem', backgroundColor: '#ffffff', borderColor: '#fde68a', color: '#92400e' }}>
              <span>استعراض الـ Decks والمحاضرات</span>
              <ArrowUpLeft size={16} />
            </Link>
          </div>

          {/* Card 3: Technical Teaching & iSchool (4 Cols) */}
          <div 
            className="corporate-card bento-card-emerald"
            style={{
              gridColumn: 'span 4',
              padding: '2.35rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.35rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: '#d1fae5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#047857', boxShadow: '0 4px 10px rgba(5,150,105,0.12)' }}>
                  <GraduationCap size={26} />
                </div>
                <span className="pill-badge pill-emerald" style={{ fontSize: '0.78rem' }}>
                  مبادرة DEMI & iSchool
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#065f46', marginBottom: '0.65rem' }}>
                التدريس التقني وتدريب الفرق
              </h3>
              <p style={{ color: '#047857', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                تدريب وتوجيه مئات الطلاب على الخوارزميات وتطبيقات الذكاء الاصطناعي التفاعلية لمبادرة براعم مصر الرقمية (DEMI) مع تبسيط الكود المتقدم.
              </p>
            </div>

            <Link to="/teaching" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.88rem', backgroundColor: '#ffffff', borderColor: '#a7f3d0', color: '#065f46' }}>
              <span>تفاصيل الخبرة التدريسية</span>
              <ArrowUpLeft size={16} />
            </Link>
          </div>

          {/* Card 4: Verified Certifications & Recommendations (8 Cols) */}
          <div 
            className="corporate-card bento-card-sapphire"
            style={{
              gridColumn: 'span 8',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                      التوثيق والاعتمادات الرسمية
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                      Official Institutional Badges
                    </span>
                  </div>
                </div>

                <span className="pill-badge pill-blue bento-badge-interactive" style={{ padding: '0.4rem 0.95rem' }}>
                  <CheckCircle2 size={14} color="var(--brand-primary)" />
                  <span>{totalCertificatesCount}+ شهادات واعتمادات موثقة</span>
                </span>
              </div>

              <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                الاعتمادات والتوصيات الرسمية (Verified Credentials)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, maxWidth: '620px', marginBottom: '1.75rem' }}>
                شهادات معتمدة رسمياً من Microsoft، وزارة الاتصالات وتكنولوجيا المعلومات (MCIT)، معهد NTI، معهد ITI، و HackerRank بالإضافة إلى تقييمات العمل الحر بتقدير 5.0/5.0 نجوم بنسبة إنجاز 100%.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.35rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="pill-badge pill-slate bento-badge-interactive">Microsoft AI Certified</span>
                <span className="pill-badge pill-slate bento-badge-interactive">HackerRank SQL Specialist</span>
                <span className="pill-badge pill-slate bento-badge-interactive">NTI Official Recommendation</span>
                <span className="pill-badge pill-slate bento-badge-interactive">5.0/5.0 Freelance Rating</span>
              </div>

              <Link to="/credentials" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}>
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