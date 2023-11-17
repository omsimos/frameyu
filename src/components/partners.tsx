import Image from "next/image";

export function Partners() {
  return (
    <section className='md:pt-32 md:pb-20 pt-20 pb-14 flex flex-col items-center'>
      <h4 className="md:text-2xl text-lg text-secondary-200 font-medium">Built with trusted organizations</h4>

      <div className="flex md:space-x-24 space-x-8">
        <Image
          src="/assets/omsimos-logo.svg"
          alt="OMSIMOS Logo"
          width={250}
          height={250}
          className="w-[130px] md:w-[250px]"
        />
        <Image
          src="/assets/umamin-logo.svg"
          alt="Umamin Logo"
          width={250}
          height={250}
          className="w-[130px] md:w-[250px]"
        />
      </div>
    </section>
  );
}
