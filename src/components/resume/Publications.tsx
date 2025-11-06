import { Resume } from "@/types/resume";

interface PublicationsProps {
  publications: Resume["publications"];
}

export function Publications({ publications }: PublicationsProps) {
  if (!publications?.length) return null;
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Publications
      </h2>
      {publications.map((pub, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold">{pub.name}</h3>
          <p className="text-sm">
            <span className="italic">{pub.publisher}</span>, {pub.releaseDate}
          </p>
          {pub.url && (
            <a
              href={pub.url}
              target="_blank"
              className="text-blue-600 text-sm underline"
            >
              {pub.url}
            </a>
          )}
        </div>
      ))}
    </section>
  );
}