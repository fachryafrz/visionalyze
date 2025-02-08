import { create } from "zustand";

type Tab = {
  tab: string;
  setTab: (tab: string) => void;
};

export const useTab = create<Tab>()((set) => ({
  tab: "upload",
  setTab: (tab) => set({ tab: tab }),
}));
