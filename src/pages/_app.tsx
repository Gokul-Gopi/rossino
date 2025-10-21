import "@/styles/globals.css";
import toasterOptions from "@/utils/toaster";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster {...toasterOptions} />
    </>
  );
}
