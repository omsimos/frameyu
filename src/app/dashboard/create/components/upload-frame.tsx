"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useRef, useState } from "react";

import { handleImageChange } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileImage, Frame } from "lucide-react";

export function UploadFrame() {
  const [frame, setFrame] = useState("");
  const frameRef = useRef<HTMLInputElement>(null);

  return (
    <section className="w-full">
      <Card className="h-[350px] p-4">
        {frame ? (
          <Image
             priority
            quality={100}
            src={frame}
            height={500}
            width={500}
            className="object-cover pointer-events-none aspect-square w-full rounded-md"
            alt="DP Frame"
          />
        ) : (
          <button
            type="button"
            className="bg-zinc-200 w-full h-full rounded-md grid place-items-center"
          >
            <Frame className="text-zinc-400 h-6 w-6" />
          </button>
        )}
      </Card>

      <div className="flex items-center space-x-2">
        <Button
          className="w-full mt-4"
          onClick={() => frameRef.current?.click()}
        >
          <FileImage className="mr-2 h-4 w-4" />
          Upload Frame
        </Button>

        <Button
          disabled={!frame}
          className="w-full mt-4"
          onClick={() => frameRef.current?.click()}
        >
          Proceed
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <input
        ref={frameRef}
        type="file"
        accept="image/png"
        onChange={(e) =>
          handleImageChange({
            file: e.target.files![0],
            onSuccess: setFrame,
            onError: (err) => toast.error(err.message),
          })
        }
        className="hidden"
      />
    </section>
  );
}
