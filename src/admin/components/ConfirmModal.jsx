import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title = 'تأكيد العملية', message = 'هل أنت متأكد من رغبتك في إتمام هذا الإجراء؟' }) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', textAlign: 'center' }}>
        
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <AlertTriangle size={28} />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
          {title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={onClose} className="admin-btn admin-btn-secondary" style={{ minWidth: '110px' }}>
            إلغاء
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className="admin-btn admin-btn-danger"
            style={{ minWidth: '110px' }}
          >
            نعم، تأكيد الحذف
          </button>
        </div>

      </div>
    </div>
  );
}
