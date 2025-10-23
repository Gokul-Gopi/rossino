import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
  SidebarMenuItem,
} from "@/components/ui/Sidebar";
import { cn } from "@/utils/helpers";
import {
  Bolt,
  ChartColumn,
  CircleQuestionMark,
  FolderHeart,
  LogOut,
  PanelLeft,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const iconProps: React.SVGProps<SVGSVGElement> = {
  className: "size-5! -translate-x-[2.5px]",
};

const navLinks = [
  {
    label: "Pomodoro",
    link: "/",
    icon: <Timer {...iconProps} />,
  },
  {
    label: "Projects",
    link: "/projects",
    icon: <FolderHeart {...iconProps} />,
  },
  {
    label: "Reports",
    link: "/reports",
    icon: <ChartColumn {...iconProps} />,
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
  const router = useRouter();
  const { open, openMobile, toggleSidebar } = useSidebar();

  return (
    <nav>
      <SidebarRoot collapsible="icon">
        <SidebarHeader className="px-3 mb-6 mt-2">
          <Link
            href="/"
            className="text-nowrap text-lg flex gap-1.5 overflow-hidden"
          >
            🍅
            <span
              className={cn(
                "inline transition-opacity duration-300 text-nowrap overflow-hidden ",
                {
                  "opacity-0": !open && !openMobile,
                }
              )}
            >
              Rossino
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarMenu className="gap-5">
            {navLinks.map((el) => (
              <SidebarMenuItem key={el.label}>
                <SidebarMenuButton
                  isActive={router.pathname === el.link}
                  className="transition-all duration-200"
                >
                  <Link href={el.link} className="flex gap-2">
                    {el.icon} {el.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="pb-4 flex flex-col gap-4">
          <SidebarMenuButton
            onClick={toggleSidebar}
            className="transition-all duration-200"
          >
            <PanelLeft {...iconProps} />
            <span>Collapse</span>
          </SidebarMenuButton>

          <SidebarMenuButton className="transition-[background] duration-200">
            <LogOut {...iconProps} />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </SidebarRoot>
    </nav>
  );
};

export default Sidebar;
