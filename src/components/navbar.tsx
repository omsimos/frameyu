import { Button } from "./utils/button";

export function Navbar() {
  return (
    <nav className="py-12 flex justify-between items-center">
      <h1 className="text-2xl font-black text-secondary-200 tracking-[-0.09em]">
        frame<span className="tracking-tighter text-primary-100">dip</span>
      </h1>

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
