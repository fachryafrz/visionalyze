import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  openGraph: {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    images: [
      {
        url: "/assets/favicon/dark/android-chrome-512x512.png",
        width: 512,
        height: 512,
      },
      {
        url: "/assets/favicon/light/android-chrome-512x512.png",
        width: 512,
        height: 512,
      },
    ],
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/assets/favicon/light/favicon.ico",
        href: "/assets/favicon/light/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/assets/favicon/dark/favicon.ico",
        href: "/assets/favicon/dark/favicon.ico",
      },
    ],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const gtagId = process.env.GA_MEASUREMENT_ID;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`scroll-pt-4 scroll-pb-8 sm:scroll-pt-8 sm:scroll-pb-16`}
    >
      <body
        className={`${roboto.className} antialiased bg-slate-100 dark:bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster />
        </ThemeProvider>

        <GoogleAnalytics gaId={gtagId || ""} />
        <Analytics />
      </body>
    </html>
  );
}
