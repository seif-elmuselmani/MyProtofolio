import React, { useState } from 'react';
import { Code2, Filter, Sparkles, Search, Layers } from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const { webProjects, categories } = usePortfolioData();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = (webProjects || []).filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = 
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ paddingTop: '6.5rem', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pill-badge pill-blue" style={{ marginBottom: '0.75rem' }}>
            <Code2 size={15} />
            <span>المشاريع والهندسة</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            المشاريع الهندسية (Case Studies)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            تصفح معرض مشاريع الأنظمة الخلفية والمعمارية المتكاملة مع دراسات الحالة.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div 
          style={{
            maxWidth: '850px',
            margin: '0 auto 3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* Live Search Input */}
          <div style={{ position: 'relative' }}>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو التقنية (مثال: .NET, C#, Clean Architecture, Node.js)..."
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem 0.85rem 3rem',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                transition: 'var(--transition-smooth)'
              }}
            />
            <Search 
              size={18} 
              color="var(--brand-primary)" 
              style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} 
            />
          </div>

          {/* Categories Tabs */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            {(categories || []).map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.55rem 1.2rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? '700' : '600',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--brand-primary)' : '#ffffff',
                    transition: 'var(--transition-smooth)',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="corporate-card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', backgroundColor: '#ffffff' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>لا توجد مشاريع تطابق البحث</p>
            <p style={{ fontSize: '0.9rem' }}>جرب البحث باستخدام كلمات مفتاحية أخرى أو تغيير الفئة المختارة.</p>
          </div>
        )}

      </div>
    </div>
  );
}
