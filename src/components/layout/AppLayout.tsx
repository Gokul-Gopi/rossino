import { SidebarProvider } from "@/components/ui/Sidebar";
import Sidebar from "./Sidebar.";
import Header from "./Header";
import { cn } from "@/utils/helpers";

interface IAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: IAppLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar />

      <section className="w-full min-h-dvh">
        <Header />

        <main className={cn("p-4 flex justify-center", className)}>
          {children}
        </main>
      </section>
    </SidebarProvider>
  );
};

export default AppLayout;
