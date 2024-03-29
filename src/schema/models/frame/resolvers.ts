import prisma from "@/lib/db";
import builder from "@/schema/builder";

builder.queryFields((t) => ({
  frames: t.prismaField({
    type: ["Frame"],
    resolve: async (_query, _root, _args, { userId }) => {
      try {
        const frames = prisma.frame.findMany({
          where: {
            userId,
          },
        });
        return frames;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),
}));

const CreateFrameInput = builder.inputType("CreateFrameInput", {
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
      try {
        const frame = prisma.frame.create({
          data: {
            ...input,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return frame;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),
}));
