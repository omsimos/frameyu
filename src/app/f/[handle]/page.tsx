import { graphql } from "@/graphql";
import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";

import { Frame } from "./components/frame";
import { FrameFields } from "@/app/dashboard/components/frame-card";

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

const GetFrameQuery = graphql(
  `
    query GetFrame($handle: String!) {
      frame(handle: $handle) {
        id
        ...FrameFields
      }
    }
  `,
  [FrameFields],
);

export default async function Page({ params }: { params: { handle: string } }) {
  const result = await getClient().query(GetFrameQuery, {
    handle: params.handle,
  });

  if (!result.data?.frame) {
    return <div>Frame not found</div>;
  }

  return (
    <section className="container">
      <Frame frame={result.data?.frame} />
    </section>
  );
}
