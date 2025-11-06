"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function ProjectsForm() {
  const { projects } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      {(projects || []).map((project, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Project Name" value={project.name || ""} onChange={(e) => updateField(`projects.${i}.name`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="URL" value={project.url || ""} onChange={(e) => updateField(`projects.${i}.url`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <textarea placeholder="Description" value={project.description || ""} onChange={(e) => updateField(`projects.${i}.description`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("projects", { name: "", description: "", url: "", startDate: "", endDate: "", highlights: [] })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Project
      </button>
    </section>
  )
}