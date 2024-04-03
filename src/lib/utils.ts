import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleImageChange = async (options: {
  file: File;
  onSuccess: (dataUrl: string) => void;
  onError: (error: Error) => void;
}) => {
  try {
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
