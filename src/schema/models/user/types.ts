import builder from "@/schema/builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("username"),
  }),
});
