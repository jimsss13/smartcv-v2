import { Resume } from "@/types/resume";

interface ReferencesProps {
  references: Resume["references"];
}

export function References({ references }: ReferencesProps) {
  if (!references?.length) return null;
  return (
    <section className="break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        References
      </h2>
      {references.map((ref, index) => (
        <div key={index} className="text-sm mb-2">
          <p className="font-semibold">{ref.name}</p>
          <p>{ref.reference}</p>
        </div>
      ))}
    </section>
  );
}