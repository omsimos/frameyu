import { Hero } from "@/components/hero";
import { Steps } from "@/components/steps";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />
      <Steps />
    </main>
  );
}
