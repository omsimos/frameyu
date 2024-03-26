import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useFrameStore } from "@/store/useFrameStore";

const formSchema = z.object({
  customUrl: z
    .string()
    .min(3, {
      message: "URL handle must be at least 3 characters.",
    })
    .max(30, {
      message: "URL handle must not exceed 30 characters.",
    })
    .refine((username) => /^[a-zA-Z0-9_]+$/.test(username), {
      message: "URL handle must be alphanumeric",
    }),

  caption: z.string().max(2200, {
    message: "Caption must not exceed 2,200 characters.",
  }),
});

export function FrameCaption() {
  const updateCurrentTab = useFrameStore((state) => state.updateCurrentTab);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customUrl: "",
      caption: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
        <FormField
          control={form.control}
          name="customUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Custom URL handle <Badge className="ml-1">Premium</Badge>
              </FormLabel>
              <FormControl>
                <Input placeholder="frameyu" {...field} />
              </FormControl>
              <FormDescription>
                fy.omsimos.com/f/
                {form.getValues().customUrl}
              </FormDescription>
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
                <Textarea placeholder="Paste your caption here." {...field} />
              </FormControl>
              <FormDescription>
                This will be available to copy on your shared URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2 mt-4">
          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>

          <Button
            onClick={() => {
              updateCurrentTab("preview");
            }}
            size="icon"
            variant="secondary"
            className="flex-none"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
