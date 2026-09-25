import React, { useState } from "react";
import { usePortfolioData } from "../../context/DynamicPortfolioContext";
import { Save, Check, User } from "lucide-react";

export const GeneralInfoTab = () => {
  const { personalInfo, updateSection } = usePortfolioData();
  const [form, setForm] = useState(personalInfo || {});
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSection("personalInfo", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            البيانات الشخصية والنبذة التعريفية
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            عدل الاسم، المسميات الوظيفية، النبذة العربية والإنجليزية، ومعلومات التواصل.
          </p>
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? "تم الحفظ بنجاح!" : "حفظ التعديلات"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">الاسم باللغة العربية</label>
          <input
            type="text"
            value={form.nameAr || ""}
            onChange={(e) => handleChange("nameAr", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Full Name (English)</label>
          <input
            type="text"
            value={form.nameEn || ""}
            onChange={(e) => handleChange("nameEn", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Primary Job Title (English)</label>
          <input
            type="text"
            value={form.titleEn || ""}
            onChange={(e) => handleChange("titleEn", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">الموقع / المدينة (Location)</label>
          <input
            type="text"
            value={form.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">البريد الإلكتروني (Email)</label>
          <input
            type="email"
            value={form.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">رقم الهاتف (Phone)</label>
          <input
            type="text"
            value={form.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-slate-800/80">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">المسمى الوظيفي الكامل بالعربية (Full Role Arabic)</label>
          <input
            type="text"
            value={form.roleAr || ""}
            onChange={(e) => handleChange("roleAr", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Full Role Header (English)</label>
          <input
            type="text"
            value={form.roleEn || ""}
            onChange={(e) => handleChange("roleEn", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">العبارة البارزة (Hero Tagline)</label>
          <input
            type="text"
            value={form.tagline || ""}
            onChange={(e) => handleChange("tagline", e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-slate-800/80">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">النبذة التفصيلية بالعربية (Bio Arabic)</label>
          <textarea
            rows={4}
            value={form.bioAr || ""}
            onChange={(e) => handleChange("bioAr", e.target.value)}
            className="w-full p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Detailed Bio (English)</label>
          <textarea
            rows={4}
            value={form.bioEn || ""}
            onChange={(e) => handleChange("bioEn", e.target.value)}
            className="w-full p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none leading-relaxed"
          />
        </div>
      </div>
    </form>
  );
};
