import Link from "next/link";
import { Suspense } from "react";
import { Frame } from "lucide-react";

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FrameCard } from "./components/frame-card";

export default async function DashboardPage() {
  const { session } = await getSession();

  const frames = await prisma.frame.findMany({
    where: {
      userId: session?.userId,
    },
  });

  return (
    <section className="container">
      <div>
        <h1 className="font-semibold text-3xl">Manage Frames</h1>
        <p className="text-muted-foreground">
          Premium features are currently free for all users.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Suspense
            fallback={
              <>
                <Skeleton className="w-[250px] h-[360px]" />
                <Skeleton className="w-[250px] h-[360px]" />
                <Skeleton className="w-[250px] h-[360px]" />
              </>
            }
          >
            {!frames.length && (
              <Link href="/dashboard/publish" className="h-[360px] w-[250px]">
                <Card className="p-4">
                  <div className="bg-zinc-200 w-full aspect-square rounded-md grid place-items-center">
                    <Frame className="text-zinc-400 h-6 w-6" />
                  </div>
                </Card>
              </Link>
            )}

            {frames.map((frame, i) => (
              <FrameCard key={frame.id} data={frame} isPremium={i > 0} />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
