import prisma from "@/lib/db";
import builder from "@/schema/builder";
import { CreateFrameInput, EditFrameInput } from "./types";

builder.queryFields((t) => ({
  frames: t.prismaField({
    type: ["Frame"],
    args: {
      userId: t.arg.string({
        required: true,
      }),
    },
    resolve: async (_query, _root, { userId }) => {
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

  frame: t.prismaField({
    type: "Frame",
    args: {
      handle: t.arg.string({
        required: true,
      }),
    },
    resolve: async (_query, _root, { handle }) => {
      try {
        const frame = prisma.frame.findUniqueOrThrow({
          where: {
            handle,
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
        if (!userId) {
          throw new Error("Unauthorized");
        }

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

  deleteFrame: t.prismaField({
    type: "Frame",
    args: {
      id: t.arg.string({
        required: true,
      }),
    },
    resolve: async (_query, _root, { id }) => {
      try {
        const frame = prisma.frame.delete({
          where: {
            id,
          },
        });

        return frame;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),

  editFrame: t.prismaField({
    type: "Frame",
    args: {
      input: t.arg({
        type: EditFrameInput,
        required: true,
      }),
    },
    resolve: async (_query, _root, { input }) => {
      try {
        const frame = prisma.frame.update({
          where: {
            id: input.id,
          },
          data: input,
        });

        return frame;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),
}));
