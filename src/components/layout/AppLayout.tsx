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

      <section className="w-full min-h-dvh">
        <Header />

        <main className="p-4">{children}</main>
      </section>
    </SidebarProvider>
  );
};

export default AppLayout;
