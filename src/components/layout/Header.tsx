import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { SidebarTrigger } from "@/components/ui/Sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import Link from "next/link";
import useStore from "@/store";

const DarkMode = dynamic(() => import("@/components/layout/DarkMode"), {
  ssr: false,
});

interface IHeaderProps {
  heading?: React.ReactNode;
}

const Header = ({ heading }: IHeaderProps) => {
  const userId = useStore((state) => state.userId);

  return (
    <header className="flex items-center justify-between gap-2 px-4 py-4 lg:px-8">
      <SidebarTrigger />

      {heading && heading}

      <div className="ml-auto flex gap-2">
        <DarkMode />
        {!userId ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/signin">
                <Button>Signin</Button>
              </Link>
            </TooltipTrigger>

            <TooltipContent>
              <p className="w-24 font-medium text-balance">
                Sign in to use all the features
              </p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Zen mode</Button>
            </TooltipTrigger>

            <TooltipContent>Coming soon!</TooltipContent>
          </Tooltip>
        )}
      </div>
    </header>
  );
};

export default Header;
