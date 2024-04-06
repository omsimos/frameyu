"use client";

import { useState, useEffect } from "react";
import { Info, TriangleAlert } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BrowserWarning() {
  const [isFb, setIsFb] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [warnModal, setWarnModal] = useState(false);

  useEffect(() => {
    if (navigator.userAgent.match(/FBAN|FBAV/i)) {
      setIsFb(true);
      setWarnModal(true);
    }

    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      setIsIos(true);
    }
  }, []);

  return (
    <>
      <Dialog open={warnModal} onOpenChange={setWarnModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>In-app browser detected</DialogTitle>
            <DialogDescription>
              To avoid running into issues with Frameyu, we recommend using an
              external browser.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isFb ? (
        <Alert className="my-4" variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>In-app browser detected</AlertDescription>
        </Alert>
      ) : (
        isIos && (
          <Alert className="my-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Save to Photos (iOS)</AlertTitle>
            <AlertDescription>
              After downloading, go to Downloads folder in Files, press and hold the image, then tap
              "Save Image"
            </AlertDescription>
          </Alert>
        )
      )}
    </>
  );
}
