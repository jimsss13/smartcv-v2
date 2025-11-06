/*
  This is the new "blueprint" for the "Traditional" template.
  We use '...Traditional' in the names to keep it separate
  from your original 'resume.ts' file.
*/
export interface ResumeTraditional {
  basics: BasicsTraditional;
  work: WorkTraditional[];
  education: EducationTraditional[];
  skills: SkillTraditional[];
  languages: LanguageTraditional[];
  interests: InterestTraditional[];
  advisory: AdvisoryTraditional[];
  // We can add these later if the template needs them
  // certificates?: any[];
  // publications?: any[];
  // awards?: any[];
  // projects?: any[];
  // references?: any[];
}

export interface BasicsTraditional {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string; // For the LinkedIn/website URL
  summary: string;
  location: LocationTraditional;
  nationality: string;
}

export interface LocationTraditional {
  address: string;
  postalCode: string;
  city: string;
  region: string;
  countryCode: string;
}

export interface WorkTraditional {
  name: string; // Company Name
  position: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface EducationTraditional {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface SkillTraditional {
  name: string;
  level: string; // "Beginner", "Intermediate", "Advanced", "Expert"
}

export interface LanguageTraditional {
  language: string;
  fluency: string; // "Beginner", "Intermediate", "Advanced", "Native"
}

export interface InterestTraditional {
  name: string; // The category (e.g., "Hobbies")
  keywords: string[]; // The list of items
}

export interface AdvisoryTraditional {
  organization: string;
  position: string;
}