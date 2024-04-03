import type { Metadata } from "next";
import { DashboardNavbar } from "./components/navbar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Frameyu | Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <DashboardNavbar />
      {children}
    </div>
  );
}
