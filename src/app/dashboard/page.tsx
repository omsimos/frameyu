import { graphql } from "gql.tada";
import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";

import { FrameCard } from "./components/frame-card";

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

const GetUsersQuery = graphql(`
  query GetUsers {
    users {
      id
      username
    }
  }
`);

export default async function DashboardPage() {
  const result = await getClient().query(GetUsersQuery, {});

  return (
    <section className="container">
      <div>
        <h1 className="font-semibold text-3xl">Manage Frames</h1>
        <p className="text-muted-foreground">
          Create up to 3 public frames for free!
        </p>

        {JSON.stringify(result)}

        <div className="mt-8 flex space-x-4">
          <FrameCard />
          <FrameCard />
          <FrameCard />
        </div>
      </div>
    </section>
  );
}
