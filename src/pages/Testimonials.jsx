import React, { useState } from "react";
import { 
  MessageSquare, 
  Star, 
  Quote, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  ShieldCheck,
  Eye,
  ExternalLink,
  Building2,
  Filter
} from "lucide-react";
import { usePortfolioData } from "../context/DynamicPortfolioContext";
import SubmitTestimonialModal from "../components/SubmitTestimonialModal";
import TestimonialProofModal from "../components/TestimonialProofModal";

export default function Testimonials() {
  const { testimonialsList } = usePortfolioData();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedProofTestimonial, setSelectedProofTestimonial] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "nti" | "nafezly" | "linkedin"

  // Filter approved testimonials
  const approvedTestimonials = (testimonialsList || []).filter(t => t.status !== "pending");

  const filteredTestimonials = approvedTestimonials.filter(t => {
    if (activeFilter === "nti") return (t.company && t.company.includes("NTI")) || (t.source && t.source.includes("NTI"));
    if (activeFilter === "nafezly") return (t.source && t.source.includes("Nafezly")) || (t.company && t.company.includes("Nafezly"));
    if (activeFilter === "linkedin") return (t.source && t.source.includes("LinkedIn"));
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ paddingTop: "6.5rem", minHeight: "85vh", paddingBottom: "5rem", backgroundColor: "#f8fafc" }}>
      
      {/* Page Header */}
      <div className="container-custom" style={{ marginBottom: "3.5rem" }}>
        <div 
          className="corporate-card"
          style={{ 
            padding: "3.5rem 2.5rem", 
            textAlign: "center", 
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.05)",
            border: "1px solid #cbd5e1"
          }}
        >
          <div className="pill-badge pill-gold" style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <Sparkles size={15} />
            <span>شهادات موثقة وإشادات رسمية من خبراء الصناعة</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900", color: "var(--text-primary)", marginBottom: "1rem", lineHeight: 1.25 }}>
            ماذا يقول الموجهون والعملاء عن العمل معي
          </h1>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "720px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
            توصيات إدارية وتقنية رسمية من قادة المعهد القومي للاتصالات (NTI) وموجهي وزارة الاتصالات DEPI، بالإضافة لإشادات عملاء منصة مستقل وتنفذي للعمل الحر (تقييم 5.0/5.0).
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="btn-primary"
              style={{
                padding: "0.85rem 1.85rem",
                borderRadius: "14px",
                fontSize: "1rem"
              }}
            >
              <Plus size={18} />
              <span>أضف توصيتك أو تقييمك</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="container-custom" style={{ marginBottom: "2.5rem" }}>
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "0.6rem 1rem",
            backgroundColor: "#ffffff",
            borderRadius: "9999px",
            border: "1px solid #e2e8f0",
            maxWidth: "700px",
            margin: "0 auto",
            boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)"
          }}
        >
          {[
            { key: "all", label: `كافة التوصيات (${approvedTestimonials.length})` },
            { key: "nti", label: "توصيات NTI الرسمية" },
            { key: "nafezly", label: "عملاء مستقل / نفذلي" },
            { key: "linkedin", label: "توصيات LinkedIn" }
          ].map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                style={{
                  padding: "0.45rem 1.15rem",
                  borderRadius: "9999px",
                  fontSize: "0.86rem",
                  fontWeight: isActive ? "800" : "600",
                  color: isActive ? "#ffffff" : "#475569",
                  backgroundColor: isActive ? "#2563eb" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="container-custom">
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem"
          }}
        >
          {filteredTestimonials.map((test, idx) => {
            const quoteText = test.quote || test.content || "";
            return (
              <div 
                key={test.id || idx}
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
                  height: "100%",
                  position: "relative"
                }}
              >
                <div>
                  {/* Rating Stars & Official Verification Pill Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>

                    <span 
                      className="pill-badge pill-gold" 
                      style={{ 
                        fontSize: "0.78rem", 
                        display: "inline-flex", 
                        alignItems: "center", 
                        gap: "0.35rem"
                      }}
                    >
                      <ShieldCheck size={13} color="#d97706" />
                      <span>{test.badge || "توصية موثقة رسمياً"}</span>
                    </span>
                  </div>

                  {/* Quote Decorative Icon & Content */}
                  <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                    <Quote size={28} color="#93c5fd" style={{ opacity: 0.6, marginBottom: "0.5rem" }} />
                    
                    <p 
                      style={{ 
                        fontSize: "0.95rem", 
                        color: "#1e293b", 
                        lineHeight: 1.8, 
                        fontWeight: "500",
                        display: "-webkit-box",
                        WebkitLineClamp: 7,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {quoteText}
                    </p>

                    {quoteText.length > 250 && (
                      <button
                        onClick={() => setSelectedProofTestimonial(test)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#2563eb",
                          fontSize: "0.82rem",
                          fontWeight: "800",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          marginTop: "0.5rem"
                        }}
                      >
                        <Eye size={14} />
                        <span>قراءة التوصية الكاملة مع التوثيق</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Author Info & Modal Trigger Footer */}
                <div style={{ paddingTop: "1.25rem", borderTop: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "12px", overflow: "hidden", backgroundColor: "#eff6ff", border: "1.5px solid #cbd5e1", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {test.image ? (
                          <img src={test.image} alt={test.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", backgroundColor: "#2563eb", color: "#ffffff", fontWeight: "900", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {test.name ? test.name.charAt(0) : "T"}
                          </div>
                        )}
                      </div>

                      <div>
                        <div style={{ fontWeight: "800", color: "var(--text-primary)", fontSize: "0.96rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <span>{test.name}</span>
                          <CheckCircle2 size={14} color="#2563eb" />
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.15rem" }}>
                          {test.role} — {test.company}
                        </div>
                      </div>
                    </div>

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
            );
          })}
        </div>
      </div>

      {/* Visitor Submission Modal */}
      <SubmitTestimonialModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Proof Details Modal */}
      <TestimonialProofModal
        isOpen={Boolean(selectedProofTestimonial)}
        onClose={() => setSelectedProofTestimonial(null)}
        testimonial={selectedProofTestimonial}
      />

    </div>
  );
}
