import type { Metadata } from "next";
import { DashboardNavbar } from "./components/navbar";

export const metadata: Metadata = {
  title: "Frameyu | Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardNavbar />
      {children}
    </div>
  );
}