import Link from "next/link";

type Props = {
  onClick?: () => void;
  link?: string;
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ onClick, link, children, ...rest }: Props) {
  return (
    <div className="bg-secondary-200 relative rounded h-[45px] w-[150px]">
      {link ? (
        <Link
          href="/tool"
          className="border-2 text-secondary-200 absolute w-full h-full -mt-1 -ml-1 border-secondary-200 bg-white rounded text-sm md:text-base grid place-items-center"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="border-2 text-secondary-200 absolute w-full h-full -mt-1 -ml-1 border-secondary-200 bg-white rounded text-sm md:text-base grid place-items-center disabled:mt-0 disabled:ml-0 transition-all"
          {...rest}
        >
          {children}
        </button>
      )}
    </div>
  );
}
