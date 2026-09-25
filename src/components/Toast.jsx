import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, visible }) {
  if (!visible) return null;

  return (
    <div 
      className="animate-fade-in"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.3)',
        padding: '0.85rem 1.75rem',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        color: '#ffffff',
        fontSize: '0.9rem',
        fontWeight: '700'
      }}
    >
      <CheckCircle2 size={18} color="#10b981" />
      <span>{message}</span>
    </div>
  );
}