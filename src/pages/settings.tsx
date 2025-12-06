import AppLayout from "@/components/layout/AppLayout";
import PageHeading from "@/components/layout/PageHeading";
import SettingsForm from "@/components/pages/settings/Settingsform";
import { Bolt } from "lucide-react";
import { NextSeo } from "next-seo";

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
