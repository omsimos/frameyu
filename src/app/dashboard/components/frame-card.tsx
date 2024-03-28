import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FragmentOf, graphql, readFragment } from "@/graphql";
import { Badge } from "@/components/ui/badge";

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
  }
`);

export function FrameCard({ frameData, isPremium }: Props) {
  const data = readFragment(FrameFields, frameData);

  return (
    <Card className="cursor-pointer hover:border-purple-300 transition-all">
      <CardHeader>
        <div>
          <h3 className="font-semibold text-lg">{data.title}</h3>
          <button
            type="button"
            className="outline-none flex items-center text-sm hover:underline text-muted-foreground"
          >
            frameyu.com/f/{data.handle}
          </button>
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

      <CardFooter>
        {isPremium ? (
          <Badge>Premium</Badge>
        ) : (
          <Badge variant="secondary" className="border border-zinc-200">Free</Badge>
        )}
      </CardFooter>
    </Card>
  );
}
