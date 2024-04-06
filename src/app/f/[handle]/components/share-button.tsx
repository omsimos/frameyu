"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export function ShareButton({ handle }: { handle: string }) {
  const share = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/f/${handle}`;
      navigator.clipboard.writeText(`${window.location.origin}/f/${handle}`);
      toast.success("Copied to clipboard");

      if (
        navigator.share &&
        navigator.canShare({ url }) &&
        process.env.NODE_ENV === "production"
      ) {
        navigator.share({ url });
      }
    }
  };

  return (
    <Button size="icon" variant="secondary" onClick={share}>
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
