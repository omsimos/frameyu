import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="py-6 border-b border-b-secondary">
      <div className="flex justify-between items-center container max-w-screen-xl">
        <Link href="/" className="text-2xl font-black tracking-[-0.09em]">
          frame<span className="text-primary">yu</span>
        </Link>

        <div className="flex space-x-10 items-center">
          <Link className="text-secondary-foreground" href="/#pricing">
            Pricing
          </Link>

          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full px-6 py-2 bg-primary text-white text-base font-normal",
            )}
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
