import dynamic from "next/dynamic";
import { SidebarTrigger } from "../ui/Sidebar";

const DarkMode = dynamic(() => import("@/components/layout/DarkMode"), {
  ssr: false,
});

const Header = () => {
  return (
    <header>
      <SidebarTrigger />
      <DarkMode />
    </header>
  );
};

export default Header;
