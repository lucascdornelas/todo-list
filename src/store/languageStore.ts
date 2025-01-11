import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  locale: string;
  setLocale: (locale: string) => void;
}

const useLanguageStore = create(
  persist<LanguageState>(
    (set) => ({
      locale: "pt",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "language-storage",
    }
  )
);

export default useLanguageStore;
