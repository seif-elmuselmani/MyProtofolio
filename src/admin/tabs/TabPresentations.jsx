import React, { useState } from 'react';
import { Presentation, Plus, Trash2, Edit3, Save, Download, Search, Image as ImageIcon } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';
import ImagePickerModal from '../components/ImagePickerModal';
import ItemEditModal from '../components/ItemEditModal';
import ConfirmModal from '../components/ConfirmModal';

export default function TabPresentations({ showToast }) {
  const { presentationDecks, updatePresentationDecks } = usePortfolioData();
  const [decks, setDecks] = useState([...presentationDecks]);
  const [searchQuery, setSearchQuery] = useState('');

  const [editingDeck, setEditingDeck] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const filteredDecks = decks.filter(d =>
    (d.title && d.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (d.topic && d.topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (d.level && d.level.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAdd = () => {
    const newDeck = {
      id: 'deck-' + Date.now(),
      title: 'عرض تقديمي تقني جديد',
      topic: 'Software Architecture & Robotics',
      slidesCount: 25,
      level: 'Advanced',
      downloadUrl: '#',
      image: '/assets/documents/snapshot-experience-summary.png'
    };
    setEditingDeck(newDeck);
    setEditingIndex(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (idx) => {
    setEditingDeck({ ...decks[idx] });
    setEditingIndex(idx);
    setIsEditModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updated;
    if (editingIndex === null) {
      updated = [editingDeck, ...decks];
    } else {
      updated = [...decks];
      updated[editingIndex] = editingDeck;
    }
    setDecks(updated);
    updatePresentationDecks(updated);
    setIsEditModalOpen(false);
    showToast(editingIndex === null ? 'تمت إضافة العرض التقديمي بنجاح!' : 'تم تحديث العرض بنجاح!');
  };

  const handleDeleteConfirmed = () => {
    if (deleteTargetIndex !== null) {
      const updated = decks.filter((_, i) => i !== deleteTargetIndex);
      setDecks(updated);
      updatePresentationDecks(updated);
      showToast('تم حذف العرض بنجاح!');
      setDeleteTargetIndex(null);
    }
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <Presentation size={24} color="#2563eb" />
            إدارة عروض الـ Decks وحقيبة المحاضرات ({decks.length})
          </h2>
          <p className="admin-section-desc">
            إدارة عروض الـ 46 PPTX، روابط التنزيل، عدد الشرائح، والأغلفة التوضيحية.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
          <Plus size={18} />
          إضافة عرض جديد
        </button>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-box">
          <input
            type="text"
            className="admin-search-input"
            placeholder="بحث في العروض بالعنوان أو الموضوع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '600' }}>
          عرض {filteredDecks.length} من أصل {decks.length} عرض تقديمي
        </div>
      </div>

      <div className="admin-grid">
        {filteredDecks.map((d, idx) => {
          const originalIdx = decks.findIndex(item => item.id === d.id || item.title === d.title);

          return (
            <div key={d.id || idx} className="admin-item-box">
              <div>
                <div style={{ height: '110px', borderRadius: '10px', overflow: 'hidden', background: '#eff6ff', marginBottom: '1rem', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {d.image ? (
                    <img src={d.image} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Presentation size={36} color="#2563eb" />
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span className="admin-badge-info">{d.topic || 'Tech Deck'}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>
                    {d.slidesCount ? `${d.slidesCount} شريحة` : ''}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.08rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
                  {d.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', marginBottom: '0.75rem' }}>
                  المستوى: {d.level || 'All Levels'}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
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

                {d.downloadUrl && d.downloadUrl !== '#' && (
                  <a href={d.downloadUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>
                    <Download size={18} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {editingDeck && (
        <ItemEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={editingIndex === null ? 'إضافة عرض تقديمي جديد' : `تعديل عرض: ${editingDeck.title}`}
        >
          <form onSubmit={handleSaveModal}>
            <div className="admin-form-group">
              <label className="admin-label">عنوان المحاضرة / الـ Deck</label>
              <input
                type="text"
                className="admin-input"
                value={editingDeck.title || ''}
                onChange={(e) => setEditingDeck({ ...editingDeck, title: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">الموضوع التقني (Topic)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingDeck.topic || ''}
                  onChange={(e) => setEditingDeck({ ...editingDeck, topic: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">عدد الشرائح (Slides Count)</label>
                <input
                  type="number"
                  className="admin-input"
                  value={editingDeck.slidesCount || 20}
                  onChange={(e) => setEditingDeck({ ...editingDeck, slidesCount: parseInt(e.target.value, 10) })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">المستوى المستهدف (Level)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingDeck.level || ''}
                  onChange={(e) => setEditingDeck({ ...editingDeck, level: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">رابط التنزيل (Download Link)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingDeck.downloadUrl || ''}
                  onChange={(e) => setEditingDeck({ ...editingDeck, downloadUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">صورة غلاف العرض</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {editingDeck.image ? (
                    <img src={editingDeck.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  تحديد صورة الغلاف
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="admin-btn admin-btn-secondary">
                إلغاء
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Save size={16} />
                حفظ العرض
              </button>
            </div>
          </form>
        </ItemEditModal>
      )}

      {editingDeck && (
        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          currentImage={editingDeck.image}
          onSelectImage={(img) => setEditingDeck(prev => ({ ...prev, image: img }))}
          title="تحديد غلاف العرض التقديمي"
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="حذف العرض التقديمي"
        message="هل أنت متأكد من حذف هذا العرض من قائمة عروض الـ Decks؟"
      />
    </div>
  );
}
