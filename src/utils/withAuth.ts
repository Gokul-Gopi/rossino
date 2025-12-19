import { GetServerSideProps, type GetServerSidePropsContext } from "next";
import { createClient } from "./helpers";
import { User } from "@supabase/supabase-js";

const withAuth = (
  handler: (
    context: GetServerSidePropsContext,
    user: User | null,
  ) => ReturnType<GetServerSideProps>,
) => {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const supabase = createClient(ctx);

      const { data } = await supabase.auth.getUser();

      const user = !data.user ? null : data.user;

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
