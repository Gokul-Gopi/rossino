import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onError = async (error: any) => {
  let errorMessage = "Something went wrong";

  errorMessage = error.message ?? errorMessage;
  toast.error(errorMessage);
};
