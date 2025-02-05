/* eslint-disable @next/next/no-img-element */
"use client";

import { fetchData } from "@/app/server/actions";
import { useFile } from "@/app/zustand/file";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./loading-spinner";
import ModeToggle from "./mode-toggle";
import { useTheme } from "next-themes";
import Logo from "./logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";

export default function ImageUpload() {
  const { theme } = useTheme();
  const { image, setImage, setAnalyze, loading, setLoading } = useFile();
  const [base64IMG, setBase64IMG] = useState<string | null>();

  const [tab, setTab] = useState<string>();

  const onTabChange = (value: string) => {
    setTab(value);
  };

  const convertToBase64 = (file: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setBase64IMG(base64);
    };
  };

  const handleChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) return;

    const value = e.target.files![0];

    convertToBase64(value);
    setImage(URL.createObjectURL(value));
  };

  const handleChangeInputText = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.value) return;

    const value = e.target.value;
    const base64 = await fetch(value).then((response) => response.blob());

    convertToBase64(base64);
    setImage(value);
  };

  const handleGenerate = async () => {
    if (!base64IMG) return;

    setLoading(true);

    const { data } = await fetchData(`/api/generate`, {
      baseURL: process.env.NEXT_PUBLIC_APP_URL,
      method: "POST",
      data: { image: base64IMG },
    });

    setLoading(false);

    setAnalyze(data.candidates[0].content.parts[0].text);
  };

  useEffect(() => {
    setImage(null);
    setBase64IMG(null);
  }, [tab]);

  return (
    <div
      className={`dark:bg-black relative space-y-8 bg-white max-w-6xl mx-auto p-4 sm:p-8 rounded-xl drop-shadow-xl dark:border`}
    >
      {/* App Info */}
      <div
        className={`text-center max-w-fit space-y-4 mx-auto flex flex-col items-center`}
      >
        <div className={`flex items-center gap-2`}>
          <Logo
            variant={theme === "dark" ? "dark" : "light"}
            width={40}
            height={40}
          />

          <h1 className={`text-4xl font-bold`}>
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
        </div>
        <p className={`text-pretty max-w-[80%]`}>
          {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        </p>
      </div>

      <div className={`flex flex-col gap-2 items-center`}>
        {/* Toggle File Upload or URL */}
        <Tabs
          defaultValue="url"
          onValueChange={onTabChange}
          className="flex flex-col items-center"
        >
          <TabsList className={`rounded-full [&>*]:rounded-full`}>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <div
              className={`border max-w-sm flex flex-col sm:flex-row items-center p-2 rounded-[2rem] gap-2`}
            >
              {/* Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleChangeInputFile}
                className={`block w-full cursor-pointer text-sm text-gray-500 transition duration-150 ease-in-out file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-normal file:h-full dark:file:text-white dark:hocus:file:bg-white dark:hocus:file:bg-opacity-10`}
              />

              {/* Generate */}
              <Button
                variant={"secondary"}
                onClick={handleGenerate}
                className={`rounded-full w-full sm:min-w-[125px] sm:max-w-[125px]`}
              >
                {loading ? <LoadingSpinner /> : <span>Analyze Image</span>}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="url">
            <div
              className={`border max-w-sm flex flex-col sm:flex-row items-center p-2 rounded-[2rem] gap-2`}
            >
              {/* Input */}
              <Input
                type="text"
                onChange={handleChangeInputText}
                placeholder={`Type your image URL`}
                className={`border-0 bg-transparent rounded-full focus-visible:ring-0 focus-visible:ring-offset-0`}
              />

              {/* Generate */}
              <Button
                variant={"secondary"}
                onClick={handleGenerate}
                className={`rounded-full w-full sm:min-w-[125px] sm:max-w-[125px]`}
              >
                {loading ? <LoadingSpinner /> : <span>Analyze Image</span>}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview */}
      {image && (
        <div className={`flex justify-center`}>
          <div className={`h-[300px] w-fit`}>
            <img
              src={image}
              alt=""
              draggable={false}
              className={`w-full h-full object-contain`}
            />
          </div>
        </div>
      )}

      {/* Mode Toggle */}
      <div
        className={`absolute inset-0 flex justify-end !mt-0 p-4 pointer-events-none [&>*]:pointer-events-auto`}
      >
        <div className={`sticky top-4 w-fit h-fit`}>
          <ModeToggle variant="outline" />
        </div>
      </div>
    </div>
  );
}
