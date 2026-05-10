import React, { useRef, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import TemplateRenderer from '../components/templates/TemplateRenderer';
import AdSlot from '../components/AdSlot';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { Download, Loader2, CheckCircle } from 'lucide-react';

const ExportPage = () => {
  const { resumeData } = useResume();
  const resumeRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);
    setExportSuccess(false);

    try {
      const element = resumeRef.current;

      // 1. Capture the resume element as a canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');

      // 2. Create A4 PDF and add the image
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // 3. Build filename
      const rawName = (resumeData.personalInfo.fullName || '').trim();
      const fileName = rawName
        ? rawName.replace(/\s+/g, '_') + '_Resume.pdf'
        : 'My_Resume.pdf';

      // 4. Get raw PDF bytes and create a proper typed Blob
      const pdfArrayBuffer = pdf.output('arraybuffer');
      const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });

      // 5. Trigger download via hidden <a> tag
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      // 6. Cleanup after a delay so the browser has time to start the download
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 1000);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF export failed: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Export Your Resume</h1>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Review your final resume below. When you're ready, click the button to download a high-quality PDF.
        </p>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 mx-auto"
        >
          {isExporting ? (
            <><Loader2 size={24} className="animate-spin" /> Generating PDF...</>
          ) : exportSuccess ? (
            <><CheckCircle size={24} className="text-green-300" /> Downloaded!</>
          ) : (
            <><Download size={24} /> Download PDF</>
          )}
        </button>
      </div>

      <div className="max-w-3xl mx-auto mb-10">
        <AdSlot />
      </div>

      {/* 
        The resume preview must NOT be inside an overflow:hidden or overflow:auto container,
        otherwise html2canvas will capture a clipped version.
        We position it normally and use a visible overflow wrapper.
      */}
      <div className="flex justify-center">
        <div className="shadow-2xl">
          {/* This is what html2canvas captures — keep it unclipped */}
          <div ref={resumeRef}>
            <TemplateRenderer data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
