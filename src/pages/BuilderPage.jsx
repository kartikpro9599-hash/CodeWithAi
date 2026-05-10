import React from 'react';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import SummaryForm from '../components/forms/SummaryForm';
import SkillsForm from '../components/forms/SkillsForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import TemplateRenderer from '../components/templates/TemplateRenderer';

const BuilderPage = () => {
  const { resumeData, updateSettings } = useResume();

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)]">
      {/* Left: Form Controls */}
      <div className="w-full lg:w-1/2 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h1 className="text-3xl font-bold text-white">Resume Builder</h1>
          <select
            value={resumeData.settings.role}
            onChange={(e) => updateSettings('role', e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="Fresher">Fresher</option>
            <option value="Student">Student</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        <PersonalInfoForm />
        <SummaryForm />
        <SkillsForm />
        <ExperienceForm />
        <EducationForm />

        <div className="pb-20 text-center text-slate-500 text-sm">
          You've reached the end of the form. Go to <a href="/templates" className="text-blue-400 hover:underline">Templates</a> to change design.
        </div>
      </div>

      {/* Right: Live Preview — fixed scale so A4 fits the panel */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-slate-950 border-l border-slate-800 overflow-hidden justify-center items-start py-8">
        {/* 
          A4 = 794px wide. We want it to fit in ~50vw minus padding.
          We use a wrapper that is exactly 794px wide, then scale the whole thing.
          transform-origin: top center keeps it anchored to the top.
        */}
        <div style={{ width: '794px', transformOrigin: 'top center', transform: 'scale(0.62)', marginBottom: '-280px' }}>
          <TemplateRenderer data={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
