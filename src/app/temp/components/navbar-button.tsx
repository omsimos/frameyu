"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Frame, LayoutDashboard } from "lucide-react";

export function NavbarButton() {
  const pathname = usePathname();

  return ["/dashboard/publish", "/dashboard/edit"].includes(pathname) ? (
    <Link
      href="/dashboard"
      className={buttonVariants({
        variant: "outline",
      })}
    >
      <LayoutDashboard className="mr-2 h-4 w-4" />
      Dashboard
    </Link>
  ) : (
    <Link href="/dashboard/publish" className={buttonVariants()}>
      <Frame className="mr-2 h-4 w-4" />
      Publish Frame
    </Link>
  );
}
