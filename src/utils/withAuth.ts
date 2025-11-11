import { GetServerSideProps, type GetServerSidePropsContext } from "next";
import { createClient } from "./helpers";
import { UserStore } from "@/store/user.slice";

const withAuth = (
  handler: (
    context: GetServerSidePropsContext,
    user: UserStore | null,
  ) => ReturnType<GetServerSideProps>,
) => {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const supabase = createClient(ctx);

      const { data } = await supabase.auth.getUser();

      const user = !data.user
        ? null
        : ({
            userId: data.user.id,
            email: data.user.email,
            name: data.user?.user_metadata?.name ?? "",
          } as UserStore);

      return handler(ctx, user);
    } catch {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }
  };
};

export default withAuth;
