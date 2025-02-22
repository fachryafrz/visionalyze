import { SELECTED_TAB, TAB_UPLOAD } from "@/lib/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Tab = {
  tab: string;
  setTab: (tab: string) => void;
};

export const useTab = create<Tab>()(
  persist(
    (set) => ({
      tab: TAB_UPLOAD,
      setTab: (tab) => set({ tab }),
    }),
    {
      name: SELECTED_TAB,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
