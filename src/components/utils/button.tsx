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
    <div className="bg-secondary-200 relative rounded h-[45px] w-[150px]">
      {link ? (
        <Link
          href="/tool"
          className={twMerge(
            "border-2 text-secondary-200 absolute w-full h-full -mt-1 -ml-1 border-secondary-200 bg-white rounded text-sm md:text-base grid place-items-center hover:-mt-[2px] hover:-ml-[2px] transition-all",
            className
          )}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={twMerge(
            "border-2 text-secondary-200 absolute w-full h-full -mt-1 -ml-1 border-secondary-200 bg-white rounded text-sm md:text-base grid place-items-center hover:-mt-[2px] hover:-ml-[2px] transition-all",
            className
          )}
          {...rest}
        >
          {children}
        </button>
      )}
    </div>
  );
}
