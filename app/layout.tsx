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
  title: "Griot and Grits - Black Voices Worth Remembering, Black History Worth Sharing.",
  description: `Griot and Grits is a new take on the West African Griot, the storytelling, 
  singing, poet, historian of the village that was tasked with passing on the history of the village orally.
  Our mission is to preserve the history of the African American experience one voice at a time using AI 
  and other advanced technologies.`,
  keywords: "African American experience, AI technology, content enrichment, metadata extraction, searchable index",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} tracking-tighter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
