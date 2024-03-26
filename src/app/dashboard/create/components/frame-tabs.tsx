"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { UploadFrame } from "./upload-frame";
import { FrameCaption } from "./frame-caption";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FrameTabs() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <Tabs defaultValue="frame" value={tab ?? "frame"} className="w-[350px]">
      <TabsList>
        <TabTrigger tab="Frame" />
        <TabTrigger tab="Caption" />
      </TabsList>

      <TabsContent value="frame">
        <UploadFrame />
      </TabsContent>

      <TabsContent value="caption">
        <FrameCaption />
      </TabsContent>
    </Tabs>
  );
}

function TabTrigger({ tab }: { tab: string }) {
  return (
    <TabsTrigger value={tab.toLowerCase()}>
      <Link
        href={{
          query: {
            tab: tab.toLowerCase(),
          },
        }}
      >
        {tab}
      </Link>
    </TabsTrigger>
  );
}
