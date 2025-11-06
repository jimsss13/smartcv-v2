"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

// Import all form components
import { BasicsForm } from "@/components/form/BasicsForm";
import { WorkForm } from "@/components/form/WorkForm";
import { EducationForm } from "@/components/form/EducationForm";
import { AdvisoryForm } from "@/components/form/AdvisoryForm";
import { SkillsForm } from "@/components/form/SkillsForm";
import { LanguagesForm } from "@/components/form/LanguagesForm";
import { InterestsForm } from "@/components/form/InterestsForm";
import { ProjectsForm } from "@/components/form/ProjectsForm";
import { AwardsForm } from "@/components/form/AwardsForm";
import { CertificatesForm } from "@/components/form/CertificatesForm";
import { PublicationsForm } from "@/components/form/PublicationsForm";
import { VolunteerForm } from "@/components/form/VolunteerForm";
import { ReferencesForm } from "@/components/form/ReferencesForm";

interface Props {
  selectedTemplate: string;
}

interface FormStep {
  title: string;
  component: React.ReactNode;
}

// All prop drilling is gone
export default function ResumeForm({ selectedTemplate }: Props) {
  const [step, setStep] = useState(0);

  // --- Dynamic Step Logic ---
  const sections: FormStep[] = useMemo(() => {
    const commonSections = [
      {
        title: "Personal Details",
        component: <BasicsForm selectedTemplate={selectedTemplate} />
      },
      {
        title: "Work Experience",
        component: <WorkForm />
      },
      {
        title: "Education",
        component: <EducationForm selectedTemplate={selectedTemplate} />
      },
      {
        title: "Skills",
        component: <SkillsForm />
      },
      {
        title: "Languages",
        component: <LanguagesForm />
      },
      {
        title: "Interests",
        component: <InterestsForm />
      },
    ];

    const classicSections = [
      {
        title: "Projects",
        component: <ProjectsForm />
      },
      {
        title: "Awards",
        component: <AwardsForm />
      },
      {
        title: "Certificates",
        component: <CertificatesForm />
      },
      {
        title: "Publications",
        component: <PublicationsForm />
      },
      {
        title: "Volunteer",
        component: <VolunteerForm />
      },
      {
        title: "References",
        component: <ReferencesForm />
      },
    ];

    const traditionalSections = [
      {
        title: "Advisory Roles",
        component: <AdvisoryForm />
      }
    ];

    if (selectedTemplate === 'traditional') {
      return [...commonSections, ...traditionalSections];
    }
    
    // Default to 'classic'
    return [...commonSections, ...classicSections];

  }, [selectedTemplate]); // Re-calculate steps only if template changes

  
  const ActiveComponent = sections[step].component;
  const isFirstStep = step === 0;
  const isLastStep = step === sections.length - 1;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md space-y-10">
      
      {/* Step Indicator */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{sections[step].title}</h2>
        <span className="text-sm font-medium text-gray-500">
          Step {step + 1} of {sections.length}
        </span>
      </div>

      {/* Active Form Section */}
      <div className="min-h-[300px]">
        {ActiveComponent}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={() => setStep(s => s - 1)}
          disabled={isFirstStep}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md text-gray-700 font-semibold transition-colors
                     hover:bg-gray-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep(s => s + 1)}
          disabled={isLastStep}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-white font-semibold transition-colors
                     hover:bg-blue-700
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}