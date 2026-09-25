import React, { useState } from 'react';
import { Cpu, Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';

export default function TabSkills({ showToast }) {
  const { skillsMatrix, updateSkillsMatrix } = usePortfolioData();
  const [matrix, setMatrix] = useState([...skillsMatrix]);

  const handleUpdateSkill = (catIdx, skillIdx, value) => {
    setMatrix(prev => {
      const updated = [...prev];
      updated[catIdx].items[skillIdx] = value;
      return updated;
    });
  };

  const handleAddSkill = (catIdx) => {
    setMatrix(prev => {
      const updated = [...prev];
      updated[catIdx].items.push('مهارة جديدة');
      return updated;
    });
  };

  const handleRemoveSkill = (catIdx, skillIdx) => {
    setMatrix(prev => {
      const updated = [...prev];
      updated[catIdx].items = updated[catIdx].items.filter((_, i) => i !== skillIdx);
      return updated;
    });
  };

  const handleSave = () => {
    updateSkillsMatrix(matrix);
    showToast('تم حفظ وتحديث مصفوفة المهارات بنجاح!');
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <Cpu size={24} color="#2563eb" />
            مصفوفة المهارات والتقنيات البرمجية
          </h2>
          <p className="admin-section-desc">
            تعديل وتصنيف التقنيات: Backend (.NET, C#, Node.js), Frontend (React, Angular), Databases, DevOps.
          </p>
        </div>
        <button onClick={handleSave} className="admin-btn admin-btn-primary">
          <Save size={18} />
          حفظ مصفوفة المهارات
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {matrix.map((cat, catIdx) => (
          <div key={cat.category || catIdx} className="admin-item-box">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{cat.category}</span>
              <button
                onClick={() => handleAddSkill(catIdx)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}
              >
                <Plus size={14} />
                إضافة
              </button>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {Array.isArray(cat.items) && cat.items.map((skill, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={skill}
                    onChange={(e) => handleUpdateSkill(catIdx, sIdx, e.target.value)}
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.88rem' }}
                  />
                  <button
                    onClick={() => handleRemoveSkill(catIdx, sIdx)}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: '0.5rem', borderRadius: '10px' }}
                    title="حذف المهارة"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
