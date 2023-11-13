import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://framedip.omsimos.com"),
  title: "FrameDip",
  description:
    "Transform your photos with FrameDip! Our easy-to-use platform lets you overlay custom frames, fine-tune your photo's position, and download high-quality, watermark-free images.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title:
      "Choose FrameDip for a watermark-free and refined frame overlay controls.",
    description:
      "Transform your photos with FrameDip! Our easy-to-use platform lets you overlay custom frames, fine-tune your photo's position, and download high-quality, watermark-free images.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} max-w-screen-xl px-6 2xl:px-0 mx-auto bg-white text-secondary-100`}
      >
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              border: "2px solid #000",
              padding: "12px",
              marginBottom: '52px',
              fontWeight: '500'
            },
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
