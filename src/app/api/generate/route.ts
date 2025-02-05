import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const { key } = Object.fromEntries(url.searchParams);

  const body = await request.json();
  const { image } = body;

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
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/${process.env.NEXT_PUBLIC_AI_MODEL}`,
      prompt,
      { params: { key } }
    );

    return NextResponse.json(data, { status });
  } catch (error) {
    const { message, status } = error as { message: string; status: number };
    return NextResponse.json(message, { status });
  }
}
