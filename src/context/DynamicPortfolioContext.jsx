import React, { createContext, useContext, useState, useEffect } from 'react';
import * as defaultData from '../data/portfolioData';

const PortfolioDataContext = createContext();

const STORAGE_KEYS = {
  PERSONAL_INFO: 'seif_portfolio_personal_info',
  WEB_PROJECTS: 'seif_portfolio_web_projects',
  CREDENTIALS: 'seif_portfolio_credentials',
  TEACHING: 'seif_portfolio_teaching',
  SKILLS: 'seif_portfolio_skills',
  TESTIMONIALS: 'seif_portfolio_testimonials',
  PRESENTATIONS: 'seif_portfolio_presentations',
  PARTNERS: 'seif_portfolio_partners',
  CATEGORIES: 'seif_portfolio_categories',
  CV_ARCHIVE: 'seif_portfolio_cv_archive',
  IS_CUSTOMIZED: 'seif_portfolio_is_customized'
};

export function DynamicPortfolioProvider({ children }) {
  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
    return saved ? JSON.parse(saved) : defaultData.personalInfo;
  });

  const [webProjects, setWebProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WEB_PROJECTS);
    return saved ? JSON.parse(saved) : defaultData.webProjects;
  });

  const [credentialsList, setCredentialsList] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    return saved ? JSON.parse(saved) : (defaultData.credentialsList || defaultData.certificatesList || []);
  });

  const [teachingExperience, setTeachingExperience] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEACHING);
    return saved ? JSON.parse(saved) : defaultData.teachingExperience;
  });

  const [skillsMatrix, setSkillsMatrix] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : defaultData.skillsMatrix;
  });

  const [testimonialsList, setTestimonialsList] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (saved) {
      return JSON.parse(saved);
    }
    const baseList = defaultData.testimonialsList || [];
    return baseList.map(t => ({ ...t, status: t.status || 'approved' }));
  });

  const [presentationDecks, setPresentationDecks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRESENTATIONS);
    return saved ? JSON.parse(saved) : (defaultData.presentationDecks || []);
  });

  const [trustPartners, setTrustPartners] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PARTNERS);
    return saved ? JSON.parse(saved) : (defaultData.trustPartners || []);
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : (defaultData.categories || []);
  });

  const [cvArchive, setCvArchive] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CV_ARCHIVE);
    return saved ? JSON.parse(saved) : (defaultData.cvArchive || []);
  });

  const [isCustomized, setIsCustomized] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_CUSTOMIZED) === 'true';
  });

  // Updaters
  const updatePersonalInfo = (data) => {
    setPersonalInfo(data);
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updateWebProjects = (data) => {
    setWebProjects(data);
    localStorage.setItem(STORAGE_KEYS.WEB_PROJECTS, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updateCredentialsList = (data) => {
    setCredentialsList(data);
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updateTeachingExperience = (data) => {
    setTeachingExperience(data);
    localStorage.setItem(STORAGE_KEYS.TEACHING, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updateSkillsMatrix = (data) => {
    setSkillsMatrix(data);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updateTestimonialsList = (data) => {
    setTestimonialsList(data);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const addPendingTestimonial = (testimonialData) => {
    const newTestimonial = {
      ...testimonialData,
      id: 'pending-' + Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    const updated = [newTestimonial, ...testimonialsList];
    setTestimonialsList(updated);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
    return newTestimonial;
  };

  const approveTestimonial = (id) => {
    const updated = testimonialsList.map(t => {
      if (t.id === id) {
        return { ...t, status: 'approved', approvedAt: new Date().toISOString() };
      }
      return t;
    });
    setTestimonialsList(updated);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const rejectTestimonial = (id) => {
    const updated = testimonialsList.filter(t => t.id !== id);
    setTestimonialsList(updated);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updatePresentationDecks = (data) => {
    setPresentationDecks(data);
    localStorage.setItem(STORAGE_KEYS.PRESENTATIONS, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updateTrustPartners = (data) => {
    setTrustPartners(data);
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updateCvArchive = (data) => {
    setCvArchive(data);
    localStorage.setItem(STORAGE_KEYS.CV_ARCHIVE, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const updateCategories = (data) => {
    setCategories(data);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOMIZED, 'true');
    setIsCustomized(true);
  };

  const resetToDefaults = () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    setPersonalInfo(defaultData.personalInfo);
    setWebProjects(defaultData.webProjects);
    setCredentialsList(defaultData.credentialsList || defaultData.certificatesList || []);
    setTeachingExperience(defaultData.teachingExperience);
    setSkillsMatrix(defaultData.skillsMatrix);
    
    const baseList = defaultData.testimonialsList || [];
    setTestimonialsList(baseList.map(t => ({ ...t, status: 'approved' })));

    setPresentationDecks(defaultData.presentationDecks || []);
    setTrustPartners(defaultData.trustPartners || []);
    setCategories(defaultData.categories || []);
    setCvArchive(defaultData.cvArchive || []);
    setIsCustomized(false);
  };

  const exportDataAsCode = () => {
    return `// ============================================================================
// Seif Elden Portfolio Data - Generated via Admin Studio
// Auto-Generated Timestamp: ${new Date().toISOString()}
// ============================================================================

export const personalInfo = ${JSON.stringify(personalInfo, null, 2)};

export const trustPartners = ${JSON.stringify(trustPartners, null, 2)};

export const skillsMatrix = ${JSON.stringify(skillsMatrix, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};

export const webProjects = ${JSON.stringify(webProjects, null, 2)};

export const certificatesList = ${JSON.stringify(credentialsList, null, 2)};
export const credentialsList = certificatesList;

export const testimonialsList = ${JSON.stringify(testimonialsList, null, 2)};

export const presentationDecks = ${JSON.stringify(presentationDecks, null, 2)};

export const teachingExperience = ${JSON.stringify(teachingExperience, null, 2)};

export const cvArchive = ${JSON.stringify(cvArchive, null, 2)};
`;
  };

  const exportDataAsJson = () => {
    const payload = {
      personalInfo,
      trustPartners,
      skillsMatrix,
      categories,
      webProjects,
      credentialsList,
      testimonialsList,
      presentationDecks,
      teachingExperience,
      cvArchive,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDataFromJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personalInfo) updatePersonalInfo(parsed.personalInfo);
      if (parsed.webProjects) updateWebProjects(parsed.webProjects);
      if (parsed.credentialsList) updateCredentialsList(parsed.credentialsList);
      if (parsed.teachingExperience) updateTeachingExperience(parsed.teachingExperience);
      if (parsed.skillsMatrix) updateSkillsMatrix(parsed.skillsMatrix);
      if (parsed.testimonialsList) updateTestimonialsList(parsed.testimonialsList);
      if (parsed.presentationDecks) updatePresentationDecks(parsed.presentationDecks);
      if (parsed.trustPartners) updateTrustPartners(parsed.trustPartners);
      if (parsed.categories) updateCategories(parsed.categories);
      if (parsed.cvArchive) updateCvArchive(parsed.cvArchive);
      return true;
    } catch (e) {
      console.error('Failed to import portfolio JSON:', e);
      return false;
    }
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        personalInfo,
        webProjects,
        credentialsList,
        certificatesList: credentialsList,
        teachingExperience,
        skillsMatrix,
        testimonialsList,
        presentationDecks,
        trustPartners,
        categories,
        cvArchive,
        isCustomized,
        updatePersonalInfo,
        updateWebProjects,
        updateCredentialsList,
        updateTeachingExperience,
        updateSkillsMatrix,
        updateTestimonialsList,
        addPendingTestimonial,
        approveTestimonial,
        rejectTestimonial,
        updatePresentationDecks,
        updateTrustPartners,
        updateCategories,
        updateCvArchive,
        resetToDefaults,
        exportDataAsCode,
        exportDataAsJson,
        importDataFromJson
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a DynamicPortfolioProvider');
  }
  return context;
}
