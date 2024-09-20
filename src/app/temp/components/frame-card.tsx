import Image from "next/image";
import { Frame } from "@prisma/client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { EditButton } from "./edit-button";
import { ShareButton } from "./share-button";

type Props = {
  data: Frame;
  isPremium?: boolean;
};

export function FrameCard({ data, isPremium }: Props) {
  return (
    <Card className="hover:border-purple-300 transition-all w-[250px]">
      <CardHeader>
        <div>
          <h3 className="font-semibold text-lg truncate">{data.title}</h3>
          <p className="outline-none flex items-center text-sm text-muted-foreground truncate">
            frameyu.com/f/{data.handle}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <Image
          src={data.imgUrl}
          alt="Frame name"
          width={200}
          height={200}
          className="rounded object-cover aspect-square w-full"
        />
      </CardContent>

      <CardFooter className="justify-between">
        {isPremium ? (
          <Badge>Premium</Badge>
        ) : (
          <Badge variant="secondary" className="border border-zinc-200">
            Free
          </Badge>
        )}

        <div>
          <ShareButton handle={data.handle} />
          <EditButton {...data} />
        </div>
      </CardFooter>
    </Card>
  );
}
