import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/NavbarSection";
import FooterSection from "@/components/sections/FooterSection";
import AppProvider from "@/providers/AppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "10 Minute School - IELTS Course",
  description:
    "Complete IELTS preparation course by Munzereen Shahid. Get the best IELTS training in Bangladesh with 10 Minute School.",
  keywords:
    "IELTS, English, Course, 10 Minute School, Munzereen Shahid, Bangladesh",
  openGraph: {
    title: "10 Minute School - IELTS Course",
    description: "Complete IELTS preparation course by Munzereen Shahid",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "10 Minute School - IELTS Course",
    description: "Complete IELTS preparation course by Munzereen Shahid",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme='light'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='canonical'
          href='https://10minuteschool.com/product/ielts-course'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AppProvider>
            <Navbar />
            {children}
            <FooterSection />
          </AppProvider>
      </body>
    </html>
  );
}
