import { useMutation } from "urql";
import { graphql } from "@/graphql";
import { PackageX } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteFrameMutation = graphql(`
  mutation DeleteFrame($id: String!) {
    deleteFrame(id: $id) {
      id
    }
  }
`);

export function UnpublishButton({ id }: { id?: string }) {
  const router = useRouter();
  const [{ fetching }, deleteFrameFn] = useMutation(DeleteFrameMutation);

  const handleDelete = () => {
    if (!id) {
      toast.error("Frame not found");
      return;
    }

    deleteFrameFn({ id }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Frame unpublished");
      router.push("/dashboard");
      router.refresh();
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