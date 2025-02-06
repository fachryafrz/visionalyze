export type GeminiAPIError = {
  error: {
    code: number;
    message: string;
    status: string;
  };
};

export type AnalyzeButtonProps = {
  loading: boolean;
  handleGenerate: () => void;
  handleClear: () => void;
};
