import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/Sidebar";
import { cn } from "@/utils/helpers";
import {
  Bolt,
  ChartColumn,
  CircleQuestionMark,
  FolderHeart,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    label: "Projects",
    link: "/projects",
    icon: <FolderHeart className="size-5! -translate-x-0.5" />,
  },
  {
    label: "Reports",
    link: "/reports",
    icon: <ChartColumn scale={2} className="size-5! -translate-x-0.5" />,
  },
  {
    label: "Settings",
    link: "/settings",
    icon: <Bolt className="size-5! -translate-x-0.5" />,
  },
  {
    label: "Philosophy",
    link: "/philosophy",
    icon: <CircleQuestionMark className="size-5! -translate-x-0.5" />,
  },
];

const Sidebar = () => {
  const { state } = useSidebar();

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader className="px-3 mb-6">
        <Link
          href="/"
          className="text-nowrap text-lg flex gap-1.5 overflow-hidden"
        >
          🍅
          <span
            className={cn(
              "inline transition-opacity duration-200 text-nowrap overflow-hidden ",
              {
                "opacity-0": state === "collapsed",
              }
            )}
          >
            Rossino
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu className="gap-6">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton tooltip={item.label}>
                {item.icon}
                <Link href={item.link}> {item.label}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton tooltip="Logout">
          <LogOut className="size-5! -translate-x-0.5" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </SidebarRoot>
  );
};

export default Sidebar;
