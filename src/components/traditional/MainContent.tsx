import { Work, Education, Advisory } from '@/types/resume';

interface Props {
  summary: string;
  work: Work[];
  education: Education[];
  advisory?: Advisory[];
}

// Reusable Section Title
function MainTitle({ title }: { title: string }) {
  return (
    <h3 className="text-2xl font-bold text-[var(--trad-primary-color)] mb-3">
      {title}
    </h3>
  );
}

export function MainContent({ summary, work, education, advisory }: Props) {
  // Helper to check if an array has actual content
  const hasItems = (arr: any[] | undefined) => Array.isArray(arr) && arr.length > 0;

  return (
    <main className="w-full md:w-2/3 p-6">
      
      {/* --- FIX: Only show Profile Summary if it exists --- */}
      {summary && (
        <section className="mb-6">
          <MainTitle title="Profile Summary" />
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      {/* --- FIX: Only show Employment History if the array has items --- */}
      {hasItems(work) && (
        <section className="mb-6">
          <MainTitle title="Employment History" />
          <div className="space-y-4">
            {work.map((job, i) => (
              <div key={i}>
                <h4 className="text-lg font-bold">{job.position}</h4>
                <p className="text-sm font-semibold">{job.name}</p>
                <p className="text-xs text-[var(--trad-text-subtle)] mb-1">
                  {job.startDate} - {job.endDate || 'Present'}
                </p>
                <p className="text-sm mb-2">{job.summary}</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {(job.highlights || []).map((hl, j) => (
                    <li key={j}>{hl}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- FIX: Only show Education if the array has items --- */}
      {hasItems(education) && (
        <section className="mb-6">
          <MainTitle title="Education" />
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i}>
                <h4 className="text-lg font-bold">{edu.studyType}</h4>
                <p className="text-sm font-semibold">{edu.institution} {edu.location && `, ${edu.location}`}</p>
                <p className="text-xs text-[var(--trad-text-subtle)]">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- FIX: Only show Advisory Roles if the array has items --- */}
      {hasItems(advisory) && (
        <section>
          <MainTitle title="Advisory Roles" />
          <div className="space-y-2">
            {advisory.map((role, i) => (
              <div key={i}>
                <h4 className="text-lg font-bold">{role.organization}</h4>
                <p className="text-sm font-semibold">{role.position}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}