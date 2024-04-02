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

export const CreateFrameInput = builder.inputType("CreateFrameInput", {
  fields: (t) => ({
    title: t.string({
      required: true,
    }),
    imgUrl: t.string({
      required: true,
    }),
    handle: t.string({
      required: true,
    }),
    caption: t.string(),
  }),
});

export const EditFrameInput = builder.inputType("EditFrameInput", {
  fields: (t) => ({
    id: t.string({
      required: true,
    }),
    title: t.string({
      required: true,
    }),
    handle: t.string({
      required: true,
    }),
    caption: t.string(),
  }),
});
