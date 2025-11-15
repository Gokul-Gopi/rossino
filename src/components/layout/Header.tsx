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

const Header = () => {
  const userId = useStore((state) => state.userId);

  return (
    <header className="flex items-center justify-between gap-2 px-4 py-4 lg:px-8">
      <SidebarTrigger />

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
          <Button>Zen mode</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
