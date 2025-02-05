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
  const { image, analyze: rawData } = useFile();

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
    response && (
      <div>
        <div>
          <h2>Image Info</h2>
          <p>{response.image_information}</p>
        </div>
        <div>
          <h2>Important Info</h2>
          <p>{response.important_information}</p>
        </div>
        <div>
          <h2>Related Keywords</h2>
          <ul style={{}}>
            {response.related_keywords.map((keywords: string) => (
              <li key={keywords}>{keywords}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Related Questions</h2>
          <ul style={{}}>
            {response.related_questions.map((questions: string) => (
              <li key={questions}>{questions}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}
