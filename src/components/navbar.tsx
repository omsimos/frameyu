import Link from "next/link";
import { Button } from "./utils/button";

export function Navbar() {
  return (
    <nav className="py-12 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-black text-secondary-200 tracking-[-0.09em]"
      >
        frame<span className="tracking-tighter text-primary-100">dip</span>
      </Link>

      <div className="font-medium flex space-x-24 items-center">
        <ul className="lg:flex space-x-28 hidden">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <Button link="/tool">Let&apos;s Frame</Button>
      </div>
    </nav>
  );
}
