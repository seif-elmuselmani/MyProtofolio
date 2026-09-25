import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { cryptoService } from './auth/cryptoService';
import './admin.css';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await cryptoService.verifyCredentials(username, password);
      if (result.success) {
        sessionStorage.setItem('seif_admin_authenticated', 'true');
        sessionStorage.setItem('seif_admin_auth_timestamp', Date.now().toString());
        navigate('/vault-gate-9x7k2/dashboard');
      } else {
        setError(result.message || 'بيانات الدخول غير صحيحة، يرجى التحقق وإعادة المحاولة');
      }
    } catch (err) {
      setError('حدث خطأ في معالجة التشفير، حاول مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper admin-bg-pattern">
      <div className="admin-login-card">
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div 
            style={{ 
              width: '64px', 
              height: '64px', 
              margin: '0 auto 1.25rem',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.28)'
            }}
          >
            <ShieldCheck size={36} />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <span className="admin-badge-info">
              <Sparkles size={13} />
              منظومة الإدارة والمحتوى الذكي
            </span>
          </div>

          <h1 style={{ fontSize: '1.55rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.35rem' }}>
            بوابة الإدارة المركزية
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            سيف الدين محمد | Seif Elden Portfolio Studio
          </p>
        </div>

        {error && (
          <div 
            style={{ 
              backgroundColor: '#fee2e2', 
              border: '1px solid #fca5a5', 
              color: '#b91c1c', 
              padding: '0.9rem 1.1rem', 
              borderRadius: '12px',
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-label">اسم المستخدم (Username)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="admin-input"
                placeholder="أدخل اسم المستخدم..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ paddingRight: '2.75rem' }}
              />
              <User 
                size={18} 
                style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} 
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">كلمة المرور المشفرة (Master Key)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="admin-input"
                placeholder="أدخل كلمة المرور..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '2.75rem' }}
              />
              <Lock 
                size={18} 
                style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} 
              />
            </div>
          </div>

          <div style={{ marginTop: '1.75rem' }}>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={isLoading}
              style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '1rem' }}
            >
              {isLoading ? 'جاري التحقق وفك التشفير...' : 'تسجيل الدخول إلى لوحة التحكم'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <a
            href="/"
            style={{ 
              color: '#64748b', 
              fontSize: '0.85rem', 
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: '600'
            }}
          >
            <ArrowRight size={15} />
            العودة إلى الموقع الرئيسي
          </a>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
