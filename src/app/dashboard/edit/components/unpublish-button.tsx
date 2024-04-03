import { toast } from "sonner";
import { useMutation } from "urql";
import { graphql } from "@/graphql";
import { PackageX } from "lucide-react";
import { useRouter } from "next/navigation";
import { logEvent } from "firebase/analytics";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteImg } from "@/app/actions";
import { analytics } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

const DeleteFrameMutation = graphql(`
  mutation DeleteFrame($id: String!) {
    deleteFrame(id: $id) {
      id
    }
  }
`);

export function UnpublishButton({
  id,
  fileKey,
}: {
  id?: string;
  fileKey?: string;
}) {
  const router = useRouter();
  const [{ fetching }, deleteFrameFn] = useMutation(DeleteFrameMutation);
  const deleteImgWithFileKey = deleteImg.bind(null, fileKey);

  const handleDelete = async () => {
    if (!id) {
      toast.error("Frame not found");
      return;
    }

    if (fileKey) {
      await deleteImgWithFileKey();
    }

    deleteFrameFn({ id }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Frame unpublished");
      router.push("/dashboard");
      router.refresh();
      logEvent(analytics, "unpublish_frame");
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={fetching}
          size="icon"
          variant="destructive"
          className="flex-none"
        >
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
