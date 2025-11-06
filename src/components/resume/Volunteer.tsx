import { Resume } from "@/types/resume";

interface VolunteerProps {
  volunteer: Resume["volunteer"];
}

export function Volunteer({ volunteer }: VolunteerProps) {
  if (!volunteer?.length) return null;
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Volunteer
      </h2>
      {volunteer.map((vol, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold">{vol.organization}</h3>
          <p className="text-sm italic">{vol.position}</p>
          <p className="text-sm">
            {vol.startDate} – {vol.endDate}
          </p>
        </div>
      ))}
    </section>
  );
}