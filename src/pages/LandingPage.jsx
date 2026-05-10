import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Download, ChevronRight } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const LandingPage = () => {
  return (
    <div className="min-h-screen pt-10 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide">
            100% Free • No Sign Up Required • Client-Side Only
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Winning Resume</span><br />
            in Minutes.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Create professional, ATS-friendly resumes with our smart builder. Check your score, choose premium templates, and export to PDF instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group">
              Create Resume Free <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/ats" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-lg transition-all border border-slate-700 flex items-center justify-center gap-2">
              <CheckCircle size={20} className="text-green-400" /> Check ATS Score
            </Link>
          </div>
        </div>

        {/* Ad Slot */}
        <div className="max-w-3xl mx-auto mb-20">
          <AdSlot />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-left">
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 border border-blue-500/20">
              <FileText size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Builder</h3>
            <p className="text-slate-400">Our intelligent AI-like rules engine suggests strong action verbs and professional phrases. Live preview as you type.</p>
          </div>
          
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 border border-green-500/20">
              <CheckCircle size={24} className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">ATS Checker</h3>
            <p className="text-slate-400">Get an instant score out of 100. We analyze keywords, formatting, and content strength to ensure you pass the bots.</p>
          </div>
          
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 border border-purple-500/20">
              <Download size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">One-Click PDF</h3>
            <p className="text-slate-400">Choose from Modern, Minimal, and Executive templates. Customize colors and export to PDF flawlessly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
