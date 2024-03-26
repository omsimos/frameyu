import Image from "next/image";
import { Save } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFrameStore } from "@/store/useFrameStore";

export function FramePreview() {
  const imgFileUrl = useFrameStore((state) => state.imgFileUrl);

  return (
    <section className="w-full">
      <Card className="h-[350px] p-4">
        <Image
          priority
          quality={100}
          src={imgFileUrl}
          height={500}
          width={500}
          className="object-cover pointer-events-none aspect-square w-full rounded-md"
          alt="DP Frame"
        />
      </Card>

      <Button className="w-full mt-4">
        <Save className="mr-2 h-4 w-4" />
        Save Changes
      </Button>
    </section>
  );
}
