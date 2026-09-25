import React, { useState } from 'react';
import { User, Download, Send, CheckCircle2, Sparkles, MapPin, Mail, Phone, GraduationCap, Award, Briefcase, ExternalLink, ShieldCheck } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
// Static fallback removed, dynamic hook enabled
import { Link } from 'react-router-dom';
import ResumeModal from '../components/ResumeModal';

export default function About() {
  const { personalInfo, trustPartners, webProjects, certificatesList, credentialsList, testimonialsList, presentationDecks, teachingExperience, skillsMatrix, categories } = usePortfolioData();

  const [showResume, setShowResume] = useState(false);

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Profile Card */}
        <div 
          className="corporate-card"
          style={{
            padding: '3rem 2.5rem',
            marginBottom: '4rem',
            backgroundColor: '#ffffff'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem', alignItems: 'center' }} className="about-grid">
            
            <div style={{ gridColumn: 'span 7' }} className="about-text-col">
              <div className="pill-badge pill-blue" style={{ marginBottom: '1rem' }}>
                <User size={14} />
                <span>المسيرة الهندسية والشغف</span>
              </div>
              
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {personalInfo.nameAr}
              </h1>
              <div style={{ fontSize: '1.05rem', color: 'var(--brand-primary)', fontWeight: '700', marginBottom: '1.25rem' }}>
                {personalInfo.roleAr}
              </div>

              {/* Education Card Box */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-prestige)', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                  <GraduationCap size={20} />
                  <span>{personalInfo.education.university}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  {personalInfo.education.degree} ({personalInfo.education.period})
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  التقدير: <strong>{personalInfo.education.grade}</strong> • GPA: <strong>{personalInfo.education.gpa}</strong> • مشروع التخرج: <strong>{personalInfo.education.gradProjectGrade}</strong>
                </div>
              </div>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                خريج علوم الحاسب بجامعة الزقازيق ومطور برمجيات متمرس في بيئة <strong>.NET Ecosystem</strong> (C#, ASP.NET Core, Clean Architecture, EF Core, SQL Server) و <strong>MEAN Stack</strong> (Node.js, Express, Angular, MongoDB). أجمع بين التنفيذ البرمجي المتقن للأنظمة الخلفية وتطبيق مبادئ هندسة البرمجيات العالمية، وبين مهارات التواصل والقيادة التي صقلتها كمدرب برمجة في iSchool ومبادرة DEMI.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <MapPin size={16} color="var(--brand-primary)" />
                  <span>{personalInfo.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <Mail size={16} color="var(--brand-primary)" />
                  <span>{personalInfo.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <Phone size={16} color="var(--brand-primary)" />
                  <span>{personalInfo.phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setShowResume(true)}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  <Download size={16} />
                  <span>عرض وتحميل السيرة الذاتية (CV)</span>
                </button>
                <Link to="/contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                  <Send size={16} />
                  <span>تواصل معي</span>
                </Link>
              </div>

            </div>

            {/* Quick Metrics (5 Cols) */}
            <div style={{ gridColumn: 'span 5' }} className="about-metrics-col">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {personalInfo.stats.map((st, i) => (
                  <div key={i} className="corporate-card" style={{ padding: '1.5rem 1.25rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
                    <div style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--brand-primary)' }}>
                      {st.value}
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.2rem' }}>{st.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.enLabel}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Skills Matrix */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)' }}>
              مصفوفة المهارات والقدرات التقنية (Technical Toolbox)
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {skillsMatrix.map((cat, idx) => (
              <div key={idx} className="corporate-card" style={{ padding: '1.75rem', backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                  {cat.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {cat.skills.map((skill, i) => (
                    <span key={i} className="pill-badge pill-slate" style={{ fontSize: '0.8rem', padding: '0.3rem 0.65rem' }}>
                      <CheckCircle2 size={13} color="var(--brand-emerald)" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-text-col, .about-metrics-col {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}