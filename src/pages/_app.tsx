import ThemeProvider from "@/components/ui/ThemeProvider";
import "@/styles/globals.css";
import toasterOptions from "@/utils/toaster";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PagesTopLoader } from "nextjs-toploader/pages";
import { useUserStore } from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  const { setUser } = useUserStore();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    if (pageProps.user) {
      setUser(pageProps.user);
    }
  }, [pageProps.user, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ThemeProvider attribute="class" enableSystem={false}>
          <PagesTopLoader color="hsl(0 84% 60%)" />
          <Component {...pageProps} />
          <Toaster {...toasterOptions} />
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
