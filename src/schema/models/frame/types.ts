import builder from "@/schema/builder";

builder.prismaObject("Frame", {
  fields: (t) => ({
    id: t.exposeID("id"),
    image: t.exposeString("imgUrl"),
    username: t.exposeString("handle", { nullable: true }),
    email: t.exposeString("caption", { nullable: true }),
    user: t.relation("user"),
  }),
});
