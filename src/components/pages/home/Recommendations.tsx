import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ILinkWithFaviconProps {
  href: string;
  children?: React.ReactNode;
}

const music = [
  {
    title: "Lo-fi",
    url: "https://www.youtube.com/watch?v=3GQY80jyysQ",
  },
  {
    title: "Naruto Lo-fi",
    url: "https://open.spotify.com/playlist/1QjzRkCvYlG5kkehLHuq5r?si=b1e75de5a11f41b2",
  },
  {
    title: "AOT Lo-fi",
    url: "https://open.spotify.com/playlist/1QjzRkCvYlG5kkehLHuq5r?si=f63c7a061b444108",
  },
];

const motivation = [
  {
    title: "One step at a time",
    url: "https://www.youtube.com/watch?v=75d_29QWELk",
  },
];

const LinkWithFavicon = ({ href, children }: ILinkWithFaviconProps) => {
  const url = new URL(href);
  const origin = url.origin;
  const hostname = url.hostname;

  const [src, setSrc] = useState(`${origin}/favicon.ico`);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary flex items-center gap-2 underline-offset-2 hover:underline"
    >
      <Image
        src={src}
        alt=""
        width={16}
        height={16}
        onError={() =>
          setSrc(`https://www.google.com/s2/favicons?sz=32&domain=${hostname}`)
        }
        className="shrink-0"
      />
      <span className="truncate text-sm">{children ?? href}</span>
    </Link>
  );
};

const Recommendations = () => {
  return (
    <div>
      <ul className="mb-5 flex flex-col gap-1">
        <h5 className="text-sm font-medium">Need background music?</h5>
        {music.map((item) => (
          <li key={item.title}>
            <LinkWithFavicon href={item.url}>{item.title}</LinkWithFavicon>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-1">
        <h5 className="text-sm font-medium">Need motivation?</h5>
        {motivation.map((item) => (
          <li key={item.title}>
            <LinkWithFavicon href={item.url}>{item.title}</LinkWithFavicon>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
