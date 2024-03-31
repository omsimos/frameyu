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
    <div className="min-h-screen flex flex-col items-center mt-20">
      <p className="text-2xl font-black tracking-[-0.09em]">
        frame<span className="text-purple-600">yu</span>
      </p>

      {children}
    </div>
  );
}
