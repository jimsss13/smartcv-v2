import { Resume } from "@/types/resume";

interface SkillsProps {
  skills: Resume["skills"];
}

export function Skills({ skills }: SkillsProps) {
  if (!skills?.length) return null;
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Skills
      </h2>
      <ul className="text-sm space-y-1">
        {skills.map((skill, index) => (
          <li key={index}>
            <span className="font-semibold">{skill.name}:</span>{" "}
            {skill.keywords?.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}