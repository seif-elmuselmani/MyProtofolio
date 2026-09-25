import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, ShieldCheck, Star, Quote, Maximize2, ZoomIn, FileText, Image as ImageIcon } from "lucide-react";

export default function TestimonialProofModal({ isOpen, onClose, testimonial }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !testimonial) return null;

  const fullQuote = testimonial.quote || testimonial.content || "";
  const proofImage = testimonial.image || testimonial.proofUrl || testimonial.screenshot;

  return createPortal(
    <>
      {/* Main Details Modal */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.25rem"
        }}
        onClick={onClose}
      >
        <div 
          style={{
            width: "100%",
            maxWidth: "760px",
            maxHeight: "92vh",
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.35)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #cbd5e1",
            animation: "fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div 
            style={{
              padding: "1.25rem 1.75rem",
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
              <div style={{ padding: "0.4rem 0.85rem", borderRadius: "9999px", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", color: "#047857", fontSize: "0.82rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <ShieldCheck size={16} />
                <span>إثبات توصية موثقة ورسمية</span>
              </div>
              <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>
                {testimonial.source || testimonial.date}
              </span>
            </div>

            <button
              onClick={onClose}
              style={{
                padding: "0.45rem",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#e2e8f0",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease"
              }}
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div style={{ padding: "2rem 1.75rem", overflowY: "auto", flex: 1 }}>
            
            {/* Rating Stars Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "1.25rem" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
              <span style={{ marginRight: "0.5rem", fontWeight: "800", color: "#d97706", fontSize: "0.92rem" }}>
                5.0 / 5.0 تقييم ممتاز وثقة كاملة
              </span>
            </div>

            {/* Quotation Header & Exact Quote */}
            <div style={{ position: "relative", paddingRight: "1rem", borderRight: "4px solid #2563eb", marginBottom: "2rem" }}>
              <Quote size={36} color="#93c5fd" style={{ opacity: 0.5, marginBottom: "0.5rem" }} />
              <p 
                style={{
                  fontSize: "1.02rem",
                  lineHeight: "1.9",
                  color: "#1e293b",
                  fontWeight: "500",
                  whiteSpace: "pre-line"
                }}
              >
                {fullQuote}
              </p>
            </div>

            {/* Proof Document Screenshot Section */}
            {proofImage && (
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <ImageIcon size={16} color="#2563eb" />
                    <span>مستند وثيقة التوثيق والإثبات الرسمية</span>
                  </div>

                  <button
                    onClick={() => setIsZoomed(true)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#2563eb",
                      fontSize: "0.8rem",
                      fontWeight: "800",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem"
                    }}
                  >
                    <ZoomIn size={14} />
                    <span>تكبير الصورة ملء الشاشة</span>
                  </button>
                </div>

                <div 
                  onClick={() => setIsZoomed(true)}
                  style={{
                    position: "relative",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1.5px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
                    cursor: "zoom-in",
                    maxHeight: "420px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.75rem"
                  }}
                  title="انقر لتكبير صورة التوثيق ملء الشاشة"
                >
                  <img 
                    src={proofImage} 
                    alt={`وثيقة إثبات ${testimonial.name}`} 
                    style={{ 
                      width: "100%", 
                      maxHeight: "390px", 
                      objectFit: "contain",
                      borderRadius: "12px"
                    }} 
                  />

                  {/* Zoom Overlay Badge */}
                  <div 
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      left: "1rem",
                      backgroundColor: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(6px)",
                      color: "#ffffff",
                      padding: "0.4rem 0.85rem",
                      borderRadius: "9999px",
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
                    }}
                  >
                    <Maximize2 size={13} />
                    <span>انقر لمعاينة الصورة بالكامل</span>
                  </div>
                </div>
              </div>
            )}

            {/* Author Badge Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", backgroundColor: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", overflow: "hidden", backgroundColor: "#eff6ff", border: "2px solid #3b82f6", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {testimonial.image ? (
                  <img src={testimonial.image} alt={testimonial.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#2563eb", color: "#ffffff", fontWeight: "900", fontSize: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {testimonial.name ? testimonial.name.charAt(0) : "T"}
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <span>{testimonial.name}</span>
                  <CheckCircle2 size={16} color="#2563eb" />
                </div>
                <div style={{ fontSize: "0.85rem", color: "#475569", fontWeight: "600", marginTop: "0.2rem" }}>
                  {testimonial.role} — {testimonial.company}
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div style={{ padding: "1.25rem 1.75rem", backgroundColor: "#ffffff", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {proofImage ? (
              <button
                onClick={() => setIsZoomed(true)}
                className="btn-primary"
                style={{ padding: "0.6rem 1.35rem", fontSize: "0.88rem" }}
              >
                <Maximize2 size={15} />
                <span>عرض وثيقة الإثبات مكبّرة</span>
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: "0.6rem 1.5rem", fontSize: "0.88rem" }}
            >
              إغلاق النافذة
            </button>
          </div>

        </div>
      </div>

      {/* Full Screen Lightbox Modal */}
      {isZoomed && proofImage && (
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
          onClick={() => setIsZoomed(false)}
        >
          {/* Lightbox Controls Top Bar */}
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
              معاينة وثيقة التوثيق مكبّرة: {testimonial.name}
            </div>

            <button
              onClick={() => setIsZoomed(false)}
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
                gap: "0.4rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
              }}
            >
              <X size={18} />
              <span>إغلاق التكبير</span>
            </button>
          </div>

          {/* Full Screen Image Container */}
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
              src={proofImage} 
              alt={`مستند توثيق مكبر - ${testimonial.name}`} 
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
    </>,
    document.body
  );
}
