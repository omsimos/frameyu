import { LogInIcon, PackageIcon, Share2Icon } from "lucide-react";

export function Steps() {
  return (
    <section className="bg-white py-12 mt-16">
      <div className="grid md:grid-cols-3 gap-10 container max-w-screen-xl">
        <Step
          icon={LogInIcon}
          content="Log in to Frameyu"
          subContent="Sign in to view, edit, and manage for all your campaign frames in one place."
        />
        <Step
          icon={PackageIcon}
          content="Publish Frame"
          subContent="Make your frame available and update details like captions for your audience to use."
        />
        <Step
          icon={Share2Icon}
          content="Share Your Frame"
          subContent="Distribute your unique link across social media so your audience can easily apply your frame."
        />
      </div>
    </section>
  );
}

type Props = {
  content: string;
  subContent: string;
  icon: React.ElementType;
};

function Step(props: Props) {
  const Icon = props.icon;

  return (
    <div className="flex flex-col">
      <Icon className="size-10 rounded-md bg-primary p-2 text-white" />
      <h3 className="font-medium md:text-xl text-lg max-w-60 mt-6 mb-2">
        {props.content}
      </h3>
      <p className="text-muted-foreground">{props.subContent}</p>
    </div>
  );
}
