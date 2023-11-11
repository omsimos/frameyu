"use client";

import { Heading } from "./heading";
import toast from "react-hot-toast";
import { Plan } from "./utils/plan";

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
          handleStart="/tool"
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
          handleStart={() =>
            toast("Coming soon!", {
              icon: "🦸",
            })
          }
        />
      </div>
    </section>
  );
}
