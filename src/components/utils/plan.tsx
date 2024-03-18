"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { nanoid } from "nanoid";

import { IconCheckCircle } from "./icons";

type Props = {
  title: string;
  sub: string;
  details: React.ReactNode[];
  img: string;
  handleStart?: string | (() => void);
};

export function Plan({ title, sub, details, img, handleStart }: Props) {
  const ids = useMemo(
    () => Array.from({ length: details.length }).map(() => nanoid()),
    [details],
  );
  return (
    <div className="border-[3px] border-zinc-800 rounded-md pt-12 p-8 text-center bg-white relative max-w-md w-full flex flex-col justify-between mx-auto lg:mx-0 shadow-lg">
      <div>
        <h1 className="xl:text-6xl text-5xl text-violet-600 font-bold">
          {title}
        </h1>
        <p className="font-medium mt-1 lg:text-lg xl:text-xl">{sub}</p>

        <ul className="md:ml-8 ml-4 text-left font-medium mt-8 lg:mt-12 space-y-2 lg:text-lg xl:text-xl">
          {details.map((d, i) => (
            <li key={ids[i]} className="flex items-center">
              <IconCheckCircle className="text-violet-600 mr-2 text-xl" /> {d}
            </li>
          ))}
        </ul>
      </div>

      {typeof handleStart === "string" ? (
        <Link
          type="button"
          href={handleStart}
          className="font-medium lg:mt-1 lg:text-lg xl:text-xl self-end mt-8"
        >
          Get started <span className="text-violet-600">&rarr;</span>
        </Link>
      ) : (
        <p className="font-medium lg:mt-1 lg:text-lg xl:text-xl self-end mt-8">
          Coming soon!
        </p>
      )}

      <Image
        width={170}
        height={170}
        src={img}
        className="absolute bottom-0 left-0 hidden lg:block w-[150px] xl:w-[170px]"
        alt="Avatar"
      />

      <div className="absolute rounded-md -right-3 -bottom-5 -z-10 bg-zinc-800 h-[600px] max-w-md w-full hidden lg:block"></div>
    </div>
  );
}
