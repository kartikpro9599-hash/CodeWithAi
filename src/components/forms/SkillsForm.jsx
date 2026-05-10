import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { addKeywords } from '../../utils/smartRewrite';
import { KEYWORD_LIBRARY } from '../../utils/atsScoring';
import { Sparkles } from 'lucide-react';

const SkillsForm = () => {
  const { resumeData, updateSkills } = useResume();

  const handleAddKeywords = () => {
    const roleKeywords = KEYWORD_LIBRARY[resumeData.settings.role] || [];
    const currentSkills = resumeData.skills;
    
    // Simple naive append of missing keywords
    const missing = roleKeywords.filter(kw => !currentSkills.toLowerCase().includes(kw.toLowerCase()));
    
    if (missing.length > 0) {
      const newSkills = currentSkills 
        ? `${currentSkills.trim()}${currentSkills.trim().endsWith(',') ? '' : ','} ${missing.slice(0, 5).join(', ')}` 
        : missing.slice(0, 5).join(', ');
      updateSkills(newSkills);
    }
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
        <h2 className="text-xl font-bold text-white">Skills</h2>
      </div>
      
      <div className="mb-3">
        <textarea
          value={resumeData.skills}
          onChange={(e) => updateSkills(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors h-24 resize-y"
          placeholder="React, JavaScript, Tailwind CSS, Project Management (comma separated)"
        ></textarea>
      </div>

      <div className="flex mt-2">
        <button 
          onClick={handleAddKeywords}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 rounded-md hover:bg-yellow-600/30 transition-colors text-xs font-medium"
        >
          <Sparkles size={14} /> Auto-Add Keywords for {resumeData.settings.role}
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
