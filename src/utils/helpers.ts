import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onError = async (
  error: FunctionsHttpError | FunctionsRelayError | FunctionsFetchError
) => {
  let errorMessage = "Something went wrong";

  if (error instanceof FunctionsHttpError)
    errorMessage = await error.context.json();
  else errorMessage = error.message ?? errorMessage;

  toast.error(errorMessage);
};
