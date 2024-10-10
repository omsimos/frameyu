import { cache } from "react";
import prisma from "@/lib/db";
import { RenderFrame } from "../components/render-frame";
import { format } from "date-fns";

const getFrame = cache(async (handle: string) => {
  return await prisma.frame.findUnique({
    where: {
      handle,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
});

export default async function Page({ params }: { params: { handle: string } }) {
  const data = await getFrame(params.handle);

  if (!data) {
    return <div className="mt-8 text-muted-foreground">Frame not found</div>;
  }

  return (
    <section className="w-full max-w-[500px] container mx-auto pt-24">
      <div className="mb-8 text-center">
        <h1 className="font-bold text-4xl">{data.title}</h1>
        <h4 className="text-muted-foreground">
          Published on {format(data.createdAt, "PP")}
        </h4>
      </div>

      <RenderFrame id={data.id} frameUrl={data.imgUrl} />
    </section>
  );
}
