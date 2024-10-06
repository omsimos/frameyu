import { cache } from "react";
import prisma from "@/lib/db";
import { RenderFrame } from "../components/render-frame";

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
    <section className="w-full max-w-[400px] mx-auto">
      <RenderFrame id={data.id} frameUrl={data.imgUrl} />
    </section>
  );
}
