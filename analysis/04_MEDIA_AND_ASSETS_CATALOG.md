# 🖼️ كتالوج الصور والوسائط الرقمية (Media & Assets Catalog)

يوثق هذا الملف الهيكل المعماري والتنظيمي المطبق داخل مجلد `معلومات عني` بعد تقسيمه وتسمية كافة الملفات بأسماء معيارية إنجليزية واضحة وجاهزة للاستخدام البرمجي في الـ Portfolio.

---

## 🗂️ الهيكل المنظم للمجلد (`معلومات عني/`)

```text
معلومات عني/
├── 📁 profile/                      # الصور الشخصية وصور الفعاليات والبانرات
│   ├── seif-portrait-avatar.jpg      # صورة البروفايل الرسمية للـ Hero و About
│   ├── seif-defense-formal.jpg       # صورة بدلة كاملة من مناقشة مشروع التخرج
│   ├── seif-with-dr-hesham-farouk-depi.png # صورة مع مستشار الوزير د. هشام فاروق بحفل DEPI
│   └── banner-linkedin-header.png    # بانر لينكد إن بتصميم الهوية المخصصة
├── 📁 certificates/                 # الشهادات والاعتمادات الرسمية
│   ├── cert-depi-fullstack-dotnet.jpg # شهادة DEPI الرسمية (Top 1)
│   ├── cert-depi-fullstack-dotnet.pdf # ملف PDF للشهادة
│   ├── cert-zagazig-cs-degree.jpg    # بيان نجاح تخرج الحاسبات والمعلومات (جيد جداً)
│   ├── cert-ai-microsoft-mcit.png    # شهادة AI Beginner من Microsoft و MCIT
│   ├── cert-ai-freelance-mcit.png    # شهادة الذكاء الاصطناعي في العمل الحر من MCIT
│   ├── cert-deeplearning-iti.png     # شهادة Deep Learning من معهد ITI
│   ├── cert-python-iti.png           # شهادة أساسيات Python من معهد ITI
│   ├── cert-sql-basic-hackerrank.png # شهادة SQL Basic من HackerRank
│   ├── cert-sql-intermediate-hackerrank.png # شهادة SQL Intermediate من HackerRank
│   └── cert-git-github-almdrasa.png  # شهادة Git & GitHub من المدرسة
├── 📁 testimonials/                 # إثباتات التقييمات والتوصيات (Social Proof)
│   ├── testimonial-sherif-adel-nti.png # توصية أ. شريف عادل (مسئول مقر NTI)
│   ├── testimonial-rayan-mohamed-nti.png # توصية م. ريان محمد (مدرب MEAN Stack)
│   ├── testimonial-nafezly-5stars-ahmed-hassan.png # تقييم 5 نجوم نفذلي (أحمد حسن)
│   └── testimonial-kafiil-5stars-omar-yasser.png # تقييم 5 نجوم كفيل (عمر ياسر)
├── 📁 documents/                    # السيرة الذاتية والملخصات
│   ├── seif-elden-resume.pdf         # ملف السيرة الذاتية الأساسي
│   └── snapshot-experience-summary.png # ملخص الخبرات الميدانية
└── 📁 raw-data/                     # الأرشيف والبيانات النصية الخام
    ├── linkedin-profile-raw-data.txt # بيانات البروفايل كاملة
    └── linkedin-feed-and-posts-archive.txt # أرشيف المنشورات وتفاعلات المتابعين
```

---

## 🎯 دور كل ملف وأفضل موضع لاستخدامه في واجهة المستخدم (UI/UX)

| المجلد والملف | نوع الأصل | الموضع المقترح في موقع الـ Portfolio |
|---|---|---|
| `profile/seif-portrait-avatar.jpg` | صورة شخصية | الصورة الرئيسية داخل الـ Hero Section والـ Floating Avatar. |
| `profile/seif-defense-formal.jpg` | صورة رسمية | خلفية أو كارت قصة التخرج والشغف في قسم About Me. |
| `profile/seif-with-dr-hesham-farouk-depi.png` | صورة تكريم قومي | كارت شرفي مميز بجانب شهادة المركز الأول على مستوى الجمهورية (DEPI). |
| `certificates/*` | معرض الشهادات | مكون `Certificates.jsx` التفاعلي مع خاصية الفلترة والتكبير في نافذة منبثقة (Lightbox Modal). |
| `testimonials/*` | معرض التوصيات | سلايدر التوصيات `Testimonials.jsx` مع عرض صورة التقييم الأصلية كإثبات موثوق. |
| `documents/seif-elden-resume.pdf` | سيرة ذاتية | رابط التنزيل المباشر في أزرار `Download Resume / CV`. |
