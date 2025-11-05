import AppLayout from "@/components/layout/AppLayout";
import Options from "@/components/pages/home/Options";
import Pomodoro from "@/components/pages/home/Pomodoro";
import Tasks from "@/components/pages/home/Tasks";
import TodaySummary from "@/components/pages/home/TodaySummary";
import { useSettings } from "@/query/settings.queries";
import {
  useSettingsStore,
  useSummaryStore,
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
  const { id } = useUserStore();
  const { data } = useSettings(id);
  const { setSettings } = useSettingsStore();

  const { showTasks } = useTaskStore();
  const { showSummary } = useSummaryStore();

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  return (
    <AppLayout className="grid grid-cols-2 gap-8 px-8 lg:grid-cols-3">
      <AnimatePresence initial={false}>
        {showTasks && <Tasks />}
      </AnimatePresence>

      <div className="col-start-2 col-end-3 flex flex-col gap-6">
        <Pomodoro />
        <Options />
      </div>

      <AnimatePresence initial={false}>
        {showSummary && <TodaySummary />}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Page;
