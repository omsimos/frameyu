import { UseFormReturn } from "react-hook-form";
import { Save } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  onSubmit: (values: any) => void;
  form: UseFormReturn<
    {
      title: string;
      urlHandle: string;
      caption: string;
    },
    any,
    undefined
  >;
  className?: string;
  disabled?: boolean;
  sideButton?: React.ReactNode;
};

export function FrameForm({
  form,
  onSubmit,
  className,
  disabled,
  sideButton,
}: Props) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="urlHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Custom URL handle <Badge className="ml-1">Premium</Badge>
              </FormLabel>
              <FormControl>
                <Input placeholder="frameyu" {...field} />
              </FormControl>
              <FormDescription>
                frameyu.com/f/
                {form.getValues().urlHandle}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Super Cool Frame" {...field} />
              </FormControl>
              <FormDescription>What is your frame about?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[150px]"
                  placeholder="Paste your caption here."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be available to copy on your shared URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2 mt-4">
          <Button disabled={disabled} type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>

          {sideButton && sideButton}
        </div>
      </form>
    </Form>
  );
}
