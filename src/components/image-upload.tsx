/* eslint-disable @next/next/no-img-element */
"use client";

import axios, { AxiosError } from "axios";
import { useFile } from "@/zustand/file";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./loading-spinner";
import ModeToggle from "./mode-toggle";
import { useTheme } from "next-themes";
import Logo from "./logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { TAB_GENERATE, TAB_UPLOAD, TAB_URL } from "@/lib/constants";
import debounce from "debounce";
import { toast } from "sonner";
import { CircleCheck, OctagonX, Trash2 } from "lucide-react";
import { AnalyzeButtonProps } from "@/lib/types";
import GenerateImage from "./generate-image";
import { useTab } from "@/zustand/tab";
import Typewriter from "typewriter-effect";
import { validURL } from "@/lib/valid-url";
import { siteConfig } from "@/config/site";

export default function ImageUpload() {
  const { resolvedTheme } = useTheme();
  const {
    image,
    setImage,
    base64IMG,
    setBase64IMG,
    loading,
    setLoading,
    response,
    setResponse,
  } = useFile();

  const { tab, setTab } = useTab();
  const [text, setText] = useState<string | null>();

  const handleClear = () => {
    setImage(null);
    setText(null);
    setBase64IMG(null);
    setResponse(null);
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

    const imgSize = e.target.files![0].size / 1024 / 1024;

    if (imgSize > 5) {
      toast(
        `Image size must be less than 5MB. Current size: ${imgSize.toFixed(
          2
        )}MB`,
        {
          icon: <OctagonX />,
          className: "!bg-destructive gap-3",
        }
      );
      return;
    }

    setText(null);

    const value = e.target.files![0];

    convertToBase64(value);
    setImage(URL.createObjectURL(value));

    toast(`Image loaded successfully!`, {
      icon: <CircleCheck />,
      className: "gap-3",
    });
  };

  const handleChangeInputText = useCallback(
    debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (!value) {
        setImage(null);
        return;
      }

      if (!validURL(value)) {
        toast(`Please enter a valid URL.`, {
          icon: <OctagonX />,
          className: "!bg-destructive gap-3",
        });
        return;
      }

      try {
        setLoading(true);

        const base64 = await axios
          .get(value, { responseType: "blob" })
          .then(({ data }) => data);

        convertToBase64(base64);
        setImage(value);

        toast(`Image loaded successfully!`, {
          icon: <CircleCheck />,
          className: "gap-3",
        });
      } catch (error) {
        const { response } = error as AxiosError;
        const className = "!bg-destructive gap-3";

        if (response?.status === 404) {
          toast(`Image not found.`, {
            icon: <OctagonX />,
            className,
          });
          return;
        }

        toast(
          `Failed to load image. This image may be licensed and restricted from external use.`,
          {
            icon: <OctagonX />,
            className,
          }
        );
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleGenerate = async () => {
    if (!base64IMG) return;

    if (response) {
      setResponse(null);
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/api/analyze", { image: base64IMG });

      setResponse(data);
    } catch {
      toast(`Failed to analyze image.`, {
        icon: <OctagonX />,
        className: "!bg-destructive gap-3",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`dark:bg-black relative space-y-8 bg-white max-w-6xl mx-auto p-4 sm:p-8 rounded-xl drop-shadow-md hocus:drop-shadow-xl transition-all dark:border`}
    >
      {/* App Info */}
      <div
        className={`text-center max-w-fit space-y-4 mx-auto flex flex-col items-center`}
      >
        <div className={`flex items-center gap-2`}>
          <Logo
            variant={resolvedTheme as "dark" | "light"}
            width={40}
            height={40}
          />

          <h1 className={`text-4xl font-bold`}>{siteConfig.name}</h1>
        </div>
        <p className={`text-pretty max-w-[80%]`}>{siteConfig.description}</p>
      </div>

      <div className={`flex flex-col gap-2 items-center`}>
        {/* Toggle File Upload or URL */}
        <Tabs
          defaultValue={TAB_UPLOAD}
          value={tab}
          onValueChange={setTab}
          className="flex flex-col items-center w-full"
        >
          <TabsList className={`rounded-full [&>*]:rounded-full`}>
            <TabsTrigger value={TAB_UPLOAD}>Upload</TabsTrigger>
            <TabsTrigger value={TAB_URL}>URL</TabsTrigger>
            <TabsTrigger value={TAB_GENERATE}>Generate</TabsTrigger>
          </TabsList>
          <TabsContent value={TAB_UPLOAD}>
            <div
              className={`border max-w-2xl mx-auto flex flex-col sm:flex-row items-center p-2 rounded-[1.5rem] sm:rounded-full gap-1`}
            >
              {/* Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleChangeInputFile}
                // disabled={loading}
                className={`block flex-1 w-full cursor-pointer text-sm text-gray-500 transition duration-150 ease-in-out file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-normal file:h-full dark:file:text-white dark:hocus:file:bg-white dark:hocus:file:bg-opacity-10 disabled:cursor-not-allowed disabled:opacity-50`}
              />

              {/* Generate */}
              <AnalyzeButton
                image={image}
                loading={loading}
                handleGenerate={handleGenerate}
                handleClear={handleClear}
              />
            </div>
          </TabsContent>
          <TabsContent value={TAB_URL}>
            <div
              className={`border relative max-w-2xl mx-auto flex flex-col sm:flex-row items-center p-2 rounded-[1.5rem] sm:rounded-full gap-1`}
            >
              {/* Input */}
              <Input
                type="text"
                value={text || ""}
                onChange={(e) => {
                  setText(e.target.value);
                  handleChangeInputText(e);
                }}
                // disabled={loading}
                // placeholder={`Type your image URL`}
                className={`border-0 flex-1 bg-transparent p-0 pl-2 min-h-9 max-h-9 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0`}
              />

              {/* Typewriter NOTE: This is a hack to make the typewriter work because there is no typescript support for it */}
              <div
                className={`text-sm pointer-events-none absolute left-4 top-4 sm:top-auto text-muted-foreground ${
                  text ? "opacity-0" : ""
                }`}
              >
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Paste your image URL")
                      .pauseFor(3e3)
                      .deleteAll()
                      .typeString("https://example.com/image.jpg")
                      .pauseFor(5e3)
                      .deleteAll()
                      .start();
                  }}
                  options={{
                    loop: true,
                    delay: 50,
                    cursor: "",
                  }}
                />
              </div>

              {/* Generate */}
              <AnalyzeButton
                image={image}
                loading={loading}
                handleGenerate={handleGenerate}
                handleClear={handleClear}
              />
            </div>
          </TabsContent>
          <TabsContent value={TAB_GENERATE}>
            <GenerateImage />
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview */}
      {image && (
        <div
          className={`w-full max-w-2xl mx-auto ${
            tab === TAB_GENERATE ? "hidden" : ""
          }`}
        >
          <img
            src={image}
            alt=""
            draggable={false}
            className={`max-h-[600px] mx-auto rounded-md`}
          />
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

function AnalyzeButton({
  loading,
  image,
  handleGenerate,
  handleClear,
}: AnalyzeButtonProps) {
  return (
    <div className={`flex items-center gap-1 flex-1 w-full sm:flex-grow-0`}>
      {image && (
        <Button
          variant={`ghost`}
          size={`icon`}
          disabled={loading}
          className={`text-destructive rounded-full hocus:bg-destructive`}
          onClick={handleClear}
        >
          <Trash2 className={`!w-6 !h-6`} />
        </Button>
      )}

      {/* Generate */}
      <Button
        variant={"secondary"}
        onClick={handleGenerate}
        disabled={loading}
        className={`rounded-full flex-1 w-full sm:min-w-[125px] sm:max-w-[125px]`}
      >
        {loading ? <LoadingSpinner /> : <span>Analyze Image</span>}
      </Button>
    </div>
  );
}
