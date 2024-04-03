"use client";

import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEditFrameStore } from "@/store/useEditFrameStore";
import { useRouter } from "next/navigation";

export type EditFrameProps = {
  id: string;
  title: string;
  imgUrl: string;
  caption?: string | null;
  handle: string;
};

export function EditButton(props: EditFrameProps) {
  const router = useRouter();
  const updateEditData = useEditFrameStore((state) => state.updateEditData);

  const handleEdit = () => {
    updateEditData(props);
    router.push("/dashboard/edit");
  };

  return (
    <Button onClick={handleEdit} variant="ghost" size="icon">
      <Settings2 className="h-4 w-4" />
    </Button>
  );
}
