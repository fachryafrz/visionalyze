"use client";

import { useFile } from "@/app/zustand/file";
import { useEffect, useState } from "react";

type Response = {
  image_information: string;
  important_information: string;
  related_keywords: string[];
  related_questions: string[];
};

export default function ImageResponse() {
  const { image, analyze: rawData, loading } = useFile();

  const [response, setResponse] = useState<Response | null>(null);

  useEffect(() => {
    setResponse(null);
  }, [image]);

  useEffect(() => {
    if (!rawData) return;

    const formattedResponse = rawData.replace(/\n/g, "");

    setResponse(JSON.parse(formattedResponse));
  }, [rawData]);

  return (
    <>
      {loading && <div>Loading...</div>}

      {!loading && response && (
        <div className={`space-y-4`}>
          <div>
            <h2 className={`text-xl font-bold`}>Image</h2>
            <p>{response.image_information}</p>
          </div>
          <div>
            <h2 className={`text-xl font-bold`}>Description</h2>
            <p>{response.important_information}</p>
          </div>
          <div>
            <h2 className={`text-xl font-bold`}>Related Keywords</h2>
            <ul className={`flex gap-2`}>
              {response.related_keywords.map((keywords: string) => (
                <li key={keywords}>
                  <button
                    className={`p-2 text-sm bg-neutral-800 rounded-md hocus:bg-neutral-600`}
                  >
                    {`#${keywords}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={`text-xl font-bold`}>Related Questions</h2>
            <ul className={`space-y-1`}>
              {response.related_questions.map((questions: string) => (
                <li key={questions}>
                  <button
                    className={`p-2 text-sm bg-neutral-800 rounded-md hocus:bg-neutral-600`}
                  >
                    {questions}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
