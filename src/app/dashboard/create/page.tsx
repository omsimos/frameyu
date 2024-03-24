import { UploadFrame } from "./components/upload-frame";

export default function CreatePage() {
  return (
    <section className="container flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="font-semibold text-3xl">Share Frame</h1>
        <p className="text-muted-foreground">
          Let&apos;s supercharge your campaign!
        </p>
      </div>

      <UploadFrame />
    </section>
  );
}
