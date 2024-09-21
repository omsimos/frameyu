"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { FrameIcon } from "lucide-react";
import { handleImageChange } from "@/lib/utils";

export function UploadFrame() {
  const [fileUrl, setFileUrl] = useState("");
  const frameRef = useRef<HTMLInputElement>(null);

  return (
    <form className="grid items-start w-full max-w-[300px] aspect-square gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Upload Frame<span className="text-destructive">*</span>
        </legend>
        <button
          onClick={() => frameRef.current?.click()}
          className="size-full aspect-square grid place-items-center"
          type="button"
        >
          {fileUrl ? (
            <Image
              src={fileUrl}
              height={300}
              width={300}
              className="object-cover rounded-md"
              alt="Campaign Frame"
            />
          ) : (
            <FrameIcon className="size-6" />
          )}
        </button>
      </fieldset>

      <input
        ref={frameRef}
        type="file"
        accept="image/png"
        onChange={(e) =>
          handleImageChange({
            file: e.target.files![0],
            sizeLimit: 4,
            onSuccess: setFileUrl,
            onError: (err) => toast.error(err.message),
          })
        }
        className="hidden"
      />
    </form>
  );
}
