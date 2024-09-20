"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useFrameStore } from "@/store/useFrameStore";
import { FrameForm } from "./frame-form";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required.",
    })
    .max(50, {
      message: "Title must not exceed 50 characters.",
    }),

  handle: z
    .string()
    .min(8, {
      message: "URL handle must be at least 8 characters.",
    })
    .max(30, {
      message: "URL handle must not exceed 30 characters.",
    })
    .refine((url) => /^[a-zA-Z0-9_-]+$/.test(url), {
      message: "URL handle must be alphanumeric with no spaces.",
    }),

  caption: z.string().max(2200, {
    message: "Caption must not exceed 2,200 characters.",
  }),
});

export function FrameDetails() {
  const updateCurrentTab = useFrameStore((state) => state.updateCurrentTab);
  const updateDetails = useFrameStore((state) => state.updateDetails);
  const frameData = useFrameStore((state) => state.frameData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: frameData.title,
      handle: frameData.handle,
      caption: frameData.caption,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateDetails({
      ...values,
      handle: values.handle.toLowerCase(),
    });
    toast.success("Frame details updated");
  }

  return (
    <FrameForm
      form={form}
      onSubmit={onSubmit}
      sideButton={
        <Button
          disabled={!frameData.title || !frameData.handle}
          onClick={() => {
            updateCurrentTab("preview");
          }}
          size="icon"
          variant="outline"
          className="flex-none"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      }
    />
  );
}
