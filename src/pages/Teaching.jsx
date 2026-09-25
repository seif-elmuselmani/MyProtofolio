import React from 'react';
import { GraduationCap, Users, Clock, Award, CheckCircle2, ArrowUpLeft, Briefcase, BookOpen, Send, Sparkles } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
// Static fallback removed, dynamic hook enabled
import { Link } from 'react-router-dom';

export default function Teaching() {
  const { personalInfo, trustPartners, webProjects, certificatesList, credentialsList, testimonialsList, presentationDecks, teachingExperience, skillsMatrix, categories } = usePortfolioData();

  const { stats, experienceList } = teachingExperience;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="pill-badge pill-emerald" style={{ marginBottom: '0.75rem' }}>
            <GraduationCap size={15} />
            <span>التدريس، التدريب القيادي ونقل المعرفة</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            التدريب التقني والخبرات الميدانية
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto' }}>
            مدرب تقني رئيسي (Main Technical Coding Tutor) في iSchool ومبادرة براعم مصر الرقمية (DEMI) بالتعاون مع وزارة الاتصالات.
          </p>
        </div>

        {/* Stats Row */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.25rem',
            marginBottom: '4rem'
          }}
        >
          <div className="corporate-card" style={{ padding: '1.75rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--brand-emerald)', marginBottom: '0.25rem' }}>{stats.totalStudents}</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '700' }}>طالب تم تدريبهم</div>
          </div>
          <div className="corporate-card" style={{ padding: '1.75rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--brand-primary)', marginBottom: '0.25rem' }}>{stats.hoursTaught}</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '700' }}>ساعات تدريس وجلسات عملية</div>
          </div>
          <div className="corporate-card" style={{ padding: '1.75rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--brand-prestige)', marginBottom: '0.25rem' }}>Main Tutor</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '700' }}>iSchool Coding Instructor</div>
          </div>
          <div className="corporate-card" style={{ padding: '1.75rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#2563eb', marginBottom: '0.25rem' }}>8,388+</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '700' }}>متابع على LinkedIn</div>
          </div>
        </div>

        {/* Real Professional Experiences */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)' }}>
              السجل المهني والمسيرة العملية
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {experienceList.map((exp, idx) => (
              <div key={idx} className="corporate-card" style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>{exp.role}</h3>
                    <div style={{ fontSize: '0.95rem', color: 'var(--brand-primary)', fontWeight: '700', marginTop: '0.2rem' }}>
                      {exp.company} • <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{exp.location}</span>
                    </div>
                  </div>
                  <span className="pill-badge pill-emerald">
                    {exp.period}
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {exp.description}
                </p>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle2 size={16} color="var(--brand-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="corporate-card" style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            ترغب في التعاون التدريبي أو تنظيم ورش عمل برمجية؟
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '600px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            متاح لتقديم ورش العمل التقنية في معمارية البرمجيات، مفاهيم .NET & Backend، وتدريب النشء على التفكير الخوارزمي.
          </p>
          <Link to="/contact" className="btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
            <span>تواصل لتنسيق التدريب والورش</span>
            <ArrowUpLeft size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}