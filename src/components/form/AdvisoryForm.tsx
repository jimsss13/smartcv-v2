"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function AdvisoryForm() {
  const { advisory } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Advisory Roles</h2>
      {(advisory || []).map((role, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Organization" value={role.organization || ""} onChange={(e) => updateField(`advisory.${i}.organization`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Position (e.g., Technical Advisor)" value={role.position || ""} onChange={(e) => updateField(`advisory.${i}.position`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("advisory", { organization: "", position: "" })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Advisory Role
      </button>
    </section>
  )
}