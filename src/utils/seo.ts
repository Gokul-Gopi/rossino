import { DefaultSeoProps } from "next-seo";

const seo: DefaultSeoProps = {
  title: "Rossino",
  description: "A pomodoro timer app to help you stay focused and productive",
  openGraph: {
    type: "website",
    url: "https://rossino.app/",
    siteName: "Rossino",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/assets/logo.svg",
    },
  ],
};

export default seo;
