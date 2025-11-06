import { Resume } from "@/types/resume";

interface AwardsProps {
  awards: Resume["awards"];
}

export function Awards({ awards }: AwardsProps) {
  if (!awards?.length) return null;
  return (
    <section className="mb-8">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Awards
      </h2>
      {awards.map((award, index) => (
        <div key={index} className="mb-2">
          <h3 className="font-semibold">{award.title}</h3>
          <p className="text-sm">
            {award.awarder} – {award.date}
          </p>
          {award.summary && <p className="text-sm mt-1">{award.summary}</p>}
        </div>
      ))}
    </section>
  );
}