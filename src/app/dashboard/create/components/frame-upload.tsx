import { useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowRight, FileImage, Frame } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleImageChange } from "@/lib/utils";
import { useFrameStore } from "@/store/useFrameStore";

export function FrameUpload() {
  const frameRef = useRef<HTMLInputElement>(null);

  const frameData = useFrameStore((state) => state.frameData);
  const updateFileUrl = useFrameStore((state) => state.updateFileUrl);
  const updateCurrentTab = useFrameStore((state) => state.updateCurrentTab);

  return (
    <section className="w-full">
      <Card className="h-[350px] p-4">
        {frameData.fileUrl ? (
          <Image
            priority
            quality={100}
            src={frameData.fileUrl}
            height={500}
            width={500}
            className="object-cover pointer-events-none aspect-square w-full rounded-md"
            alt="DP Frame"
          />
        ) : (
          <button
            type="button"
            onClick={() => frameRef.current?.click()}
            className="bg-zinc-200 w-full h-full rounded-md grid place-items-center"
          >
            <Frame className="text-zinc-400 h-6 w-6" />
          </button>
        )}
      </Card>

      <div className="flex items-center space-x-2 mt-4">
        <Button className="w-full" onClick={() => frameRef.current?.click()}>
          <FileImage className="mr-2 h-4 w-4" />
          Upload Frame
        </Button>

        <Button
          onClick={() => {
            updateCurrentTab("caption");
          }}
          disabled={!frameData.fileUrl}
          size="icon"
          variant="secondary"
          className="flex-none"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <input
        ref={frameRef}
        type="file"
        accept="image/png"
        onChange={(e) =>
          handleImageChange({
            file: e.target.files![0],
            onSuccess: updateFileUrl,
            onError: (err) => toast.error(err.message),
          })
        }
        className="hidden"
      />
    </section>
  );
}
