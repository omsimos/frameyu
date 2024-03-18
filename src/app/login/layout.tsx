import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Frameyu | Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
