import { create } from "zustand";

type FileType = {
  image: string;
  setImage: (image: string | null) => void;

  analyze: string;
  setAnalyze: (analyze: string | null) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useFile = create<FileType>()((set) => ({
  image: "",
  setImage: (image) => set({ image: image ?? "" }),

  analyze: "",
  setAnalyze: (analyze) => set({ analyze: analyze ?? "" }),

  loading: false,
  setLoading: (loading) => set({ loading }),
}));
