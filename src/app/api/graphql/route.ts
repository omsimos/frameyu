import { createYoga } from "graphql-yoga";
import { initContextCache } from "@pothos/core";

import { schema } from "@/schema";
import { getSession } from "@/lib/auth";

const { handleRequest } = createYoga({
  schema,
  context: async () => {
    const { user } = await getSession();

    return {
      ...initContextCache(),
      userId: user?.id,
    };
  },

  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
