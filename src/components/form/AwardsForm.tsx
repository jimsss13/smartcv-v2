"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function AwardsForm() {
  const { awards } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Awards</h2>
      {(awards || []).map((award, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Award Title" value={award.title || ""} onChange={(e) => updateField(`awards.${i}.title`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Awarder (e.g., Company)" value={award.awarder || ""} onChange={(e) => updateField(`awards.${i}.awarder`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Date (e.g., 2024-10-01)" value={award.date || ""} onChange={(e) => updateField(`awards.${i}.date`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <textarea placeholder="Summary" value={award.summary || ""} onChange={(e) => updateField(`awards.${i}.summary`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("awards", { title: "", awarder: "", date: "", summary: "" })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Award
      </button>
    </section>
  )
}