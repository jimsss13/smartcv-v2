import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Resume } from '@/types/resume';

// Define the blank state
const blankResume: Resume = {
  basics: {
    name: "", label: "", image: "", email: "", phone: "", url: "", summary: "",
    location: { address: "", postalCode: "", city: "", region: "", countryCode: "" },
    profiles: [],
    nationality: "",
  },
  work: [],
  education: [],
  certificates: [],
  publications: [],
  skills: [],
  awards: [],
  languages: [],
  interests: [],
  projects: [],
  references: [],
  volunteer: [],
  advisory: [],
};

const LOCAL_STORAGE_KEY = 'dynamicResumeData';

// Define the store's state and actions
interface ResumeState {
  resume: Resume;
  loadInitialResume: () => void;
  updateField: (path: string, value: any) => void;
  addSection: (section: keyof Resume, template: any) => void;
  updateStringArray: (path: string, value: string) => void;
}

export const useResumeStore = create(
  immer<ResumeState>((set) => ({
    resume: blankResume,

    // --- ACTIONS ---

    // 1. Load data from Local Storage (only on client)
    loadInitialResume: () => {
      if (typeof window === 'undefined') return;
      
      const savedResume = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedResume) {
        try {
          const parsed = JSON.parse(savedResume);
          set((state) => {
            state.resume = { ...blankResume, ...parsed };
          });
        } catch (e) {
          console.error("Failed to parse resume data:", e);
        }
      }
      
      // Subscribe to future changes to save to local storage
      useResumeStore.subscribe(
        (state) => state.resume,
        (resume) => {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
        },
        { fireImmediately: false }
      );
    },

    // 2. The generic nested field updater
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

    // 3. Add a new item to a resume section (e.g., new job)
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

    // 4. Handle comma-separated string-to-array conversion
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
  }))
);