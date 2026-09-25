import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquare, Star, Send, X, CheckCircle, Image as ImageIcon, Sparkles } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import ImagePickerModal from '../admin/components/ImagePickerModal';

export default function SubmitTestimonialModal({ isOpen, onClose }) {
  const { addPendingTestimonial } = usePortfolioData();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    image: ''
  });

  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      alert('يرجى كتابة الاسم ونص التوصية');
      return;
    }

    addPendingTestimonial(formData);
    setSubmittedSuccess(true);
  };

  const handleCloseAll = () => {
    setSubmittedSuccess(false);
    setFormData({
      name: '',
      role: '',
      company: '',
      content: '',
      rating: 5,
      image: ''
    });
    onClose();
  };

  return createPortal(
    <div className="admin-modal-backdrop" onClick={handleCloseAll} style={{ zIndex: 9999 }}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', borderRadius: '24px' }}>
        
        {/* Header */}
        <div className="admin-modal-header" style={{ borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>أضف توصيتك وتقييمك الشخصي</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>إشادة بالعمل المهني والحلول الهندسية المنجزة مع سيف الدين</p>
            </div>
          </div>
          <button onClick={handleCloseAll} className="admin-modal-close-btn">
            <X size={20} />
          </button>
        </div>

        {submittedSuccess ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 8px 20px rgba(5, 150, 105, 0.15)' }}>
              <CheckCircle size={36} />
            </div>
            <h4 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>
              تم إرسال توصيتك بنجاح!
            </h4>
            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              شكراً جزيلاً لرأيك القيم! تم تسجيل التوصية بنجاح وهي حالياً قيد المراجعة والاعتماد الفوري من قِبل المهندس سيف الدين لتظهر في صفحة التوصيات.
            </p>
            <button onClick={handleCloseAll} className="admin-btn admin-btn-primary" style={{ padding: '0.75rem 2rem' }}>
              تم، إغلاق النافذة
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem' }}>
            
            {/* Interactive Stars Picker */}
            <div className="admin-form-group" style={{ textAlign: 'center', marginBottom: '1.25rem', background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <label className="admin-label" style={{ marginBottom: '0.5rem' }}>تقييم التجربة والعمل الهندسي</label>
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', color: '#f59e0b' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.2rem', transition: 'transform 0.15s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Star size={28} fill={star <= formData.rating ? '#f59e0b' : 'none'} color="#f59e0b" />
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.35rem', fontWeight: '600' }}>
                {formData.rating === 5 ? '⭐ ممتاز (5 من 5)' : `${formData.rating} نجوم`}
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">الاسم الكامل *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="أدخل اسمك الكريم..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">المسمى الوظيفي</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="مثال: Senior Tech Lead"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">الشركة / الجهة / المنصة</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="مثال: ITI / DEPI / شركة خاصة"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">نص التوصية والرأي *</label>
              <textarea
                className="admin-textarea"
                rows={4}
                placeholder="اكتب انطباعك ورأيك عن جودة العمل، الحلول الهندسية، والالتزام..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">صورة شخصية / لقطة شاشة التقييم (اختياري)</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '42px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ImageIcon size={18} color="#94a3b8" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsImagePickerOpen(true)}
                  className="admin-btn admin-btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem' }}
                >
                  <ImageIcon size={14} />
                  رفع / اختيار صورة التقييم
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <button type="button" onClick={handleCloseAll} className="admin-btn admin-btn-secondary">
                إلغاء
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Send size={16} />
                إرسال التوصية للمراجعة
              </button>
            </div>
          </form>
        )}

        {/* Image Picker for Visitors */}
        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          currentImage={formData.image}
          onSelectImage={(img) => setFormData(prev => ({ ...prev, image: img }))}
          title="اختيار أو رفع صورة التوصية"
        />

      </div>
    </div>,
    document.body
  );
}
