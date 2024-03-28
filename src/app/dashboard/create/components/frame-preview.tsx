import Image from "next/image";
import { PackageCheck } from "lucide-react";
import { useRef, useState } from "react";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFrameStore } from "@/store/useFrameStore";

export function FramePreview() {
  const [frameOpacity, setFrameOpacity] = useState(1);
  const controlRef = useRef<ReactZoomPanPinchRef>(null);
  const frameData = useFrameStore((state) => state.frameData);

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
          <Textarea
            id="caption"
            value={frameData.caption}
            readOnly
          />
        </div>
      )}

      <Card className="h-[350px] relative overflow-hidden">
        <Image
          style={{ opacity: frameOpacity }}
          priority
          quality={100}
          src={frameData.fileUrl}
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

      <Button className="w-full mt-4">
        <PackageCheck className="mr-2 h-4 w-4" />
        Publish Frame
      </Button>
    </section>
  );
}
