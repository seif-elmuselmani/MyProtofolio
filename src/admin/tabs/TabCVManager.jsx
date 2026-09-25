import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Check, 
  Eye, 
  EyeOff, 
  Star, 
  Download, 
  ExternalLink,
  Edit2,
  FolderArchive,
  Sparkles
} from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';

export default function TabCVManager() {
  const { cvArchive, updateCvArchive } = usePortfolioData();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    fileUrl: '/assets/documents/',
    badge: 'Official',
    badgeColor: '#2563eb',
    active: true,
    isDefault: false
  });

  const handleToggleActive = (id) => {
    const updated = (cvArchive || []).map(cv => {
      if (cv.id === id) {
        return { ...cv, active: !cv.active };
      }
      return cv;
    });
    updateCvArchive(updated);
  };

  const handleSetDefault = (id) => {
    const updated = (cvArchive || []).map(cv => {
      return { ...cv, isDefault: cv.id === id };
    });
    updateCvArchive(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت تأكد من حذف هذا الملف من أرشيف الـ CV؟')) {
      const updated = (cvArchive || []).filter(cv => cv.id !== id);
      updateCvArchive(updated);
    }
  };

  const handleSaveNew = (e) => {
    e.preventDefault();
    if (!form.title || !form.fileUrl) {
      alert('يرجى كتابة عنوان الـ CV ورابط الملف على الأقل');
      return;
    }
    const newCv = {
      ...form,
      id: 'cv-' + Date.now()
    };
    const updated = [newCv, ...(cvArchive || [])];
    updateCvArchive(updated);
    setIsAdding(false);
    setForm({
      title: '',
      subtitle: '',
      fileUrl: '/assets/documents/',
      badge: 'Official',
      badgeColor: '#2563eb',
      active: true,
      isDefault: false
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FolderArchive size={24} color="#2563eb" />
            <span>إدارة خزان السير الذاتية (CV & Resume Manager Pro)</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0.3rem 0 0' }}>
            يمكنك إضافة عدد لا محدود من ملفات الـ CV وتحديد الملفات النشطة للعملاء في الموقع.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="admin-btn admin-btn-primary"
          style={{ padding: '0.65rem 1.3rem', fontSize: '0.9rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} />
          <span>{isAdding ? 'إلغاء الإضافة' : 'إضافة CV جديد للأرشيف'}</span>
        </button>
      </div>

      {/* Add New CV Form Drawer */}
      {isAdding && (
        <form 
          onSubmit={handleSaveNew}
          style={{
            backgroundColor: '#ffffff',
            padding: '1.75rem',
            borderRadius: '20px',
            border: '2px dashed #3b82f6',
            marginBottom: '2rem',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.08)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '1.25rem', marginTop: 0 }}>
            إضافة سيرة ذاتية جديدة للـ Archive:
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
                عنوان الـ CV (Title):
              </label>
              <input 
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="مثال: Senior Backend Engineer CV 2026"
                className="admin-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
                الوصف الفرعي (Subtitle):
              </label>
              <input 
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="مثال: السيرة الذاتية الرسمية بالمركز الأول جمهورية"
                className="admin-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
                مسار/رابط ملف الـ PDF (File URL):
              </label>
              <input 
                type="text"
                value={form.fileUrl}
                onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                placeholder="/assets/documents/my_custom_cv.pdf"
                className="admin-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
                الشارة البصرية (Badge):
              </label>
              <input 
                type="text"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="English ATS / Official / Instructor"
                className="admin-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>
              <input 
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#2563eb' }}
              />
              <span>تفعيل وإظهار في الموقع فوراً</span>
            </label>

            <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
              حفظ الـ CV في الأرشيف
            </button>
          </div>
        </form>
      )}

      {/* CV Archive Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {(cvArchive || []).map((cv) => (
          <div 
            key={cv.id}
            style={{
              backgroundColor: '#ffffff',
              padding: '1.35rem',
              borderRadius: '18px',
              border: cv.active ? '1px solid #cbd5e1' : '1px solid #fee2e2',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
              opacity: cv.active ? 1 : 0.65,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: '800', color: '#ffffff', backgroundColor: cv.badgeColor || '#2563eb', padding: '0.2rem 0.65rem', borderRadius: '8px' }}>
                  {cv.badge || 'Official'}
                </span>

                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  {cv.isDefault ? (
                    <span style={{ fontSize: '0.74rem', fontWeight: '800', color: '#047857', backgroundColor: '#d1fae5', padding: '0.2rem 0.6rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={12} />
                      <span>الأساسي</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(cv.id)}
                      style={{ fontSize: '0.74rem', color: '#64748b', backgroundColor: '#f1f5f9', border: 'none', padding: '0.2rem 0.55rem', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      تحديد كأساسي
                    </button>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.35rem' }}>
                {cv.title}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 0.75rem', lineHeight: 1.45 }}>
                {cv.subtitle}
              </p>
              <div style={{ fontSize: '0.78rem', color: '#3b82f6', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                {cv.fileUrl}
              </div>
            </div>

            {/* Actions Footer Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={() => handleToggleActive(cv.id)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  backgroundColor: cv.active ? '#dcfce7' : '#fef2f2',
                  color: cv.active ? '#15803d' : '#b91c1c',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {cv.active ? <Eye size={14} /> : <EyeOff size={14} />}
                <span>{cv.active ? 'نشط في الموقع' : 'مخفي من الموقع'}</span>
              </button>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <a
                  href={cv.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '10px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                  title="معاينة الملف"
                >
                  <ExternalLink size={14} />
                </a>

                <button
                  onClick={() => handleDelete(cv.id)}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '10px',
                    backgroundColor: '#fef2f2',
                    color: '#ef4444',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                  title="حذف من الأرشيف"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
