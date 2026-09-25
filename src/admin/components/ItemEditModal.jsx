import React from 'react';
import { X } from 'lucide-react';

export default function ItemEditModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        
        <div className="admin-modal-header">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>{title}</h3>
          <button onClick={onClose} className="admin-modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div style={{ marginTop: '1.25rem', maxHeight: '72vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
          {children}
        </div>

      </div>
    </div>
  );
}
