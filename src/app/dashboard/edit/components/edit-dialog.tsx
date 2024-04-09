import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { editFrame } from "@/app/actions";
import { ConfirmEditButton } from "./confirm-edit-button";
import { useEditFrameStore } from "@/store/useEditFrameStore";

export function EditDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const data = useEditFrameStore((state) => state.data);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to edit?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirm your details and if you edit your URL handle, the previous
            handle will be available to other users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form
            action={async () => {
              const res = await editFrame({
                id: data.id!,
                title: data.title!,
                handle: data.handle!,
                caption: data.caption!,
              });

              if (res.error) {
                toast.error(res.error);
                return;
              }

              if (res.success) {
                toast.success("Frame edited successfully.");
                router.push("/dashboard");
              }
            }}
          >
            <ConfirmEditButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
