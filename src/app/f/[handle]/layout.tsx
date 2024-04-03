import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frameyu",
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center mt-12 container">
      {children}
    </div>
  );
}
