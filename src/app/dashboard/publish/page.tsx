import { Frown } from "lucide-react";

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { PublishTabs } from "./components/publish-tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Publish() {
  const { session } = await getSession();

  const userFrames = await prisma.frame.count({
    where: {
      userId: session?.userId,
    },
    select: {
      _all: true,
    },
  });

  return (
    <section className="container flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="font-semibold text-3xl">Publish Your Frame</h1>
        <p className="text-muted-foreground">
          Let&apos;s supercharge your campaign!
        </p>
      </div>

      {userFrames._all >= 5 ? (
        <Alert className="max-w-md w-full container">
          <Frown className="h-4 w-4" />
          <AlertTitle>Limit Reached</AlertTitle>
          <AlertDescription>
            You have reached the maximum number of free frames you can publish.
          </AlertDescription>
        </Alert>
      ) : (
        <PublishTabs />
      )}
    </section>
  );
}
