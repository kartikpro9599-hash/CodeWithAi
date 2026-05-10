import React, { createContext, useContext, useState } from 'react';

const defaultResumeState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    links: '', // e.g., LinkedIn, GitHub (comma separated or single string)
  },
  summary: '',
  skills: '', // comma separated string or array
  experience: [
    {
      id: '1',
      company: '',
      role: '',
      dates: '',
      bullets: '',
    },
  ],
  projects: [
    {
      id: '1',
      name: '',
      description: '',
      link: '',
    },
  ],
  education: [
    {
      id: '1',
      institution: '',
      degree: '',
      year: '',
    },
  ],
  certifications: [
    {
      id: '1',
      name: '',
      issuer: '',
      year: '',
    },
  ],
  settings: {
    role: 'Developer', // Fresher, Student, Developer, Designer, Sales, Marketing, Teacher
    template: 'modern', // modern, minimal, executive
    color: '#3b82f6', // primary blue
    font: 'Inter',
  }
};

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(defaultResumeState);

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSummary = (value) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  };

  const updateSkills = (value) => {
    setResumeData(prev => ({ ...prev, skills: value }));
  };

  const updateSectionItem = (section, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addSectionItem = (section, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...defaultItem, id: Date.now().toString() }]
    }));
  };

  const removeSectionItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const updateSettings = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      settings: { ...prev.settings, [field]: value }
    }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updatePersonalInfo,
      updateSummary,
      updateSkills,
      updateSectionItem,
      addSectionItem,
      removeSectionItem,
      updateSettings,
      setResumeData // for full overrides
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
