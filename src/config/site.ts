export const siteConfig = {
  name: "Visionalyze",
  description:
    "AI-powered image analysis tool that helps you extract meaningful insights from images effortlessly. Whether you're analyzing photos for content, color composition, or object recognition, Visionalyze provides detailed breakdowns with just one upload!",
  url:
    process.env.NODE_ENV === "production"
      ? "https://visionalyze.fachryafrz.com"
      : "http://localhost:3000",
};
