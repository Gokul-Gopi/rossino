import AppLayout from "@/components/layout/AppLayout";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = withAuth(async (_ctx, user) => {
  return {
    props: {
      user,
    },
  };
});

const Page = () => {
  return <AppLayout>Home page</AppLayout>;
};

export default Page;
