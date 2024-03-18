import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { lucia, validateRequest } from "@/lib/auth";
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

async function logout(): Promise<ActionResult> {
  "use server";

  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/login");
}

interface ActionResult {
  error: string | null;
}
