import Image from "next/image";
import { FragmentOf, graphql, readFragment } from "@/graphql";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditFrame } from "./edit-frame";

type Props = {
  frameData: FragmentOf<typeof FrameFields>;
  isPremium?: boolean;
};

export const FrameFields = graphql(`
  fragment FrameFields on Frame {
    id
    title
    handle
    imgUrl
    caption
  }
`);

export function FrameCard({ frameData, isPremium }: Props) {
  const data = readFragment(FrameFields, frameData);

  return (
    <Card className="hover:border-purple-300 transition-all">
      <CardHeader>
        <div>
          <h3 className="font-semibold text-lg">{data.title}</h3>
          <p className="outline-none flex items-center text-sm text-muted-foreground">
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
          className="rounded object-cover aspect-square"
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

        <EditFrame {...data} />
      </CardFooter>
    </Card>
  );
}
