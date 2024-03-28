import { generateReactHelpers } from "@uploadthing/react";
import type { ImgFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<ImgFileRouter>();
