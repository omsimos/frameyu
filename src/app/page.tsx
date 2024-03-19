import { Hero } from "@/components/hero";
import { Steps } from "@/components/steps";
import { Pricing } from "@/components/pricing";
import { Partners } from "@/components/partners";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />
      <Partners />
      <Steps />
      <Pricing />
    </main>
  );
}
