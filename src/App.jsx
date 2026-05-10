import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import ATSCheckerPage from './pages/ATSCheckerPage';
import TemplatesPage from './pages/TemplatesPage';
import ExportPage from './pages/ExportPage';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans selection:bg-blue-500/30">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/ats" element={<ATSCheckerPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/export" element={<ExportPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;
