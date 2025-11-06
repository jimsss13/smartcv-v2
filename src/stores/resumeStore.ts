import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Resume } from '@/types/resume';

// --- Define blank "template" objects ---
const blankWorkEntry = {
  name: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: []
};
const blankEducationEntry = {
  institution: "", url: "", area: "", studyType: "", startDate: "", endDate: "", score: "", location: ""
};
const blankCertificateEntry = { name: "", issuer: "", date: "", url: "" };
const blankPublicationEntry = { name: "", publisher: "", releaseDate: "", url: "", summary: "" };
const blankSkillEntry = { name: "", level: "", keywords: [] };
const blankAwardEntry = { title: "", date: "", awarder: "", summary: "" };
const blankLanguageEntry = { language: "", fluency: "" };
const blankInterestEntry = { name: "", keywords: [] };
const blankProjectEntry = { name: "", startDate: "", endDate: "", description: "", highlights: [], url: "" };
const blankReferenceEntry = { name: "", reference: "" };
const blankVolunteerEntry = { organization: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] };
const blankAdvisoryEntry = { organization: "", position: "" };


// Define the blank state
const blankResume: Resume = {
  basics: {
    name: "", label: "", image: "", email: "", phone: "", url: "", summary: "",
    location: { address: "", postalCode: "", city: "", region: "", countryCode: "" },
    profiles: [],
    nationality: "",
  },
  work: [blankWorkEntry],
  education: [blankEducationEntry],
  certificates: [blankCertificateEntry],
  publications: [blankPublicationEntry],
  skills: [blankSkillEntry],
  awards: [blankAwardEntry],
  languages: [blankLanguageEntry],
  interests: [blankInterestEntry],
  projects: [blankProjectEntry],
  references: [blankReferenceEntry],
  volunteer: [blankVolunteerEntry],
  advisory: [blankAdvisoryEntry],
};

const LOCAL_STORAGE_KEY = 'dynamicResumeData';

// Helper map to enforce "at-least-one" rule
const blankEntryMap: Record<keyof Resume, any> = {
  basics: {}, // Not an array
  work: blankWorkEntry,
  education: blankEducationEntry,
  certificates: blankCertificateEntry,
  publications: blankPublicationEntry,
  skills: blankSkillEntry,
  awards: blankAwardEntry,
  languages: blankLanguageEntry,
  interests: blankInterestEntry,
  projects: blankProjectEntry,
  references: blankReferenceEntry,
  volunteer: blankVolunteerEntry,
  advisory: blankAdvisoryEntry,
};

// Define the store's state and actions
interface ResumeState {
  resume: Resume;
  updateField: (path: string, value: any) => void;
  addSection: (section: keyof Resume, template: any) => void;
  updateStringArray: (path: string, value: string) => void;
}

export const useResumeStore = create(
  persist(
    immer<ResumeState>((set) => ({
      resume: blankResume,

      // --- ACTIONS (No changes here) ---

      updateField: (path: string, value: any) => {
        set((state) => {
          const keys = path.split(".");
          let current = state.resume as any;
          for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (current[key] === undefined || current[key] === null) {
              current[key] = isNaN(Number(keys[i + 1])) ? {} : [];
            }
            current = current[key];
          }
          current[keys[keys.length - 1]] = value;
        });
      },

      addSection: (section: keyof Resume, template: any) => {
        set((state) => {
          const sectionArray = state.resume[section] as any[] | undefined;
          if (Array.isArray(sectionArray)) {
            sectionArray.push(template);
          } else {
            (state.resume[section] as any) = [template];
          }
        });
      },

      updateStringArray: (path: string, value: string) => {
        const arr = value.split(',').map(s => s.trim()).filter(Boolean);
        set((state) => {
          const keys = path.split(".");
          let current = state.resume as any;
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = arr;
        });
      },
    })),
    {
      name: LOCAL_STORAGE_KEY,
      
      // --- THIS IS THE UPDATED MERGE FUNCTION ---
      merge: (persistedState, currentState) => {
        // Deep merge the persisted state onto the current (new) state
        const mergedState = {
          ...currentState,
          ...(persistedState as ResumeState),
          resume: {
            ...currentState.resume,
            ...((persistedState as ResumeState)?.resume || {}),
          },
        };

        const mergedResume = mergedState.resume;

        // --- ENFORCE "AT-LEAST-ONE" RULE ---
        // This runs *after* loading from localStorage.
        // It checks every array. If it's empty, it adds one blank entry.
        Object.keys(blankEntryMap).forEach((key) => {
          const resumeKey = key as keyof Resume;
          if (resumeKey === 'basics') return; // 'basics' is not an array

          const sectionArray = mergedResume[resumeKey] as any[] | undefined;
          if (!sectionArray || sectionArray.length === 0) {
            (mergedResume[resumeKey] as any) = [blankEntryMap[resumeKey]];
          }
        });
        
        return mergedState;
      }
    }
  )
);