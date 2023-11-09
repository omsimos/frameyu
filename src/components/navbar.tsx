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

        <div className="bg-secondary-200 relative rounded h-[45px] w-[150px]">
          <button
            type="button"
            className="border-2 text-secondary-200 absolute w-full h-full -mt-1 -ml-1 border-secondary-200 bg-white rounded text-sm md:text-base"
          >
            Let&apos;s Frame
          </button>
        </div>
      </div>
    </nav>
  );
}
