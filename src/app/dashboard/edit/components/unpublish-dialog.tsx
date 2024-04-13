import { toast } from "sonner";
import { Loader2, PackageX } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { unpublishFrame } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function UnpublishDialog({
  id,
  fileKey,
}: {
  id?: string;
  fileKey?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUnpublish = async () => {
    setLoading(true);

    if (!id || !fileKey) {
      toast.error("Frame not found");
      setLoading(false);
      return;
    }

    const res = await unpublishFrame({ id, fileKey });

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.success) {
      toast.success("Frame unpublished");
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive" className="flex-none">
          <PackageX className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            published frame and your custom URL handle will be available for
            use.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button disabled={loading} onClick={handleUnpublish}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
