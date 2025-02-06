export type GeminiAPIError = {
  error: {
    code: number;
    message: string;
    status: string;
  };
};

export type AnalyzeButtonProps = {
  image: string;
  loading: boolean;
  handleGenerate: () => void;
  handleClear: () => void;
};
