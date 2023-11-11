import Image from "next/image";

export function Partners() {
  return (
    <section className='mt-52 flex flex-col items-center'>
      <h4 className="md:text-2xl text-xl text-secondary-200 font-medium">Built with trusted organizations</h4>

      <div className="flex md:space-x-24 space-x-12">
        <Image
          src="/assets/omsimos-logo.svg"
          alt="OMSIMOS Logo"
          width={250}
          height={250}
          className="w-[150px] md:w-[250px]"
        />
        <Image
          src="/assets/umamin-logo.svg"
          alt="Umamin Logo"
          width={250}
          height={250}
          className="w-[150px] md:w-[250px]"
        />
      </div>
    </section>
  );
}
