"use client";

import { useState, useEffect } from "react";
import { Resume } from "@/types/resume"; // <-- Our new MASTER blueprint
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview"; // "Classic" preview
import { ResumePreviewTraditional } from "@/components/traditional/ResumePreviewTraditional"; // "Traditional" preview
import DesignPanel from "@/components/DesignPanel";

// New blank state matching our MASTER blueprint
const blankResume: Resume = {
  basics: {
    name: "", label: "", image: "", email: "", phone: "", url: "", summary: "",
    location: { address: "", postalCode: "", city: "", region: "", countryCode: "" },
    profiles: [],
    nationality: "",
  },
  work: [],
  education: [],
  certificates: [],
  publications: [],
  skills: [],
  awards: [],
  languages: [],
  interests: [],
  projects: [],
  references: [],
  volunteer: [],
  advisory: [],
};

const LOCAL_STORAGE_KEY = 'dynamicResumeData';
const TEMPLATE_KEY = 'selectedTemplate';

export default function DynamicResumePage() {
  const [resume, setResume] = useState<Resume>(blankResume);
  const [isClient, setIsClient] = useState(false);
  const [panelView, setPanelView] = useState<'edit' | 'design'>('edit');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  // Load data and template choice
  useEffect(() => {
    setIsClient(true);
    const savedResume = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedResume) {
      try {
        const parsed = JSON.parse(savedResume);
        // Merge with blank state to ensure all new fields exist
        setResume(prev => ({ ...blankResume, ...prev, ...parsed }));
      } catch (e) { console.error("Failed to parse resume data:", e); }
    }
    const savedTemplate = localStorage.getItem(TEMPLATE_KEY);
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []); // Runs once on client mount

  // Auto-save resume data
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
    }
  }, [resume, isClient]);

  // Auto-save template choice
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
    }
  }, [selectedTemplate, isClient]);

  if (!isClient) {
    return null; // Avoid hydration mismatch
  }

  // Helper function to render the correct preview
  const renderPreview = () => {
    // We now pass the SAME resume data to both. No adapter needed!
    switch (selectedTemplate) {
      case 'classic':
        return <ResumePreview resume={resume} />;
      case 'traditional':
        return <ResumePreviewTraditional data={resume} />;
      default:
        return (
          <div className="bg-white w-[210mm] min-h-[297mm] p-10 shadow-md flex items-center justify-center text-gray-500">
            <p>Preview for "{selectedTemplate}" not yet implemented.</p>
          </div>
        );
    }
  };

  return (
    <main className="flex flex-col gap-8 p-8 bg-gray-100 min-h-screen text-black">
      <div className="flex flex-col md:flex-row gap-8 flex-grow">
        
        {/* LEFT PANEL (Form or Design) */}
        <div className="md:w-1/3 overflow-y-auto">
          <div className="flex items-center justify-center mb-4 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setPanelView('edit')}
              className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${
                panelView === 'edit' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setPanelView('design')}
              className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${
                panelView === 'design' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'
              }`}
            >
              Templates
            </button>
          </div>

          {panelView === 'edit' && (
            <ResumeForm resume={resume} setResume={setResume} />
          )}
          
          {panelView === 'design' && (
            <DesignPanel
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
            />
          )}
        </div>
        
        {/* RIGHT PANEL (Preview) */}
        <div className="md:w-2/3 flex justify-center overflow-y-auto">
          {renderPreview()}
        </div>
      </div>
    </main>
  );
}