import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { SidebarTrigger } from "@/components/ui/Sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

const DarkMode = dynamic(() => import("@/components/layout/DarkMode"), {
  ssr: false,
});

const Header = () => {
  return (
    <header className="px-4 py-4 flex items-center justify-between gap-2">
      <SidebarTrigger />

      <div className="flex gap-2 ml-auto">
        <DarkMode />

        <Tooltip>
          <TooltipTrigger>
            <Button>Signin</Button>
          </TooltipTrigger>

          <TooltipContent>
            <p className="font-medium text-balance w-24">
              Sign in to use all the features
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
