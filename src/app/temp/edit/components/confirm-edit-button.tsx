import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";

export function ConfirmEditButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
      <Button className="ml-2" type="submit" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Continue
      </Button>
    </>
  );
}
