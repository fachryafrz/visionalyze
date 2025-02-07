import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { limiter, notAllowed, tokenExpired } from "@/app/api/config/limiter";
import { whitelist } from "@/app/middleware";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const { messages, data } = await request.json();

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(request);
  if ((origin && !whitelist.includes(origin)) || !origin) return notAllowed();

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  const result = streamText({
    model: google("gemini-2.0-flash-lite-preview-02-05"),
    system: `You are an AI-Powered Image Analysis. Respond to the user in Markdown format. Your name is ${process.env.NEXT_PUBLIC_APP_NAME}. If someone ask who own this website or who created ${process.env.NEXT_PUBLIC_APP_NAME}, answer with this website is owned by a handsome man named Fachry Dwi Afriza.`,
    messages: [
      ...initialMessages,
      {
        role: "user",
        content: [
          { type: "text", text: currentMessage.content },
          { type: "image", image: data.image },
        ],
      },
    ],
  });

  return result.toDataStreamResponse();
}
