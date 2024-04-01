import { toast } from "sonner";
import { graphql } from "@/graphql";
import { useMutation } from "@urql/next";
import { PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/lib/uploadthing";
import { useFrameStore } from "@/store/useFrameStore";

const CreateFrameMutation = graphql(`
  mutation CreateFrame($input: CreateFrameInput!) {
    createFrame(input: $input) {
      id
      title
      caption
      handle
      imgUrl
    }
  }
`);

export function PublishButton() {
  const router = useRouter();
  const [{ fetching }, createFrameFn] = useMutation(CreateFrameMutation);

  const frameData = useFrameStore((state) => state.frameData);
  const isPublishing = useFrameStore((state) => state.isPublishing);
  const updateIsPublishing = useFrameStore((state) => state.updateIsPublishing);

  const handlePublish = () => {
    if (!frameData.file) {
      return;
    }

    updateIsPublishing(true);

    toast.promise(
      uploadFiles("imageUploader", {
        files: [frameData.file],
      }),
      {
        loading: "Please wait...",
        success: (data) => {
          toast.promise(
            createFrameFn({
              input: {
                title: frameData.title,
                handle: frameData.urlHandle,
                caption: frameData.caption,
                imgUrl: data[0].url,
              },
            }),
            {
              loading: "Publishing...",
              success: (res) => {
                if (res.error) {
                  updateIsPublishing(false);
                  return `Error publishing frame: ${res.error.message}`;
                }

                updateIsPublishing(false);
                router.push("/dashboard");
                router.refresh();
                return "Frame published";
              },
              error: (err) => {
                updateIsPublishing(false);
                return `Error publishing frame: ${err.message}`;
              },
            },
          );
          return "Almost there...";
        },
        error: (err) => {
          updateIsPublishing(false);
          return `Error uploading frame: ${err.message}`;
        },
      },
    );
  };

  return (
    <Button
      disabled={fetching || isPublishing}
      onClick={handlePublish}
      className="w-full mt-4"
    >
      <PackageCheck className="mr-2 h-4 w-4" />
      Publish Frame
    </Button>
  );
}
