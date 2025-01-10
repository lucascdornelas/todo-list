import { create } from "zustand";

interface LanguageState {
  locale: string;
  setLocale: (locale: string) => void;
}

const useLanguageStore = create<LanguageState>((set) => ({
  locale: "en",
  setLocale: (locale) => set({ locale }),
}));

export default useLanguageStore;
