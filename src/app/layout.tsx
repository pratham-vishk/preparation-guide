import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-news",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Switch Desk",
  description:
    "A 16-week plan for a Java engineer moving from a 22 LPA seat toward a 40–50 LPA product role.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-6 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
