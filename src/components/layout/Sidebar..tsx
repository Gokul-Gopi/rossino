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
import { useLogout } from "@/query/auth.queries";
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
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import useStore, { useStoreActions } from "@/store";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";

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
  const userId = useStore((state) => state.userId);

  const [confirmLogout, setConfirmLogout] = useState(false);

  const logout = useLogout();
  const { resetAll } = useStoreActions();

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push("/signin");
        resetAll();
        toast.success("Logged out");
      },
    });
  };

  return (
    <nav>
      <SidebarRoot collapsible="icon">
        <SidebarHeader className="mt-2 mb-6 px-3">
          <Link
            href="/"
            className="flex items-start gap-1.5 overflow-hidden text-lg text-nowrap"
          >
            <Image src={logo} alt="rossino" width={24} className="min-w-6" />
            <span
              className={cn(
                "inline overflow-hidden font-medium text-nowrap transition-opacity duration-300",
                {
                  "opacity-0": !open && !openMobile,
                },
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

        <SidebarFooter className="flex flex-col gap-4 pb-4">
          <SidebarMenuButton
            onClick={toggleSidebar}
            className="transition-all duration-200"
          >
            <PanelLeft {...iconProps} />
            <span>Collapse</span>
          </SidebarMenuButton>

          {userId && (
            <SidebarMenuButton
              onClick={() => setConfirmLogout(true)}
              className="transition-[background] duration-200"
            >
              <LogOut {...iconProps} />
              <span>Logout</span>
            </SidebarMenuButton>
          )}
        </SidebarFooter>
      </SidebarRoot>

      <ConfirmDialog
        title="Are you sure you want to logout?"
        loading={logout.isPending}
        open={confirmLogout}
        onOpenChange={() => setConfirmLogout(!confirmLogout)}
        onConfirm={onLogout}
      />
    </nav>
  );
};

export default Sidebar;
