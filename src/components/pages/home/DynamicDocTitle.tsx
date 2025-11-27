import useStore from "@/store";
import { formatTime } from "@/utils/helpers";
import { NextSeo } from "next-seo";

const DynamicDocTitle = () => {
  const status = useStore((state) => state.status);
  const type = useStore((state) => state.type);
  const elapsedTime = useStore((state) => state.elapsedTime);
  const intendedDuration = useStore((state) => state.intendedDuration);

  const remainingTime = formatTime(Math.floor(intendedDuration - elapsedTime));

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
