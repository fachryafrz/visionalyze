"use client";

import { useFile } from "@/app/zustand/file";
import { TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Response = {
  image_information: string;
  important_information: string;
  related_keywords: string[];
  related_questions: string[];
};

export default function ImageResponse() {
  const { image, analyze: rawData } = useFile();

  const containerRef = useRef<HTMLDivElement>(null);

  const [response, setResponse] = useState<Response | null>(null);

  const handleSonner = () => {
    toast(`Feature coming soon!`, {
      icon: <TriangleAlert />,
      className: "gap-3",
    });
  };

  useEffect(() => {
    setResponse(null);
  }, [image]);

  useEffect(() => {
    if (!rawData) return;

    const formattedResponse = rawData.replace(/\n/g, "");

    setResponse(JSON.parse(formattedResponse));
  }, [rawData]);

  useEffect(() => {
    if (response && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  return (
    <>
      {response && (
        <div ref={containerRef} className={`space-y-8`}>
          <div className={`mx-auto text-center`}>
            <h2 className={`text-3xl font-bold`}>Results</h2>
          </div>

          <div
            className={`dark:bg-black space-y-8 bg-white max-w-6xl mx-auto p-4 sm:p-8 rounded-xl drop-shadow-xl dark:border`}
          >
            <div className={`space-y-8`}>
              <div className={`space-y-1`}>
                <h2 className={`text-xl font-bold`}>Title</h2>
                <p>{response.image_information}</p>
              </div>
              <div className={`space-y-1`}>
                <h2 className={`text-xl font-bold`}>Description</h2>
                <p>{response.important_information}</p>
              </div>
              <div className={`space-y-1`}>
                <h2 className={`text-xl font-bold`}>Related Keywords</h2>
                <ul className={`flex gap-1 flex-wrap`}>
                  {response.related_keywords.map((keywords: string) => (
                    <li key={keywords}>
                      <button
                        onClick={handleSonner}
                        className={`p-2 text-sm text-start bg-slate-200 hocus:bg-slate-300 dark:bg-neutral-800 rounded-md dark:hocus:bg-neutral-600`}
                      >
                        {`#${keywords.replace(" ", "")}`}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`space-y-1`}>
                <h2 className={`text-xl font-bold`}>Related Questions</h2>
                <ul className={`space-y-1`}>
                  {response.related_questions.map((questions: string) => (
                    <li key={questions}>
                      <button
                        onClick={handleSonner}
                        className={`p-2 text-sm text-start bg-slate-200 hocus:bg-slate-300 dark:bg-neutral-800 rounded-md dark:hocus:bg-neutral-600`}
                      >
                        {questions}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
