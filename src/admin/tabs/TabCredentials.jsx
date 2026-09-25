import React, { useState } from 'react';
import { Award, Plus, Trash2, Edit3, Save, Sparkles, Search, Image as ImageIcon } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';
import ImagePickerModal from '../components/ImagePickerModal';
import ItemEditModal from '../components/ItemEditModal';
import ConfirmModal from '../components/ConfirmModal';

export default function TabCredentials({ showToast }) {
  const { credentialsList, updateCredentialsList } = usePortfolioData();
  const [certs, setCerts] = useState([...credentialsList]);
  const [searchQuery, setSearchQuery] = useState('');

  const [editingCert, setEditingCert] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const filteredCerts = certs.filter(c =>
    (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.issuer && c.issuer.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.badge && c.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAdd = () => {
    const newCert = {
      id: 'cert-' + Date.now(),
      title: 'شهادة واعتماد جديد',
      issuer: 'وزارة الاتصالات وتكنولوجيا المعلومات (MCIT)',
      date: '2026',
      badge: 'Certified Scholar',
      image: '/assets/certificates/cert-depi-fullstack-dotnet.jpg',
      highlight: true
    };
    setEditingCert(newCert);
    setEditingIndex(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (idx) => {
    setEditingCert({ ...certs[idx] });
    setEditingIndex(idx);
    setIsEditModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updated;
    if (editingIndex === null) {
      updated = [editingCert, ...certs];
    } else {
      updated = [...certs];
      updated[editingIndex] = editingCert;
    }
    setCerts(updated);
    updateCredentialsList(updated);
    setIsEditModalOpen(false);
    showToast(editingIndex === null ? 'تمت إضافة الشهادة بنجاح!' : 'تم تحديث الشهادة بنجاح!');
  };

  const handleDeleteConfirmed = () => {
    if (deleteTargetIndex !== null) {
      const updated = certs.filter((_, i) => i !== deleteTargetIndex);
      setCerts(updated);
      updateCredentialsList(updated);
      showToast('تم حذف الشهادة بنجاح!');
      setDeleteTargetIndex(null);
    }
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <Award size={24} color="#d97706" />
            الشهادات والاعتمادات الرسمية ({certs.length})
          </h2>
          <p className="admin-section-desc">
            إدارة شهادات مبادرة مصر الرقمية (DEPI)، معهد ITI، HackerRank، وصور الاعتمادات الأصلية.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
          <Plus size={18} />
          إضافة اعتماد جديد
        </button>
      </div>

      {/* Toolbar & Search */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <input
            type="text"
            className="admin-search-input"
            placeholder="بحث في الشهادات بالاسم أو الجهة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '600' }}>
          عرض {filteredCerts.length} من أصل {certs.length} شهادة
        </div>
      </div>

      {/* Grid */}
      <div className="admin-grid">
        {filteredCerts.map((c, idx) => {
          const originalIdx = certs.findIndex(item => item.id === c.id || item.title === c.title);

          return (
            <div key={c.id || idx} className="admin-item-box">
              <div>
                {/* Certificate Image Preview */}
                <div style={{ height: '130px', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc', marginBottom: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {c.image ? (
                    <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <Award size={36} color="#d97706" />
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className="admin-badge-prestige">
                    <Sparkles size={11} />
                    {c.badge || 'Official Certificate'}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>{c.date || '2026'}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
                  {c.title}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '600', marginBottom: '1rem' }}>
                  {c.issuer}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => handleOpenEdit(originalIdx)}
                  className="admin-btn admin-btn-secondary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
                >
                  <Edit3 size={14} />
                  تعديل
                </button>
                <button
                  onClick={() => {
                    setDeleteTargetIndex(originalIdx);
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
          );
        })}
      </div>

      {/* Modal */}
      {editingCert && (
        <ItemEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={editingIndex === null ? 'إضافة شهادة جديدة' : `تعديل الشهادة: ${editingCert.title}`}
        >
          <form onSubmit={handleSaveModal}>
            <div className="admin-form-group">
              <label className="admin-label">عنوان الشهادة / الاعتماد</label>
              <input
                type="text"
                className="admin-input"
                value={editingCert.title || ''}
                onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">الجهة المصدرة (Issuer)</label>
              <input
                type="text"
                className="admin-input"
                value={editingCert.issuer || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">سنة الإصدار</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingCert.date || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">نص الشارة (Badge)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingCert.badge || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, badge: e.target.value })}
                />
              </div>
            </div>

            {/* Image Picker */}
            <div className="admin-form-group">
              <label className="admin-label">صورة الشهادة الرسمية</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {editingCert.image ? (
                    <img src={editingCert.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                  اختيار أو رفع صورة الشهادة
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="admin-btn admin-btn-secondary">
                إلغاء
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Save size={16} />
                حفظ الشهادة
              </button>
            </div>
          </form>
        </ItemEditModal>
      )}

      {editingCert && (
        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          currentImage={editingCert.image}
          onSelectImage={(img) => setEditingCert(prev => ({ ...prev, image: img }))}
          title="تحديد صورة الشهادة الرسمية"
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="حذف الشهادة"
        message="هل أنت متأكد من حذف هذه الشهادة من ملف الإنجازات والاعتمادات؟"
      />
    </div>
  );
}
