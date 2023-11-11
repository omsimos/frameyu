"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  sub: string;
  details: string[];
  img: string;
  handleStart?: string | (() => void);
};

export function Plan({ title, sub, details, img, handleStart }: Props) {
  return (
    <div className="border-[3px] border-secondary-200 rounded-md pt-12 p-8 text-center bg-white relative max-w-md w-full flex flex-col justify-between mx-auto md:mx-0">
      <div>
        <h1 className="text-6xl text-primary-100 font-bold">{title}</h1>
        <p className="font-medium mt-1 md:text-lg lg:text-xl">{sub}</p>

        <ul className="list-disc ml-12 text-left font-medium mt-8 md:mt-12 md:text-lg space-y-2 lg:text-xl">
          {details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      {typeof handleStart === "string" ? (
        <Link
          type="button"
          href={handleStart}
          className="font-medium md:mt-1 md:text-lg lg:text-xl self-end mt-8"
        >
          Get started <span className="text-primary-100">&rarr;</span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleStart}
          className="font-medium md:mt-1 md:text-lg lg:text-xl self-end mt-8"
        >
          Get started <span className="text-primary-100">&rarr;</span>
        </button>
      )}

      <Image
        width={170}
        height={170}
        src={img}
        className="absolute bottom-0 left-0 hidden md:block"
        alt="Avatar"
      />

      <div className="absolute rounded-md -right-3 -bottom-5 -z-10 bg-secondary-200 h-[600px] max-w-md w-full hidden md:block"></div>
    </div>
  );
}
