import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadFrame } from "./components/upload-frame";

export default function CreatePage() {
  return (
    <section className="container flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="font-semibold text-3xl">Create Public Frame</h1>
        <p className="text-muted-foreground">
          Let&apos;s supercharge your campaign!
        </p>
      </div>

      <Tabs defaultValue="frame" className="w-[350px]">
        <TabsList>
          <TabsTrigger value="frame">Frame</TabsTrigger>
          <TabsTrigger disabled value="caption">
            Caption
          </TabsTrigger>
          <TabsTrigger disabled value="preview">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="frame">
          <UploadFrame />
        </TabsContent>
      </Tabs>
    </section>
  );
}
