import { Hero } from "@/components/hero";
import { Steps } from "@/components/steps";
import { Pricing } from "@/components/pricing";
import { Partners } from "@/components/partners";
import { Divider } from "@/components/utils/divider";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

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
