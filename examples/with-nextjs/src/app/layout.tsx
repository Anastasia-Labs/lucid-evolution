import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evolution SDK Template",
  description: "A Next.js 15 starter template for Evolution SDK",
  icons: {
    icon: [
      { url: "/evolution-sdk-no-witness-labs.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/evolution-sdk-no-witness-labs.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="icon"
          href="/evolution-sdk-no-witness-labs.svg"
          type="image/svg+xml"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-200 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
