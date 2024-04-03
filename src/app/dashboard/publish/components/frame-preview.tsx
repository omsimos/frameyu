"use client"

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFrameStore } from "@/store/useFrameStore";
import { PublishButton } from "./publish-button";

export function FramePreview() {
  const [frameOpacity, setFrameOpacity] = useState(1);
  const controlRef = useRef<ReactZoomPanPinchRef>(null);
  const frameData = useFrameStore((state) => state.frameData);

  return (
    <section className="w-full space-y-6">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="url" className="mb-1">
          Frame URL
        </Label>
        <Input
          id="url"
          type="text"
          value={`frameyu.com/f/${frameData.urlHandle}`}
          readOnly
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title" className="mb-1">
          Title
        </Label>
        <Input id="title" value={frameData.title} readOnly />
      </div>

      {frameData.caption && (
        <div className="grid w-full items-center gap-1.5 my-2">
          <Label htmlFor="caption" className="mb-1">
            Caption
          </Label>
          <Textarea id="caption" value={frameData.caption} readOnly />
        </div>
      )}

      <div>
        <p className="text-sm mb-2 font-medium">Preview</p>
        <Card className="p-4">
          <div className="max-h-[400px] h-full aspect-square relative overflow-hidden">
            <Image
              style={{ opacity: frameOpacity }}
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
                  src="/assets/avatar.png"
                  height={500}
                  width={500}
                  className="object-contain w-full scale-[0.5]"
                  alt="Profile Picture"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </Card>

        <p className="text-sm text-muted-foreground mt-2">
          Confirm your frame details before publishing.
        </p>

        <PublishButton />
      </div>
    </section>
  );
}
