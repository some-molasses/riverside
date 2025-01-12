import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import { TopNav } from "./components/top-nav/top-nav";
import "./globals.scss";

const titleFont = Quicksand({
  variable: "--title-font",
  subsets: ["latin"],
});

const bodyFont = Nunito({
  variable: "--body-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "river-stanley.me",
  description: "The portfolio of River Stanley",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SpeedInsights />
      </head>
      <body className={`${titleFont.variable} ${bodyFont.variable}`}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
