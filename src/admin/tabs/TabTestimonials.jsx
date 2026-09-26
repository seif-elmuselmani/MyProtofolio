import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, Edit3, Save, Star, Sparkles, Search, CheckCircle2, XCircle, Clock, Image as ImageIcon } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';
import ImagePickerModal from '../components/ImagePickerModal';
import ItemEditModal from '../components/ItemEditModal';
import ConfirmModal from '../components/ConfirmModal';

export default function TabTestimonials({ showToast }) {
  const { testimonialsList, updateTestimonialsList, approveTestimonial, rejectTestimonial } = usePortfolioData();
  const [searchQuery, setSearchQuery] = useState('');

  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Split into Pending Queue and Approved Items
  const pendingItems = testimonialsList.filter(t => t.status === 'pending');
  const approvedItems = testimonialsList.filter(t => t.status !== 'pending');

  const filteredApproved = approvedItems.filter(t =>
    (t.name && t.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (t.company && t.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (t.role && t.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApprove = (id) => {
    approveTestimonial(id);
    showToast('تم قبول وتفعيل التوصية بنجاح! تظهر الآن على الموقع الرئيسي.');
  };

  const handleReject = (id) => {
    if (window.confirm('هل أنت متأكد من رفض وإزالة هذه التوصية؟')) {
      rejectTestimonial(id);
      showToast('تم رفض وإزالة التوصية بنجاح.');
    }
  };

  const handleOpenAdd = () => {
    const newTestimonial = {
      id: 'test-' + Date.now(),
      name: 'اسم العميل / المشرف',
      role: 'Technical Lead',
      company: 'Enterprise Company',
      content: 'شهادة تقدير وإشادة بالعمل الهندسي الفائق والاحترافية العالية في التنفيذ والتسليم.',
      rating: 5,
      status: 'approved',
      image: '/assets/testimonials/testimonial-kafiil-5stars-omar-yasser.png'
    };
    setEditingTestimonial(newTestimonial);
    setEditingIndex(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (idx) => {
    setEditingTestimonial({ ...approvedItems[idx] });
    setEditingIndex(idx);
    setIsEditModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updatedApproved;
    if (editingIndex === null) {
      updatedApproved = [editingTestimonial, ...approvedItems];
    } else {
      updatedApproved = [...approvedItems];
      updatedApproved[editingIndex] = editingTestimonial;
    }
    
    // Combine with pending items
    const combined = [...pendingItems, ...updatedApproved];
    updateTestimonialsList(combined);
    setIsEditModalOpen(false);
    showToast(editingIndex === null ? 'تمت إضافة التوصية بنجاح!' : 'تم تحديث التوصية بنجاح!');
  };

  const handleDeleteConfirmed = () => {
    if (deleteTargetIndex !== null) {
      const itemToDelete = approvedItems[deleteTargetIndex];
      if (itemToDelete) {
        rejectTestimonial(itemToDelete.id);
        showToast('تم حذف التوصية بنجاح!');
      }
      setDeleteTargetIndex(null);
    }
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <MessageSquare size={24} color="#d97706" />
            إدارة ومراجعة التوصيات والآراء (Testimonials Moderation)
          </h2>
          <p className="admin-section-desc">
            مراجعة التوصيات الجديدة القادمة من زوار الموقع واعتمادها قبل الظهور، وإدارة التوصيات المفعلة.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
          <Plus size={18} />
          إضافة توصية يدويًا
        </button>
      </div>

      {/* Pending Moderation Queue Section */}
      {pendingItems.length > 0 && (
        <div style={{ background: '#fefce8', border: '1.5px dashed #fde047', borderRadius: '18px', padding: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#854d0e', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  التوصيات قيد المراجعة والاعتماد
                  <span style={{ background: '#dc2626', color: '#ffffff', fontSize: '0.75rem', fontWeight: '800', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                    {pendingItems.length} جديد
                  </span>
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#a16207' }}>
                  التوصيات التالية قادمة من زوار الموقع ولم تظهر بعد للعامة حتى تقوم بتأكيد القبول.
                </p>
              </div>
            </div>
          </div>

          <div className="admin-grid">
            {pendingItems.map((t) => (
              <div key={t.id} className="admin-item-box" style={{ background: '#ffffff', borderColor: '#fde047', boxShadow: '0 4px 12px rgba(234, 179, 8, 0.12)' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="admin-badge-prestige" style={{ background: '#fef3c7', color: '#b45309' }}>
                      <Clock size={12} />
                      ينتظر التفعيل
                    </span>
                    <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b' }}>
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" />
                      ))}
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
                    {t.name}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', marginBottom: '0.75rem' }}>
                    {t.role} {t.company ? `• ${t.company}` : ''}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginBottom: '1rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                    "{t.content}"
                  </p>

                  {t.submittedAt && (
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                      تم الإرسال بتاريخ: {new Date(t.submittedAt).toLocaleString('ar-EG')}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={() => handleApprove(t.id)}
                    className="admin-btn admin-btn-emerald"
                    style={{ flex: 1, padding: '0.45rem', fontSize: '0.82rem' }}
                  >
                    <CheckCircle2 size={16} />
                    قبول وتفعيل
                  </button>
                  <button
                    onClick={() => handleReject(t.id)}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
                  >
                    <XCircle size={16} />
                    رفض
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Approved Testimonials Section */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <input
            type="text"
            className="admin-search-input"
            placeholder="بحث في التوصيات المفعلة بالاسم أو الشركة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '600' }}>
          التوصيات المفعلة والظاهرة على الموقع ({filteredApproved.length})
        </div>
      </div>

      <div className="admin-grid">
        {filteredApproved.map((t, idx) => (
          <div key={t.id || idx} className="admin-item-box">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b' }}>
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" />
                  ))}
                </div>
                <span className="admin-badge-success">
                  <CheckCircle2 size={12} />
                  مفعلة بالموقع
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
                {t.name}
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', marginBottom: '0.4rem' }}>
                {t.role} • {t.company}
              </div>
              {(t.proofUrl || t.link) && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <a
                    href={t.proofUrl || t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <ExternalLink size={13} />
                    <span>رابط التوثيق الأصلي ↗</span>
                  </a>
                </div>
              )}

              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                "{t.content}"
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
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

      {editingTestimonial && (
        <ItemEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={editingIndex === null ? 'إضافة توصية جديدة' : `تعديل توصية: ${editingTestimonial.name}`}
        >
          <form onSubmit={handleSaveModal}>
            <div className="admin-form-group">
              <label className="admin-label">اسم صاحب التوصية</label>
              <input
                type="text"
                className="admin-input"
                value={editingTestimonial.name || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">المسمى الوظيفي</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingTestimonial.role || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">الشركة / المنظمة</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingTestimonial.company || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">نص التوصية</label>
              <textarea
                className="admin-textarea"
                rows={4}
                value={editingTestimonial.content || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">رابط المنشور الأصلي / التوثيق (LinkedIn / Nafezly / Kafiil)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="https://..."
                value={editingTestimonial.proofUrl || editingTestimonial.link || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, proofUrl: e.target.value, link: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">صورة إثبات التقييم / لقطة الشاشة</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {editingTestimonial.image ? (
                    <img src={editingTestimonial.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                  تحديد صورة الإثبات
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="admin-btn admin-btn-secondary">
                إلغاء
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Save size={16} />
                حفظ التوصية
              </button>
            </div>
          </form>
        </ItemEditModal>
      )}

      {editingTestimonial && (
        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          currentImage={editingTestimonial.image}
          onSelectImage={(img) => setEditingTestimonial(prev => ({ ...prev, image: img }))}
          title="تحديد صورة إثبات التقييم"
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="حذف التوصية"
        message="هل أنت متأكد من حذف هذه التوصية؟"
      />
    </div>
  );
}
