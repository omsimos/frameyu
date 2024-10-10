"use client";

import Image from "next/image";
import { useRef } from "react";
import { toast } from "sonner";
import { ImageUpIcon } from "lucide-react";
import { handleImageChange } from "@/lib/utils";
import { usePublishStore } from "@/store/usePublishStore";

export function UploadFrame() {
  const frameRef = useRef<HTMLInputElement>(null);
  const frameDetails = usePublishStore((state) => state.frameDetails);
  const updateFile = usePublishStore((state) => state.updateFile);
  const publishStatus = usePublishStore((state) => state.publishStatus);

  const imgUrl = frameDetails.url;

  return (
    <form className="grid items-start w-full max-w-[300px] aspect-square gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Campaign Frame<span className="text-destructive">*</span>
        </legend>
        <button
          onClick={() => frameRef.current?.click()}
          disabled={publishStatus !== "idle"}
          className="size-full aspect-square grid place-items-center relative"
          type="button"
        >
          {imgUrl && (
            <Image
              src={imgUrl}
              height={300}
              width={300}
              className="object-cover rounded-md absolute inset-0"
              alt="Campaign Frame"
            />
          )}
          <div className="grid place-items-center">
            <ImageUpIcon className="size-6 text-primary" />
            <h4 className="text-sm mt-2 text-secondary-foreground/50">
              Upload Image (.png)
            </h4>
          </div>
        </button>
      </fieldset>

      <input
        ref={frameRef}
        type="file"
        accept="image/png"
        disabled={publishStatus !== "idle"}
        onChange={(e) =>
          handleImageChange({
            file: e.target.files![0],
            sizeLimit: 4,
            onSuccess: (url) => updateFile({ url, file: e.target.files![0] }),
            onError: (err) => toast.error(err.message),
          })
        }
        className="hidden"
      />
    </form>
  );
}
