import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageSeoData = {
  '/': {
    title: 'سيف الدين محمد | مهندس برمجيات Full-Stack (.NET & MEAN) | الأول على الجمهورية DEPI',
    description: 'البورتفوليو الهندسي الرسمي للمطور سيف الدين محمد - مهندس برمجيات متخصص في بناء الأكواد والـ Backend عالي الأداء، الأول جمهورية بمبادرة DEPI وقائد مشروع نبض (A+).'
  },
  '/projects': {
    title: 'المشاريع ودراسات الحالة الهندسية | سيف الدين محمد',
    description: 'استعرض دراسات الحالة للمشاريع الهندسية الحية والـ Full-Stack للأنظمة المعمارية والتجارية التي طورها سيف الدين محمد.'
  },
  '/about': {
    title: 'عن المهندس والخبرات المهنية | سيف الدين محمد',
    description: 'تعرف على المسار الأكاديمي والمهني للمهندس سيف الدين محمد، خريج حاسبات ومعلومات وجامعة الزقازيق وأعمال الـ Backend.'
  },
  '/credentials': {
    title: 'الشهادات والاعتمادات الرسمية | سيف الدين محمد',
    description: 'استعرض شهادات التفوق والاعتمادات الرسمية من وزارة الاتصالات (MCIT) ومبادرة DEPI ومعهد NTI وiSchool.'
  },
  '/testimonials': {
    title: 'التوصيات وإشادات القيادات والعملاء | سيف الدين محمد',
    description: 'اقرأ التوصيات الموثقة رسمياً من قيادات iSchool وإدارة NTI وأولياء الأمور والعملاء التجاريين على المنصات.'
  },
  '/teaching': {
    title: 'الخبرة التدريبية والتعليمية | سيف الدين محمد',
    description: 'سجل الخبرة التعليمية والتدريبية الميدانية في تدريس البرمجيات والـ Coding لأكثر من 500 طالب بمبادرة براعم مصر وiSchool.'
  },
  '/presentations': {
    title: 'العروض التقديمية والعروض الفنية | سيف الدين محمد',
    description: 'تصفح شرائح العروض التقديمية الـ Pitch Decks وتقديم مناقشات مشاريع التخرج ومبادرة DEPI.'
  },
  '/contact': {
    title: 'تواصل مع المهندس سيف الدين محمد | سيف الدين محمد',
    description: 'تواصل مباشرة مع المهندس سيف الدين محمد لمناقشة الفرص الوظيفية أو المشاريع البرمجية واستشارات الـ Backend.'
  }
};

export default function DynamicSeoManager() {
  const location = useLocation();

  useEffect(() => {
    const seo = pageSeoData[location.pathname] || pageSeoData['/'];
    
    // Update Title
    document.title = seo.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }

    // Update OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title);
    }
  }, [location.pathname]);

  return null;
}
