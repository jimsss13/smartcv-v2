import { Resume } from "@/types/resume";

interface ProjectsProps {
  projects: Resume["projects"];
}

export function Projects({ projects }: ProjectsProps) {
  if (!projects?.length) return null;
  return (
    <section className="mb-8">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Projects
      </h2>
      {projects.map((proj, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold">{proj.name}</h3>
          <p className="text-sm">{proj.description}</p>
          {proj.url && (
            <a
              href={proj.url}
              target="_blank"
              className="text-blue-600 text-sm underline"
            >
              {proj.url}
            </a>
          )}
        </div>
      ))}
    </section>
  );
}