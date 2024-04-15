"use client";

import { toast } from "sonner";
import Image from "next/image";
import { nanoid } from "nanoid";
import { domToPng } from "modern-screenshot";
import { logEvent } from "firebase/analytics";
import { useState, useCallback, useRef } from "react";
import { Frame, ImageDown, ImagePlus } from "lucide-react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import { analytics } from "@/lib/firebase";
import { Card } from "@/components/ui/card";
import { handleImageChange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrowserWarning } from "@/components/browser-warning";

export default function Home() {
  const [frame, setFrame] = useState("");
  const [photo, setProfilePic] = useState("");
  const [frameOpacity, setFrameOpacity] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLInputElement>(null);
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
      type: "tool",
    });
  }, [ref]);

  return (
    <section className="max-w-[400px] mx-auto mt-20">
      <BrowserWarning />

      <Card className="p-4 w-full">
        <div className="max-h-[400px] h-full aspect-square relative overflow-hidden">
          {frame ? (
            <Image
              style={{ opacity: frameOpacity }}
              quality={100}
              src={frame}
              height={500}
              width={500}
              className="object-cover pointer-events-none aspect-square w-full rounded-md absolute top-0 left-0 z-10"
              alt="DP Frame"
            />
          ) : (
            <button
              type="button"
              onClick={() => frameRef.current?.click()}
              className="bg-zinc-200 w-full aspect-square rounded-md grid place-items-center"
            >
              <Frame className="text-zinc-400 h-6 w-6" />
            </button>
          )}

          {photo && (
            <TransformWrapper
              ref={controlRef}
              onPanningStart={() => setFrameOpacity(0.7)}
              onPanningStop={() => setFrameOpacity(1)}
              onPinchingStop={() => setFrameOpacity(1)}
            >
              <TransformComponent>
                <Image
                  quality={100}
                  src={photo}
                  height={500}
                  width={500}
                  className="object-contain w-full scale-[0.5]"
                  alt="Profile Picture"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          )}
        </div>
      </Card>

      <p className="text-sm text-muted-foreground my-2">
        Ensure that your image is transparent (.png)
      </p>

      <div className="flex items-center space-x-2 mt-4">
        <Button className="w-full" onClick={() => frameRef.current?.click()}>
          <Frame className="mr-2 h-4 w-4" />
          Add Frame
        </Button>

        {frame && (
          <Button
            disabled={!frame}
            onClick={() => profileRef.current?.click()}
            className="w-full"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Select Photo
          </Button>
        )}

        {frame && photo && (
          <Button
            size="icon"
            variant="secondary"
            className="flex-none"
            onClick={saveImage}
          >
            <ImageDown className="h-4 w-4" />
          </Button>
        )}
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
    </section>
  );
}
