import React, { useState } from 'react';
import { Save, User, Mail, Phone, MapPin, Globe, Sparkles, Image as ImageIcon } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';
import ImagePickerModal from '../components/ImagePickerModal';

export default function TabGeneralInfo({ showToast }) {
  const { personalInfo, updatePersonalInfo } = usePortfolioData();
  const [formData, setFormData] = useState({ ...personalInfo });
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    showToast('تم حفظ وتحديث المعلومات الشخصية بنجاح!');
  };

  return (
    <form onSubmit={handleSave}>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <User size={24} color="#2563eb" />
            المعلومات الشخصية والصورة الرسمية
          </h2>
          <p className="admin-section-desc">
            قم بتعديل بيانات الاسم، المسمى الوظيفي، الصورة الشخصية، ومعلومات التواصل الفوري.
          </p>
        </div>
        <button type="submit" className="admin-btn admin-btn-primary">
          <Save size={18} />
          حفظ التغييرات
        </button>
      </div>

      {/* Profile Photo Uploader & Preview Banner */}
      <div style={{ background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '74px', height: '74px', borderRadius: '18px', overflow: 'hidden', border: '2px solid #2563eb', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)' }}>
            <img 
              src={formData.avatar || '/assets/profile/seif-portrait-avatar.jpg'} 
              alt={formData.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>الصورة الشخصية الرسمية (Avatar)</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>تظهر في الصفحة الرئيسية، الهيدر، وبطاقات التقديم السريع.</p>
          </div>
        </div>

        <button 
          type="button" 
          onClick={() => setIsImagePickerOpen(true)}
          className="admin-btn admin-btn-secondary"
          style={{ fontSize: '0.85rem' }}
        >
          <ImageIcon size={16} color="#2563eb" />
          تغيير / رفع صورة جديدة
        </button>
      </div>

      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        currentImage={formData.avatar}
        onSelectImage={(img) => handleChange('avatar', img)}
        title="اختيار الصورة الشخصية للبروفايل"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        
        <div className="admin-form-group">
          <label className="admin-label">الاسم باللغة العربية</label>
          <input
            type="text"
            className="admin-input"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">الاسم باللغة الإنجليزية</label>
          <input
            type="text"
            className="admin-input"
            value={formData.nameEn || ''}
            onChange={(e) => handleChange('nameEn', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">المسمى الوظيفي الأساسي</label>
          <input
            type="text"
            className="admin-input"
            value={formData.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">المسمى الوظيفي الفرعي</label>
          <input
            type="text"
            className="admin-input"
            value={formData.subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">البريد الإلكتروني</label>
          <input
            type="email"
            className="admin-input"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">رقم الهاتف / الواتساب</label>
          <input
            type="text"
            className="admin-input"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">الموقع الجغرافي</label>
          <input
            type="text"
            className="admin-input"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">حالة التوفر للعمل (Availability Badge)</label>
          <input
            type="text"
            className="admin-input"
            value={formData.availability || ''}
            onChange={(e) => handleChange('availability', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontWeight: '800' }}>
            <Globe size={16} />
            عدد متابعين لينكد إن (LinkedIn Connections / Followers)
          </label>
          <input
            type="text"
            className="admin-input"
            placeholder="مثال: +9K أو 9,000+"
            value={formData.linkedinFollowers || ''}
            onChange={(e) => handleChange('linkedinFollowers', e.target.value)}
          />
        </div>

      </div>

      <div className="admin-form-group" style={{ marginTop: '1rem' }}>
        <label className="admin-label">النبذة التعريفية الشاملة (Hero Bio & Summary)</label>
        <textarea
          className="admin-textarea"
          rows={5}
          value={formData.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
        />
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="admin-btn admin-btn-primary">
          <Save size={18} />
          حفظ وتطبيق البيانات على الموقع
        </button>
      </div>
    </form>
  );
}
