"use client";

import { Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";

export function Logout() {
  const { pending } = useFormStatus();
  const [_state, formAction] = useFormState(logout, { error: null });

  return (
    <form action={formAction}>
      <Button disabled={pending} variant="outline" type="submit">
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign out
      </Button>
    </form>
  );
}
