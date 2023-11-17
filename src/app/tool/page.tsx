"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { toPng } from "html-to-image";
import { useState, useCallback, useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import { Button } from "@/components/utils/button";
import { IconInfo, IconPhoto, IconRestart } from "@/components/utils/icons";

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
  const controlRef = useRef<ReactZoomPanPinchRef>(null);

  const saveImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toast.promise(
      toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 4,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "framedip.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        }),
      { loading: "Saving...", success: "Saved!", error: "Error!" }
    );
  }, [ref]);

  const handleReset = () => {
    setFrame("");
    setProfilePic("");
  };

  return (
    <section className="flex justify-center">
      <div className="items-center flex-col justify-center border-2 border-secondary-200 p-6 rounded-2xl inline-flex md:mt-16 mt-8 shadow-lg">
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
        <p className="mb-2 self-start flex text-sm font-light items-center">
          <IconInfo className="text-primary-100 text-base mr-1" /> Drag and
          pinch to adjust
        </p>

        <div className="overflow-hidden rounded-xl shadow-lg">
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
                className="bg-purple-100 border-2 border-dashed border-secondary-200 text-secondary-200 text-opacity-80 rounded-2xl h-full w-full flex items-center justify-center flex-col"
              >
                <IconPhoto className="text-6xl" />
                <p>Upload Frame</p>
              </button>
            )}

            {profilePic && (
              <TransformWrapper
                ref={controlRef}
                onPanningStart={() => setFrameOpacity(0.8)}
                onPanningStop={() => setFrameOpacity(1)}
              >
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
            )}
          </div>
        </div>

        <div className="mt-6 space-x-3 text-sm md:text-base flex w-full self-start">
          {!frame && (
            <div>
              <p className="text-secondary-200">
                Get started by uploading your frame above.{" "}
              </p>
              <button
                onClick={() => setFrame("/assets/sample_frame.png")}
                type="button"
                className="text-primary-100 mt-2"
              >
                Use sample frame &rarr;
              </button>
            </div>
          )}

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

        {frame && (
          <button
            onClick={handleReset}
            className="flex items-center text-sm font-light mt-6 self-start text-primary-100"
          >
            <IconRestart className="mr-1 text-lg" /> Reset all changes
          </button>
        )}
      </div>
    </section>
  );
}
