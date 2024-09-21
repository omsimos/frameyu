import { PublishForm } from "./components/publish-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UploadFrame } from "./components/upload-frame";

export default function Publish() {
  return (
    <Card className="max-w-screen-lg mt-12 w-full mx-auto">
      <CardHeader>
        <CardTitle>Publish Frame</CardTitle>
        <CardDescription>Let's supercharge your campaign!</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full gap-6">
        <UploadFrame />
        <PublishForm />
      </CardContent>
    </Card>
  );
}
