import Image from "next/image";
import { toast } from "sonner";
import { useMutation } from "urql";
import { useRef, useState } from "react";
import { PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

import { graphql } from "@/graphql";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/lib/uploadthing";
import { Textarea } from "@/components/ui/textarea";
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

export function FramePreview() {
  const router = useRouter();
  const [{ fetching }, createFrameFn] = useMutation(CreateFrameMutation);
  const [frameOpacity, setFrameOpacity] = useState(1);
  const controlRef = useRef<ReactZoomPanPinchRef>(null);
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
    <section className="w-full space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="url" className="mb-1">
          Frame URL
        </Label>
        <Input
          id="url"
          type="text"
          value={`yu.omsimos.com/f/${frameData.urlHandle}`}
          readOnly
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title" className="mb-1">
          Title
        </Label>
        <Input id="title" value={frameData.title} readOnly />
      </div>

      {frameData.caption && (
        <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
          <Label htmlFor="caption" className="mb-1">
            Caption
          </Label>
          <Textarea id="caption" value={frameData.caption} readOnly />
        </div>
      )}

      <div>
        <Card className="h-[350px] relative overflow-hidden">
          <Image
            style={{ opacity: frameOpacity }}
            priority
            quality={100}
            src={frameData.imgUrl}
            height={500}
            width={500}
            className="object-cover pointer-events-none aspect-square w-full rounded-md absolute top-0 left-0 z-10"
            alt="DP Frame"
          />

          <TransformWrapper
            ref={controlRef}
            onPanningStart={() => setFrameOpacity(0.7)}
            onPanningStop={() => setFrameOpacity(1)}
            onPinchingStop={() => setFrameOpacity(1)}
          >
            <TransformComponent>
              <Image
                quality={100}
                src="/assets/characters.png"
                height={500}
                width={500}
                className="object-contain w-full scale-[0.5]"
                alt="Profile Picture"
                draggable={false}
              />
            </TransformComponent>
          </TransformWrapper>
        </Card>

        <p className="text-sm text-muted-foreground mt-2">
          Confirm your frame details before publishing.
        </p>

        <Button
          disabled={fetching || isPublishing}
          onClick={handlePublish}
          className="w-full mt-4"
        >
          <PackageCheck className="mr-2 h-4 w-4" />
          Publish Frame
        </Button>
      </div>
    </section>
  );
}
