import Link from "next/link";
import { Frame } from "lucide-react";

import { getSession } from "@/lib/auth";
import { MenuDropdown } from "./menu-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

export async function DashboardNavbar() {
  const { user } = await getSession();

  return (
    <nav className="border-b border-zinc-300 py-8 mb-16">
      <div className="flex justify-between items-center container">
        <Link href="/" className="text-2xl font-black tracking-[-0.09em]">
          frame<span className="text-purple-600">yu</span>
        </Link>

        <div className="font-medium flex space-x-6 items-center">
          <Link href="/dashboard/create" className={buttonVariants()}>
            <Frame className="mr-2 h-4 w-4" />
            Create Frame
          </Link>

          <MenuDropdown>
            <button className="outline-none" type="button">
              <Avatar>
                <AvatarImage src={user?.image} alt="user avatar" />
                <AvatarFallback>
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
          </MenuDropdown>
        </div>
      </div>
    </nav>
  );
}
