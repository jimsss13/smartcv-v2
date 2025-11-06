"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function PublicationsForm() {
  const { publications } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Publications</h2>
      {(publications || []).map((pub, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Publication Name" value={pub.name || ""} onChange={(e) => updateField(`publications.${i}.name`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Publisher" value={pub.publisher || ""} onChange={(e) => updateField(`publications.${i}.publisher`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Release Date" value={pub.releaseDate || ""} onChange={(e) => updateField(`publications.${i}.releaseDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="URL" value={pub.url || ""} onChange={(e) => updateField(`publications.${i}.url`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <textarea placeholder="Summary" value={pub.summary || ""} onChange={(e) => updateField(`publications.${i}.summary`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("publications", { name: "", publisher: "", releaseDate: "", url: "", summary: "" })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Publication
      </button>
    </section>
  )
}