"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { toPng } from "html-to-image";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import { Button } from "@/components/utils/button";
import { IconPhoto, IconRestart, IconWarning } from "@/components/utils/icons";
import Modal from "@/components/utils/modal";

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
  const [isFb, setIsFb] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [frameOpacity, setFrameOpacity] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLInputElement>(null);
  const controlRef = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    if (navigator.userAgent.match(/FBAN|FBAV/i)) {
      setIsFb(true);
    }
  }, []);

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
      <Modal
        title="In-app browser detected"
        description="To avoid running into issues with Frameyu, we recommend opening the tool in an external browser."
        isOpen={isFb}
        handleConfirm={{
          text: "Understood",
          fn: () => setIsFb(false),
        }}
        onClose={() => null}
      />

      <div className="md:mt-16 mt-8 flex flex-col">
        {isFb && (
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 items-center mb-4 mx-auto"
            onClick={() => setIsFb(true)}
          >
            <IconWarning className="text-red-500 text-base mr-1" /> In-app
            browser detected
          </button>
        )}

        <div className="items-center flex-col justify-center border-2 border-secondary-200 p-6 rounded-2xl flex shadow-lg">
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

          <div className="overflow-hidden rounded-xl shadow-lg">
            <div
              ref={ref}
              className="relative overflow-hidden h-[300px] lg:h-[400px] aspect-square"
            >
              {frame ? (
                <div
                  style={{ opacity: frameOpacity }}
                  className="z-50 relative"
                >
                  <Image
                    priority
                    quality={100}
                    src={frame}
                    height={500}
                    width={500}
                    className="object-contain absolute pointer-events-none"
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
                      className="object-contain h-[300px] lg:h-[400px] scale-[0.5]"
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
      </div>
    </section>
  );
}
