import { Hero } from "@/components/hero";
import { Steps } from "@/components/steps";
import { Pricing } from "@/components/pricing";
import { Partners } from "@/components/partners";
import { Divider } from "@/components/utils/divider";

export default function Home() {
  return (
    <main>
      <Hero />
      <Divider />

      <Partners />
      <Divider />

      <Steps />
      <Divider />

      <Pricing />
    </main>
  );
}
