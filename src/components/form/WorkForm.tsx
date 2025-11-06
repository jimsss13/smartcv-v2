"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function WorkForm() {
  const { work } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
      {(work || []).map((job, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Company Name" value={job.name || ""} onChange={(e) => updateField(`work.${i}.name`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Position" value={job.position || ""} onChange={(e) => updateField(`work.${i}.position`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Start Date (e.g., 2025-01)" value={job.startDate || ""} onChange={(e) => updateField(`work.${i}.startDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="End Date (e.g., Present)" value={job.endDate || ""} onChange={(e) => updateField(`work.${i}.endDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <textarea placeholder="Summary" value={job.summary || ""} onChange={(e) => updateField(`work.${i}.summary`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("work", { name: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Work Experience
      </button>
    </section>
  )
}