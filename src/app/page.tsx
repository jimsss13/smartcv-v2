import sampleResume from "@/data/sampleResume.json";
import {
  Awards,
  Certificates,
  Education,
  Experience,
  Header,
  Interests,
  Projects,
  Publications,
  References,
  Skills,
  Volunteer,
} from "@/components/resume";

export default function Page() {
  const resume = sampleResume;

  return (
    <main className="bg-gray-100 flex flex-col items-center py-10 print:bg-white">
      <div
        className="bg-white text-gray-900 p-10 leading-relaxed shadow-md
                   w-[210mm] min-h-[297mm] mb-8 print:shadow-none print:mb-0
                   flex flex-col justify-start"
      >
        <Header basics={resume.basics} />
        <Experience work={resume.work} />
        <Education education={resume.education} />
        <Skills skills={resume.skills} />
      </div>

      <div
        className="bg-white text-gray-900 p-10 leading-relaxed shadow-md
                   w-[210mm] min-h-[297mm] print:shadow-none
                   flex flex-col justify-start print:break-before-page"
      >
        <Projects projects={resume.projects} />
        <Awards awards={resume.awards} />
        <Certificates certificates={resume.certificates} />
        <Volunteer volunteer={resume.volunteer} />
        <Publications publications={resume.publications} />
        <Interests interests={resume.interests} />
        <References references={resume.references} />
      </div>
    </main>
  );
}