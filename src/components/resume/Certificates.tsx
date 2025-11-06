import { Resume } from "@/types/resume";

interface CertificatesProps {
  certificates: Resume["certificates"];
}

export function Certificates({ certificates }: CertificatesProps) {
  if (!certificates?.length) return null;

  return (
    <section className="mb-8">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Certificates
      </h2>
      {certificates.map((cert, index) => (
        <div key={index} className="mb-2">
          <h3 className="font-semibold">{cert.name}</h3>
          <p className="text-sm">
            {cert.issuer} – {cert.date}
          </p>
        </div>
      ))}
    </section>
  );
}