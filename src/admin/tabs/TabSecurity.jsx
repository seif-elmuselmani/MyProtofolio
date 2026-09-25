import React, { useState } from 'react';
import { Shield, Key, Download, Upload, Code, CheckCircle, Copy, Sparkles, RefreshCw } from 'lucide-react';
import { usePortfolioData } from '../../context/DynamicPortfolioContext';
import { cryptoService } from '../auth/cryptoService';

export default function TabSecurity({ showToast }) {
  const { exportDataAsCode, exportDataAsJson, importDataFromJson, resetToDefaults } = usePortfolioData();
  
  const [newUsername, setNewUsername] = useState('seif');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPwdMsg('يجب أن تكون كلمة المرور 6 أحرف على الأقل');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMsg('كلمات المرور غير متطابقة');
      return;
    }

    try {
      await cryptoService.updateCredentials(newUsername, newPassword);
      setPwdMsg('تم تحديث بيانات الدخول وتشفيرها بنجاح!');
      showToast('تم تحديث كلمة المرور المشفرة بنجاح!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPwdMsg('حدث خطأ أثناء حفظ كلمة المرور');
    }
  };

  const handleCopyCode = () => {
    const code = exportDataAsCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast('تم نسخ كود portfolioData.js إلى الحافظة بنجاح!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadJson = () => {
    const jsonStr = exportDataAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seif_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('تم تنزيل النسخة الاحتياطية JSON بنجاح!');
  };

  const handleImportJson = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = importDataFromJson(event.target.result);
        if (success) {
          showToast('تم استيراد البيانات بنجاح وتحديث الموقع!');
        } else {
          showToast('ملف النسخ الاحتياطي غير صالح');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">
            <Shield size={24} color="#2563eb" />
            الأمان المشفر وتصدير الأكواد (Security & Studio Engine)
          </h2>
          <p className="admin-section-desc">
            تصدير الكود المصدري لملف portfolioData.js بنقرة واحدة، إنشاء نسخ احتياطية، وتحديث بيانات المرور.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Code Generator & Clean Export */}
        <div className="admin-item-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Code size={22} color="#2563eb" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
              تصدير الكود المصدري النظيف (1-Click Code Export)
            </h3>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            يولد لك هذا الزر كود JavaScript صالح ونظيف بنسبة 100% يحتوي على جميع التعديلات التي قمت بها، لتتمكن من نسخه ووضعه مباشرة في <code>src/data/portfolioData.js</code> إن أردت تثبيت التعديلات للأبد.
          </p>

          <button onClick={handleCopyCode} className="admin-btn admin-btn-primary" style={{ width: '100%' }}>
            {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
            {copied ? 'تم النسخ إلى الحافظة!' : 'نسخ كود portfolioData.js بالكامل'}
          </button>
        </div>

        {/* JSON Backup & Restore */}
        <div className="admin-item-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Download size={22} color="#059669" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
              النسخ الاحتياطي والاستعادة (JSON Backup)
            </h3>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            احفظ نسخة كاملة من كل بيانات الموقع على جهازك أو قم باستعادتها في أي وقت من ملف JSON.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
            <button onClick={handleDownloadJson} className="admin-btn admin-btn-secondary" style={{ width: '100%' }}>
              <Download size={18} />
              تنزيل ملف النسخة الاحتياطية (JSON)
            </button>

            <label className="admin-btn admin-btn-secondary" style={{ width: '100%', cursor: 'pointer' }}>
              <Upload size={18} />
              استعادة البيانات من ملف JSON
              <input type="file" accept=".json" onChange={handleImportJson} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* Password & Security Updater */}
        <div className="admin-item-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Key size={22} color="#d97706" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
              تغيير كلمة المرور وتشفير PBKDF2
            </h3>
          </div>

          <form onSubmit={handleUpdatePassword}>
            <div className="admin-form-group">
              <label className="admin-label">اسم المستخدم</label>
              <input
                type="text"
                className="admin-input"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">كلمة المرور الجديدة</label>
              <input
                type="password"
                className="admin-input"
                placeholder="أدخل كلمة مرور جديدة..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">تأكيد كلمة المرور</label>
              <input
                type="password"
                className="admin-input"
                placeholder="أعد كتابة كلمة المرور..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {pwdMsg && (
              <div style={{ fontSize: '0.85rem', color: pwdMsg.includes('بنجاح') ? '#059669' : '#dc2626', marginBottom: '0.75rem', fontWeight: '600' }}>
                {pwdMsg}
              </div>
            )}

            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%' }}>
              تحديث بيانات المرور المشفرة
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
