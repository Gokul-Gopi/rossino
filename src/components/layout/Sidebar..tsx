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
  ChevronsLeftRight,
  CircleQuestionMark,
  FolderHeart,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const iconProps: React.SVGProps<SVGSVGElement> = {
  className: "size-5! -translate-x-0.5",
};

const menuItems = [
  {
    label: "Projects",
    link: "/projects",
    icon: <FolderHeart {...iconProps} />,
  },
  {
    label: "Reports",
    link: "/reports",
    icon: <ChartColumn scale={2} {...iconProps} />,
  },
  {
    label: "Settings",
    link: "/settings",
    icon: <Bolt {...iconProps} />,
  },
  {
    label: "Philosophy",
    link: "/philosophy",
    icon: <CircleQuestionMark {...iconProps} />,
  },
];

const Sidebar = () => {
  const { open, toggleSidebar } = useSidebar();

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
                "opacity-0": !open,
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
        <SidebarMenuButton tooltip="Expand" onClick={toggleSidebar}>
          <ChevronsLeftRight {...iconProps} />
          <span>Collapse</span>
        </SidebarMenuButton>

        <SidebarMenuButton tooltip="Logout">
          <LogOut {...iconProps} />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </SidebarRoot>
  );
};

export default Sidebar;
