import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { shortenSummary, professionalTone, makeItStronger } from '../../utils/smartRewrite';
import { Zap, Scissors, Briefcase } from 'lucide-react';

const SummaryForm = () => {
  const { resumeData, updateSummary } = useResume();

  const handleShorten = () => {
    updateSummary(shortenSummary(resumeData.summary));
  };

  const handleProfessionalTone = () => {
    updateSummary(professionalTone(resumeData.summary));
  };

  const handleMakeStronger = () => {
    updateSummary(makeItStronger(resumeData.summary));
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
        <h2 className="text-xl font-bold text-white">Professional Summary</h2>
      </div>
      
      <div className="mb-3">
        <textarea
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors h-32 resize-y"
          placeholder="A brief summary of your professional background, skills, and goals..."
        ></textarea>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <button 
          onClick={handleMakeStronger}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-md hover:bg-blue-600/30 transition-colors text-xs font-medium"
        >
          <Zap size={14} /> Make Stronger
        </button>
        <button 
          onClick={handleShorten}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-md hover:bg-purple-600/30 transition-colors text-xs font-medium"
        >
          <Scissors size={14} /> Shorten
        </button>
        <button 
          onClick={handleProfessionalTone}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 text-green-400 border border-green-500/30 rounded-md hover:bg-green-600/30 transition-colors text-xs font-medium"
        >
          <Briefcase size={14} /> Professional Tone
        </button>
      </div>
    </div>
  );
};

export default SummaryForm;
