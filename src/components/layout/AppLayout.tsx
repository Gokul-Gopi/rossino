import { SidebarProvider } from "@/components/ui/Sidebar";
import Sidebar from "./Sidebar.";
import Header from "./Header";

interface IAppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IAppLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar />

      <Header />

      <main className="min-h-dvh">{children}</main>
    </SidebarProvider>
  );
};

export default AppLayout;
