import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleImageChange = async (options: {
  file: File;
  sizeLimit?: number;
  onSuccess: (dataUrl: string) => void;
  onError: (error: Error) => void;
}) => {
  try {
    if (
      options.sizeLimit &&
      options.file.size > options.sizeLimit * 1024 * 1024
    ) {
      options.onError(
        new Error(`File size should be less than ${options.sizeLimit}MB`),
      );

      return;
    }

    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(options.file);
    });

    options.onSuccess(dataUrl as string);
  } catch (err) {
    options.onError(err as Error);
  }
};
