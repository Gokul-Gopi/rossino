import { GetServerSideProps, type GetServerSidePropsContext } from "next";
import { User } from "@/types";
import { createClient } from "./helpers";

const withAuth = (
  handler: (
    context: GetServerSidePropsContext,
    user: User | null
  ) => ReturnType<GetServerSideProps>
) => {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const supabase = createClient(ctx);

      const { data } = await supabase.auth.getUser();

      const user = !data.user
        ? null
        : ({ id: data.user.id, ...data.user.user_metadata } as User);

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
