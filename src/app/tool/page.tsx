"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { toPng } from "html-to-image";
import Draggable from "react-draggable";
import { useState, useCallback, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { Button } from "@/components/utils/button";
import { IconPhoto } from "@/components/utils/icons";

const handlePicChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!e.target.files) return;

  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const dataUrl = reader.result as string;
    setter(dataUrl);
  };

  reader.readAsDataURL(file);
};

export default function Home() {
  const [frame, setFrame] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [frameOpacity, setFrameOpacity] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLInputElement>(null);

  const saveImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toast.promise(
      toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 3,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "gravitate-dp.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        }),
      { loading: "Saving...", success: "Saved!", error: "Error!" }
    );
  }, [ref]);

  return (
    <section className="flex justify-center">
      <div className="items-center flex-col justify-center border-2 border-secondary-200 p-6 rounded-2xl inline-flex md:mt-16 mt-8">
        <input
          ref={profileRef}
          type="file"
          accept="image/*"
          onChange={(e) => handlePicChange(e, setProfilePic)}
          className="hidden"
        />

        <input
          ref={frameRef}
          type="file"
          accept="image/*"
          onChange={(e) => handlePicChange(e, setFrame)}
          className="hidden"
        />

        <div className="overflow-hidden rounded-2xl">
          <div
            ref={ref}
            className="relative overflow-hidden h-[300px] lg:h-[400px] aspect-square"
          >
            {frame ? (
              <div style={{ opacity: frameOpacity }} className="z-50 relative">
                <Image
                  priority
                  quality={100}
                  src={frame}
                  height={500}
                  width={500}
                  className="object-contain absolute pointer-events-none z-50"
                  alt="DP Frame"
                />
              </div>
            ) : (
              <button
                onClick={() => frameRef.current?.click()}
                className="bg-purple-100 border-2 border-dashed border-secondary-200 font-medium text-secondary-200 text-opacity-80 rounded-2xl h-full w-full flex items-center justify-center flex-col"
              >
                <IconPhoto className="text-6xl" />
                <p>Upload Frame</p>
              </button>
            )}

            {profilePic && (
              <Draggable
                onStart={() => setFrameOpacity(0.8)}
                onStop={() => setFrameOpacity(1)}
              >
                <div>
                  <TransformWrapper>
                    <TransformComponent>
                      <Image
                        quality={100}
                        src={profilePic}
                        height={500}
                        width={500}
                        className="object-contain scale-50"
                        alt="Profile Picture"
                        draggable={false}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              </Draggable>
            )}
          </div>
        </div>

        <div className="mt-6 space-x-3 text-sm md:text-base flex self-start">
          {!frame && (
            <div>
              <p className="text-secondary-200">
                Get started by uploading your frame above.{" "}
              </p>
              <button
                onClick={() => setFrame("/assets/sample_frame.png")}
                type="button"
                className="text-primary-100"
              >
                Use sample frame &rarr;
              </button>
            </div>
          )}

          {frame && (
            <Button
              disabled={!frame}
              onClick={() => profileRef.current?.click()}
            >
              Upload Photo
            </Button>
          )}

          {frame && profilePic && (
            <Button onClick={saveImage}>Save Image</Button>
          )}
        </div>
      </div>
    </section>
  );
}
