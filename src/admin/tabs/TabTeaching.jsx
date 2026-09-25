import React, { useState } from 'react';
import { GraduationCap, Save, Users, Clock, Award, BookOpen } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';

export default function TabTeaching({ showToast }) {
  const { teachingExperience, updateTeachingExperience } = usePortfolioData();
  const [formData, setFormData] = useState({ ...teachingExperience });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateTeachingExperience(formData);
    showToast('تم حفظ حقيبة التدريس والخبرات التعليمية بنجاح!');
  };

  return (
    <form onSubmit={handleSave}>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <GraduationCap size={24} color="#059669" />
            حقيبة التدريس التقني وخبرات iSchool
          </h2>
          <p className="admin-section-desc">
            تعديل إحصائيات الطلاب، ساعات التدريس التقني، والمناهج البرمجية المعتمدة.
          </p>
        </div>
        <button type="submit" className="admin-btn admin-btn-primary">
          <Save size={18} />
          حفظ وتحديث الإحصائيات
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        
        <div className="admin-form-group">
          <label className="admin-label">المسمى التعليمي (Role)</label>
          <input
            type="text"
            className="admin-input"
            value={formData.role || ''}
            onChange={(e) => handleChange('role', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">الأكاديمية / المنصة</label>
          <input
            type="text"
            className="admin-input"
            value={formData.organization || ''}
            onChange={(e) => handleChange('organization', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">عدد الطلاب المدربين</label>
          <input
            type="text"
            className="admin-input"
            value={formData.studentsCount || '350+'}
            onChange={(e) => handleChange('studentsCount', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">ساعات التدريس المعتمدة</label>
          <input
            type="text"
            className="admin-input"
            value={formData.teachingHours || '500+'}
            onChange={(e) => handleChange('teachingHours', e.target.value)}
          />
        </div>

      </div>

      <div className="admin-form-group" style={{ marginTop: '1rem' }}>
        <label className="admin-label">المنهجية والرؤية التعليمية</label>
        <textarea
          className="admin-textarea"
          rows={5}
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="admin-btn admin-btn-primary">
          <Save size={18} />
          حفظ وتطبيق البيانات
        </button>
      </div>
    </form>
  );
}
