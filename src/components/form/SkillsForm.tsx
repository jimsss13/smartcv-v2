"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function SkillsForm() {
  const { skills } = useResumeStore((state) => state.resume);
  const { updateField, updateStringArray, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      {(skills || []).map((skill, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Skill Name (e.g., Web Development)" value={skill.name || ""} onChange={(e) => updateField(`skills.${i}.name`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Level (e.g., Expert)" value={skill.level || ""} onChange={(e) => updateField(`skills.${i}.level`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input 
            placeholder="Keywords (comma separated)" 
            value={skill.keywords?.join(', ') || ""} 
            onChange={(e) => updateStringArray(`skills.${i}.keywords`, e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("skills", { name: "", level: "", keywords: [] })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Skill
      </button>
    </section>
  )
}