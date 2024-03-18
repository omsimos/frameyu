import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick?: () => void;
  link?: string;
  className?: string;
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ onClick, link, className, children, ...rest }: Props) {
  return (
    <div
      className={twMerge(
        "bg-zinc-800 relative rounded h-[45px] w-[150px]",
        className
      )}
    >
      {link ? (
        <Link
          href={link}
          className="border-2 text-zinc-800 absolute w-full h-full -mt-1 -ml-1 border-zinc-800 bg-white rounded text-sm md:text-base grid place-items-center hover:-mt-[2px] hover:-ml-[2px] transition-all"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="border-2 text-zinc-800 absolute w-full h-full -mt-1 -ml-1 border-zinc-800 bg-white rounded text-sm md:text-base grid place-items-center hover:-mt-[2px] hover:-ml-[2px] transition-all"
          {...rest}
        >
          {children}
        </button>
      )}
    </div>
  );
}
