import { FrameIcon } from "lucide-react";
import { PublishForm } from "./components/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Publish() {
  return (
    <Card className="max-w-screen-lg mt-12 w-full mx-auto">
      <CardHeader>
        <CardTitle>Publish Frame</CardTitle>
        <CardDescription>Let's supercharge your campaign!</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full gap-6">
        <form className="grid items-start w-full max-w-[300px] aspect-square gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Upload Frame<span className="text-destructive">*</span>
            </legend>
            <button
              className="size-full aspect-square grid place-items-center"
              type="button"
            >
              <FrameIcon className="size-6" />
            </button>
          </fieldset>
        </form>
        <PublishForm />
      </CardContent>
    </Card>
  );
}
