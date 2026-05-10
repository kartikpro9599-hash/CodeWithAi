import React from 'react';
import { useResume } from '../context/ResumeContext';
import TemplateRenderer from '../components/templates/TemplateRenderer';

const TemplatesPage = () => {
  const { resumeData, updateSettings } = useResume();

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#1e293b', '#0f172a'];
  const fonts = ['Inter', 'Roboto', 'Outfit', 'Merriweather', 'Lora'];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-white mb-8">Choose Your Style</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Layout</h2>
            <div className="space-y-2">
              {['modern', 'minimal', 'executive'].map(temp => (
                <button
                  key={temp}
                  onClick={() => updateSettings('template', temp)}
                  className={`w-full text-left px-4 py-3 rounded-lg capitalize font-medium transition-colors ${
                    resumeData.settings.template === temp
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {temp.charAt(0).toUpperCase() + temp.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Accent Color</h2>
            <div className="flex flex-wrap gap-3">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => updateSettings('color', color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    resumeData.settings.color === color ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Typography</h2>
            <div className="space-y-2">
              {fonts.map(font => (
                <button
                  key={font}
                  onClick={() => updateSettings('font', font)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                    resumeData.settings.font === font
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  style={{ fontFamily: font }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview — fixed scale to prevent clipping */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex justify-center items-start py-8" style={{ minHeight: '500px' }}>
          <div style={{ width: '794px', transformOrigin: 'top center', transform: 'scale(0.72)', marginBottom: '-220px' }}>
            <TemplateRenderer data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
