import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
  metadataBase: new URL("https://personal-website.vercel.app"),
  title: {
    default: "Justin Cornetta",
    template: "%s | Justin Cornetta",
  },
  description:
    "Personal website for Justin Cornetta, an operations and strategy generalist working across healthcare, AI-enabled workflows, psychedelics, investing, and technology.",
  openGraph: {
    title: "Justin Cornetta",
    description:
      "Operations, strategy, AI-enabled execution, psychedelic medicine, investing, and technology.",
    type: "website",
    url: "https://personal-website.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
