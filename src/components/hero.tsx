import Link from "next/link";
import Image from "next/image";
import { Frame } from "lucide-react";

import encircle from "@/assets/encircle.svg";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="lg:mt-24 mt-12 flex justify-between flex-col xl:flex-row pb-40 container">
      <div>
        <h1 className="lg:text-6xl text-2xl sm:text-4xl md:text-5xl text-center xl:text-left font-bold leading-tight">
          Publish Frames
          <br />
          For{" "}
          <span className="relative">
            Every
            <Image
              priority
              src={encircle}
              alt="Circle"
              className="absolute md:-top-3 top-0 right-0"
            />
          </span>{" "}
          Campaign
        </h1>

        <p className="md:mt-6 mt-2 sm:mt-4 lg:max-w-xl max-w-md mx-auto xl:mx-0 text-center xl:text-left text-sm sm:text-base md:text-lg lg:text-xl text-secondary-foreground">
          Unlock the power of personalized frames to elevate your brand and
          campaigns!
        </p>

        <div className="flex md:text-lg text-sm sm:text-base lg:text-xl mt-8 space-x-4 justify-center xl:justify-start">
          <Link
            href="/login"
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "md:text-lg",
            )}
          >
            Get Started
          </Link>

          <Link
            href="/tool"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "md:text-lg",
            )}
          >
            Frame Tool
            <Frame className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <Image
        priority
        width={400}
        height={400}
        src="/assets/characters.png"
        className="object-contain w-[200px] md:w-[300px] xl:w-[400px] mx-auto xl:mx-0 mt-12 xl:mt-0"
        alt="Characters"
      />
    </section>
  );
}
