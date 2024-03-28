import builder from "@/schema/builder";

builder.prismaObject("Frame", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    imgUrl: t.exposeString("imgUrl"),
    handle: t.exposeString("handle", { nullable: true }),
    caption: t.exposeString("caption", { nullable: true }),
    user: t.relation("user"),
  }),
});
