import AppLayout from "@/components/layout/AppLayout";
import Pomodoro from "@/components/pages/home/Pomodoro";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = withAuth(async (_ctx, user) => {
  return {
    props: {
      user,
    },
  };
});

const Page = () => {
  return (
    <AppLayout>
      <Pomodoro />
    </AppLayout>
  );
};

export default Page;
