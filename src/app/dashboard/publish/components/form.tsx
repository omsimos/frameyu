"use client";

import {
  GlobeLockIcon,
  PackageIcon,
  Share2Icon,
  SquarePenIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function PublishForm() {
  return (
    <form className="grid items-start gap-4 w-full">
      <fieldset className="grid gap-6 rounded-lg border w-full h-full p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Details</legend>
        <div className="grid gap-3 w-full">
          <Label htmlFor="type">
            Type<span className="text-destructive">*</span>
          </Label>
          <Select>
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
              <SelectItem value="private">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <GlobeLockIcon className="size-5" />
                  <div className="grid gap-0.5">
                    <div className="font-medium text-foreground flex items-center">
                      Private
                      <Badge data-description className="ml-2">
                        Premium
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
              <Badge className="ml-2">Premium</Badge>
            </Label>
            <Input id="handle" placeholder="frameyu.com/f/handle" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="title">
              Title<span className="text-destructive">*</span>
            </Label>
            <Input id="title" placeholder="Frameyu" />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="temperature">Caption</Label>
          <Textarea id="temperature" placeholder="Paste your caption here..." />
        </div>
      </fieldset>

      <Button>
        <PackageIcon className="size-4 mr-2" />
        Save Changes
      </Button>
    </form>
  );
}
