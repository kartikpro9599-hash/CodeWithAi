import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Zap } from 'lucide-react';
import { makeItStronger } from '../../utils/smartRewrite';

const ExperienceForm = () => {
  const { resumeData, updateSectionItem, addSectionItem, removeSectionItem } = useResume();

  const handleAdd = () => {
    addSectionItem('experience', { company: '', role: '', dates: '', bullets: '' });
  };

  const handleMakeStronger = (id, bullets) => {
    updateSectionItem('experience', id, 'bullets', makeItStronger(bullets));
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
        <h2 className="text-xl font-bold text-white">Work Experience</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="relative p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            {resumeData.experience.length > 1 && (
              <button 
                onClick={() => removeSectionItem('experience', exp.id)}
                className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                title="Remove Experience"
              >
                <Trash2 size={16} />
              </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateSectionItem('experience', exp.id, 'company', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Tech Corp"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Role</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateSectionItem('experience', exp.id, 'role', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Software Engineer"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">Dates</label>
                <input
                  type="text"
                  value={exp.dates}
                  onChange={(e) => updateSectionItem('experience', exp.id, 'dates', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Jan 2020 - Present"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Bullet Points</label>
              <textarea
                value={exp.bullets}
                onChange={(e) => updateSectionItem('experience', exp.id, 'bullets', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors h-24 resize-y mb-2"
                placeholder="- Developed a new feature...&#10;- Improved performance by..."
              ></textarea>
              <button 
                onClick={() => handleMakeStronger(exp.id, exp.bullets)}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-md hover:bg-blue-600/30 transition-colors text-xs font-medium"
              >
                <Zap size={12} /> Make Bullets Stronger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;
