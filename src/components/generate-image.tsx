/* eslint-disable @next/next/no-img-element */
"use client";

import { useChat } from "ai/react";
import { ArrowUp, Download, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Logo from "./logo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { MemoizedMarkdown } from "./memoized-markdown";
import { Message } from "@ai-sdk/ui-utils";
import useDownloader from "react-use-downloader";

export default function GenerateImage() {
  const { resolvedTheme } = useTheme();

  const { messages, setMessages, input, setInput, handleInputChange } = useChat(
    {
      id: `generate-image`,
      api: "/api/generate-image",
    }
  );
  const { download } = useDownloader();

  const [loading, setLoading] = useState<boolean>(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    setInput("");

    inputRef.current?.focus();

    const newMessages: Message[] = [
      ...messages,
      {
        id: "text",
        role: "user",
        content: input,
      },
    ];

    setMessages(newMessages);

    setLoading(true);

    try {
      const { data } = await axios.post("/api/generate-image", {
        prompt: input,
      });

      setMessages([
        ...newMessages,
        {
          id: "image",
          role: "assistant",
          content: data.image.base64Data,
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          id: "error",
          role: "assistant",
          content: "Something went wrong, please try again in a few seconds.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messages.length > 0 && inputContainerRef.current) {
      setTimeout(() => {
        inputContainerRef.current!.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 50);
    }
  }, [messages]);

  return (
    <div className={`max-w-2xl space-y-4 mx-auto`}>
      {messages.length > 0 && (
        <div className="space-y-8">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex items-center gap-2 font-bold ${
                  message.id === "image" ? "mb-1" : ""
                }`}
              >
                {message.role === "user" ? (
                  <User width={20} height={20} />
                ) : (
                  <Logo
                    variant={resolvedTheme as "dark" | "light"}
                    width={20}
                    height={20}
                  />
                )}

                <span>
                  {message.role === "user"
                    ? "You"
                    : process.env.NEXT_PUBLIC_APP_NAME}
                </span>
              </div>

              <div className={`w-full max-w-2xl pl-7`}>
                {message.id === "image" ? (
                  <div className={`flex w-fit`}>
                    <div>
                      <img
                        src={`data:image/png;base64,${message.content}`}
                        alt=""
                        draggable={false}
                        className={`max-h-[300px] rounded-md`}
                      />
                    </div>

                    {/* Options */}
                    <div>
                      <Button
                        variant={`ghost`}
                        size={`icon`}
                        className={`rounded-full`}
                        onClick={() => {
                          download(
                            `data:image/png;base64,${message.content}`,
                            `${process.env.NEXT_PUBLIC_APP_NAME?.toLowerCase()}-generate-image-${Date.now()}.png`
                          );
                        }}
                      >
                        <Download className={`!w-5 !h-5`} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={
                      message.id === "error" ? "text-red-500 italic" : ""
                    }
                  >
                    <MemoizedMarkdown
                      id={message.id}
                      content={message.content}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <span
              id="processing-indicator"
              className={`block ml-7 w-4 aspect-square rounded-full bg-black dark:bg-white animate-ping`}
            ></span>
          )}
        </div>
      )}

      <form onSubmit={handleGenerate}>
        <div
          ref={inputContainerRef}
          className={`border flex items-center p-2 rounded-[2rem] gap-1`}
        >
          {/* Input */}
          <Input
            type="text"
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Think of something..."
            className={`border-0 flex-1 bg-transparent p-0 pl-2 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0`}
          />

          {/* Ask */}
          <Button
            variant={"secondary"}
            size={`icon`}
            type="submit"
            disabled={loading}
            className={`rounded-full`}
          >
            <ArrowUp />
          </Button>
        </div>
      </form>
    </div>
  );
}
