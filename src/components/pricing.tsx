"use client";

import { Heading } from "./heading";
import toast from "react-hot-toast";
import { Plan } from "./utils/plan";

export function Pricing() {
  return (
    <section id="pricing" className="md:pt-52 pt-32 -scroll-mt-28">
      <Heading
        title="Get started for free!"
        sub="Affordable pricing to supercharge your campaign."
      />

      <div className="mt-16 flex xl:space-x-8 lg:space-x-4 justify-center lg:h-[600px] text-secondary-200 flex-col lg:flex-row space-y-8 lg:space-y-0">
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
            "Shareable link",
            "No watermark",
            "High-quality image",
            "Unlimited frame change",
            "Caption text input",
          ]}
          img="/assets/super-avatar.svg"
          handleStart={() =>
            toast("Coming soon!", {
              icon: "🦸",
              id: "super_plan",
            })
          }
        />
        <Plan
          title="Ultimate"
          sub="₱1,099/3 months"
          details={[
            <>
              Everything in <span className="ml-1 text-primary-100">Super</span>
            </>,
            "Personalized theme",
            "Custom subdomain",
            "Create up to 10 pages",
            "Priority customer support",
          ]}
          img="/assets/ultimate-avatar.svg"
          handleStart={() =>
            toast("Coming soon!", {
              icon: "🦸",
              id: "super_plan",
            })
          }
        />
      </div>
    </section>
  );
}
