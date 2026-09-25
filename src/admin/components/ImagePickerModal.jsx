import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Check, X, Link as LinkIcon, Sparkles } from 'lucide-react';

const PRESET_ASSETS = [
  { label: 'شهادة DEPI .NET FullStack', path: '/assets/certificates/cert-depi-fullstack-dotnet.jpg', category: 'الشهادات' },
  { label: 'شهادة Deep Learning ITI', path: '/assets/certificates/cert-deeplearning-iti.png', category: 'الشهادات' },
  { label: 'شهادة Python ITI', path: '/assets/certificates/cert-python-iti.png', category: 'الشهادات' },
  { label: 'شهادة بكالوريوس الحاسبات', path: '/assets/certificates/cert-zagazig-cs-degree.jpg', category: 'الشهادات' },
  { label: 'شهادة الذكاء الاصطناعي MCIT', path: '/assets/certificates/cert-ai-microsoft-mcit.png', category: 'الشهادات' },
  { label: 'شهادة SQL HackerRank', path: '/assets/certificates/cert-sql-intermediate-hackerrank.png', category: 'الشهادات' },
  { label: 'الصورة الشخصية الرسمية (Avatar)', path: '/assets/profile/seif-portrait-avatar.jpg', category: 'البروفايل' },
  { label: 'صورة التخرج ومناقشة المشروع', path: '/assets/profile/seif-defense-formal.jpg', category: 'البروفايل' },
  { label: 'صورة التكريم مع د. هشام فاروق', path: '/assets/profile/seif-with-dr-hesham-farouk-depi.png', category: 'البروفايل' },
  { label: 'بانر لينكد إن الهندسي', path: '/assets/profile/banner-linkedin-header.png', category: 'البروفايل' },
  { label: 'تقييم كفيل 5 نجوم (عمر ياسر)', path: '/assets/testimonials/testimonial-kafiil-5stars-omar-yasser.png', category: 'التقييمات' },
  { label: 'تقييم نفذلي 5 نجوم (أحمد حسن)', path: '/assets/testimonials/testimonial-nafezly-5stars-ahmed-hassan.png', category: 'التقييمات' },
  { label: 'توصية م. ريان محمد (NTI)', path: '/assets/testimonials/testimonial-rayan-mohamed-nti.png', category: 'التقييمات' },
  { label: 'توصية م. شريف عادل (NTI)', path: '/assets/testimonials/testimonial-sherif-adel-nti.png', category: 'التقييمات' },
  { label: 'ملخص الخبرات والإحصائيات', path: '/assets/documents/snapshot-experience-summary.png', category: 'الوثائق' },
];

export default function ImagePickerModal({ isOpen, onClose, onSelectImage, currentImage, title = 'اختيار أو رفع صورة' }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'preset' | 'url'
  const [customUrl, setCustomUrl] = useState(currentImage || '');
  const [dragActive, setDragActive] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(currentImage || '');

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (PNG, JPG, WEBP, SVG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setPreviewSrc(base64);
      onSelectImage(base64);
      onClose();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleSelectPreset = (path) => {
    setPreviewSrc(path);
    onSelectImage(path);
    onClose();
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (customUrl) {
      setPreviewSrc(customUrl);
      onSelectImage(customUrl);
      onClose();
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        {/* Modal Header */}
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ImageIcon size={22} color="#2563eb" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>{title}</h3>
          </div>
          <button onClick={onClose} className="admin-modal-close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.35rem', borderRadius: '12px', margin: '1rem 0 1.25rem' }}>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
            style={{ padding: '0.55rem', fontSize: '0.88rem' }}
          >
            <Upload size={16} />
            رفع من جهازك
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'preset' ? 'active' : ''}`}
            onClick={() => setActiveTab('preset')}
            style={{ padding: '0.55rem', fontSize: '0.88rem' }}
          >
            <Sparkles size={16} />
            مكتبة وسائط الموقع
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'url' ? 'active' : ''}`}
            onClick={() => setActiveTab('url')}
            style={{ padding: '0.55rem', fontSize: '0.88rem' }}
          >
            <LinkIcon size={16} />
            رابط مباشر (URL)
          </button>
        </div>

        {/* Tab 1: Upload (Drag & Drop) */}
        {activeTab === 'upload' && (
          <div>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`admin-dropzone ${dragActive ? 'drag-active' : ''}`}
            >
              <Upload size={40} color="#2563eb" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>
                اسحب الصورة وأفلتها هنا مباشرة
              </p>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                يدعم كافة الصيغ (PNG, JPG, WEBP, SVG)
              </p>

              <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer', padding: '0.55rem 1.2rem', fontSize: '0.88rem' }}>
                اختر ملف من جهازك
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 2: Presets Media Library */}
        {activeTab === 'preset' && (
          <div style={{ maxHeight: '340px', overflowY: 'auto', paddingRight: '0.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
              {PRESET_ASSETS.map((asset, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectPreset(asset.path)}
                  className="admin-preset-item"
                  style={{
                    border: currentImage === asset.path ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    background: currentImage === asset.path ? '#eff6ff' : '#ffffff'
                  }}
                >
                  <div style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '8px', background: '#f8fafc', marginBottom: '0.5rem' }}>
                    <img src={asset.path} alt={asset.label} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ fontSize: '0.74rem', fontWeight: '700', color: '#0f172a', textAlign: 'center', lineHeight: 1.3 }}>
                    {asset.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'center', marginTop: '0.2rem' }}>
                    {asset.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Direct URL */}
        {activeTab === 'url' && (
          <form onSubmit={handleApplyUrl}>
            <div className="admin-form-group">
              <label className="admin-label">رابط الصورة المباشر</label>
              <input
                type="url"
                className="admin-input"
                placeholder="https://example.com/image.png"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Check size={16} />
                استخدام هذا الرابط
              </button>
            </div>
          </form>
        )}

        {/* Current Image Preview Footer */}
        {previewSrc && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={previewSrc} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>الصورة الحالية المحددة</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>جاهزة للعرض في الموقع</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setPreviewSrc('');
                onSelectImage('');
              }}
              className="admin-btn admin-btn-danger"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
            >
              إزالة الصورة
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
