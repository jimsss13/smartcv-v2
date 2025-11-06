import { Resume } from "@/types/resume";

interface InterestsProps {
  interests: Resume["interests"];
}

export function Interests({ interests }: InterestsProps) {
  if (!interests?.length) return null;
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Interests
      </h2>
      <ul className="text-sm">
        {interests.map((interest, i) => (
          <li key={i}>
            <span className="font-semibold">{interest.name}:</span>{" "}
            {interest.keywords?.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}