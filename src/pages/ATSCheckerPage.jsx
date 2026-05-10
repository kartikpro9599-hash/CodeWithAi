import React, { useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { calculateATSScore } from '../utils/atsScoring';
import AdSlot from '../components/AdSlot';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ATSCheckerPage = () => {
  const { resumeData } = useResume();
  const atsResult = useMemo(() => calculateATSScore(resumeData), [resumeData]);

  const { score, breakdown, feedback, warnings, missingKeywords } = atsResult;

  const getScoreColor = (s) => {
    if (s >= 80) return 'text-green-400';
    if (s >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">ATS Compatibility Score</h1>
      
      <div className="glass-card p-8 mb-8 text-center flex flex-col items-center justify-center">
        <div className={`text-7xl font-extrabold mb-2 ${getScoreColor(score)}`}>
          {score}<span className="text-4xl text-slate-500">/100</span>
        </div>
        <p className="text-slate-400 font-medium">Target Role: <span className="text-white">{resumeData.settings.role}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Score Breakdown</h2>
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">Contact Info</span>
              <span className="font-bold text-white">{breakdown.contact} / 20</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">Summary Strength</span>
              <span className="font-bold text-white">{breakdown.summary} / 20</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">Skills Match</span>
              <span className="font-bold text-white">{breakdown.skills} / 20</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">Experience Action Verbs</span>
              <span className="font-bold text-white">{breakdown.experience} / 20</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">Education & Certs</span>
              <span className="font-bold text-white">{breakdown.education} / 10</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">Formatting Base</span>
              <span className="font-bold text-white">{breakdown.formatting} / 10</span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Missing Keywords</h2>
          {missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, i) => (
                <span key={i} className="px-2 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded text-xs font-medium">
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle size={16} /> Great job! You have all the core keywords.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-10">
        {feedback.length > 0 && (
          <div className="glass-card p-6 bg-red-500/5 border-red-500/20">
            <h2 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2"><XCircle size={20} /> Penalties</h2>
            <ul className="space-y-2">
              {feedback.map((item, i) => (
                <li key={i} className="text-sm text-slate-300">• {item.message}</li>
              ))}
            </ul>
          </div>
        )}

        {warnings.length > 0 && (
          <div className="glass-card p-6 bg-yellow-500/5 border-yellow-500/20">
            <h2 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2"><AlertCircle size={20} /> Warnings & Suggestions</h2>
            <ul className="space-y-2">
              {warnings.map((item, i) => (
                <li key={i} className="text-sm text-slate-300">• {item.message}</li>
              ))}
            </ul>
          </div>
        )}

        {score === 100 && (
          <div className="glass-card p-6 bg-green-500/5 border-green-500/20">
             <h2 className="text-lg font-bold text-green-400 flex items-center gap-2"><CheckCircle size={20} /> Perfect Score!</h2>
             <p className="text-sm text-slate-300 mt-2">Your resume is fully optimized for ATS systems in the {resumeData.settings.role} role.</p>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        <AdSlot />
      </div>
    </div>
  );
};

export default ATSCheckerPage;
