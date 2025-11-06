"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function ReferencesForm() {
  const { references } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">References</h2>
      {(references || []).map((ref, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input 
            placeholder="Reference Name" 
            value={ref.name || ""} 
            onChange={(e) => updateField(`references.${i}.name`, e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
          <textarea 
            placeholder="Reference Details (e.g., John Doe, CEO...)" 
            value={ref.reference || ""} 
            onChange={(e) => updateField(`references.${i}.reference`, e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("references", { name: "", reference: "" })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Reference
      </button>
    </section>
  )
}