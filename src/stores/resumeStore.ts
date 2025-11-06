import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware'; // <-- 1. Import persist
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
  // loadInitialResume is no longer needed!
  updateField: (path: string, value: any) => void;
  addSection: (section: keyof Resume, template: any) => void;
  updateStringArray: (path: string, value: string) => void;
}

export const useResumeStore = create(
  // 2. Wrap your immer middleware in persist
  persist(
    immer<ResumeState>((set) => ({
      resume: blankResume,

      // --- ACTIONS ---

      // 1. loadInitialResume() is GONE. persist handles this.
      // 2. The manual .subscribe() is GONE. persist handles this.

      // 3. The generic nested field updater (no change)
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

      // 4. Add a new item to a resume section (no change)
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

      // 5. Handle comma-separated string-to-array conversion (no change)
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
      // 3. Configure persist
      name: LOCAL_STORAGE_KEY, // This is the key it will use in localStorage
      
      // This merge function ensures that if you update blankResume,
      // the new fields get merged correctly with the user's saved data.
      merge: (persistedState, currentState) => {
        return {
          ...currentState,
          ...(persistedState as ResumeState),
          resume: {
            ...currentState.resume,
            ...(persistedState as ResumeState).resume,
          }
        }
      }
    }
  )
);