import { Resume } from "@/types/resume";

interface EducationProps {
  education: Resume["education"];
}

export function Education({ education }: EducationProps) {
  if (!education?.length) return null;
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Education
      </h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="font-semibold">{edu.institution}</h3>
              <p className="italic text-sm">
                {edu.studyType} in {edu.area}
              </p>
            </div>
            <div className="text-sm text-gray-700 text-right">
              <p>{edu.endDate}</p>
              <p>{edu.location}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}