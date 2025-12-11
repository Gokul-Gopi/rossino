import { SidebarProvider } from "@/components/ui/Sidebar";
import Sidebar from "./Sidebar.";
import Header from "./Header";
import { cn } from "@/utils/helpers";

import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

interface IAppLayoutProps {
  children: React.ReactNode;
  heading?: React.ReactNode;
  className?: string;
}

const AppLayout = ({ children, heading, className }: IAppLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar />

      <section className="min-h-dvh w-full">
        <Header heading={heading} />

        <main
          className={cn(
            "flex justify-center px-4 pt-4 pb-4 max-md:pb-14",
            className,
          )}
        >
          {children}
        </main>
      </section>
    </SidebarProvider>
  );
};

export default AppLayout;
