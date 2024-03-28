import Link from "next/link";

import { getSession } from "@/lib/auth";
import { MenuDropdown } from "./menu-dropdown";
import { NavbarButton } from "./navbar-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function DashboardNavbar() {
  const { user } = await getSession();

  return (
    <nav className="border-b border-zinc-300 py-6 mb-16">
      <div className="flex justify-between items-center container">
        <Link href="/dashboard" className="text-2xl font-black tracking-[-0.09em]">
          frame<span className="text-purple-600">yu</span>
        </Link>

        <div className="font-medium flex space-x-6 items-center">
          <NavbarButton />

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
