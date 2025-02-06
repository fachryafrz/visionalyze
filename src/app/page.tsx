import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import ImageResponse from "@/components/image-response";
import ImageUpload from "@/components/image-upload";

export default function page() {
  return (
    <div className={`space-y-8 p-4 sm:p-8`}>
      <ImageUpload />

      <ImageResponse />

      <HowItWorks />

      <Features />
    </div>
  );
}
