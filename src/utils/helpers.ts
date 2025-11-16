import { createServerClient, serializeCookieHeader } from "@supabase/ssr";
import { clsx, type ClassValue } from "clsx";
import { GetServerSidePropsContext } from "next";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onError = async (error: any) => {
  let errorMessage = "Something went wrong";

  errorMessage = error.message ?? errorMessage;
  toast.error(errorMessage);
};

export const createClient = ({ req, res }: GetServerSidePropsContext) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name] || "",
          }));
        },
        setAll(cookiesToSet) {
          res.setHeader(
            "Set-Cookie",
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );
  return supabase;
};

type Options = NotificationOptions & {
  title: string;
};

export const notification = ({ title, ...data }: Options) => {
  return new Notification(title, {
    ...data,
  });
};

export const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "00:00";
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};
