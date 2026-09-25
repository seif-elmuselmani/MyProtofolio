import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Layers, 
  Award, 
  Presentation,
  GraduationCap, 
  Building2,
  Cpu, 
  MessageSquare, 
  Shield, 
  LogOut, 
  ExternalLink,
  Sparkles,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { usePortfolioData } from '../context/DynamicPortfolioContext';

import TabGeneralInfo from './tabs/TabGeneralInfo';
import TabProjects from './tabs/TabProjects';
import TabCredentials from './tabs/TabCredentials';
import TabPresentations from './tabs/TabPresentations';
import TabTeaching from './tabs/TabTeaching';
import TabPartners from './tabs/TabPartners';
import TabSkills from './tabs/TabSkills';
import TabTestimonials from './tabs/TabTestimonials';
import TabSecurity from './tabs/TabSecurity';
import TabCVManager from './tabs/TabCVManager';
import { FileText } from 'lucide-react';

import './admin.css';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('general');
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const { isCustomized, resetToDefaults } = usePortfolioData();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('seif_admin_authenticated');
    sessionStorage.removeItem('seif_admin_auth_timestamp');
    navigate('/vault-gate-9x7k2');
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من استعادة البيانات الافتراضية الأصلية؟ سيتم مسح كافة التعديلات المخزنة محلياً.')) {
      resetToDefaults();
      showToast('تمت استعادة البيانات الافتراضية بنجاح!');
    }
  };

  const tabs = [
    { id: 'general', label: 'المعلومات الشخصية', icon: User },
    { id: 'projects', label: 'المشاريع الهندسية', icon: Layers },
    { id: 'credentials', label: 'الشهادات والاعتمادات', icon: Award },
    { id: 'presentations', label: 'عروض الـ Decks', icon: Presentation },
    { id: 'teaching', label: 'حقيبة التدريس', icon: GraduationCap },
    { id: 'partners', label: 'شركاء النجاح', icon: Building2 },
    { id: 'skills', label: 'المهارات والتقنيات', icon: Cpu },
    { id: 'testimonials', label: 'التوصيات والآراء', icon: MessageSquare },
    { id: 'cv', label: 'أرشيف الـ CV', icon: FileText },
    { id: 'security', label: 'الأمان وتصدير الكود', icon: Shield },
  ];

  return (
    <div className="admin-wrapper admin-bg-pattern">
      
      {/* Unified Enterprise Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          
          {/* Brand Identity - Matching Main Portfolio */}
          <div className="admin-brand">
            <div className="brand-avatar-frame" style={{ width: "42px", height: "42px" }} title="سيف الدين محمد"><img src="/assets/profile/seif-portrait-avatar.jpg" alt="سيف الدين محمد" className="brand-avatar-img" /></div>
            <div>
              <div className="admin-brand-title">
                <span>سيف الدين محمد</span>
                <span className="admin-brand-badge">
                  <Sparkles size={12} />
                  Top 1 DEPI Scholar
                </span>
              </div>
              <div className="admin-brand-sub">
                لوحة التحكم الإدارية واستوديو المحتوى (Admin Studio & Media Engine)
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isCustomized && (
              <button 
                onClick={handleReset}
                className="admin-btn admin-btn-secondary"
                title="استعادة البيانات الافتراضية الأصلية"
                style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem' }}
              >
                <RotateCcw size={15} />
                استعادة الافتراضي
              </button>
            )}

            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer"
              className="admin-btn admin-btn-secondary"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem' }}
            >
              <ExternalLink size={15} />
              معاينة الموقع
            </a>

            <button 
              onClick={handleLogout}
              className="admin-btn admin-btn-danger"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem' }}
            >
              <LogOut size={15} />
              تسجيل الخروج
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-container">
        
        {/* Navigation Tabs Bar */}
        <div className="admin-tabs-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`admin-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={17} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Cards */}
        <div className="admin-card">
          {activeTab === 'general' && <TabGeneralInfo showToast={showToast} />}
          {activeTab === 'projects' && <TabProjects showToast={showToast} />}
          {activeTab === 'credentials' && <TabCredentials showToast={showToast} />}
          {activeTab === 'presentations' && <TabPresentations showToast={showToast} />}
          {activeTab === 'teaching' && <TabTeaching showToast={showToast} />}
          {activeTab === 'partners' && <TabPartners showToast={showToast} />}
          {activeTab === 'skills' && <TabSkills showToast={showToast} />}
          {activeTab === 'testimonials' && <TabTestimonials showToast={showToast} />}
          {activeTab === 'cv' && <TabCVManager showToast={showToast} />}
          {activeTab === 'security' && <TabSecurity showToast={showToast} />}
        </div>

      </main>

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={20} color="#34d399" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
