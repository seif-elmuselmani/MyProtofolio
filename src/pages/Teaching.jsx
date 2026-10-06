import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Users, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  ExternalLink, 
  MessageSquare, 
  Maximize2, 
  X, 
  Code2, 
  Cpu, 
  Brain, 
  HeartHandshake, 
  Star, 
  Building2, 
  ShieldCheck,
  ChevronRight,
  Send
} from "lucide-react";
import { usePortfolioData } from "../context/DynamicPortfolioContext";
import { useLanguage } from "../context/LanguageContext";

export default function Teaching() {
  const { personalInfo, teachingExperience, testimonialsList } = usePortfolioData();
  const { isRTL } = useLanguage();
  const [zoomedImage, setZoomedImage] = useState(null);

  const { stats, experienceList } = teachingExperience;

  // Filter iSchool, Parent, and NTI Testimonials for high conversion
  const featuredTestimonials = (testimonialsList || []).filter(t => 
    t.category === "ischool" || t.category === "parent" || t.category === "student" || t.category === "nti"
  );

  // Live session photos array
  const sessionPhotos = [
    {
      src: "/assets/teaching/ischool-live-session.png",
      title: isRTL ? "خبرة وتجربة التدريس أونلاين عبر منصة iSchool" : "Online Live Tutoring Experience on iSchool",
      desc: isRTL 
        ? "تصور توضيحي يعكس بيئة المحاضرات والسيشنات أونلاين، مراعاة لسياسة الخصوصية وعدم نشر صور الطلاب الناشئين."
        : "Visual representation reflecting the interactive online lecture environment while preserving student privacy.",
      link: "https://www.linkedin.com/posts/seif-elmuselmani_%D8%A7%D9%84%D8%B4%D9%87%D8%B1-%D8%AF%D9%87-%D8%A7%D8%AA%D8%B9%D8%B1%D8%B6-%D8%B9%D9%84%D9%8A%D8%A7-%D9%81%D8%B1%D8%B5%D8%A9-%D8%A5%D9%86%D9%8A-%D8%A3%D8%AF%D9%8A-%D8%B3%D9%8A%D8%B4%D9%86%D8%A7%D8%AA-%D8%A3%D9%88%D9%86%D9%84%D8%A7%D9%8A%D9%86-activity-7508549064591069184-COuP",
      linkText: isRTL ? "قراءة منشور تجربة الأونلاين على LinkedIn ↗" : "Read Online Tutoring Post on LinkedIn ↗"
    },
    {
      src: "/assets/teaching/offline-sessions.png",
      title: isRTL ? "خبرة عملية مثبتة في إدارة الجلسات والمحاضرات الأوفلاين (In-Person)" : "Proven In-Person Classroom Tutoring & Workshops",
      desc: isRTL
        ? "تصور توضيحي يجسد تفاعل الطلاب والتواصل المباشر والحضوري في قاعات التدريب."
        : "Visual representation showcasing active in-person student engagement and hands-on coding sessions.",
      link: "https://lnkd.in/p/emGPyist",
      linkText: isRTL ? "قراءة منشور تجربة التدريس الأوفلاين على LinkedIn ↗" : "Read In-Person Tutoring Post on LinkedIn ↗"
    }
  ];

  // Scholarship Proofs
  const scholarshipProofs = [
    {
      title: isRTL ? "🎓 بكالوريوس علوم الحاسب (CS) — تقدير جيد جداً و A+ بمشروع التخرج" : "🎓 B.Sc. Computer Science — Very Good (Honor Roll) & A+ Grad Project",
      issuer: isRTL ? "كلية الحاسبات والمعلومات — جامعة الزقازيق" : "Faculty of Computers & Informatics — Zagazig University",
      image: "/assets/certificates/cert-zagazig-graduation.png",
      date: "2026",
      desc: isRTL 
        ? "التخرج بتقدير عام جيد جداً مرتفع من كلية الحاسبات والمعلومات جامعة الزقازيق، والعمل كـ Team Leader لمشروع التخرج الطبي الذكي (نبض) والحصول على تقدير ممتاز (A+) مع إشادة لجنة التحكيم."
        : "Graduated with High Very Good honors from Zagazig University CS. Led the NABD AI medical system team receiving an A+ Grade & jury praise.",
      link: "https://lnkd.in/p/eiWnXkAC",
      linkText: isRTL ? "قراءة منشور التخرج الرسمي والتفاصيل على LinkedIn ↗" : "Read Official Graduation Announcement on LinkedIn ↗",
      badgeText: isRTL ? "درجة أكاديمية رسمية وتوثيق تخرج" : "Official Academic Degree & Honors Document"
    },
    {
      title: isRTL ? "🏆 تكريم المركز الأول على مستوى الجمهورية (مبادرة DEPI)" : "🏆 1st Place Winner Nationwide (DEPI Initiative - MCIT)",
      issuer: isRTL ? "وزارة الاتصالات وتكنولوجيا المعلومات (MCIT) بالتعاون مع EYouth" : "Ministry of Communications & IT (MCIT) / EYouth",
      image: "/assets/profile/seif-with-dr-hesham-farouk-depi.png",
      date: "2025 - 2026",
      desc: isRTL
        ? "صورة التكريم الرسمي بحضور مستشار وزير الاتصالات للتطوير التكنولوجي د. هشام فاروق بعد الحصول على المرتبة الأولى على مستوى الجمهورية في مسار Full Stack .NET."
        : "Official honor ceremony photo with Dr. Hesham Farouk (Advisor to the Minister of IT) after securing 1st Place Nationwide in Full Stack .NET track."
    },
    {
      title: isRTL ? "🏛️ برنامج التدريب المكثف بالمعهد القومي للاتصالات (NTI) - 210 ساعة" : "🏛️ Intensive NTI Diploma (210 Hours) - MCIT",
      issuer: isRTL ? "National Telecommunication Institute (NTI) - وزارة الاتصالات" : "National Telecommunication Institute (NTI) - MCIT",
      image: "/assets/certificates/cert-nti-210h.jpg",
      date: "2025 - 2026",
      desc: isRTL
        ? "برنامج تدريبي مكثف واحترافي بمعدل 210 ساعة دراسية وعملية من المعهد القومي للاتصالات (NTI)، شمل تطوير تطبيقات الويب، الهندسة السحابية وبناء المعماريات المعقدة وتأمين الأنظمة وتطبيقها عملياً."
        : "210 hours of intensive engineering diploma covering full-stack web development, cloud architectures, system security, and hands-on production code."
    }
  ];

  return (
    <div className="animate-fade-in" style={{ paddingTop: "6.5rem", minHeight: "85vh", paddingBottom: "5rem", backgroundColor: "#f8fafc" }}>
      <div className="container-custom">
        
        {/* Tutor Pitch Header */}
        <div 
          className="corporate-card"
          style={{ 
            padding: "3.5rem 2.5rem", 
            textAlign: "center", 
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.05)",
            border: "1px solid #cbd5e1",
            marginBottom: "3.5rem"
          }}
        >
          <div className="pill-badge pill-emerald" style={{ marginBottom: "1.25rem", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
            <GraduationCap size={16} />
            <span>Senior CS & STEM Coding Tutor | iSchool & MCIT Partner</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: "900", color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.2 }}>
            {isRTL ? "إعداد أجيال البرمجة، الذكاء الاصطناعي، والتفكير المنطقي" : "Empowering Future Innovators in CS, AI & Computational Thinking"}
          </h1>

          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "780px", margin: "0 auto 2.25rem", lineHeight: 1.85, fontWeight: "500" }}>
            {isRTL 
              ? "مدرب تقني رئيسي (Main Technical Tutor) في منصة iSchool ومبادرة براعم مصر الرقمية (DEMI) بالتعاون مع وزارة الاتصالات وتكنولوجيا المعلومات. متمرس في تبسيط العلوم الحاسوبية المعقدة، وبناء الثقة بالنفس للأطفال والشباب، وتخريج طلاب قادريين على بناء مشاريع حقيقية."
              : "Lead Coding Tutor at iSchool & Digital Egypt Youth Initiative (DEMI) in partnership with MCIT Egypt. Specialized in simplifying complex computer science concepts, building student confidence, and guiding young creators to build real software applications."}
          </p>

          {/* High Conversion CTA Action Buttons */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="/assets/documents/CV_Computer_Science_And_ICT_Tutor.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: "0.85rem 1.85rem",
                fontSize: "1rem",
                fontWeight: "800",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                textDecoration: "none",
                boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
              }}
            >
              <Download size={18} />
              <span>{isRTL ? "تحميل السيرة الذاتية المخصصة للتدريس (Tutor CV PDF)" : "Download Dedicated Tutor Resume (PDF)"}</span>
            </a>

            <Link
              to="/testimonials?filter=ischool"
              className="btn-secondary"
              style={{
                padding: "0.85rem 1.65rem",
                fontSize: "0.98rem",
                fontWeight: "700",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                backgroundColor: "#ffffff",
                border: "1.5px solid #cbd5e1",
                color: "#0f172a"
              }}
            >
              <Star size={17} color="#f59e0b" fill="#f59e0b" />
              <span>{isRTL ? "عرض تقييمات أولياء الأمور والطلاب (10+)" : "View Parent & Student Reviews (10+)"}</span>
            </Link>
          </div>
        </div>

        {/* High-Impact Proof Stats Bar */}
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "4.5rem"
          }}
        >
          <div className="corporate-card" style={{ padding: "1.85rem", textAlign: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: "900", color: "#059669", marginBottom: "0.3rem" }}>{stats.totalStudents || "500+"}</div>
            <div style={{ fontSize: "0.95rem", color: "#0f172a", fontWeight: "800" }}>{isRTL ? "طالب وطالبة تم تدريبهم" : "Students Trained"}</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.2rem" }}>iSchool & DEMI Summer Camp</div>
          </div>

          <div className="corporate-card" style={{ padding: "1.85rem", textAlign: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: "900", color: "#2563eb", marginBottom: "0.3rem" }}>{stats.hoursTaught || "250+"}</div>
            <div style={{ fontSize: "0.95rem", color: "#0f172a", fontWeight: "800" }}>{isRTL ? "ساعة تدريس وتفاعل مباشر" : "Live Tutoring Hours"}</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.2rem" }}>{isRTL ? "جلسات عمل وتطبيق كود شغال" : "Hands-on Practical Coding Sessions"}</div>
          </div>

          <div className="corporate-card" style={{ padding: "1.85rem", textAlign: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "1.9rem", fontWeight: "900", color: "#d97706", marginBottom: "0.3rem" }}>{isRTL ? "🏆 المركز الأول" : "🏆 1st Place"}</div>
            <div style={{ fontSize: "0.95rem", color: "#0f172a", fontWeight: "800" }}>{isRTL ? "أول على الجمهورية بـ DEPI" : "DEPI 1st Place Winner"}</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.2rem" }}>MCIT Egypt & NTI</div>
          </div>

          <div className="corporate-card" style={{ padding: "1.85rem", textAlign: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: "900", color: "#7c3aed", marginBottom: "0.3rem" }}>100%</div>
            <div style={{ fontSize: "0.95rem", color: "#0f172a", fontWeight: "800" }}>{isRTL ? "معدل رضى وأثر تربوي مثبت" : "Satisfaction & Pedagogical Impact"}</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.2rem" }}>{isRTL ? "إشادات أولياء الأمور والقيادات" : "Parent & Leadership Commendations"}</div>
          </div>
        </div>

        {/* Live Interactive Sessions Photo Gallery Section */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div className="pill-badge pill-blue" style={{ marginBottom: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Code2 size={15} />
              <span>{isRTL ? "شواهد حية من القاعات وجلسات التدريب أونلاين" : "Live Evidence & Classroom Environment"}</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a" }}>
              {isRTL ? "معرض الجلسات والسيشنات التفاعلية المباشرة" : "Interactive Tutoring Session Showcase"}
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.02rem", maxWidth: "650px", margin: "0.5rem auto 0" }}>
              {isRTL ? "نظرة داخل قاعات التدريب الافتراضية وكيفية إدارة السيشن وتطبيق مبدأ التعلم التفاعلي." : "A glimpse into virtual and classroom tutoring sessions demonstrating interactive learning methodologies."}
            </p>
          </div>

          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.75rem"
            }}
          >
            {sessionPhotos.map((photo, idx) => (
              <div 
                key={idx}
                className="corporate-card"
                style={{ 
                  backgroundColor: "#ffffff", 
                  borderRadius: "20px", 
                  overflow: "hidden", 
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div 
                  style={{ position: "relative", height: "250px", overflow: "hidden", cursor: "pointer", backgroundColor: "#f8fafc" }}
                  onClick={() => setZoomedImage(photo)}
                >
                  <img 
                    src={photo.src} 
                    alt={photo.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", transition: "transform 0.4s ease" }}
                  />
                  <div 
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      right: isRTL ? "0.75rem" : "auto",
                      left: isRTL ? "auto" : "0.75rem",
                      backgroundColor: "rgba(15, 23, 42, 0.8)",
                      color: "#ffffff",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem"
                    }}
                  >
                    <Maximize2 size={13} />
                    <span>{isRTL ? "تكبير الصورة" : "Expand Image"}</span>
                  </div>
                </div>

                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                      {photo.title}
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                      {photo.desc}
                    </p>
                  </div>
                  {photo.link ? (
                    <a 
                      href={photo.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        marginTop: "1rem", 
                        paddingTop: "0.75rem", 
                        borderTop: "1px solid #e2e8f0", 
                        display: "inline-flex", 
                        alignItems: "center", 
                        gap: "0.4rem", 
                        color: "#2563eb", 
                        fontSize: "0.85rem", 
                        fontWeight: "800",
                        textDecoration: "none"
                      }}
                    >
                      <ExternalLink size={15} />
                      <span>{photo.linkText}</span>
                    </a>
                  ) : (
                    <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "0.4rem", color: "#059669", fontSize: "0.82rem", fontWeight: "700" }}>
                      <CheckCircle2 size={15} />
                      <span>{isRTL ? "جلسات موثقة ومباشرة" : "Verified Tutoring Sessions"}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarships & Government Grants Section with Proof Photos */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div className="pill-badge pill-gold" style={{ marginBottom: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Award size={15} />
              <span>{isRTL ? "المنح الحكومية والاعتمادات الرسمية" : "Government Scholarships & Institutional Grants"}</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a" }}>
              {isRTL ? "المنح التدريبية والتكريمات الرسمية" : "Official Honors & Training Diplomas"}
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.02rem", maxWidth: "680px", margin: "0.5rem auto 0" }}>
              {isRTL ? "توثيق المنح المكثفة والتكريمات الرسمية من وزارة الاتصالات وتكنولوجيا المعلومات والشركاء الدوليين." : "Documentation of intensive scholarships and official honors from MCIT Egypt and international partners."}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {scholarshipProofs.map((item, index) => (
              <div 
                key={index}
                className="corporate-card"
                style={{ 
                  padding: "2rem", 
                  backgroundColor: "#ffffff", 
                  borderRadius: "20px", 
                  border: "1px solid #e2e8f0",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "2rem",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.75rem", borderRadius: "9999px", backgroundColor: "#eff6ff", color: "#2563eb", fontSize: "0.82rem", fontWeight: "800", marginBottom: "0.85rem" }}>
                    <Building2 size={14} />
                    <span>{item.issuer}</span>
                  </div>

                  <h3 style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", marginBottom: "0.75rem", lineHeight: 1.35 }}>
                    {item.title}
                  </h3>

                  <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                    {item.desc}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#059669", fontWeight: "700", fontSize: "0.88rem" }}>
                      <ShieldCheck size={17} />
                      <span>{item.badgeText || (isRTL ? "منحة رسمية معتمدة وموثقة بالشهادات والتكريمات" : "Official Government Scholarship & Diploma")}</span>
                    </div>
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          display: "inline-flex", 
                          alignItems: "center", 
                          gap: "0.4rem", 
                          color: "#2563eb", 
                          fontWeight: "800", 
                          fontSize: "0.85rem",
                          textDecoration: "none"
                        }}
                      >
                        <ExternalLink size={15} />
                        <span>{item.linkText || (isRTL ? "عرض المنشور الرسمي على LinkedIn ↗" : "View Official Announcement on LinkedIn ↗")}</span>
                      </a>
                    )}
                  </div>
                </div>

                <div 
                  style={{ 
                    position: "relative", 
                    height: "280px", 
                    borderRadius: "16px", 
                    overflow: "hidden", 
                    border: "2px solid #2563eb",
                    backgroundColor: "#f1f5f9",
                    cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onClick={() => setZoomedImage({ src: item.image, title: item.title, desc: item.desc })}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                  />
                  <div 
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      left: isRTL ? "0.75rem" : "auto",
                      right: isRTL ? "auto" : "0.75rem",
                      backgroundColor: "rgba(15, 23, 42, 0.85)",
                      color: "#ffffff",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem"
                    }}
                  >
                    <Maximize2 size={13} />
                    <span>{isRTL ? "معاينة صورة التكريم/الشهادة" : "Preview Certificate Photo"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Psychological Social Proof & Testimonials Link Section */}
        <div style={{ marginBottom: "5rem" }}>
          <div 
            className="corporate-card"
            style={{ 
              padding: "3rem 2.25rem", 
              backgroundColor: "#ffffff", 
              color: "#0f172a", 
              borderRadius: "24px",
              boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.05)",
              border: "1px solid #cbd5e1"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.4rem 1rem", borderRadius: "9999px", backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", fontSize: "0.85rem", fontWeight: "800", marginBottom: "1rem" }}>
                <MessageSquare size={16} />
                <span>{isRTL ? "إشادات القيادات التنفيذية وأولياء الأمور" : "Executive & Parent Testimonials"}</span>
              </div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", marginBottom: "0.75rem" }}>
                {isRTL ? "ماذا يقول الرؤساء المباشرون وأولياء الأمور عن أسلوب تدريسي؟" : "What Supervisors & Parents Say About My Tutoring"}
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.02rem", maxWidth: "650px", margin: "0 auto", lineHeight: 1.7 }}>
                {isRTL ? "شهادات حقيقية وموثقة على LinkedIn ومنصات التدريب الرسمية تعكس الأثر التقني والتربوي الكبير." : "Verified recommendations from LinkedIn and official platforms reflecting tech leadership and teaching quality."}
              </p>
            </div>

            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2.5rem"
              }}
            >
              {featuredTestimonials.slice(0, 3).map((test, i) => {
                const quote = isRTL ? (test.quoteAr || test.quote) : (test.quoteEn || test.quote);
                const name = isRTL ? (test.nameAr || test.name) : (test.nameEn || test.name);
                const badge = isRTL ? (test.badgeAr || test.badge || test.company) : (test.badgeEn || test.badge || test.company);
                return (
                  <div 
                    key={i}
                    style={{
                      backgroundColor: "#f8fafc",
                      padding: "1.75rem",
                      borderRadius: "18px",
                      border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#2563eb", fontWeight: "800", marginBottom: "0.5rem" }}>
                        {badge}
                      </div>
                      <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.75, fontStyle: "italic", marginBottom: "1.25rem" }}>
                        "{quote && quote.length > 160 ? quote.substring(0, 160) + "..." : quote}"
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #e2e8f0" }}>
                      <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.95rem" }}>
                        {name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* High Conversion CTA Link to Full Testimonials */}
            <div style={{ textAlign: "center" }}>
              <Link
                to="/testimonials?filter=ischool"
                className="btn-primary"
                style={{
                  padding: "0.95rem 2.25rem",
                  fontSize: "1rem",
                  fontWeight: "900",
                  backgroundColor: "#059669",
                  color: "#ffffff",
                  borderRadius: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  textDecoration: "none",
                  boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.4)"
                }}
              >
                <span>{isRTL ? "عرض كافة تقييمات وتوصيات التدريس الموثقة (10+) ↗" : "View All Verified Tutoring Testimonials (10+) ↗"}</span>
                <ChevronRight size={18} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Teaching Methodology & Gamified Curriculum Section */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a" }}>
              {isRTL ? "منهجية الشرح والأسلوب التربوي والتقني" : "Teaching Methodology & Core Pillars"}
            </h2>
            <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "600px", margin: "0.5rem auto 0" }}>
              {isRTL ? "4 ركائز حاسمة أعتمد عليها لضمان تحويل المفاهيم الجافة إلى متعة شغف وإنجاز عملي." : "4 core pillars ensuring complex programming concepts translate into practical working code."}
            </p>
          </div>

          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem"
            }}
          >
            <div className="corporate-card" style={{ padding: "1.75rem", backgroundColor: "#ffffff" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Cpu size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem" }}>Project-Based Learning</h3>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                {isRTL ? "الطلاب لا يحفظون الأكواد؛ بل يتم تكليفهم ببناء مشاريع حقيقية بنهاية كل جلسة لرؤية النتيجة بأعينهم." : "Students build real, functional projects by the end of each session rather than memorizing code snippet syntax."}
              </p>
            </div>

            <div className="corporate-card" style={{ padding: "1.75rem", backgroundColor: "#ffffff" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <HeartHandshake size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem" }}>Peer Teaching & Confidence</h3>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                {isRTL ? "إتاحة الفرصة للطلاب لشرح منطقهم البرمجي لزملائهم لبناء ثقتهم بنفسهم ومهارات التحدث والقيادة." : "Encouraging students to present their code logic to peers, mastering communication, leadership, and self-confidence."}
              </p>
            </div>

            <div className="corporate-card" style={{ padding: "1.75rem", backgroundColor: "#ffffff" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Brain size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem" }}>Computational Thinking</h3>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                {isRTL ? "تدريب عقل الطالب على تفكيك التحديات المعقدة إلى خطوات منطقية متسلسلة قبل الشروع في كتابة الأكواد." : "Training minds to decompose complex logic into step-by-step algorithms before writing raw code syntax."}
              </p>
            </div>

            <div className="corporate-card" style={{ padding: "1.75rem", backgroundColor: "#ffffff" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#f3e8ff", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem" }}>Gamified Challenges</h3>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                {isRTL ? "تحويل التحديات البرمجية إلى مسابقات تفاعلية مشوقة تدفع الطلاب للحماس والتركيز والابتكار." : "Transforming coding exercises into dynamic, gamified competitions that foster enthusiasm and creativity."}
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Instructor Application & Contact Card */}
        <div 
          className="corporate-card"
          style={{ 
            padding: "3.5rem 2rem", 
            textAlign: "center", 
            backgroundColor: "#ffffff", 
            borderRadius: "24px",
            border: "2px solid #2563eb",
            boxShadow: "0 15px 35px rgba(37, 99, 235, 0.1)"
          }}
        >
          <div className="pill-badge pill-blue" style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <Send size={15} />
            <span>{isRTL ? "متاح حالياً للمسارات التدريبية والشراكات التعليمية" : "Available for Tutoring Tracks & STEM Partnerships"}</span>
          </div>

          <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a", marginBottom: "0.75rem" }}>
            {isRTL ? "هل تبحث عن مدرب تقني (CS & Coding Tutor) ذو كفاءة وأثر مثبت؟" : "Looking for a Proven Technical CS & Coding Tutor?"}
          </h2>

          <p style={{ color: "#475569", fontSize: "1.05rem", maxWidth: "650px", margin: "0 auto 2rem", lineHeight: 1.75 }}>
            {isRTL 
              ? "يسعدني مناقشة الانضمام كـ Instructor / Coding Tutor للمسارات البرمجية في المنصات التعليمية، المدارس الدولية، أو المبادرات الحكومية."
              : "Open to joining as an Instructor / Coding Tutor for educational platforms, international academies, or government digital initiatives."}
          </p>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="/assets/documents/CV_Computer_Science_And_ICT_Tutor.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: "0.85rem 1.85rem",
                fontSize: "1rem",
                fontWeight: "800",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none"
              }}
            >
              <Download size={18} />
              <span>{isRTL ? "تحميل الـ Tutor CV (PDF)" : "Download Tutor Resume (PDF)"}</span>
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=201223817860&text=Hello%20Seif,%20we%20would%20like%20to%20discuss%20a%20tutoring%20opportunity"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                padding: "0.85rem 1.85rem",
                fontSize: "1rem",
                fontWeight: "800",
                backgroundColor: "#059669",
                color: "#ffffff",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none"
              }}
            >
              <MessageSquare size={18} />
              <span>{isRTL ? "محادثة فورية عبر WhatsApp" : "Instant WhatsApp Inquiry"}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Image Modal */}
      {zoomedImage && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100000,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem"
          }}
          onClick={() => setZoomedImage(null)}
        >
          <div 
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              left: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 10
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ color: "#ffffff", fontWeight: "800", fontSize: "1rem", backgroundColor: "rgba(0,0,0,0.5)", padding: "0.5rem 1rem", borderRadius: "9999px" }}>
              {zoomedImage.title}
            </div>

            <button
              onClick={() => setZoomedImage(null)}
              style={{
                padding: "0.65rem 1.25rem",
                borderRadius: "9999px",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                border: "none",
                fontWeight: "800",
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <X size={18} />
              <span>{isRTL ? "إغلاق التكبير" : "Close Preview"}</span>
            </button>
          </div>

          <div 
            style={{
              maxWidth: "95vw",
              maxHeight: "85vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={zoomedImage.src} 
              alt={zoomedImage.title} 
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "16px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                border: "2px solid rgba(255,255,255,0.15)"
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
