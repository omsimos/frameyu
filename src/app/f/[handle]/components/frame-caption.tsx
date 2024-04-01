"use client";

import { toast } from "sonner";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export function FrameCaption({ caption }: { caption?: string | null }) {
  const [text, setText] = useState(caption ?? "");

  const copyCaption = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      toast.success("Caption copied to clipboard");
    }
  };
  return (
    <div>
      <div className="grid w-full items-center gap-1.5 mt-10 mb-4">
        <Label htmlFor="url" className="mb-1">
          Caption
        </Label>
        <Textarea className="min-h-[250px]" value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <Button type="button" onClick={copyCaption}>
        <Copy className="mr-2 h-4 w-4" />
        Copy caption
      </Button>
    </div>
  );
}
