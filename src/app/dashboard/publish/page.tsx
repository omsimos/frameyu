"use client";

import { Suspense } from "react";
import { useFrameStore } from "@/store/useFrameStore";
import { FrameUpload } from "./components/frame-upload";
import { FrameDetails } from "./components/frame-details";
import { FramePreview } from "./components/frame-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <Suspense>
      <Publish />
    </Suspense>
  );
}

function Publish() {
  const currentTab = useFrameStore((state) => state.currentTab);
  const frameData = useFrameStore((state) => state.frameData);

  return (
    <section className="container flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="font-semibold text-3xl">Publish Your Frame</h1>
        <p className="text-muted-foreground">
          Let&apos;s supercharge your campaign!
        </p>
      </div>

      <Tabs value={currentTab} className="max-w-[400px] w-full">
        <TabsList className="mb-6">
          <TabTrigger tab="Frame" />
          <TabTrigger tab="Caption" disabled={!frameData.imgUrl} />
          <TabTrigger
            tab="Preview"
            disabled={!frameData.imgUrl || !frameData.title}
          />
        </TabsList>

        <TabsContent value="frame">
          <FrameUpload />
        </TabsContent>

        <TabsContent value="caption">
          <FrameDetails />
        </TabsContent>

        <TabsContent value="preview">
          <FramePreview />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function TabTrigger({ tab, disabled }: { tab: string; disabled?: boolean }) {
  const updateCurrentTab = useFrameStore((state) => state.updateCurrentTab);
  const isPublishing = useFrameStore((state) => state.isPublishing);

  return (
    <TabsTrigger
      disabled={disabled || isPublishing}
      onClick={() => updateCurrentTab(tab.toLowerCase())}
      value={tab.toLowerCase()}
    >
      {tab}
    </TabsTrigger>
  );
}
