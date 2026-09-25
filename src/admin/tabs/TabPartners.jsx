import React, { useState } from 'react';
import { Building2, Plus, Trash2, Edit3, Save, Sparkles, Image as ImageIcon } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';
import ImagePickerModal from '../components/ImagePickerModal';
import ItemEditModal from '../components/ItemEditModal';
import ConfirmModal from '../components/ConfirmModal';

export default function TabPartners({ showToast }) {
  const { trustPartners, updateTrustPartners } = usePortfolioData();
  const [partners, setPartners] = useState([...trustPartners]);

  const [editingPartner, setEditingPartner] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenAdd = () => {
    const newPartner = {
      id: 'partner-' + Date.now(),
      name: 'مؤسسة / شريك جديد',
      role: 'Training & Development Partner',
      logo: '/assets/certificates/cert-depi-fullstack-dotnet.jpg'
    };
    setEditingPartner(newPartner);
    setEditingIndex(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (idx) => {
    setEditingPartner({ ...partners[idx] });
    setEditingIndex(idx);
    setIsEditModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updated;
    if (editingIndex === null) {
      updated = [editingPartner, ...partners];
    } else {
      updated = [...partners];
      updated[editingIndex] = editingPartner;
    }
    setPartners(updated);
    updateTrustPartners(updated);
    setIsEditModalOpen(false);
    showToast(editingIndex === null ? 'تمت إضافة الشريك بنجاح!' : 'تم تحديث بيانات الشريك بنجاح!');
  };

  const handleDeleteConfirmed = () => {
    if (deleteTargetIndex !== null) {
      const updated = partners.filter((_, i) => i !== deleteTargetIndex);
      setPartners(updated);
      updateTrustPartners(updated);
      showToast('تم حذف الشريك بنجاح!');
      setDeleteTargetIndex(null);
    }
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <Building2 size={24} color="#2563eb" />
            إدارة شركاء النجاح والمنظمات ({partners.length})
          </h2>
          <p className="admin-section-desc">
            إدارة شعارات وأسماء الجهات والمؤسسات الشريكة (DEPI, ITI, MCIT, iSchool).
          </p>
        </div>
        <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
          <Plus size={18} />
          إضافة شريك جديد
        </button>
      </div>

      <div className="admin-grid">
        {partners.map((p, idx) => (
          <div key={p.id || idx} className="admin-item-box">
            <div>
              <div style={{ height: '90px', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc', marginBottom: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.logo ? (
                  <img src={p.logo} alt={p.name} style={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }} />
                ) : (
                  <Building2 size={32} color="#94a3b8" />
                )}
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
                {p.name}
              </h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
                {p.role || 'Partner'}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={() => handleOpenEdit(idx)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
              >
                <Edit3 size={14} />
                تعديل
              </button>
              <button
                onClick={() => {
                  setDeleteTargetIndex(idx);
                  setIsConfirmOpen(true);
                }}
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
              >
                <Trash2 size={14} />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPartner && (
        <ItemEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={editingIndex === null ? 'إضافة شريك جديد' : `تعديل الشريك: ${editingPartner.name}`}
        >
          <form onSubmit={handleSaveModal}>
            <div className="admin-form-group">
              <label className="admin-label">اسم المؤسسة / الشريك</label>
              <input
                type="text"
                className="admin-input"
                value={editingPartner.name || ''}
                onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">طبيعة الشراكة / الدور</label>
              <input
                type="text"
                className="admin-input"
                value={editingPartner.role || ''}
                onChange={(e) => setEditingPartner({ ...editingPartner, role: e.target.value })}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">شعار المؤسسة (Logo)</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {editingPartner.logo ? (
                    <img src={editingPartner.logo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <ImageIcon size={20} color="#94a3b8" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsImagePickerOpen(true)}
                  className="admin-btn admin-btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  <ImageIcon size={15} />
                  تحديد شعار المؤسسة
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="admin-btn admin-btn-secondary">
                إلغاء
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Save size={16} />
                حفظ الشريك
              </button>
            </div>
          </form>
        </ItemEditModal>
      )}

      {editingPartner && (
        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          currentImage={editingPartner.logo}
          onSelectImage={(img) => setEditingPartner(prev => ({ ...prev, logo: img }))}
          title="تحديد شعار الشريك"
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="حذف الشريك"
        message="هل أنت متأكد من حذف هذا الشريك من قائمة شركاء النجاح؟"
      />
    </div>
  );
}
