"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditDialog } from "./edit-dialog";
import { UnpublishDialog } from "./unpublish-dialog";
import { FrameForm } from "../../components/frame-form";
import { useEditFrameStore } from "@/store/useEditFrameStore";

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

export function EditForm() {
  const [open, setOpen] = useState(false);
  const data = useEditFrameStore((state) => state.data);
  const updateEditData = useEditFrameStore((state) => state.updateEditData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      handle: data.handle,
      caption: data.caption ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(true);

    updateEditData({
      id: data.id,
      imgUrl: data.imgUrl,
      ...values,
    });
  }

  return (
    <>
      <EditDialog open={open} onOpenChange={setOpen} />

      <FrameForm
        className="max-w-[400px] mx-auto"
        form={form}
        onSubmit={onSubmit}
        sideButton={
          <UnpublishDialog
            id={data.id}
            fileKey={data.imgUrl?.substring(data.imgUrl.lastIndexOf("/") + 1)}
          />
        }
      />
    </>
  );
}
