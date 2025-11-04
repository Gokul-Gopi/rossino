import AppLayout from "@/components/layout/AppLayout";
import Pomodoro from "@/components/pages/home/Pomodoro";
import Tasks from "@/components/pages/home/Tasks";
import { Button } from "@/components/ui/Button";
import { useSettings } from "@/query/settings.queries";
import { useSettingsStore, useUserStore } from "@/store";
import { createClient } from "@/utils/helpers";
import withAuth from "@/utils/withAuth";
import { dehydrate, QueryClient } from "@tanstack/react-query";
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

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  return (
    <AppLayout className="grid grid-cols-3 gap-8 px-8">
      <Tasks />
      <div className="flex flex-col gap-6">
        <Pomodoro />

        <Button className="mr-auto border" variant="outline">
          Add Tasks
        </Button>
      </div>
      Some data
    </AppLayout>
  );
};

export default Page;
