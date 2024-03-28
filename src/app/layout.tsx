import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://frameyu.omsimos.com"),
  title: "Frameyu",
  description:
    "Transform your photos with Frameyu! Our easy-to-use platform lets you overlay custom frames, adjust your photo's position, and download high-quality, watermark-free images.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Frameyu — Supercharge your campaign!",
    description:
      "Transform your photos with Frameyu! Our easy-to-use platform lets you overlay custom frames, adjust your photo's position, and download high-quality, watermark-free images.",
    images: [
      "https://github.com/joshxfi/joshxfi/assets/69457996/7968f64d-d49f-4174-a698-2e157ab6af78",
    ],
  },
  twitter: {
    card: "summary_large_image",
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
        <NextTopLoader showSpinner={false} />

        {children}
        <Footer />
      </body>
    </html>
  );
}
