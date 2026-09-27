import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/next";
import { UIProvider } from "@/components/UIProvider";
import { profile } from "@/lib/data";
import "./globals.css";

const jetbrains = localFont({
  src: "./fonts/JetBrainsMono-Regular.ttf",
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.shortName} — Portfolio`,
  description: `${profile.name}: ${profile.degree} student. ${profile.tagline}`,
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrains.variable}`}>
      <body>
        <UIProvider>{children}</UIProvider>
        <Analytics />
      </body>
    </html>
  );
}
