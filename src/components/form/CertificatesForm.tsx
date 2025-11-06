"use client";
import { PlusCircle } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

export function CertificatesForm() {
  const { certificates } = useResumeStore((state) => state.resume);
  const { updateField, addSection } = useResumeStore();

  return (
    <section>
      {(certificates || []).map((cert, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input placeholder="Certificate Name" value={cert.name || ""} onChange={(e) => updateField(`certificates.${i}.name`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Issuer" value={cert.issuer || ""} onChange={(e) => updateField(`certificates.${i}.issuer`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="Date (e.g., 2024-01)" value={cert.date || ""} onChange={(e) => updateField(`certificates.${i}.date`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <input placeholder="URL" value={cert.url || ""} onChange={(e) => updateField(`certificates.${i}.url`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addSection("certificates", { name: "", issuer: "", date: "", url: "" })} 
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <PlusCircle className="w-5 h-5" /> Add Certificate
      </button>
    </section>
  )
}