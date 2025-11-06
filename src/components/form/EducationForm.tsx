"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

interface Props {
  selectedTemplate: string;
}

export function EducationForm({ selectedTemplate }: Props) {
  const { education } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      {(education || []).map((edu, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Institution" value={edu.institution || ""} onChange={(e) => updateField(`education.${i}.institution`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Degree (e.g., Bachelor of Science)" value={edu.studyType || ""} onChange={(e) => updateField(`education.${i}.studyType`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Area (e.g., Information Technology)" value={edu.area || ""} onChange={(e) => updateField(`education.${i}.area`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Start Date (e.g., 2021-09)" value={edu.startDate || ""} onChange={(e) => updateField(`education.${i}.startDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="End Date (e.g., 2025-07)" value={edu.endDate || ""} onChange={(e) => updateField(`education.${i}.endDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Location (e.g., Hendersonville, USA)" value={edu.location || ""} onChange={(e) => updateField(`education.${i}.location`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          
          {selectedTemplate === 'traditional' && (
            <input 
              placeholder="Score (e.g., GPA: 4.0)" 
              value={edu.score || ""} 
              onChange={(e) => updateField(`education.${i}.score`, e.target.value)} 
              className="border p-2 rounded w-full mb-2"
            />
          )}
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("education", { institution: "", url: "", area: "", studyType: "", startDate: "", endDate: "", location: "", score: "" })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Education
      </button>
    </section>
  )
}