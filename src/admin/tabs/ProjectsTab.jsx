import React, { useState } from "react";
import { usePortfolioData } from "../../context/DynamicPortfolioContext";
import { FolderGit2, Plus, Trash2, Edit3, Save, Check } from "lucide-react";

export const ProjectsTab = () => {
  const { webProjects, updateSection } = usePortfolioData();
  const [projects, setProjects] = useState(webProjects || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleUpdateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
    setSaved(false);
  };

  const handleAddProject = () => {
    const newProj = {
      id: `proj_${Date.now()}`,
      titleAr: "مشروع جديد",
      titleEn: "New Project",
      category: "Full Stack",
      featured: false,
      badge: "جديد",
      summaryAr: "شرح تفصيلي للمشروع...",
      summaryEn: "Project summary and key achievements...",
      techStack: [".NET", "React", "SQL Server"],
      metrics: {
        stars: "5.0",
        delivery: "100%",
        impact: "New"
      },
      image: "/assets/profile/seif-portrait-avatar.jpg",
      links: {
        live: "",
        github: "",
        demo: ""
      }
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    setEditingIndex(0);
    setSaved(false);
  };

  const handleDeleteProject = (index) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المشروع من العرض؟")) {
      const updated = projects.filter((_, i) => i !== index);
      setProjects(updated);
      setEditingIndex(null);
      setSaved(false);
    }
  };

  const handleSaveAll = () => {
    updateSection("webProjects", projects);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            إدارة المشاريع المميزة (Projects Manager)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            أضف وعدل وخصص مشاريعك (شريان، نبض، كشاف، أو أي مشروع جديد) والروابط والتقنيات.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddProject}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>إضافة مشروع جديد</span>
          </button>
          <button
            onClick={handleSaveAll}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "تم الحفظ!" : "حفظ التعديلات"}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl transition-all hover:border-slate-700 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-mono font-bold">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {proj.titleAr || proj.titleEn}
                    {proj.featured && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ⭐ مميز
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">{proj.titleEn} • {proj.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingIndex(editingIndex === idx ? null : idx)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{editingIndex === idx ? "إغلاق" : "تعديل"}</span>
                </button>
                <button
                  onClick={() => handleDeleteProject(idx)}
                  className="p-2 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-all cursor-pointer"
                  title="حذف المشروع"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {editingIndex === idx && (
              <div className="pt-4 mt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400">عنوان المشروع بالعربية</label>
                  <input
                    type="text"
                    value={proj.titleAr || ""}
                    onChange={(e) => handleUpdateProject(idx, "titleAr", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400">Project Title (English)</label>
                  <input
                    type="text"
                    value={proj.titleEn || ""}
                    onChange={(e) => handleUpdateProject(idx, "titleEn", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400">التصنيف (Category)</label>
                  <input
                    type="text"
                    value={proj.category || ""}
                    onChange={(e) => handleUpdateProject(idx, "category", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400">البادج البارز (Badge Text)</label>
                  <input
                    type="text"
                    value={proj.badge || ""}
                    onChange={(e) => handleUpdateProject(idx, "badge", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-400">الوصف بالعربية</label>
                  <textarea
                    rows={2}
                    value={proj.summaryAr || ""}
                    onChange={(e) => handleUpdateProject(idx, "summaryAr", e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-400">Summary (English)</label>
                  <textarea
                    rows={2}
                    value={proj.summaryEn || ""}
                    onChange={(e) => handleUpdateProject(idx, "summaryEn", e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400">مسار الصورة (Image Path / URL)</label>
                  <input
                    type="text"
                    value={proj.image || ""}
                    onChange={(e) => handleUpdateProject(idx, "image", e.target.value)}
                    placeholder="/assets/projects/shryan.png"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400">التقنيات (مفصولة بفواصل)</label>
                  <input
                    type="text"
                    value={Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack || ""}
                    onChange={(e) => handleUpdateProject(idx, "techStack", e.target.value.split(",").map(s => s.trim()))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id={`feat_${idx}`}
                    checked={proj.featured || false}
                    onChange={(e) => handleUpdateProject(idx, "featured", e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`feat_${idx}`} className="text-xs text-slate-300 font-medium">
                    مشروع مميز يظهر في الصفحة الرئيسية (Featured Project)
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
