import Link from "next/link";

import { logout } from "@/app/actions";
import { validateRequest } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function DashboardNavbar() {
  const { user } = await validateRequest();

  return (
    <nav className="py-12 flex justify-between items-center">
      <Link href="/" className="text-2xl font-black tracking-[-0.09em]">
        frame<span className="text-purple-600">yu</span>
      </Link>

      <div className="font-medium flex space-x-12 items-center">
        <form action={logout}>
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>

        <Avatar>
          <AvatarImage src={user?.image} alt="user avatar" />
          <AvatarFallback>
            {user?.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
