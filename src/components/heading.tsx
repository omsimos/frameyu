export function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="text-center">
      <h1 className="lg:text-5xl text-3xl sm:text-4xl font-extrabold">
        {title}
      </h1>
      <p className="font-medium mt-2 sm:mt-4 md:text-lg lg:text-xl">{sub}</p>
    </div>
  );
}
