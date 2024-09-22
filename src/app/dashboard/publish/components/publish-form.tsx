"use client";

import {
  GlobeLockIcon,
  PackageIcon,
  Share2Icon,
  SquarePenIcon,
} from "lucide-react";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { useCallback } from "react";

import { publishFrame } from "../actions";
import { uploadFiles } from "@/lib/uploadthing";
import { PublishFrame, usePublishStore } from "@/store/usePublishStore";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function PublishForm() {
  const data = usePublishStore((state) => state.frameDetails);
  const updateDetails = usePublishStore((state) => state.updateDetails);

  const updateType = useCallback(
    (type: PublishFrame["type"]) => {
      updateDetails({ type });
    },
    [updateDetails],
  );

  const updateHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateDetails({ handle: e.target.value });
    },
    [updateDetails],
  );

  const updateTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateDetails({ title: e.target.value });
    },
    [updateDetails],
  );

  const updateCaption = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateDetails({ caption: e.target.value });
    },
    [updateDetails],
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!data.file) {
      toast.error("You must upload a frame to publish");
      return;
    }

    let fileRes = [];

    try {
      fileRes = await uploadFiles("imageUploader", {
        files: [data.file],
      });
    } catch (err: any) {
      console.log(err);

      if (err.message.includes("FileSizeMismatch")) {
        toast.error("Image size should not exceed 4MB");
      } else {
        toast.error("An error occurred while uploading the frame image");
      }

      return;
    }

    const handle = data.handle || nanoid(12);

    const res = await publishFrame({
      title: data.title,
      handle,
      caption: data.caption,
      imgUrl: fileRes[0].url,
    });

    if (res?.data?.error) {
      toast.error(res.data.error);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid items-start gap-4 w-full">
      <fieldset className="grid gap-6 rounded-lg border w-full h-full p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Details</legend>
        <div className="grid gap-3 w-full">
          <Label htmlFor="type">
            Type<span className="text-destructive">*</span>
          </Label>
          <Select required value={data.type} onValueChange={updateType}>
            <SelectTrigger
              id="type"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Share2Icon className="size-5" />
                  <div className="grid gap-0.5">
                    <p className="font-medium text-foreground">Active</p>
                    <p className="text-xs" data-description>
                      Make your frame public for immediate use.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="draft">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <SquarePenIcon className="size-5" />
                  <div className="grid gap-0.5">
                    <p className="font-medium text-foreground">Draft</p>
                    <p className="text-xs" data-description>
                      Save your frame for future editing.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem disabled value="private">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <GlobeLockIcon className="size-5" />
                  <div className="grid gap-0.5">
                    <div className="font-medium text-foreground flex items-center">
                      Private
                      <Badge data-description className="ml-2">
                        Pro
                      </Badge>
                    </div>
                    <p className="text-xs" data-description>
                      Restrict your frame to select users via a link.
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="handle">
              URL Handle
              <Badge className="ml-2">Pro</Badge>
            </Label>
            <Input
              disabled
              id="handle"
              placeholder="frameyu.com/f/handle"
              value={data.handle}
              onChange={updateHandle}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="title">
              Title<span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              required
              placeholder="Frameyu"
              value={data.title}
              onChange={updateTitle}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="temperature">Caption</Label>
          <Textarea
            id="temperature"
            placeholder="Paste your caption here..."
            value={data.caption}
            onChange={updateCaption}
          />
        </div>
      </fieldset>

      <Button type="submit" disabled={!data.title || !data.file}>
        <PackageIcon className="size-4 mr-2" />
        Publish Frame
      </Button>
    </form>
  );
}
