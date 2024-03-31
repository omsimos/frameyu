import builder from "@/schema/builder";

builder.prismaObject("Frame", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    imgUrl: t.exposeString("imgUrl"),
    handle: t.exposeString("handle"),
    caption: t.exposeString("caption", { nullable: true }),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
      nullable: true,
    }),

    user: t.relation("user"),
  }),
});
