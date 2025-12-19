import AppLayout from "@/components/layout/AppLayout";
import PageHeading from "@/components/layout/PageHeading";
import SettingsForm from "@/components/pages/settings/SettingsForm";
import { createClient } from "@/utils/helpers";
import withAuth from "@/utils/withAuth";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Bolt } from "lucide-react";
import { NextSeo } from "next-seo";

export const getServerSideProps = withAuth(async (ctx, user) => {
  const queryClient = new QueryClient();

  if (user) {
    const supabase = createClient(ctx);

    await queryClient.prefetchQuery({
      queryFn: async () => {
        const { data } = await supabase
          .from("settings")
          .select("*")
          .eq("userId", user.id)
          .single();

        return data;
      },
      queryKey: ["settings", user.id],
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
  return (
    <AppLayout
      heading={
        <PageHeading
          icon={<Bolt size={18} />}
          title="Settings"
          subtitle="Customize your experience"
        />
      }
    >
      <NextSeo
        title="Rossino | Settings"
        description="Customize your experience with Rossino"
      />

      <SettingsForm />
    </AppLayout>
  );
};

export default Page;
