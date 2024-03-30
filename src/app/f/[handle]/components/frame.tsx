"use client";

import { toast } from "sonner";
import Image from "next/image";
import { nanoid } from "nanoid";
import { domToPng } from "modern-screenshot";
import { useState, useCallback, useRef } from "react";
import { FragmentOf, graphql, readFragment } from "gql.tada";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import { Card } from "@/components/ui/card";
import { handleImageChange } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const FrameFields = graphql(`
  fragment FrameFields on Frame {
    id
    title
    handle
    imgUrl
    caption
  }
`);

export function Frame({ frame }: { frame: FragmentOf<typeof FrameFields> }) {
  const data = readFragment(FrameFields, frame);

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
      { loading: "Saving...", success: "Saved!", error: "Error!" },
    );
  }, [ref]);

  return (
    <section className="flex justify-center">
      <div className="md:mt-16 mt-8 flex flex-col">
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

        <Card className="p-4">
          <div
            ref={ref}
            className="max-h-[400px] aspect-square relative overflow-hidden p-4"
          >
            <Image
              style={{ opacity: frameOpacity }}
              priority
              quality={100}
              src={data.imgUrl}
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
          </div>
        </Card>

        <div className="mt-6 space-x-3 text-sm md:text-base flex w-full self-start">
          {frame && (
            <Button
              disabled={!frame}
              onClick={() => profileRef.current?.click()}
              className="w-full"
            >
              {profilePic ? "Change" : "Upload"} Photo
            </Button>
          )}

          {frame && profilePic && (
            <Button onClick={saveImage} className="w-full">
              Save Image
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
