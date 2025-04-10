import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { limiter, notAllowed, tokenExpired } from "../config/limiter";
import { whitelist } from "@/app/middleware";
import { z } from "zod";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const { image } = await request.json();

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(request);
  if ((origin && !whitelist.includes(origin)) || !origin) return notAllowed();

  const { object } = await generateObject({
    model: google("gemini-2.0-flash-lite-preview-02-05"),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      related_keywords: z.array(z.string()),
      related_questions: z.array(z.string()),
    }),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
Analyze the image. Use this exact JSON format and ensure the output is a valid JSON object:
- "title": "Identify the image and provide its name.",
- "description": "Description of the content, objects, details of the image.",
- "related_keywords": ["Keyword1", "Keyword2", "Keyword3"],
- "related_questions": ["Question 1?", "Question 2?", "Question 3?"]}`,
          },
          { type: "image", image },
        ],
      },
    ],
  });

  return NextResponse.json(object);
}
