import { PublishTabs } from "./components/publish-tabs";

export default function Publish() {
  return (
    <section className="container flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="font-semibold text-3xl">Publish Your Frame</h1>
        <p className="text-muted-foreground">
          Let&apos;s supercharge your campaign!
        </p>
      </div>

      <PublishTabs />
    </section>
  );
}
