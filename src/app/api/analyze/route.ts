import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { limiter, notAllowed, tokenExpired } from "../config/limiter";
import { whitelist } from "@/app/middleware";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const { image } = await request.json();

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(request);
  if ((origin && !whitelist.includes(origin)) || !origin) return notAllowed();

  const { text } = await generateText({
    model: google("gemini-2.0-flash-lite-preview-02-05"),
    system: `You are a helpful assistant. Respond to the user in Markdown format.`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze the image and provide a plain JSON response with no markdown formatting, no backslashes or escapes (like \\n). Use this exact JSON format and ensure the output is a valid JSON object:\n\n{\n  "title": "Identify the image and provide its name.",\n  "description": "Description of the content, objects, details of the image.",\n  "related_keywords": ["Keyword1", "Keyword2", "Keyword3"],\n  "related_questions": ["Question 1?", "Question 2?", "Question 3?"]\n}\n\nEnsure that the output is raw JSON without any escape characters or extra formatting.`,
          },
          { type: "image", image },
        ],
      },
    ],
  });

  return NextResponse.json({ text });
}
