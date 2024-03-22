import { FrameCard } from "./components/frame-card";
import { cacheExchange, createClient, fetchExchange, gql } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";

const makeClient = () => {
  return createClient({
    url:
      process.env.NODE_ENV === "production"
        ? process.env.GRAPHQL_URL!
        : "http://localhost:3000/api/graphql",
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

export default function DashboardPage() {
  return (
    <section className="container min-h-screen">
      <div>
        <h1 className="font-semibold text-3xl">Manage Frames</h1>
        <p className="text-muted-foreground">
          Create up to 3 public frames for free!
        </p>

        <div className="mt-8 flex space-x-4">
          <FrameCard />
          <FrameCard />
          <FrameCard />
        </div>
      </div>
    </section>
  );
}
