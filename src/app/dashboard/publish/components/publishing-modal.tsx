"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "../../components/loader";
import { usePublishStore } from "@/store/usePublishStore";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
}

export function PublishingModal({ isOpen, onCancel }: Props) {
  const publishStatus = usePublishStore((state) => state.publishStatus);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md p-0 overflow-hidden">
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="relative z-50 bg-background p-6 rounded-lg shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex gap-4">
              <Loader className="size-12 text-primary/90" />
              <div>
                <h4 className="text-xl">Publishing Frame</h4>
                <p className="text-secondary-foreground/80 font-normal text-sm">
                  {publishStatus === "idle"
                    ? "This should be quick, please wait..."
                    : publishStatus}
                </p>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-4">
              Please do not close this window or reload the page while
              publishing. This will take a few seconds.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full mt-12"
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
