import { create } from "zustand";

interface Response {
  title: string;
  description: string;
  related_keywords: string[];
  related_questions: string[];
}

type Image = {
  image: string;
  setImage: (image: string | null) => void;

  base64IMG: string;
  setBase64IMG: (base64IMG: string | null) => void;

  analyze: string;
  setAnalyze: (analyze: string | null) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  response: Response | null;
  setResponse: (response: Response | null) => void;
};

export const useFile = create<Image>()((set) => ({
  image: "",
  setImage: (image) => set({ image: image ?? "" }),

  base64IMG: "",
  setBase64IMG: (base64IMG) => set({ base64IMG: base64IMG ?? "" }),

  analyze: "",
  setAnalyze: (analyze) => set({ analyze: analyze ?? "" }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  response: null,
  setResponse: (response) => set({ response }),
}));
