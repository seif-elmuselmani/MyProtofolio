import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Code2, 
  Presentation, 
  GraduationCap, 
  Award, 
  ArrowUpLeft, 
  Sparkles, 
  FileText, 
  Send, 
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  Star,
  Globe,
  Briefcase,
  ShieldCheck,
  Zap,
  TrendingUp,
  MessageSquare,
  Check,
  Quote,
  Eye
} from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import ProjectCard from '../components/ProjectCard';
import BentoHighlights from '../components/BentoHighlights';
import CertificateModal from '../components/CertificateModal';
import ResumeModal from '../components/ResumeModal';
import SubmitTestimonialModal from '../components/SubmitTestimonialModal';
import TestimonialProofModal from '../components/TestimonialProofModal';
import TrustPartnersTicker from '../components/TrustPartnersTicker';

export default function Home() {
  const { personalInfo, trustPartners, webProjects, certificatesList, credentialsList, testimonialsList, presentationDecks, teachingExperience, skillsMatrix, categories } = usePortfolioData();

  const [showResume, setShowResume] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedProofTestimonial, setSelectedProofTestimonial] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const featuredProjects = (webProjects || []).filter(p => p.featured).slice(0, 3);
  const previewCertificates = (certificatesList || []).slice(0, 4);
  const approvedTestimonials = (testimonialsList || []).filter(t => t.status !== 'pending');
  const previewTestimonials = approvedTestimonials.slice(0, 3);

  return (
    <div className="animate-fade-in" style={{ paddingTop: '5.5rem' }}>
      
      {/* Ultra-Premium Hero Section */}
      <section 
        style={{ 
          padding: '4.5rem 0 4rem', 
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}
        className="bg-grid-pattern"
      >
        {/* Subtle Ambient Glow Orbs */}
        <div 
          style={{
            position: 'absolute',
            top: '-10%',
            right: '5%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(59,130,246,0.04) 50%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '0%',
            left: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.02) 50%, transparent 70%)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'center' }} className="hero-grid">
            
            {/* Left Col (Text & Actions & Stats) - 7 Cols */}
            <div style={{ gridColumn: 'span 7' }} className="hero-content">
              
              {/* Availability & Nationwide Winner Pill Bar */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div 
                  className="pill-badge pill-gold"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 1.15rem',
                    boxShadow: '0 2px 10px rgba(217, 119, 6, 0.14)'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>🏆</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: '800' }}>
                    المركز الأول على مستوى الجمهورية (DEPI)
                  </span>
                </div>

                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 1rem',
                    borderRadius: '9999px',
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#047857',
                    fontSize: '0.85rem',
                    fontWeight: '700'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse 1.8s infinite' }}></span>
                  <span>متاح للعمل والمشاريع البرمجية</span>
                </div>
              </div>

              {/* Main Heading with Elegant Gradient Accent */}
              <h1 
                style={{
                  fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
                  fontWeight: '900',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)'
                }}
              >
                <span 
                  style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {personalInfo.nameAr}
                </span>
              </h1>

              {/* Subheading Role */}
              <div 
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: 'var(--brand-primary)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <span>{personalInfo.roleAr}</span>
                
              </div>

              {/* Bio Summary */}
              <p 
                style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.8',
                  color: 'var(--text-secondary)',
                  marginBottom: '2rem',
                  maxWidth: '630px'
                }}
              >
                {personalInfo.bioAr}
              </p>

              {/* CTA Action Buttons with High Conversion Contrast */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
                <Link 
                  to="/projects" 
                  className="btn-primary" 
                  style={{ 
                    padding: '0.85rem 1.85rem', 
                    fontSize: '1rem',
                    fontWeight: '800',
                    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  <span>استعراض المشاريع (Case Studies)</span>
                  <ArrowUpLeft size={18} />
                </Link>

                <a 
                  href={personalInfo.whatsapp} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '800',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.28)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <Send size={17} />
                  <span>تواصل عبر WhatsApp</span>
                </a>

                <button 
                  onClick={() => setShowResume(true)}
                  className="btn-secondary"
                  style={{ padding: '0.85rem 1.75rem', fontSize: '1rem', backgroundColor: '#ffffff', border: '1px solid #cbd5e1' }}
                >
                  <FileText size={18} />
                  <span>السيرة الذاتية (CV)</span>
                </button>
              </div>

              {/* Live Metric Impact Counters Strip (Psychology & Trust Builder) */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.25rem',
                  paddingTop: '1.75rem',
                  borderTop: '1px solid #e2e8f0',
                  maxWidth: '600px'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--brand-primary)', lineHeight: 1 }}>15+</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontWeight: '600' }}>مشرع ونظام خلفي متكامل</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#d97706', lineHeight: 1 }}>#1</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontWeight: '600' }}>جمهورية في مبادرة DEPI</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#059669', lineHeight: 1 }}>+500</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontWeight: '600' }}>طالب تم تدريبه في iSchool</div>
                </div>
              </div>

            </div>

            {/* Right Col (Photo & Floating Micro Glass Cards) - 5 Cols */}
            <div style={{ gridColumn: 'span 5', position: 'relative' }} className="hero-image-col">
              
              {/* Outer Glow Wrapper */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '390px', margin: '0 auto' }}>
                
                {/* Glow ring */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: '-12px',
                    borderRadius: '32px',
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.3) 0%, rgba(16,185,129,0.3) 100%)',
                    filter: 'blur(20px)',
                    opacity: 0.85,
                    zIndex: 0
                  }}
                />

                {/* Main Card Frame */}
                <div 
                  style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.22)',
                    border: '4px solid #ffffff',
                    backgroundColor: '#ffffff',
                    zIndex: 1
                  }}
                >
                  <img 
                    src={personalInfo.avatar} 
                    alt={personalInfo.nameAr}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover'
                    }}
                  />

                  {/* Bottom Image Caption Overlay */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.25rem 1.25rem 1rem',
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.4) 70%, transparent 100%)',
                      color: '#ffffff',
                      textAlign: 'center',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', marginBottom: '0.2rem' }}>Top 1 Nationwide Winner</div>
                    <div style={{ fontSize: '0.76rem', color: '#cbd5e1', fontWeight: '600' }}>مبادرة رواد مصر الرقمية (DEPI) • مسار Full Stack .NET</div>
                  </div>
                </div>

                {/* Floating Micro Glass Badge Top-Left */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    left: '-20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid #fcd34d',
                    padding: '0.6rem 1.1rem',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(217, 119, 6, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    zIndex: 2
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontWeight: '900' }}>
                    🏆
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#92400e' }}>#1 على الجمهورية</div>
                    <div style={{ fontSize: '0.72rem', color: '#b45309' }}>وزارة الاتصالات DEPI</div>
                  </div>
                </div>



              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Ultra-Premium Infinite Trust Partners Marquee Ticker */}
      <TrustPartnersTicker />

      {/* Bento Grid Highlights */}
      <BentoHighlights />

      {/* Featured Case Studies / Web Projects */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container-custom">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="pill-badge pill-blue" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code2 size={14} />
                <span>المشاريع الهندسية الأبرز</span>
              </div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                أنظمة خلفية ودراسات حالة متكاملة
              </h2>
            </div>
            <Link to="/projects" className="btn-secondary" style={{ backgroundColor: '#ffffff' }}>
              <span>عرض كل المشاريع ({webProjects.length})</span>
              <ArrowUpLeft size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

        </div>
      </section>

      {/* Preview Certificates & Qualifications */}
      <section style={{ padding: '5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container-custom">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="pill-badge pill-gold" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={14} />
                <span>المركز الأول والشهادات المعتمدة</span>
              </div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                الاعتمادات والتكريمات الرسمية
              </h2>
            </div>
            <Link to="/credentials" className="btn-secondary" style={{ backgroundColor: '#ffffff' }}>
              <span>عرض كافة الاعتمادات والشهادات</span>
              <ArrowUpLeft size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {previewCertificates.map((cert) => (
              <div 
                key={cert.id}
                className="corporate-card"
                style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                onClick={() => setSelectedCert(cert)}
              >
                <div>
                  <div style={{ height: '140px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8fafc', marginBottom: '1rem', border: '1px solid #e2e8f0', padding: '0.5rem' }}>
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--brand-primary)', fontWeight: '700', marginBottom: '0.25rem' }}>
                    {cert.issuer}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                    {cert.title}
                  </h4>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cert.date}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span>معاينة</span>
                    <ArrowUpLeft size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Verified Testimonials Preview (Matching Certificates Pattern) */}
      <section style={{ padding: '5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container-custom">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="pill-badge pill-emerald" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Star size={14} />
                <span>آراء وتوصيات رسمية</span>
              </div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                ماذا يقول الموجهون والعملاء عن العمل معي
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: '800',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.22)'
                }}
              >
                <Plus size={16} />
                <span>أضف توصيتك</span>
              </button>

              <Link to="/testimonials" className="btn-secondary" style={{ backgroundColor: '#ffffff' }}>
                <span>عرض كافة التوصيات ({approvedTestimonials.length})</span>
                <ArrowUpLeft size={16} />
              </Link>
            </div>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {previewTestimonials.map((test) => {
              const quoteText = test.quote || test.content || "";
              return (
                <div 
                  key={test.id}
                  className="corporate-card"
                  style={{
                    padding: "2.25rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#ffffff",
                    borderRadius: "22px",
                    border: "1px solid #cbd5e1",
                    boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)",
                    height: "100%"
                  }}
                >
                  <div>
                    {/* Rating Stars & Official Verification Badge Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>

                      <span className="pill-badge pill-gold" style={{ fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                        <ShieldCheck size={13} color="#d97706" />
                        <span>{test.badge || "توصية موثقة رسمياً"}</span>
                      </span>
                    </div>

                    {/* Quotation Header & Non-italic Text */}
                    <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                      <Quote size={28} color="#93c5fd" style={{ opacity: 0.6, marginBottom: "0.5rem" }} />
                      <p 
                        style={{ 
                          fontSize: "0.95rem", 
                          color: "#1e293b", 
                          lineHeight: 1.8, 
                          fontWeight: "500",
                          display: "-webkit-box",
                          WebkitLineClamp: 6,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}
                      >
                        {quoteText}
                      </p>
                    </div>
                  </div>

                  {/* Author Header & Modal Trigger Footer */}
                  <div style={{ paddingTop: "1.25rem", borderTop: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <div style={{ width: "46px", height: "46px", borderRadius: "12px", overflow: "hidden", backgroundColor: "#eff6ff", border: "1.5px solid #cbd5e1", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {test.image ? (
                            <img src={test.image} alt={test.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <div style={{ width: "100%", height: "100%", backgroundColor: "#2563eb", color: "#ffffff", fontWeight: "900", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {test.name ? test.name.charAt(0) : "T"}
                            </div>
                          )}
                        </div>

                        <div>
                          <div style={{ fontWeight: "800", color: "var(--text-primary)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <span>{test.name}</span>
                            <CheckCircle2 size={14} color="#2563eb" />
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.15rem" }}>
                            {test.role} — {test.company}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        {(test.proofUrl || test.link) && (
                          <a
                            href={test.proofUrl || test.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="زيارة رابط التوثيق الأصلي ↗"
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "10px",
                              backgroundColor: "#eff6ff",
                              border: "1px solid #bfdbfe",
                              color: "#2563eb",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              textDecoration: "none",
                              transition: "all 0.2s ease"
                            }}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}

                        <button
                          onClick={() => setSelectedProofTestimonial(test)}
                          title="معاينة التوثيق والإثبات"
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            backgroundColor: "#f1f5f9",
                            border: "1px solid #cbd5e1",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            flexShrink: 0,
                            transition: "all 0.2s ease"
                          }}
                        >
                          <Eye size={16} />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Direct Contact CTA Banner */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="container-custom">
          <div 
            className="corporate-card"
            style={{
              padding: '3.5rem 2.5rem',
              textAlign: 'center',
              backgroundColor: '#eff6ff',
              borderColor: '#bfdbfe',
              borderRadius: '24px'
            }}
          >
            <div className="pill-badge pill-blue" style={{ marginBottom: '1rem' }}>
              <Send size={14} />
              <span>جاهز للبدء فوراً</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              هل ترغب في بناء منظومة برمجية متينة أو توظيف كفاءة واعدة؟
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              يسعدني مناقشة الفرص الوظيفية (Full-time / Remote) أو المشاريع البرمجية واستشارات الـ Backend.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <a 
                href={personalInfo.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary"
                style={{ padding: '0.85rem 2rem', fontSize: '1rem', backgroundColor: '#10b981', borderColor: '#10b981' }}
              >
                <Send size={18} />
                <span>محادثة مباشرة عبر WhatsApp</span>
              </a>
              <Link 
                to="/contact" 
                className="btn-secondary"
                style={{ padding: '0.85rem 1.85rem', fontSize: '1rem', backgroundColor: '#ffffff' }}
              >
                <span>صفحة التواصل والبريد</span>
                <ArrowUpLeft size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}

      {/* Resume Modal */}
      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
      <TestimonialProofModal isOpen={Boolean(selectedProofTestimonial)} onClose={() => setSelectedProofTestimonial(null)} testimonial={selectedProofTestimonial} />
      <SubmitTestimonialModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />

      {/* Responsive Style Overrides */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @media (max-width: 990px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-content, .hero-image-col {
            grid-column: span 12 !important;
          }
          .hero-image-col {
            margin-top: 2.5rem;
          }
        }
      `}</style>

    </div>
  );
}
