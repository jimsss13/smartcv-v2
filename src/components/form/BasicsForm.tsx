"use client";
import { useResumeStore } from "@/stores/resumeStore";

interface Props {
  selectedTemplate: string;
}

export function BasicsForm({ selectedTemplate }: Props) {
  const basics = useResumeStore((state) => state.resume.basics);
  const updateField = useResumeStore((state) => state.updateField);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input placeholder="Full Name" value={basics.name} onChange={(e) => updateField("basics.name", e.target.value)} className="border p-2 rounded bg-gray-50"/>
        <input placeholder="Job Title / Label" value={basics.label} onChange={(e) => updateField("basics.label", e.target.value)} className="border p-2 rounded bg-gray-50"/>
        <input placeholder="Email" value={basics.email} onChange={(e) => updateField("basics.email", e.target.value)} className="border p-2 rounded bg-gray-50"/>
        <input placeholder="Phone" value={basics.phone} onChange={(e) => updateField("basics.phone", e.target.value)} className="border p-2 rounded bg-gray-50"/>
        <input placeholder="Website / LinkedIn" value={basics.url} onChange={(e) => updateField("basics.url", e.target.value)} className="border p-2 rounded bg-gray-50 col-span-2"/>
        
        {selectedTemplate === 'traditional' && (
          <input 
            placeholder="Address" 
            value={basics.location?.address || ''} 
            onChange={(e) => updateField("basics.location.address", e.target.value)} 
            className="border p-2 rounded bg-gray-50 col-span-2"
          />
        )}
        <input placeholder="City" value={basics.location.city} onChange={(e) => updateField("basics.location.city", e.target.value)} className="border p-2 rounded bg-gray-50"/>
        <input placeholder="Region" value={basics.location.region} onChange={(e) => updateField("basics.location.region", e.target.value)} className="border p-2 rounded bg-gray-50"/>
        
        {selectedTemplate === 'traditional' && (
          <input 
            placeholder="Postal Code" 
            value={basics.location?.postalCode || ''} 
            onChange={(e) => updateField("basics.location.postalCode", e.target.value)} 
            className="border p-2 rounded bg-gray-50"
          />
        )}
        <input placeholder="Country" value={basics.location.countryCode} onChange={(e) => updateField("basics.location.countryCode", e.target.value)} className="border p-2 rounded bg-gray-50"/>
        
        {selectedTemplate === 'traditional' && (
          <input 
            placeholder="Nationality" 
            value={basics.nationality || ''} 
            onChange={(e) => updateField("basics.nationality", e.target.value)} 
            className="border p-2 rounded bg-gray-50"
          />
        )}
      </div>
      <textarea placeholder="Profile Summary" value={basics.summary} onChange={(e) => updateField("basics.summary", e.target.value)} className="w-full border p-2 rounded bg-gray-50"/>
    </section>
  )
}