"use client";

import { toast } from "sonner";
import Image from "next/image";
import { nanoid } from "nanoid";
import { domToPng } from "modern-screenshot";
import { logEvent } from "firebase/analytics";
import { Download, ImagePlus } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import { analytics } from "@/lib/firebase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleImageChange } from "@/lib/utils";

export function Frame({ id, frameUrl }: { id: string; frameUrl: string }) {
  const [profilePic, setProfilePic] = useState("");
  const [frameOpacity, setFrameOpacity] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const controlRef = useRef<ReactZoomPanPinchRef>(null);

  const saveImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toast.promise(
      domToPng(ref.current, {
        quality: 1,
        scale: 4,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `frameyu-${nanoid(5)}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        }),
      { loading: "Saving...", success: "Download ready", error: "Error!" },
    );

    logEvent(analytics, "save_image", {
      type: "published",
      frame_id: id,
    });
  }, [ref, id]);

  return (
    <div className="w-full">
      <input
        ref={profileRef}
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleImageChange({
            file: e.target.files![0],
            onSuccess: setProfilePic,
            onError: (err) => toast.error(err.message),
          })
        }
        className="hidden"
      />

      <Card className="p-4 w-full aspect-square">
        <div className="rounded-md overflow-hidden">
          <div
            ref={ref}
            className="aspect-square w-full grid place-items-center relative overflow-hidden"
          >
            <Image
              style={{ opacity: frameOpacity }}
              priority
              quality={100}
              src={frameUrl}
              height={500}
              width={500}
              className="object-cover pointer-events-none aspect-square w-full absolute top-0 left-0 z-10"
              alt="Frame image"
            />

            {profilePic && (
              <TransformWrapper
                ref={controlRef}
                onPanningStart={() => setFrameOpacity(0.7)}
                onPanningStop={() => setFrameOpacity(1)}
                onPinchingStop={() => setFrameOpacity(1)}
              >
                <TransformComponent>
                  <Image
                    quality={100}
                    src={profilePic}
                    height={500}
                    width={500}
                    className="w-full object-contain aspect-square scale-[0.5]"
                    alt="Profile picture"
                    draggable={false}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}
          </div>
        </div>
      </Card>

      <p className="text-sm text-muted-foreground my-2">
        Pan and pinch to adjust your image.
      </p>

      <div className="mt-6 flex items-center space-x-2">
        {frameUrl && (
          <Button
            disabled={!frameUrl}
            onClick={() => profileRef.current?.click()}
            className="w-full"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Select photo
          </Button>
        )}

        <Button
          disabled={!frameUrl || !profilePic}
          onClick={saveImage}
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" />
          Download image
        </Button>
      </div>
    </div>
  );
}
