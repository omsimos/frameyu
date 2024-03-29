import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FrameForm } from "./frame-form";
import { EditFrameProps } from "./edit-frame";
import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";

const formSchema = z.object({
  title: z.string().max(50, {
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

export function EditFrameForm(props: EditFrameProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.title,
      urlHandle: props.handle,
      caption: props.caption ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Frame details updated");
  }

  return (
    <FrameForm
      form={form}
      onSubmit={onSubmit}
      sideButton={
        <Button size="icon" variant="destructive" className="flex-none">
          <PackageX className="h-4 w-4" />
        </Button>
      }
    />
  );
}
