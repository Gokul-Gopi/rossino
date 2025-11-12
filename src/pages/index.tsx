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
import NotificationPermission from "@/components/pages/home/NotificationPermission";
import dayjs from "dayjs";
import { SessionStore } from "@/store/session.slice";

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
  const { showTasks, setTasks } = useTaskStore();
  const { showWidgets } = useWidgetsStore();

  const { setNote } = useWidgetsStore();
  const { setSettings } = useSettingsStore();
  const { setSession } = useSessionStore();

  const { data } = useDashboard(router.query.project as string);

  const populateDashboard = () => {
    if (!data) return;

    setTasks(data.tasks);
    setSettings(data.settings);
    setNote(data.widgets.note ?? "");

    let currentSesion = {
      projectId: data.project.id,
      projectName: data.project.title,
    } as SessionStore;

    if (data.sessions) {
      // Reason for disable: omitting certain fields
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, ...rest } = data.sessions;

      const elapsedTime =
        dayjs(data?.sessions?.lastPausedAt).diff(
          dayjs(data?.sessions?.startedAt),
          "second",
        ) - data.sessions.totalPausedDuration;

      currentSesion = {
        ...rest,
        ...currentSesion,
        elapsedTime,
        sessionId: id,
      };
    }
    setSession(currentSesion);
  };

  useEffect(() => {
    populateDashboard();
  }, []);

  return (
    <AppLayout className="flex grid-cols-2 flex-col gap-4 pb-20 md:gap-8 lg:px-8 2xl:grid 2xl:grid-cols-3">
      <AnimatePresence initial={false}>
        {showTasks && <Tasks />}
      </AnimatePresence>

      <Pomodoro />

      <AnimatePresence initial={false}>
        {showWidgets && <Widgets />}
      </AnimatePresence>

      <NotificationPermission />
    </AppLayout>
  );
};

export default Page;
