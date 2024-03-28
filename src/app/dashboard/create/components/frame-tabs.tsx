"use client";

import { FrameUpload } from "./frame-upload";
import { FrameCaption } from "./frame-caption";
import { FramePreview } from "./frame-preview";
import { useFrameStore } from "@/store/useFrameStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FrameTabs() {
  const currentTab = useFrameStore((state) => state.currentTab);
  const frameData = useFrameStore((state) => state.frameData);

  return (
    <Tabs value={currentTab} className="w-[350px]">
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
        <FrameCaption />
      </TabsContent>

      <TabsContent value="preview">
        <FramePreview />
      </TabsContent>
    </Tabs>
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
