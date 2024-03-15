import prisma from "@/lib/db";
import builder from "@/schema/builder";

builder.queryFields((t) => ({
  users: t.prismaField({
    type: ["User"],
    resolve: async () => {
      return await prisma.user.findMany();
    },
  }),
}));
