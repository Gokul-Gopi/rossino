import ThemeProvider from "@/components/ui/ThemeProvider";
import "@/styles/globals.css";
import toasterOptions from "@/utils/toaster";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "sonner";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PagesTopLoader } from "nextjs-toploader/pages";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

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
