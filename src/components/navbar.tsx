import Link from "next/link";

export function Navbar() {
  return (
    <nav className="py-10 flex justify-between items-center container">
      <Link href="/" className="text-2xl font-black tracking-[-0.09em]">
        frame<span className="text-purple-600">yu</span>
      </Link>

      <div className="font-medium flex space-x-24 items-center">
        <ul className="lg:flex space-x-28 hidden">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/#pricing">Pricing</Link>
          </li>
          <li>
            <Link href="mailto:omsimos.agency@gmail.com">Contact</Link>
          </li>
        </ul>

        <div className="bg-zinc-800 relative rounded h-[45px] w-[150px]">
          <Link
            href="/login"
            className="border-2 text-zinc-800 absolute w-full h-full -mt-1 -ml-1 border-zinc-800 bg-white rounded text-sm md:text-base grid place-items-center hover:-mt-[2px] hover:-ml-[2px] transition-all"
          >
            Let&apos;s Frame
          </Link>
        </div>
      </div>
    </nav>
  );
}
