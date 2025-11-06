import { Resume } from '@/types/resume'; // <-- Use the new MASTER type
import { BasicsSection } from './Basics';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

interface Props {
  data: Resume; // <-- Use the new MASTER type
}

export function ResumePreviewTraditional({ data }: Props) {
  // Only render if there is at least a name
  if (!data.basics.name?.trim()) {
    return (
      <article className="trad-theme trad-container flex items-center justify-center min-h-[297mm]">
        <p className="text-gray-400">Enter data in the form to see a preview.</p>
      </article>
    )
  }

  return (
    <article className="trad-theme trad-container">
      <BasicsSection basics={data.basics} />
      <div className="flex flex-col md:flex-row">
        <Sidebar
          nationality={data.basics.nationality}
          skills={data.skills}
          languages={data.languages}
          interests={data.interests}
        />
        <MainContent
          summary={data.basics.summary}
          work={data.work}
          education={data.education}
          advisory={data.advisory}
        />
      </div>
    </article>
  );
}