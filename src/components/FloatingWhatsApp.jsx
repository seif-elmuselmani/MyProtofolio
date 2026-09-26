import React, { useState } from 'react';
import { MessageCircle, MessageSquare, Send } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

export default function FloatingWhatsApp() {
  const { personalInfo } = usePortfolioData();
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = personalInfo?.whatsapp || "https://wa.me/201223817860?text=أهلاً%20سيف،%20أتواصل%20معك%20من%20خلال%20الموقع%20الرسمي";

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        direction: 'rtl'
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          backgroundColor: '#25D366',
          color: '#ffffff',
          padding: isHovered ? '0.75rem 1.35rem 0.75rem 1rem' : '0.85rem',
          borderRadius: '9999px',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45), 0 4px 12px rgba(15, 23, 42, 0.15)',
          textDecoration: 'none',
          transition: 'all 0.35 cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'scale(1.05) translateY(-3px)' : 'scale(1.0)',
          cursor: 'pointer'
        }}
        title="تواصل مباشر عبر الواتساب"
      >
        {/* SVG Official WhatsApp Icon */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>

        {/* Hover Label */}
        {isHovered && (
          <span
            style={{
              fontSize: '0.92rem',
              fontWeight: '800',
              whiteSpace: 'nowrap',
              color: '#ffffff',
              lineHeight: 1
            }}
          >
            محادثة فورية عبر واتساب
          </span>
        )}
      </a>
    </div>
  );
}
