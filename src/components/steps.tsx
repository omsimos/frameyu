import { Heading } from "./heading";

export function Steps() {
  return (
    <section className="md:py-52 py-32">
      <Heading
        title="Easy to use"
        sub="Add a frame to your photo in just 3 quick steps!"
      />

      <div className="flex justify-between mt-16 lg:space-x-8 md:space-x-4 flex-col md:flex-row max-w-md mx-auto md:max-w-full space-y-12 md:space-y-0">
        <Step num={1} desc="Upload the 1x1 PNG image of your frame" />
        <Step num={2} desc="Add your photo to display behind the frame" />
        <Step num={3} desc="Adjust your photo, and click download" />
      </div>
    </section>
  );
}

function Step({ num, desc }: { num: number; desc: string }) {
  return (
    <div className="border-[3px] border-secondary-200 rounded-md p-8 pb-16 text-center bg-white relative">
      <h1 className="text-6xl text-primary-100 font-extrabold">{num}</h1>
      <p className="font-medium mt-2 sm:mt-4 md:text-lg lg:text-xl text-secondary-200">
        {desc}
      </p>

      <div className="absolute h-8 w-full rounded-b-md left-0 -bottom-3 -z-10 bg-secondary-200"></div>
    </div>
  );
}
