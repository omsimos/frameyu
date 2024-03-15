import Link from "next/link";
import { Button } from "./utils/button";

export function Navbar() {
  return (
    <nav className="py-12 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-black text-zinc-800 tracking-[-0.09em]"
      >
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

        <Button link="/tool">Let&apos;s Frame</Button>
      </div>
    </nav>
  );
}
