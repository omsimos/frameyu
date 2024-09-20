import { LogInIcon, PackageIcon, Share2Icon } from "lucide-react";

export function Steps() {
  return (
    <section className="bg-white py-12 mt-24">
      <div className="flex items-center flex-col md:flex-row gap-y-20 md:gap-y-0 justify-between container max-w-screen-xl">
        <Step icon={LogInIcon} content="Continue with your Frameyu account" />
        <Step
          icon={PackageIcon}
          content="Publish the frame for your campaign"
        />
        <Step
          icon={Share2Icon}
          content="Share the frame link to your audience"
        />
      </div>
    </section>
  );
}

type Props = {
  content: string;
  icon: React.ElementType;
};

function Step(props: Props) {
  const Icon = props.icon;

  return (
    <div className="flex items-center flex-col gap-y-6">
      <Icon className="size-10 rounded-md bg-primary p-2 text-white" />
      <h3 className="font-medium md:text-xl text-lg max-w-60 text-center">{props.content}</h3>
    </div>
  );
}
