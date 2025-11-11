import { SidebarProvider } from "@/components/ui/Sidebar";
import Sidebar from "./Sidebar.";
import Header from "./Header";
import { cn } from "@/utils/helpers";

import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

interface IAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: IAppLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar />

      <section className="min-h-dvh w-full">
        <Header />

        <main className={cn("flex justify-center p-4", className)}>
          {children}
        </main>
      </section>
    </SidebarProvider>
  );
};

export default AppLayout;
