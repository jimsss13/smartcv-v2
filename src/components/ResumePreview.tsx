"use client";

import { Resume } from "@/types/resume";

interface Props {
  resume: Resume;
}

export default function ResumePreview({ resume }: Props) {
  const { basics, work, education, skills, awards, languages } = resume;

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-10 shadow-md font-serif text-black mx-auto">
      {/* HEADER */}
      <header className="mb-6 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">{basics.name}</h1>
        {basics.label && <p className="text-lg text-gray-700">{basics.label}</p>}
        <p className="text-sm text-gray-500 mt-2 font-sans">
          {[basics.email, basics.phone]
            .filter(Boolean)
            .join(" | ")}
          {basics.email || basics.phone ? " | " : ""}
          {[basics.location.city, basics.location.region, basics.location.countryCode]
            .filter(Boolean)
            .join(", ")}
        </p>
      </header>

      {/* SUMMARY */}
      {basics.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">
            Profile
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {basics.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {work.length > 0 && work.some((w) => w.name) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">
            Experience
          </h2>
          {work.map(
            (job, idx) =>
              job.name && (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold">{job.name}</p>
                    {job.startDate && (
                      <p className="text-sm text-gray-500">{job.startDate}</p>
                    )}
                  </div>
                  {job.name && (
                    <p className="text-sm text-gray-600 italic">{job.position}</p>
                  )}
                  {job.summary && (
                    <p className="text-sm text-gray-700 mt-1 leading-snug break-words whitespace-pre-wrap">
                      {job.summary}
                    </p>
                  )}
                  {/* Highlights as bullet points */}
                  {job.highlights && job.highlights.filter(Boolean).length > 0 && (
                    <ul className="list-disc ml-5 mt-1 text-sm break-words whitespace-pre-wrap">
                      {job.highlights.filter(Boolean).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && education.some((e) => e.institution) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">
            Education
          </h2>
          {education.map(
            (edu, idx) =>
              edu.institution && (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  <p className="text-sm italic text-gray-700">
                    {edu.studyType} {edu.area && `• ${edu.area}`}
                  </p>
                </div>
              )
          )}
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && skills.some((s) => s.name) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {skills
              .filter((s) => s.name)
              .map((s, i) => (
                <li
                  key={i}
                  className="px-2 py-1 bg-gray-100 rounded border text-gray-700"
                >
                  {s.name}
                </li>
              ))}
          </ul>
        </section>
      )}

      {/* LANGUAGES */}
      {languages.length > 0 && languages.some((l) => l.language) && (
        <section>
          <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">
            Languages
          </h2>
          <ul className="text-sm">
            {languages
              .filter((l) => l.language)
              .map((l, i) => (
                <li key={i}>
                  {l.language} — <span className="italic">{l.fluency}</span>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
