import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { resumeData, updateSectionItem, addSectionItem, removeSectionItem } = useResume();

  const handleAdd = () => {
    addSectionItem('education', { institution: '', degree: '', year: '' });
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
        <h2 className="text-xl font-bold text-white">Education</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Plus size={16} /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="relative p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            {resumeData.education.length > 1 && (
              <button 
                onClick={() => removeSectionItem('education', edu.id)}
                className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                title="Remove Education"
              >
                <Trash2 size={16} />
              </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateSectionItem('education', edu.id, 'institution', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="University of Technology"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateSectionItem('education', edu.id, 'degree', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="B.S. Computer Science"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Year</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateSectionItem('education', edu.id, 'year', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="2018 - 2022"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
