import { useFormStatus } from "react-dom";
import { Loader2, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublishButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full mt-4">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PackageCheck className="mr-2 h-4 w-4" />
      )}
      Publish Frame
    </Button>
  );
}
