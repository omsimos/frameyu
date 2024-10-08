"use client";

import { toast } from "sonner";
import Image from "next/image";
import { Download, ImagePlus } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import { Button } from "@/components/ui/button";
import { debounce, handleImageChange } from "@/lib/utils";

export function RenderFrame({
  id,
  frameUrl,
}: {
  id: string;
  frameUrl: string;
}) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [frameOpacity, setFrameOpacity] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.5);

  const profileRef = useRef<HTMLInputElement>(null);
  const controlRef = useRef<ReactZoomPanPinchRef>(null);

  const handleDownload = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        position,
        scale,
        frameUrl,
        photoUrl,
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `frameyu-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  const handleTransform = useCallback(
    debounce((ref: ReactZoomPanPinchRef) => {
      const previewScale = 1280 / 400;

      setPosition({
        x: ref.state.positionX * previewScale,
        y: ref.state.positionY * previewScale,
      });
      setScale(ref.state.scale);
    }, 100),
    [],
  );

  return (
    <div className="w-full">
      <input
        ref={profileRef}
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleImageChange({
            file: e.target.files![0],
            onSuccess: setPhotoUrl,
            onError: (err) => toast.error(err.message),
          })
        }
        className="hidden"
      />

      <section className="flex flex-col items-center gap-8">
        <div className="aspect-square relative max-w-[400px] w-full">
          <Image
            style={{ opacity: frameOpacity }}
            priority
            quality={100}
            src={frameUrl}
            height={500}
            width={500}
            className="object-cover pointer-events-none aspect-square w-full h-full absolute top-0 left-0 z-10 rounded-md"
            alt="Frame Image"
          />

          {photoUrl && (
            <TransformWrapper
              ref={controlRef}
              onPanningStart={() => setFrameOpacity(0.7)}
              onPanningStop={() => setFrameOpacity(1)}
              onPinchingStop={() => setFrameOpacity(1)}
              onTransformed={handleTransform}
              minScale={0.1}
              maxScale={5}
              initialScale={0.5}
              centerOnInit
              limitToBounds={false}
              centerZoomedOut={false}
            >
              <TransformComponent>
                <Image
                  quality={100}
                  src={photoUrl}
                  height={500}
                  width={500}
                  className="w-full object-contain aspect-square"
                  alt="Profile Picture"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          )}
        </div>
      </section>

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
          disabled={!frameUrl || !photoUrl}
          onClick={handleDownload}
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" />
          Download image
        </Button>
      </div>
    </div>
  );
}
