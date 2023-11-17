import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://framedip.omsimos.com"),
  title: "FrameDip",
  description:
    "Transform your photos with FrameDip! Our easy-to-use platform lets you overlay custom frames, adjust your photo's position, and download high-quality, watermark-free images.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "FrameDip: Supercharge your campaign!",
    description:
      "Transform your photos with FrameDip! Our easy-to-use platform lets you overlay custom frames, adjust your photo's position, and download high-quality, watermark-free images.",
    images: [
      "https://github.com/joshxfi/joshxfi/assets/69457996/343382e2-0123-4d2e-8d98-716a7694b8d5",
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
      <body
        className={`${GeistSans.className} max-w-screen-xl px-6 2xl:px-0 mx-auto bg-white text-secondary-100`}
      >
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              border: "2px solid #000",
              padding: "12px",
              marginBottom: "52px",
              fontWeight: "500",
            },
          }}
        />
        <NextTopLoader showSpinner={false} />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
