import Link from "next/link";
import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "@/components/icons";

export default async function LoginPage() {
  const { user } = await validateRequest();

  if (user) {
    redirect("/dashboard");
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
        <CardFooter className="flex flex-col mt-4">
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
