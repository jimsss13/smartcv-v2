"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function LanguagesForm() {
  const { languages } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      {(languages || []).map((lang, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Language (e.g., English)" value={lang.language || ""} onChange={(e) => updateField(`languages.${i}.language`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Fluency (e.g., Native)" value={lang.fluency || ""} onChange={(e) => updateField(`languages.${i}.fluency`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("languages", { language: "", fluency: "" })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Language
      </button>
    </section>
  )
}