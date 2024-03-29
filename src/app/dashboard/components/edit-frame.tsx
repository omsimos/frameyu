"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { EditFrameForm } from "./edit-frame-form";
import { useMediaQuery } from "@/hooks/use-media-query";

export type EditFrameProps = {
  id: string;
  title: string;
  caption: string | null;
  imgUrl: string;
  handle: string;
};

export function EditFrame(props: EditFrameProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>Edit Frame</SheetTitle>
            <SheetDescription>
              Make changes to your frame details here.
            </SheetDescription>
          </SheetHeader>
          <EditFrameForm {...props} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pb-12">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Frame</DrawerTitle>
          <DrawerDescription>
            Make changes to your frame details here.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <EditFrameForm {...props} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
