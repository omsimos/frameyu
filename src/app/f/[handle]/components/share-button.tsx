"use client"

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export function ShareButton({ handle }: { handle: string }) {
  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/f/${handle}`);
      toast.success("Copied to clipboard");
    }
  };
  return (
    <Button size='icon' variant="secondary" onClick={copyLink}>
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
