"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function VolunteerForm() {
  const { volunteer } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      {(volunteer || []).map((vol, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input 
            placeholder="Organization" 
            value={vol.organization || ""} 
            onChange={(e) => updateField(`volunteer.${i}.organization`, e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
          <input 
            placeholder="Position" 
            value={vol.position || ""} 
            onChange={(e) => updateField(`volunteer.${i}.position`, e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
          <input 
            placeholder="Start Date" 
            value={vol.startDate || ""} 
            onChange={(e) => updateField(`volunteer.${i}.startDate`, e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
          <input 
            placeholder="End Date" 
            value={vol.endDate || ""} 
            onChange={(e) => updateField(`volunteer.${i}.endDate`, e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("volunteer", { organization: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Volunteer
      </button>
    </section>
  )
}