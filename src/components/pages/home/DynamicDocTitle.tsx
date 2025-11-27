import { NextSeo } from "next-seo";

interface IDynamicTitleProps {
  status: string;
  type: string;
  remainingTime: string;
}

const DynamicDocTitle = ({
  status,
  type,
  remainingTime,
}: IDynamicTitleProps) => {
  return status === "RUNNING" ? (
    <NextSeo
      title={`${remainingTime} - ${type === "FOCUS" ? "Focus" : "Break"}`}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "/assets/hourglass.svg",
        },
      ]}
    />
  ) : (
    <NextSeo
      title="Rossino"
      description="A Pomodoro timer app"
      additionalLinkTags={[
        {
          rel: "icon",
          href: "/assets/logo.svg",
          color: "#ffffff",
        },
      ]}
    />
  );
};

export default DynamicDocTitle;
