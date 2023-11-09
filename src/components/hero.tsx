import Image from "next/image";
import encircle from "@/assets/encircle.svg";

export function Hero() {
  return (
    <section className="lg:mt-24 mt-12 flex justify-between flex-col xl:flex-row">
      <div>
        <h1 className="lg:text-6xl text-3xl sm:text-4xl md:text-5xl text-center xl:text-left font-extrabold text-secondary-200 leading-tight">
          Frame overlayer,
          <br />
          built for{" "}
          <span className="relative">
            your
            <Image
              src={encircle}
              alt="Circle"
              className="absolute top-0 right-0"
            />
          </span>{" "}
          pictures.
        </h1>

        <p className="md:mt-6 mt-2 sm:mt-4 font-medium lg:max-w-xl max-w-md mx-auto xl:mx-0 text-center xl:text-left md:text-lg lg:text-xl">
          Seamlessly add a frame to your photo with image controls like drag and
          zoom.
        </p>

        <div className="flex font-medium md:text-lg text-sm sm:text-base lg:text-xl mt-12 space-x-4 justify-center xl:justify-start">
          <button className="px-6 py-3 bg-secondary-200 text-white rounded">
            Get Started
          </button>

          <button className="px-6 py-3 border-2 border-secondary-200 box-border rounded text-secondary-200">
            Learn More &rarr;
          </button>
        </div>
      </div>

      <Image
        width={400}
        height={400}
        src="/assets/characters.png"
        className="object-contain w-[200px] md:w-[300px] xl:w-[400px] mx-auto xl:mx-0 mt-12 xl:mt-0"
        alt="Characters"
      />
    </section>
  );
}
