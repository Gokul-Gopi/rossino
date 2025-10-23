import dynamic from "next/dynamic";
import { Button } from "../ui/Button";
import { SidebarTrigger } from "../ui/Sidebar";

const DarkMode = dynamic(() => import("@/components/layout/DarkMode"), {
  ssr: false,
});

const Header = () => {
  return (
    <header className="px-4 py-4 flex items-center justify-between gap-2">
      <SidebarTrigger />

      <div className="flex gap-2 ml-auto">
        <DarkMode />
        <Button>Signin</Button>
      </div>
    </header>
  );
};

export default Header;
