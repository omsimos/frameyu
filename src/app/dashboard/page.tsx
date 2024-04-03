import { Suspense } from "react";
import { graphql } from "gql.tada";
import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";

import { Skeleton } from "@/components/ui/skeleton";
import { FrameCard, FrameFields } from "./components/frame-card";
import { Frame } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

const GetFramesQuery = graphql(
  `
    query GetFrames {
      frames {
        id
        ...FrameFields
      }
    }
  `,
  [FrameFields],
);

export default async function DashboardPage() {
  const result = await getClient().query(GetFramesQuery, {});

  return (
    <section className="container">
      <div>
        <h1 className="font-semibold text-3xl">Manage Frames</h1>
        <p className="text-muted-foreground">
          Premium features are currently free for all users.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Suspense
            fallback={
              <>
                <Skeleton className="w-[250px] h-[360px]" />
                <Skeleton className="w-[250px] h-[360px]" />
                <Skeleton className="w-[250px] h-[360px]" />
              </>
            }
          >
            {!result.data?.frames.length && (
              <Link href="/dashboard/create" className="h-[360px] w-[250px]">
                <Card className="p-4">
                  <div className="bg-zinc-200 w-full aspect-square rounded-md grid place-items-center">
                    <Frame className="text-zinc-400 h-6 w-6" />
                  </div>
                </Card>
              </Link>
            )}

            {result.data?.frames.map((frame, i) => (
              <FrameCard key={frame.id} frameData={frame} isPremium={i > 0} />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
