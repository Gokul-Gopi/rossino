import AppLayout from "@/components/layout/AppLayout";
import Pomodoro from "@/components/pages/home/Pomodoro";
import Tasks from "@/components/pages/home/Tasks";
import Widgets from "@/components/pages/home/Widgets";
import { useSettings } from "@/query/settings.queries";
import {
  useSettingsStore,
  useWidgetsStore,
  useTaskStore,
  useUserStore,
} from "@/store";
import { createClient } from "@/utils/helpers";
import withAuth from "@/utils/withAuth";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";

export const getServerSideProps = withAuth(async (ctx, user) => {
  const queryClient = new QueryClient();

  if (user?.id) {
    const supabase = createClient(ctx);

    await queryClient.prefetchQuery({
      queryKey: ["settings", user.id],
      queryFn: async () => {
        const res = await supabase
          .from("settings")
          .select("*")
          .eq("userId", user.id)
          .single();

        return res.data;
      },
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
  // Move this to settings page later
  const { id } = useUserStore();
  const { data } = useSettings(id);
  const { setSettings } = useSettingsStore();

  const { showTasks } = useTaskStore();
  const { showWidgets } = useWidgetsStore();

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

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
