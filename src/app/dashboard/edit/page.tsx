"use client";

import { z } from "zod";
import { toast } from "sonner";
import { Suspense } from "react";
import { graphql } from "@/graphql";
import { useMutation } from "urql";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { FrameForm } from "../components/frame-form";
import { useEditFrameStore } from "@/store/useEditFrameStore";
import { UnpublishButton } from "./components/unpublish-button";

export default function Page() {
  return (
    <Suspense>
      <EditPage />
    </Suspense>
  );
}

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

const EditFrameMutation = graphql(`
  mutation EditMutation($input: EditFrameInput!) {
    editFrame(input: $input) {
      id
    }
  }
`);

function EditPage() {
  const router = useRouter();
  const [{ fetching }, editFrameFn] = useMutation(EditFrameMutation);
  const data = useEditFrameStore((state) => state.data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      urlHandle: data.handle,
      caption: data.caption ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data.id) {
      toast.error("Frame ID not found");
      return;
    }

    editFrameFn({
      input: {
        id: data.id,
        title: values.title,
        handle: values.urlHandle,
        caption: values.caption,
      },
    }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Frame details updated successfully");
      router.push("/dashboard");
      router.refresh();
    });
  }

  return (
    <section className="w-full container">
      <div className="text-center mb-12">
        <h1 className="font-semibold text-3xl">Edit Your Frame</h1>
        <p className="text-muted-foreground">
          Let&apos;s supercharge your campaign!
        </p>
      </div>

      <FrameForm
        disabled={fetching}
        className="max-w-[400px] mx-auto"
        form={form}
        onSubmit={onSubmit}
        sideButton={<UnpublishButton id={data.id} />}
      />
    </section>
  );
}