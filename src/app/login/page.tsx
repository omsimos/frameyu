import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/utils/button";
import { lucia, validateRequest } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "@/components/icons";

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
    <section className="mx-auto max-w-[420px]">
      <Card className="mt-24 text-center p-4">
        <CardHeader>
          <CardTitle>Continue with Frameyu</CardTitle>
          <CardDescription>
            Connect your Google account to get started.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col">
          <Link
            href="/login/google"
            className={cn(
              buttonVariants({
                variant: "default",
              }),
              "w-full",
            )}
            type="button"
          >
            <GoogleIcon className="mr-2 h-4 w-4" />
            Sign in with Google
          </Link>

          <p className="px-8 text-center text-sm text-muted-foreground pt-8">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
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
