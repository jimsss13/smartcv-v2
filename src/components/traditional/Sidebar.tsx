import { Skill, Language, Interest } from '@/types/resume';

interface Props {
  nationality?: string;
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
}

// Helper component for the dot-based skill level
function SkillDots({ level }: { level: string }) {
  const levelMap: { [key: string]: number } = {
    beginner: 2,
    intermediate: 3,
    advanced: 4,
    expert: 5,
  };
  const filledDots = levelMap[level?.toLowerCase()] || 0;
  return (
    <div className="flex gap-1.5 mt-1">
      {Array(5).fill(0).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-1/5 rounded-sm border border-gray-400 ${
            i < filledDots ? 'bg-[var(--trad-primary-color)] border-[var(--trad-primary-color)]' : 'bg-[var(--trad-dot-empty)]'
          }`}
        />
      ))}
    </div>
  );
}

// Reusable Section Title for the sidebar
function SidebarTitle({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-bold text-[var(--trad-primary-color)] border-b-2 border-[var(--trad-primary-color)] pb-1 mb-3">
      {title}
    </h3>
  );
}

export function Sidebar({ nationality, skills, languages, interests }: Props) {
  // Helper to check if an array has actual content
  const hasItems = (arr: any[] | undefined) => Array.isArray(arr) && arr.length > 0;

  return (
    <aside className="w-full md:w-1/3 p-6 space-y-6">
      
      {/* --- FIX: Only show Nationality if it exists --- */}
      {nationality && (
        <section>
          <SidebarTitle title="Nationality" />
          <p className="text-sm">{nationality}</p>
        </section>
      )}

      {/* --- FIX: Only show Skills if the array has items --- */}
      {hasItems(skills) && (
        <section>
          <SidebarTitle title="Skills" />
          <div className="space-y-3">
            {skills.map((skill, i) => (
              <div key={i}>
                <p className="text-sm font-semibold">{skill.name}</p>
                <SkillDots level={skill.level} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- FIX: Only show Language if the array has items --- */}
      {hasItems(languages) && (
        <section>
          <SidebarTitle title="Language" />
          <div className="space-y-3">
            {languages.map((lang, i) => (
              <div key={i}>
                <p className="text-sm font-semibold">{lang.language}</p>
                <SkillDots level={lang.fluency} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- FIX: Only show Hobbies if the array has items --- */}
      {hasItems(interests) && (
        <section>
          <SidebarTitle title="Hobbies" />
          {interests.map((interest, i) => (
            <ul key={i} className="list-disc list-inside space-y-1 text-sm">
              {(interest.keywords || []).map((keyword, j) => (
                <li key={j}>{keyword}</li>
              ))}
            </ul>
          ))}
        </section>
      )}
    </aside>
  );
}