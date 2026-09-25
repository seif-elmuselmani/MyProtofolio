import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit3, Save, ExternalLink, Github, Sparkles, Search, Image as ImageIcon } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';
import ImagePickerModal from '../components/ImagePickerModal';
import ItemEditModal from '../components/ItemEditModal';
import ConfirmModal from '../components/ConfirmModal';

export default function TabProjects({ showToast }) {
  const { webProjects, updateWebProjects } = usePortfolioData();
  const [projects, setProjects] = useState([...webProjects]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [editingProject, setEditingProject] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  
  // Delete confirm state
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const filteredProjects = projects.filter(p => 
    (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.titleEn && p.titleEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAdd = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: 'مشروع هندسي جديد',
      titleEn: 'New Engineering Project',
      category: 'Full-Stack',
      description: 'وصف تفصيلي للحل التقني والمعمارية الهندسية للمشروع...',
      tags: ['.NET Core', 'React', 'SQL Server'],
      github: 'https://github.com/seif',
      live: 'https://demo.com',
      featured: true,
      image: '/assets/certificates/cert-depi-fullstack-dotnet.jpg'
    };
    setEditingProject(newProj);
    setEditingIndex(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (idx) => {
    setEditingProject({ ...projects[idx] });
    setEditingIndex(idx);
    setIsEditModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updated;
    if (editingIndex === null) {
      updated = [editingProject, ...projects];
    } else {
      updated = [...projects];
      updated[editingIndex] = editingProject;
    }
    setProjects(updated);
    updateWebProjects(updated);
    setIsEditModalOpen(false);
    showToast(editingIndex === null ? 'تمت إضافة المشروع الجديد بنجاح!' : 'تم تحديث المشروع بنجاح!');
  };

  const handleDeleteConfirmed = () => {
    if (deleteTargetIndex !== null) {
      const updated = projects.filter((_, i) => i !== deleteTargetIndex);
      setProjects(updated);
      updateWebProjects(updated);
      showToast('تم حذف المشروع بنجاح!');
      setDeleteTargetIndex(null);
    }
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <Layers size={24} color="#2563eb" />
            إدارة المشاريع الهندسية ({projects.length})
          </h2>
          <p className="admin-section-desc">
            أضف أو عدل مشاريعك مثل (شريان، نبض، كشاف)، الصور الحية، روابط GitHub والمعاينة.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
          <Plus size={18} />
          إضافة مشروع جديد
        </button>
      </div>

      {/* Toolbar & Search */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <input
            type="text"
            className="admin-search-input"
            placeholder="بحث في المشاريع بالاسم أو التصنيف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '600' }}>
          عرض {filteredProjects.length} من أصل {projects.length} مشروع
        </div>
      </div>

      {/* Projects Grid */}
      <div className="admin-grid">
        {filteredProjects.map((proj, idx) => {
          const originalIdx = projects.findIndex(p => p.id === proj.id || p.title === proj.title);

          return (
            <div key={proj.id || idx} className="admin-item-box">
              <div>
                {/* Project Image Preview */}
                <div style={{ height: '140px', borderRadius: '10px', overflow: 'hidden', background: '#f1f5f9', marginBottom: '1rem', position: 'relative', border: '1px solid #e2e8f0' }}>
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                      <ImageIcon size={32} />
                    </div>
                  )}
                  {proj.featured && (
                    <span className="admin-badge-prestige" style={{ position: 'absolute', top: '8px', right: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <Sparkles size={11} />
                      مميز
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className="admin-badge-info">{proj.category || 'Full-Stack'}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
                  {proj.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', marginBottom: '0.6rem' }}>
                  {proj.titleEn}
                </div>

                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                  {proj.description ? proj.description.slice(0, 95) + '...' : ''}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {Array.isArray(proj.tags) && proj.tags.map((t, i) => (
                    <span key={i} style={{ fontSize: '0.72rem', background: '#f1f5f9', padding: '0.15rem 0.5rem', borderRadius: '6px', color: '#475569' }}>
                      {t}
                    </span>
                  ))}
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

                {proj.live && (
                  <a href={proj.live} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Add Modal */}
      {editingProject && (
        <ItemEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={editingIndex === null ? 'إضافة مشروع هندسي جديد' : `تعديل مشروع: ${editingProject.title}`}
        >
          <form onSubmit={handleSaveModal}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">عنوان المشروع (بالعربي)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">العنوان (بالإنجليزية)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingProject.titleEn || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">التصنيف (Category)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingProject.category || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">التقنيات المستخدمة (مفصولة بفاصلة)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>
            </div>

            {/* Image Picker Trigger in Modal */}
            <div className="admin-form-group">
              <label className="admin-label">صورة واجهة المشروع</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {editingProject.image ? (
                    <img src={editingProject.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  اختيار أو رفع صورة
                </button>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">الوصف الهندسي التفصيلي</label>
              <textarea
                className="admin-textarea"
                rows={4}
                value={editingProject.description || ''}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">رابط GitHub Repository</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingProject.github || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">رابط المعاينة الحية (Live Demo)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingProject.live || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, live: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
                <input
                  type="checkbox"
                  checked={!!editingProject.featured}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                />
                عرض كمشروع مميز في الصفحة الرئيسية (Featured)
              </label>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="admin-btn admin-btn-secondary">
                  إلغاء
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Save size={16} />
                  حفظ المشروع
                </button>
              </div>
            </div>
          </form>
        </ItemEditModal>
      )}

      {/* Image Picker for Projects */}
      {editingProject && (
        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          currentImage={editingProject.image}
          onSelectImage={(img) => setEditingProject(prev => ({ ...prev, image: img }))}
          title="تحديد صورة المشروع"
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="حذف المشروع الهندسي"
        message="هل أنت متأكد تماماً من رغبتك في حذف هذا المشروع؟ سيتم إزالته من قائمة المشاريع فوراً."
      />

    </div>
  );
}
