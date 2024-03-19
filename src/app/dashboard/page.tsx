import { FrameCard } from "./components/frame-card";

export default function DashboardPage() {
  return (
    <section className="container min-h-screen">
      <div>
        <h1 className="font-semibold text-3xl">Manage Frames</h1>
        <p className="text-muted-foreground">
          Create up to 3 public frames for free!
        </p>

        <div className="mt-8 flex space-x-4">
          <FrameCard />
          <FrameCard />
          <FrameCard />
        </div>
      </div>
    </section>
  );
}
