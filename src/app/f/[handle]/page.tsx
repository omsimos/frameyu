import { graphql } from "@/graphql";
import { formatDistance } from "date-fns";
import { registerUrql } from "@urql/next/rsc";
import { createClient, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";

import { Frame } from "./components/frame";
import { FrameCaption } from "./components/frame-caption";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrowserWarning } from "@/components/browser-warning";

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    exchanges: [cacheExchange({}), fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

const GetFrameQuery = graphql(`
  query GetFrame($handle: String!) {
    frame(handle: $handle) {
      id
      title
      imgUrl
      caption
      createdAt
      user {
        id
        username
      }
    }
  }
`);

export default async function Page({ params }: { params: { handle: string } }) {
  const result = await getClient().query(GetFrameQuery, {
    handle: params.handle,
  });

  const data = result.data?.frame;

  if (!data) {
    return <div className="mt-8 text-muted-foreground">Frame not found</div>;
  }

  return (
    <section className="w-full max-w-[400px] mx-auto mt-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{data.title}</h1>

        <p className="text-center text-sm text-muted-foreground mt-1">
          Published{" "}
          {formatDistance(data.createdAt, new Date(), { addSuffix: true })} by @
          {data.user.username}
        </p>
      </div>

      {data.caption ? (
        <Tabs defaultValue="frame">
          <TabsList>
            <TabsTrigger value="frame">Frame</TabsTrigger>
            <TabsTrigger value="caption">Caption</TabsTrigger>
          </TabsList>
          <BrowserWarning />
          <TabsContent value="frame">
            <Frame id={data.id} frameUrl={data.imgUrl} />
          </TabsContent>
          <TabsContent value="caption">
            <FrameCaption caption={data.caption} />
          </TabsContent>
        </Tabs>
      ) : (
        <Frame id={data.id} frameUrl={data.imgUrl} />
      )}
    </section>
  );
}
