import prisma from "@/lib/db";
import builder from "@/schema/builder";

builder.queryFields((t) => ({
  user: t.prismaField({
    type: "User",
    resolve: async (_query, _root, _args, ctx) => {
      try {
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: ctx.userId,
          },
        });
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),
}));
