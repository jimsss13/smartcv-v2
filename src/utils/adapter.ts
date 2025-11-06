import { Resume } from "@/types/resume";
import { ResumeTraditional } from "@/types/resumeTraditional";

/**
 * Translates data from the original 'Resume' (form) structure
 * to the new 'ResumeTraditional' structure.
 */
export function adaptClassicToTraditional(data: Resume): ResumeTraditional {
  
  // Helper to get the first skill level or default
  const getSkillLevel = (skillName: string): string => {
    const skill = data.skills.find(s => s.name === skillName);
    return skill?.level || 'Intermediate'; // Default to Intermediate
  };

  // Helper to get the first language fluency or default
  const getLangFluency = (langName: string): string => {
    const lang = data.languages.find(l => l.language === langName);
    return lang?.fluency || 'Intermediate'; // Default to Intermediate
  };

  return {
    basics: {
      name: data.basics.name,
      label: data.basics.label,
      image: data.basics.image,
      email: data.basics.email,
      phone: data.basics.phone,
      url: data.basics.profiles?.[0]?.url || data.basics.url, // Use profile URL if exists
      summary: data.basics.summary,
      location: {
        address: "", // Your form doesn't have this, so we use a default
        postalCode: "", // Your form doesn't have this
        city: data.basics.location.city,
        region: data.basics.location.region,
        countryCode: data.basics.location.countryCode,
      },
      profiles: data.basics.profiles || [],
      nationality: "", // Your form doesn't have this
    },
    work: (data.work || []).map(job => ({
      name: job.name,
      position: job.position,
      startDate: job.startDate,
      endDate: job.endDate || 'Present',
      summary: job.summary,
      highlights: job.highlights.filter(h => h), // Filter out empty strings
    })),
    education: (data.education || []).map(edu => ({
      institution: edu.institution,
      area: edu.area,
      studyType: edu.studyType,
      startDate: edu.startDate,
      endDate: edu.endDate,
      location: "", // Your form doesn't have this
    })),
    skills: (data.skills || []).map(skill => ({
      name: skill.name,
      level: skill.level,
    })),
    languages: (data.languages || []).map(lang => ({
      language: lang.language,
      fluency: lang.fluency,
    })),
    interests: (data.interests || []).map(interest => ({
      name: interest.name,
      keywords: interest.keywords.filter(k => k), // Filter out empty strings
    })),
    advisory: [], // No equivalent in your original form
    // Add other sections as empty arrays
    certificates: [],
    publications: [],
    awards: [],
    projects: [],
    references: [],
  };
}