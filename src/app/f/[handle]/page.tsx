import Link from "next/link";
import { formatDistance } from "date-fns";

import prisma from "@/lib/db";
import { Frame } from "./components/frame";
import { ShareButton } from "./components/share-button";
import { FrameCaption } from "./components/frame-caption";
import { BrowserWarning } from "@/components/browser-warning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page({ params }: { params: { handle: string } }) {
  const data = await prisma.frame.findUnique({
    where: {
      handle: params.handle,
    },
    include: {
      user: {
        select: {
          username: true,
        },
     },
    },
  });

  if (!data) {
    return <div className="mt-8 text-muted-foreground">Frame not found</div>;
  }

  return (
    <section className="w-full max-w-[400px] mx-auto">
      <div className="mb-12 text-center">
        <Link
          href="/"
          className="mb-8 inline-block text-2xl font-black tracking-[-0.09em]"
        >
          frame<span className="text-purple-600">yu</span>
        </Link>

        <h1 className="text-3xl font-bold">{data.title}</h1>

        <p className="text-center text-sm mb-4 text-muted-foreground mt-1">
          Published{" "}
          {formatDistance(data.createdAt, new Date(), { addSuffix: true })} by @
          {data.user.username}
        </p>
      </div>

      <Tabs defaultValue="frame">
        <div className="flex items-center space-x-2">
          <TabsList>
            <TabsTrigger value="frame">Frame</TabsTrigger>
            {data.caption && <TabsTrigger value="caption">Caption</TabsTrigger>}
          </TabsList>
          <ShareButton handle={params.handle} />
        </div>
        <BrowserWarning />
        <TabsContent value="frame">
          <Frame id={data.id} frameUrl={data.imgUrl} />
        </TabsContent>
        {data.caption && (
          <TabsContent value="caption">
            <FrameCaption caption={data.caption} />
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
}
