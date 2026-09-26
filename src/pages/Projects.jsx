import React, { useState } from 'react';
import { Code2, Filter, Sparkles, Search, Layers, X, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const { webProjects, categories } = usePortfolioData();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically filter categories so only those with > 0 projects appear
  const activeCategories = (categories || []).filter(cat => {
    if (cat.id === 'all') return true;
    const count = (webProjects || []).filter(p => p.category === cat.id).length;
    return count > 0;
  });

  const getCategoryCount = (catId) => {
    if (catId === 'all') return (webProjects || []).length;
    return (webProjects || []).filter(p => p.category === catId).length;
  };

  const filteredProjects = (webProjects || []).filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = 
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.summary || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem', backgroundColor: '#f8fafc' }}>
      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pill-badge pill-blue" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <Code2 size={16} />
            <span>المشاريع ودراسات الحالة الهندسية</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: '900', color: '#0f172a', marginBottom: '0.85rem', lineHeight: 1.25 }}>
            المشاريع الهندسية و الـ Architecture
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.08rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.8, fontWeight: '500' }}>
            معرض الأنظمة البرمجية المباشرة والمشاريع الحاصلة على المركز الأول، مع دراسات حالة تفصيلية للمعمارية البرمجية والهندسة الخلفية.
          </p>
        </div>

        {/* Search & Categories Bar Container */}
        <div 
          style={{
            maxWidth: '900px',
            margin: '0 auto 3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* Smart Live Search Input */}
          <div style={{ position: 'relative' }}>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المشروع، المعمارية، أو التقنية (مثال: .NET 8, Clean Architecture, Node.js, React)..."
              style={{
                width: '100%',
                padding: '0.95rem 1.25rem 0.95rem 3.2rem',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: '#0f172a',
                fontSize: '0.98rem',
                fontWeight: '600',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.3s ease'
              }}
            />
            <Search 
              size={20} 
              color="#2563eb" 
              style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} 
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="مسح النص"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Dynamic Categories Tabs (Only Non-Zero Categories) */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.6rem'
            }}
          >
            {activeCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = getCategoryCount(cat.id);
              const label = cat.label || cat.nameAr || cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.6rem 1.35rem',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? '800' : '600',
                    color: isActive ? '#ffffff' : '#475569',
                    backgroundColor: isActive ? '#2563eb' : '#ffffff',
                    transition: 'all 0.25s ease',
                    border: isActive ? '1px solid #2563eb' : '1px solid #cbd5e1',
                    boxShadow: isActive ? '0 4px 14px rgba(37, 99, 235, 0.3)' : '0 2px 6px rgba(0,0,0,0.02)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer'
                  }}
                >
                  <span>{label}</span>
                  <span 
                    style={{ 
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#f1f5f9', 
                      color: isActive ? '#ffffff' : '#2563eb', 
                      padding: '0.15rem 0.55rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.78rem',
                      fontWeight: '800' 
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Result Summary Badge */}
          {searchQuery && (
            <div style={{ textAlign: 'center', marginTop: '0.25rem' }}>
              <span className="pill-badge pill-blue" style={{ fontSize: '0.85rem' }}>
                نتائج البحث عن "{searchQuery}": {filteredProjects.length} مشاريع هندسية
              </span>
            </div>
          )}

        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.25rem' }}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProjects.length === 0 && (
          <div className="corporate-card" style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b', maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #cbd5e1' }}>
            <p style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>لا توجد مشاريع تطابق البحث</p>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>جرب البحث باستخدام كلمات مفتاحية أخرى مثل (.NET, Node.js, AI, Clean Architecture) أو اختار فئة "الكل".</p>
          </div>
        )}

      </div>
    </div>
  );
}
