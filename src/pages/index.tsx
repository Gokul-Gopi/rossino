import AppLayout from "@/components/layout/AppLayout";
import Pomodoro from "@/components/pages/home/Pomodoro";
import Tasks from "@/components/pages/home/Tasks";
import Widgets from "@/components/pages/home/Widgets";
import withAuth from "@/utils/withAuth";
import { useDashboard } from "@/query/dashboard.queries";
import {
  useWidgetsStore,
  useTaskStore,
  useSettingsStore,
  useSessionStore,
} from "@/store";
import { createClient } from "@/utils/helpers";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps = withAuth(async (ctx, user) => {
  const queryClient = new QueryClient();

  const projectId = ctx.query.project as string;

  if (projectId) {
    const supabase = createClient(ctx);

    await queryClient.prefetchQuery({
      queryFn: async () => {
        const res = await supabase.rpc("dashboard", {
          project_id: projectId,
        });
        return res.data;
      },
      queryKey: ["dashboard", projectId],
    });
  }

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
    },
  };
});

const Page = () => {
  const router = useRouter();
  const { showTasks } = useTaskStore();
  const { showWidgets } = useWidgetsStore();

  const { setNote } = useWidgetsStore();
  const { setSettings } = useSettingsStore();
  const { setSession } = useSessionStore();

  const { data } = useDashboard(router.query.project as string);

  useEffect(() => {
    if (data) {
      setSession({
        projectId: data.project.id,
        projectName: data.project.title,
      });
      setSettings(data.settings);
      setNote(data.widgets.note ?? "");
    }
  }, [data, setSettings, setNote]);

  return (
    <AppLayout className="flex grid-cols-2 flex-col gap-4 pb-20 md:gap-8 lg:px-8 2xl:grid 2xl:grid-cols-3">
      <AnimatePresence initial={false}>
        {showTasks && <Tasks />}
      </AnimatePresence>

      <Pomodoro />

      <AnimatePresence initial={false}>
        {showWidgets && <Widgets />}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Page;
