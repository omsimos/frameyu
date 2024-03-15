import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/utils/button";
import { lucia, validateRequest } from "@/lib/auth";

export default async function RegPage() {
  const { user } = await validateRequest();

  if (user) {
    return (
      <form action={logout}>
        <p>Hello, {user.username}</p>

        <Button type="submit">Sign out</Button>
      </form>
    );
  }

  return (
    <section>
      <Link href="/login/google" type="button">
        Login
      </Link>
    </section>
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
