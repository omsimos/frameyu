"use client"

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFrameStore } from "@/store/useFrameStore";
import { FrameForm } from "../../components/frame-form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required.",
    })
    .max(50, {
      message: "Title must not exceed 50 characters.",
    }),

  urlHandle: z
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
      urlHandle: frameData.urlHandle,
      caption: frameData.caption,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateDetails({
      ...values,
      urlHandle: values.urlHandle.toLowerCase(),
    });
    toast.success("Frame details updated");
  }

  return (
    <FrameForm
      form={form}
      onSubmit={onSubmit}
      sideButton={
        <Button
          disabled={!frameData.title || !frameData.urlHandle}
          onClick={() => {
            updateCurrentTab("preview");
          }}
          size="icon"
          variant="secondary"
          className="flex-none"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      }
    />
  );
}
