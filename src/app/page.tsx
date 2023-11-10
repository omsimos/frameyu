import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { Steps } from "@/components/steps";

export default function Home() {
  return (
    <main className="pb-32">
      <Hero />
      <Steps />
      <Pricing />
    </main>
  );
}
