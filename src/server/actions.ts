"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const anaylyze = async (image: string) => {
  const { text } = await generateText({
    model: google("gemini-2.0-flash-lite-preview-02-05"),
    system: `You are a helpful assistant. Respond to the user in Markdown format.`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze the image and provide a plain JSON response with no markdown formatting, no backslashes or escapes (like \\n). Use this exact JSON format and ensure the output is a valid JSON object:\n\n{\n  "image_information": "Identify the image and provide its name.",\n  "important_information": "Description of the content, objects, details of the image, and key insights or important elements from the image.",\n  "related_keywords": ["Keyword1", "Keyword2", "Keyword3"],\n  "related_questions": ["Question 1?", "Question 2?", "Question 3?"]\n}\n\nEnsure that the output is raw JSON without any escape characters or extra formatting.`,
          },
          { type: "image", image },
        ],
      },
    ],
  });

  return { text };
};
