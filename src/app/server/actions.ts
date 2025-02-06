"use server";

import { GeminiAPIError } from "@/lib/types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const AI_MODEL = "gemini-2.0-flash-001";

export const fetchData = async (url: string, options: AxiosRequestConfig) => {
  try {
    const { data } = await axios.request({
      method: "GET",
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      url,
      params: {
        key: process.env.API_KEY,
        ...options.params,
      },
      ...options,
    });

    return { data };
  } catch (error) {
    return { error };
  }
};

export const analyzeImage = async (image: string) => {
  const prompt = {
    contents: [
      {
        parts: [
          {
            text: 'Analyze the image and provide a plain JSON response with no markdown formatting, no backslashes or escapes (like \\n). Use this exact JSON format and ensure the output is a valid JSON object:\n\n{\n  "image_information": "Identify the image and provide its name.",\n  "important_information": "Description of the content, objects, details of the image, and key insights or important elements from the image.",\n  "related_keywords": ["Keyword1", "Keyword2", "Keyword3"],\n  "related_questions": ["Question 1?", "Question 2?", "Question 3?"]\n}\n\nEnsure that the output is raw JSON without any escape characters or extra formatting.',
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: image,
            },
          },
        ],
      },
    ],
  };

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/${AI_MODEL}:generateContent`,
      prompt,
      { params: { key: process.env.API_KEY } }
    );

    return { data };
  } catch (error) {
    const { response } = error as AxiosError<GeminiAPIError>;

    return { error: response?.data.error };
  }
};
