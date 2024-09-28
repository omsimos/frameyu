import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="container max-w-screen-xl mx-auto mt-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold">Our Pricing</h1>
        <h3 className="text-xl mt-2 text-muted-foreground">
          Choose a plan that works for you. No added costs, no hidden fees.
        </h3>
      </div>

      <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-screen-lg mx-auto">
        <section className="border rounded-md p-4 w-full flex flex-col justify-between">
          <div>
            <h4 className="font-semibold">Starter</h4>
            <p className="text-muted-foreground">
              A basic plan for getting started
            </p>

            <p className="text-muted-foreground my-4">
              <span className="font-semibold text-4xl text-foreground">
                Free
              </span>
            </p>

            <ul className="space-y-1">
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                10 Frames
              </li>
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                No Watermark
              </li>
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                Download HD
              </li>
            </ul>
          </div>

          <Button disabled className="mt-12 w-full font-medium">
            Choose Plan <ArrowRightIcon className="size-4 ml-2" />
          </Button>
        </section>

        <section className="border rounded-md p-4 w-full flex flex-col justify-between">
          <div>
            <h4 className="font-semibold">Pro</h4>
            <p className="text-muted-foreground">
              A 3-month plan for the professional
            </p>

            <p className="text-muted-foreground my-4">
              <span className="font-semibold text-4xl text-foreground">
                ₱109
              </span>
              /3 months
            </p>

            <ul className="space-y-1">
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                No Ads
              </li>
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                Analytics
              </li>
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                Unlimited Frames
              </li>
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                Custom URL Handle
              </li>
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                Captions Placeholder
              </li>
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                Private Frames
              </li>
            </ul>
          </div>

          <Button className="mt-12 w-full font-medium">
            Choose Plan <ArrowRightIcon className="size-4 ml-2" />
          </Button>
        </section>

        <section className="border rounded-md p-4 w-full flex flex-col justify-between">
          <div>
            <h4 className="font-semibold">
              Pro Annual
              <Badge className="ml-2">Save 127 PHP</Badge>
            </h4>
            <p className="text-muted-foreground">
              A plan that works for organizations
            </p>

            <p className="text-muted-foreground my-4">
              <span className="font-semibold text-4xl text-foreground">
                ₱309
              </span>
              /year
            </p>

            <ul className="space-y-1">
              <li>
                <CheckIcon className="size-4 inline-block mr-2" />
                Everything in Pro
              </li>
            </ul>
          </div>

          <Button className="mt-12 w-full font-medium">
            Choose Plan <ArrowRightIcon className="size-4 ml-2" />
          </Button>
        </section>
      </div>
    </main>
  );
}
