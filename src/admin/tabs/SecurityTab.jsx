import React, { useState } from "react";
import { Shield, Key, CheckCircle2, AlertCircle, Download, Upload, RotateCcw } from "lucide-react";
import { updateAdminCredentials } from "../auth/cryptoService";
import { usePortfolioData } from "../../context/DynamicPortfolioContext";

export const SecurityTab = () => {
  const { exportPortfolioCode, exportJsonBackup, importJsonBackup, resetToDefaults, hasCustomChanges } = usePortfolioData();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [importStatus, setImportStatus] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });

    if (newPassword !== confirmPassword) {
      setMsg({ text: "كلمتا المرور غير متطابقتين.", type: "error" });
      return;
    }

    try {
      await updateAdminCredentials(newUsername, newPassword);
      setMsg({ text: "تم تحديث بيانات تسجيل الدخول وتشفيرها بنجاح!", type: "success" });
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMsg({ text: err.message || "فشل تحديث البيانات.", type: "error" });
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result;
      if (typeof content === "string") {
        const res = importJsonBackup(content);
        if (res.success) {
          setImportStatus("تم استيراد وتطبيق النسخة الاحتياطية بنجاح!");
          setTimeout(() => setImportStatus(""), 4000);
        } else {
          setImportStatus(`خطأ في استيراد الملف: ${res.error}`);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="pb-6 border-b border-slate-800">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          مركز الأمان والنسخ الاحتياطي وتصدير الكود
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          تحكم في بيانات تسجيل الدخول، صدّر ملفات الكود المحدثة بضغطة زر، أو قم بعمل نسخ احتياطي كامل.
        </p>
      </div>

      <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 rounded-3xl space-y-6">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-400" />
            تصدير الكود والنسخ الاحتياطي الفوري (1-Click Sync)
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            هل أجريت تعديلات وتريد حفظها داخل السورس كود نهائياً؟ اضغط الزر لتحميل ملف <code className="text-indigo-300">portfolioData.js</code> الجديد مباشرة!
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={exportPortfolioCode}
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>تصدير ملف portfolioData.js المحدث</span>
          </button>

          <button
            onClick={exportJsonBackup}
            className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>تصدير نسخة احتياطية (JSON Backup)</span>
          </button>

          <label className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer">
            <Upload className="w-4 h-4 text-purple-400" />
            <span>استيراد نسخة احتياطية</span>
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>

          {hasCustomChanges && (
            <button
              onClick={() => {
                if (window.confirm("هل أنت متأكد من استعادة بيانات الكود الافتراضية وإلغاء التعديلات المؤقتة؟")) {
                  resetToDefaults();
                }
              }}
              className="px-5 py-3.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-semibold text-xs rounded-xl border border-rose-500/30 flex items-center gap-2 transition-all cursor-pointer mr-auto"
            >
              <RotateCcw className="w-4 h-4 text-rose-400" />
              <span>استعادة الإعدادات الأصلية</span>
            </button>
          )}
        </div>

        {importStatus && (
          <p className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
            {importStatus}
          </p>
        )}
      </div>

      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-6">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-400" />
            تغيير بيانات الدخول المشفرة (Update Admin Credentials)
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            سيتم تشفير كلمة المرور الجديدة تلقائياً بـ 100,000 جولة PBKDF2 و Salt عشوائي.
          </p>
        </div>

        {msg.text && (
          <div className={`p-4 rounded-xl text-xs flex items-center gap-3 ${msg.type === "success" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/15 text-rose-300 border border-rose-500/30"}`}>
            {msg.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{msg.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">اسم المستخدم الجديد</label>
            <input
              type="text"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="e.g. seif"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">كلمة المرور الجديدة</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">تأكيد كلمة المرور الجديدة</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            تحديث وتشفير البيانات الجديدة
          </button>
        </form>
      </div>
    </div>
  );
};
