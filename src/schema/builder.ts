import prisma from "@/lib/db";
import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

const builder = new SchemaBuilder<{
  Context: {
    userId: string;
  };
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
  AuthScopes: {
    authenticated: boolean;
  };
}>({
  plugins: [ScopeAuthPlugin, PrismaPlugin],
  authScopes: (ctx) => ({
    authenticated: !!ctx.userId,
  }),
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("Date", DateResolver, {});
builder.queryType({});
builder.mutationType({
  authScopes: {
    authenticated: true,
  },
});

export default builder;
