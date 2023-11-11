import Image from "next/image";
import { Heading } from "./heading";

export function Pricing() {
  return (
    <section className="md:pt-52 pt-32">
      <Heading
        title="Get started for free!"
        sub="Affordable pricing to supercharge your campaign."
      />

      <div className="md:mt-16 mt-40 flex lg:space-x-8 md:space-x-4 justify-center h-[600px] relative text-secondary-200 flex-col md:flex-row space-y-8 md:space-y-0">
        <Plan
          title="Enjoyer"
          sub="No payment required"
          details={["100% free forever", "No watermark", "High-quality image"]}
          img="/assets/enjoyer-avatar.svg"
        />
        <Plan
          title="Super"
          sub="₱109/page for 3 months"
          details={[
            "Custom link",
            "No watermark",
            "High-quality image",
            "Unlimited frame change",
            "Caption text input",
          ]}
          img="/assets/super-avatar.svg"
        />
      </div>
    </section>
  );
}

type Props = {
  title: string;
  sub: string;
  details: string[];
  img: string;
};

function Plan({ title, sub, details, img }: Props) {
  return (
    <div className="border-[3px] border-secondary-200 rounded-md pt-12 p-8 text-center bg-white relative max-w-md w-full flex flex-col justify-between mx-auto md:mx-0">
      <div>
        <h1 className="text-6xl text-primary-100 font-bold">{title}</h1>
        <p className="font-medium mt-1 md:text-lg lg:text-xl">{sub}</p>

        <ul className="list-disc ml-12 text-left font-medium mt-8 md:mt-12 md:text-lg space-y-2 lg:text-xl">
          {details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="font-medium md:mt-1 md:text-lg lg:text-xl self-end mt-8"
      >
        Get started <span className="text-primary-100">&rarr;</span>
      </button>

      <Image
        width={170}
        height={170}
        src={img}
        className="absolute bottom-0 left-0 hidden md:block"
        alt="Avatar"
      />

      <div className="absolute rounded-md -right-3 -bottom-5 -z-10 bg-secondary-200 h-[600px] max-w-md w-full hidden md:block"></div>
    </div>
  );
}
