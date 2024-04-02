import { Heading } from "./heading";

export function Steps() {
  return (
    <section className="md:py-52 py-32">
      <Heading
        title="Easy to use"
        sub="Add a frame to your photo in just 3 quick steps!"
      />

      <div className="flex mt-16 justify-center lg:space-x-8 md:space-x-4 flex-col md:flex-row max-w-md mx-auto space-y-8 md:space-y-0 container md:max-w-full">
        <Step num={1} desc="Upload the 1x1 PNG image of your frame." />
        <Step num={2} desc="Add your photo to display behind the frame." />
        <Step num={3} desc="Adjust your photo, and click download." />
      </div>
    </section>
  );
}

function Step({ num, desc }: { num: number; desc: string }) {
  return (
    <div className="border-[3px] border-zinc-800 rounded-md p-8 lg:pb-16 text-left md:text-center bg-white relative md:block flex">
      <h1 className="lg:text-6xl text-5xl text-violet-600 font-extrabold mr-10 md:mr-0">
        {num}
      </h1>
      <p className="font-medium md:mt-4 md:text-lg lg:text-xl text-zinc-800">
        {desc}
      </p>

      <div className="absolute h-8 w-full rounded-b-md left-0 md:-bottom-3 -bottom-2 -z-10 bg-zinc-800"></div>
    </div>
  );
}
