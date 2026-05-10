import React from 'react';
import { useResume } from '../../context/ResumeContext';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { fullName, email, phone, jobTitle, links } = resumeData.personalInfo;

  return (
    <div className="glass-card p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Senior Frontend Developer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-1">Links (LinkedIn, Portfolio, etc.)</label>
          <input
            type="text"
            value={links}
            onChange={(e) => updatePersonalInfo('links', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="linkedin.com/in/johndoe, github.com/johndoe"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
