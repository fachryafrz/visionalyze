"use client";

import { useFile } from "@/zustand/file";
import { useChat } from "ai/react";
import { ArrowUp, User } from "lucide-react";
import { useEffect, useRef } from "react";
// import { toast } from "sonner";
import { MemoizedMarkdown } from "./memoized-markdown";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useChatID } from "@/zustand/chat-id";
import Logo from "./logo";
import { useTheme } from "next-themes";
import { useTab } from "@/zustand/tab";
import { TAB_GENERATE } from "@/lib/constants";
import { siteConfig } from "@/config/site";

type Response = {
  title: string;
  description: string;
  related_keywords: string[];
  related_questions: string[];
};

export default function ImageResponse() {
  const { image, response, setResponse } = useFile();

  const { tab } = useTab();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResponse(null);
  }, [image]);

  useEffect(() => {
    if (response && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  return (
    <>
      {response && (
        <div
          ref={containerRef}
          className={`space-y-8 ${tab === TAB_GENERATE ? "hidden" : ""}`}
        >
          <div className={`mx-auto text-center`}>
            <h2 className={`text-3xl font-bold`}>Results</h2>
          </div>

          <div
            className={`dark:bg-black space-y-8 bg-white max-w-6xl mx-auto p-4 sm:p-8 rounded-xl drop-shadow-xl dark:border`}
          >
            <ImageInformation data={response} />

            <AskImageInformation />
          </div>
        </div>
      )}
    </>
  );
}

function ImageInformation({ data }: { data: Response }) {
  const { chatID } = useChatID();
  const { base64IMG } = useFile();
  const { setInput, handleSubmit } = useChat({
    id: `ask-image-${chatID?.toString()}`,
    api: "/api/analyze/ask",
  });

  return (
    <div className={`space-y-8`}>
      <div className={`space-y-1`}>
        <h2 className={`text-xl font-bold`}>Title</h2>
        <p>{data.title}</p>
      </div>
      <div className={`space-y-1`}>
        <h2 className={`text-xl font-bold`}>Description</h2>
        <p>{data.description}</p>
      </div>
      {/* <div className={`space-y-1`}>
        <h2 className={`text-xl font-bold`}>Related Keywords</h2>
        <ul className={`flex gap-1 flex-wrap`}>
          {data.related_keywords.map((kw: string) => {
            const keyword = kw.replace(" ", "");

            return (
              <li key={keyword}>
                <button
                  onClick={handleSonner}
                  className={`p-2 text-sm text-start bg-slate-200 hocus:bg-slate-300 dark:bg-neutral-800 rounded-md dark:hocus:bg-neutral-600`}
                >
                  {`#${keyword.replace(" ", "")}`}
                </button>
              </li>
            );
          })}
        </ul>
      </div> */}
      <div className={`space-y-1`}>
        <h2 className={`text-xl font-bold`}>Related Questions</h2>
        <ul className={`space-y-1`}>
          {data.related_questions.map((question: string) => (
            <li key={question}>
              <form
                onSubmit={(e) => {
                  handleSubmit(e, { data: { image: base64IMG } });
                }}
              >
                <button
                  onClick={() => setInput(question)}
                  type="submit"
                  className={`p-2 px-3 text-sm text-start bg-slate-200 hocus:bg-slate-300 dark:bg-neutral-800 rounded-md dark:hocus:bg-neutral-600`}
                >
                  {question}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AskImageInformation() {
  const { resolvedTheme } = useTheme();
  const { chatID, incrementChatID } = useChatID();

  const { base64IMG } = useFile();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: loading,
  } = useChat({
    id: `ask-image-${chatID?.toString()}`,
    api: "/api/analyze/ask",
  });

  const inputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    incrementChatID(chatID);
  }, [base64IMG]);

  useEffect(() => {
    if (messages.length > 0 && inputContainerRef.current) {
      setTimeout(() => {
        inputContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 50);
    }
  }, [messages]);

  return (
    <div>
      <div className="space-y-8 mb-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div className="flex items-center gap-2 font-bold">
              {message.role === "user" ? (
                <User width={20} height={20} />
              ) : (
                <Logo
                  variant={resolvedTheme as "dark" | "light"}
                  width={20}
                  height={20}
                />
              )}

              <span>{message.role === "user" ? "You" : siteConfig.name}</span>
            </div>
            <div className="prose max-w-none space-y-2 [&_*]:text-foreground dark:[&_*]:text-white pl-7">
              <MemoizedMarkdown id={message.id} content={message.content} />
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

      <form
        onSubmit={(e) => {
          handleSubmit(e, { data: { image: base64IMG } });
        }}
      >
        <div
          ref={inputContainerRef}
          className={`border flex items-center p-2 rounded-[2rem] gap-1`}
        >
          {/* Input */}
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something..."
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
