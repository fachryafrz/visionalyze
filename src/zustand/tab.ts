import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Tab = {
  tab: string;
  setTab: (tab: string) => void;
};

export const useTab = create<Tab>()(
  persist(
    (set) => ({
      tab: "upload",
      setTab: (tab) => set({ tab }),
    }),
    {
      name: "selected-tab",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
