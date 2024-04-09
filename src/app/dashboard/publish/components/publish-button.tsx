import { useFormStatus } from "react-dom";
import { PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublishButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} className="w-full mt-4">
      <PackageCheck className="mr-2 h-4 w-4" />
      Publish Frame
    </Button>
  );
}
