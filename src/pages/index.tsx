import AppLayout from "@/components/layout/AppLayout";
import Pomodoro from "@/components/pages/home/Pomodoro";
import Tasks from "@/components/pages/home/Tasks";
import Widgets from "@/components/pages/home/Widgets";
import withAuth from "@/utils/withAuth";
import { useDashboard } from "@/query/dashboard.queries";
import useStore, { useStoreActions } from "@/store";
import { createClient, excludeKeys } from "@/utils/helpers";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import NotificationPermission from "@/components/pages/home/NotificationPermission";
import dayjs from "dayjs";
import { SessionStore } from "@/store/session.slice";
import ProjectSwitchOverlay from "@/components/pages/home/ProjectSwitchOverlay";
import DynamicDocTitle from "@/components/pages/home/DynamicDocTitle";
import ProjectSelect from "@/components/pages/home/ProjectSelect";

export const getServerSideProps = withAuth(async (ctx, user) => {
  const queryClient = new QueryClient();

  const projectId = ctx.query.project ?? null;

  if (user) {
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

  const userId = useStore((state) => state?.userId);
  const showWidgets = useStore((state) => state.showWidgets);
  const showTasks = useStore((state) => state.showTasks);

  const { setNote, setTasks, setSettings, setSession } = useStoreActions();

  const { data, isPending } = useDashboard(
    (router.query.project as string) ?? null,
    !!userId,
  );

  const populateDashboard = useCallback(() => {
    if (!data) return;

    setTasks(data.tasks);
    setSettings(data.settings);
    setNote(data.widgets.note ?? "");

    let currentSession: SessionStore | object = {};

    if (data.project) {
      currentSession = {
        ...currentSession,
        projectId: data.project.id,
        projectName: data.project.title,
      };
    }

    if (data.sessions) {
      const sessionData = excludeKeys(data.sessions, [
        "id",
        "createdAt",
        "updatedAt",
      ]);

      let elapsedTime = 0;

      if (data.sessions.status !== "IDLE") {
        elapsedTime =
          dayjs(data?.sessions?.lastPausedAt).diff(
            dayjs(data?.sessions?.startedAt),
            "second",
          ) - data.sessions.totalPausedDuration;
      }

      currentSession = {
        ...sessionData,
        ...currentSession,
        elapsedTime,
        sessionId: data.sessions.id,
      };
    }

    setSession(currentSession);
  }, [data]);

  useEffect(() => {
    populateDashboard();
  }, [populateDashboard]);

  return (
    <AppLayout
      heading={userId && <ProjectSelect />}
      className="flex grid-cols-2 flex-col gap-4 pb-20 md:gap-8 lg:px-8 2xl:grid 2xl:grid-cols-3"
    >
      <DynamicDocTitle />

      <AnimatePresence initial={false}>
        {showTasks && <Tasks />}
      </AnimatePresence>

      <Pomodoro />

      <AnimatePresence initial={false}>
        {showWidgets && <Widgets />}
      </AnimatePresence>

      {!!router.query.switch && isPending && <ProjectSwitchOverlay />}

      <NotificationPermission />
    </AppLayout>
  );
};

export default Page;
