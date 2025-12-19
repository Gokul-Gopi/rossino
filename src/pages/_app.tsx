import ThemeProvider from "@/components/ui/ThemeProvider";
import "@/styles/globals.css";
import toasterOptions from "@/utils/toaster";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PagesTopLoader } from "nextjs-toploader/pages";
import { useStoreActions } from "@/store";
import { DefaultSeo } from "next-seo";
import seo from "@/utils/seo";
import { User } from "@/types";

interface IAppProps {
  dehydratedState: DehydratedState;
  user: User;
}

export default function App({ Component, pageProps }: AppProps<IAppProps>) {
  const { setUser } = useStoreActions();

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
      setUser({
        userId: pageProps.user.id,
        email: pageProps.user.email as string,
        name: pageProps.user.user_metadata.name,
      });
    }
  }, [pageProps.user, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ThemeProvider attribute="class" enableSystem={false}>
          <PagesTopLoader color="hsl(0, 100%, 71%)" showSpinner={false} />
          <DefaultSeo {...seo} />
          <Component {...pageProps} />
          <Toaster {...toasterOptions} />
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
