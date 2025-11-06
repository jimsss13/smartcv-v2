"use client";

import { Resume } from "@/types/resume";
import { PlusCircle } from "lucide-react";

interface Props {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

export default function ResumeForm({ resume, setResume }: Props) {
  // Safe nested path setter
  const handleChange = (path: string, value: string) => {
    const keys = path.split(".");
    setResume((prev) => {
      const updated: any = JSON.parse(JSON.stringify(prev));
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        // Ensure path exists
        if (current[key] === undefined || current[key] === null) {
          current[key] = isNaN(Number(keys[i + 1])) ? {} : [];
        }
        current = current[key];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // Add new section (e.g., new work, education, etc.)
  const addSection = (section: keyof Resume, template: any) => {
    setResume((prev) => {
      const oldSection = prev[section] as any[] | undefined;
      return {
        ...prev,
        [section]: [...(oldSection || []), template],
      };
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md space-y-10">
      {/* BASICS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input placeholder="Full Name" value={resume.basics.name} onChange={(e) => handleChange("basics.name", e.target.value)} className="border p-2 rounded bg-gray-50"/>
          <input placeholder="Job Title / Label" value={resume.basics.label} onChange={(e) => handleChange("basics.label", e.target.value)} className="border p-2 rounded bg-gray-50"/>
          <input placeholder="Email" value={resume.basics.email} onChange={(e) => handleChange("basics.email", e.target.value)} className="border p-2 rounded bg-gray-50"/>
          <input placeholder="Phone" value={resume.basics.phone} onChange={(e) => handleChange("basics.phone", e.target.value)} className="border p-2 rounded bg-gray-50"/>
          <input placeholder="Website / LinkedIn" value={resume.basics.url} onChange={(e) => handleChange("basics.url", e.target.value)} className="border p-2 rounded bg-gray-50 col-span-2"/>
          <input placeholder="Address" value={resume.basics.location?.address || ''} onChange={(e) => handleChange("basics.location.address", e.target.value)} className="border p-2 rounded bg-gray-50 col-span-2"/>
          <input placeholder="City" value={resume.basics.location.city} onChange={(e) => handleChange("basics.location.city", e.target.value)} className="border p-2 rounded bg-gray-50"/>
          <input placeholder="Region" value={resume.basics.location.region} onChange={(e) => handleChange("basics.location.region", e.target.value)} className="border p-2 rounded bg-gray-50"/>
          <input placeholder="Country" value={resume.basics.location.countryCode} onChange={(e) => handleChange("basics.location.countryCode", e.target.value)} className="border p-2 rounded bg-gray-50"/>
          <input placeholder="Nationality" value={resume.basics.nationality || ''} onChange={(e) => handleChange("basics.nationality", e.target.value)} className="border p-2 rounded bg-gray-50"/>
        </div>
        <textarea placeholder="Profile Summary" value={resume.basics.summary} onChange={(e) => handleChange("basics.summary", e.target.value)} className="w-full border p-2 rounded bg-gray-50"/>
      </section>

      {/* WORK EXPERIENCE */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
        {(resume.work || []).map((job, i) => (
          <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <input placeholder="Company Name" value={job.name || ""} onChange={(e) => handleChange(`work.${i}.name`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="Position" value={job.position || ""} onChange={(e) => handleChange(`work.${i}.position`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="Start Date (e.g., 2025-01)" value={job.startDate || ""} onChange={(e) => handleChange(`work.${i}.startDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="End Date (e.g., Present)" value={job.endDate || ""} onChange={(e) => handleChange(`work.${i}.endDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <textarea placeholder="Summary" value={job.summary || ""} onChange={(e) => handleChange(`work.${i}.summary`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            {/* You can add a sub-form for highlights here */}
          </div>
        ))}
        <button type="button" onClick={() => addSection("work", { name: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] })} className="flex items-center gap-2 text-blue-600 hover:underline">
          <PlusCircle className="w-5 h-5" /> Add Work Experience
        </button>
      </section>

      {/* EDUCATION */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        {(resume.education || []).map((edu, i) => (
          <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <input placeholder="Institution" value={edu.institution || ""} onChange={(e) => handleChange(`education.${i}.institution`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="Degree (e.g., Bachelor of Science)" value={edu.studyType || ""} onChange={(e) => handleChange(`education.${i}.studyType`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="Area (e.g., Information Technology)" value={edu.area || ""} onChange={(e) => handleChange(`education.${i}.area`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="Start Date (e.g., 2021-09)" value={edu.startDate || ""} onChange={(e) => handleChange(`education.${i}.startDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="End Date (e.g., 2025-07)" value={edu.endDate || ""} onChange={(e) => handleChange(`education.${i}.endDate`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="Location (e.g., Hendersonville, USA)" value={edu.location || ""} onChange={(e) => handleChange(`education.${i}.location`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="Score (e.g., GPA: 4.0)" value={edu.score || ""} onChange={(e) => handleChange(`education.${i}.score`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          </div>
        ))}
        <button type="button" onClick={() => addSection("education", { institution: "", url: "", area: "", studyType: "", startDate: "", endDate: "", location: "", score: "" })} className="flex items-center gap-2 text-blue-600 hover:underline">
          <PlusCircle className="w-5 h-5" /> Add Education
        </button>
      </section>

      {/* ADVISORY ROLES (NEW) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Advisory Roles</h2>
        {(resume.advisory || []).map((role, i) => (
          <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <input placeholder="Organization" value={role.organization || ""} onChange={(e) => handleChange(`advisory.${i}.organization`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <input placeholder="Position (e.g., Technical Advisor)" value={role.position || ""} onChange={(e) => handleChange(`advisory.${i}.position`, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          </div>
        ))}
        <button type="button" onClick={() => addSection("advisory", { organization: "", position: "" })} className="flex items-center gap-2 text-blue-600 hover:underline">
          <PlusCircle className="w-5 h-5" /> Add Advisory Role
        </button>
      </section>
    </div>
  );
}