import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.frameyu.com"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Omsimos Collective" }],
  title: "Frameyu: The Frame Publisher to Supercharge Your Campaign",
  description:
    "Effortlessly manage and publish custom frames for your marketing campaigns with Frameyu, the free online frame publisher. Create shareable links to boost engagement. Download in high-quality images, watermark-free. Get started for free today!",
  openGraph: {
    type: "website",
    siteName: "Frameyu",
    url: "https://www.frameyu.com",
    title: "Frameyu — Supercharge Your Campaign",
    description:
      "Effortlessly manage and publish custom frames for your marketing campaigns with Frameyu, the free online frame publisher. Create shareable links to boost engagement. Download in high-quality images, watermark-free. Get started for free today!",
    images: [
      "https://github.com/omsimos/frameyu/assets/69457996/8f7f44f1-b439-46c6-b296-fdf4bdf19bde",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frameyu — Supercharge Your Campaign",
    description:
      "Effortlessly manage and publish custom frames for your marketing campaigns with Frameyu, the free online frame publisher. Create shareable links to boost engagement. Download in high-quality images, watermark-free. Get started for free today!",
    images: [
      "https://github.com/omsimos/frameyu/assets/69457996/8f7f44f1-b439-46c6-b296-fdf4bdf19bde",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${GeistSans.className} bg-background text-zinc-800`}>
        <Toaster />
        <NextTopLoader color="#BB93FF" showSpinner={false} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
