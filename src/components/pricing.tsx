import { Heading } from "./heading";
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
          details={[
            "100% free forever",
            "No watermark",
            "High-quality image",
            <span className="text-secondary-100">Shareable link</span>,
            <span className="text-secondary-100">Caption text input</span>,
          ]}
          img="/assets/enjoyer-avatar.svg"
          handleStart="/tool"
        />
        <Plan
          title="Custom"
          sub="₱1,099/3 months"
          details={[
            <>
              Everything in <span className="ml-1 text-primary-100">Enjoyer</span>
            </>,
            "Personalized website",
            "Custom subdomain",
            "Create up to 10 pages",
            "Priority customer support",
          ]}
          img="/assets/ultimate-avatar.svg"
        />
      </div>
    </section>
  );
}
