import { create } from "zustand";

type FileType = {
  image: string;
  setImage: (image: string) => void;

  analyze: string;
  setAnalyze: (analyze: string) => void;
};

export const useFile = create<FileType>()((set) => ({
  image: "",
  setImage: (image) => set({ image }),

  analyze: "",
  setAnalyze: (analyze) => set({ analyze }),
}));
