import { Hero } from "@/components/hero";
import { Steps } from "@/components/steps";
import { Pricing } from "@/components/pricing";
import { Partners } from "@/components/partners";

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <Steps />
      <Pricing />
    </main>
  );
}
