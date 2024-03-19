import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FrameCard() {
  return (
    <Card className="cursor-pointer hover:scale-105 transition-all">
      <CardHeader>
        <div>
          <h3 className="font-semibold text-lg">Frame Name</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="outline-none flex items-center text-sm hover:underline"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  frameyu.com/f/name
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent>
        <Image
          src="https://utfs.io/f/a84b14dc-65ec-4289-a25f-feb8bac59f33-nxnxr6.jpg"
          alt="Frame name"
          width={200}
          height={200}
          className="rounded object-cover"
        />
      </CardContent>

      <CardFooter>
        <Badge>Free</Badge>
      </CardFooter>
    </Card>
  );
}
