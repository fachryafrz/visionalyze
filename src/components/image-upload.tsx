"use client";

import { fetchData } from "@/app/server/actions";
import { useFile } from "@/app/zustand/file";
import { useState } from "react";

export default function ImageUpload() {
  const { image, setImage, setAnalyze } = useFile();
  const [base64IMG, setBase64IMG] = useState<string>();

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(file as Blob);

    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setBase64IMG(base64);
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) return;

    convertToBase64(e.target.files![0]);
    setImage(URL.createObjectURL(e.target.files![0]));
  };

  const handleGenerate = async () => {
    const { data } = await fetchData(`/api/generate`, {
      baseURL: process.env.NEXT_PUBLIC_APP_URL,
      method: "POST",
      data: { image: base64IMG },
    });

    console.log(data);

    setAnalyze(data.candidates[0].content.parts[0].text);
  };

  return (
    <div>
      {/* Input */}
      <div>
        <input type="file" accept="image/*" onChange={handleChange} />
      </div>

      {/* Preview */}
      {image && (
        <div className={`max-w-[150px]`}>
          <img src={image} alt="" />
        </div>
      )}

      {/* Generat */}
      <button onClick={handleGenerate}>Analyze</button>
    </div>
  );
}
