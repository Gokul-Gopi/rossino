import AppLayout from "@/components/layout/AppLayout";
import PageHeading from "@/components/layout/PageHeading";
import { Bolt } from "lucide-react";

const Page = () => {
  return (
    <AppLayout
      heading={
        <PageHeading
          icon={<Bolt size={18} />}
          title="Settings"
          subtitle=" Customize your experience"
        />
      }
    >
      Page
    </AppLayout>
  );
};

export default Page;
