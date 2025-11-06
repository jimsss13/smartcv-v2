"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function InterestsForm() {
  const { interests } = useResumeStore((state) => state.resume);
  const { updateField, updateStringArray, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Interests</h2>
      {(interests || []).map((interest, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Category (e.g., Hobbies)" value={interest.name || ""} onChange={(e) => updateField(`interests.${i}.name`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input 
            placeholder="Keywords (comma separated)" 
            value={interest.keywords?.join(', ') || ""} 
            onChange={(e) => updateStringArray(`interests.${i}.keywords`, e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("interests", { name: "", keywords: [] })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Interest
      </button>
    </section>
  )
}