import ImageResponse from "@/components/image-response";
import ImageUpload from "@/components/image-upload";

export default function page() {
  return (
    <div className={`space-y-8 p-8`}>
      <ImageUpload />

      <ImageResponse />
    </div>
  );
}
