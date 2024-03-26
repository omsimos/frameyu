import prisma from "@/lib/db";
import builder from "@/schema/builder";

builder.queryFields((t) => ({
  frames: t.prismaField({
    type: ["Frame"],
    resolve: async () => {
      return prisma.frame.findMany();
    },
  }),

  userFrames: t.prismaField({
    type: ["Frame"],
    resolve: async (_query, _root, _args, { userId }) => {
      return prisma.frame.findMany({
        where: {
          userId,
        },
      });
    },
  }),
}));

const CreateFrameInput = builder.inputType("CreateFrameInput", {
  fields: (t) => ({
    id: t.string({
      required: true,
    }),
    imgUrl: t.string({
      required: true,
    }),
    handle: t.string(),
    caption: t.string(),
  }),
});

builder.mutationFields((t) => ({
  createFrame: t.prismaField({
    type: "Frame",
    args: {
      input: t.arg({
        type: CreateFrameInput,
        required: true,
      }),
    },
    resolve: async (_query, _root, { input }, { userId }) => {
      return prisma.frame.create({
        data: {
          ...input,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    },
  }),
}));
