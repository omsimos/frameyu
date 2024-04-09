import { EditForm } from "./components/edit-form";

export default function EditPage() {
  return (
    <section className="w-full container">
      <div className="text-center mb-12">
        <h1 className="font-semibold text-3xl">Edit Your Frame</h1>
        <p className="text-muted-foreground">
          Let&apos;s supercharge your campaign!
        </p>
      </div>

      <EditForm />
    </section>
  );
}
