"use client";

import { FrameUpload } from "./frame-upload";
import { FrameCaption } from "./frame-caption";
import { useFrameStore } from "@/store/useFrameStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FrameTabs() {
  const currentTab = useFrameStore((state) => state.currentTab);

  return (
    <Tabs value={currentTab} className="w-[350px]">
      <TabsList>
        <TabTrigger tab="Frame" />
        <TabTrigger tab="Caption" />
      </TabsList>

      <TabsContent value="frame">
        <FrameUpload />
      </TabsContent>

      <TabsContent value="caption">
        <FrameCaption />
      </TabsContent>
    </Tabs>
  );
}

function TabTrigger({ tab }: { tab: string }) {
  const updateCurrentTab = useFrameStore((state) => state.updateCurrentTab);

  return (
    <TabsTrigger
      onClick={() => updateCurrentTab(tab.toLowerCase())}
      value={tab.toLowerCase()}
    >
      {tab}
    </TabsTrigger>
  );
}
