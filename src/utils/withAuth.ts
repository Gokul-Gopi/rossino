import { GetServerSideProps, type GetServerSidePropsContext } from "next";
import { IUser } from "./types";
import { createServerClient, serializeCookieHeader } from "@supabase/ssr";

const withAuth = (
  handler: (
    context: GetServerSidePropsContext,
    user: IUser | null
  ) => ReturnType<GetServerSideProps>
) => {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const supabase = createClient(ctx);

      const { data } = await supabase.auth.getUser();

      const user = !data.user
        ? null
        : ({ id: data.user.id, ...data.user.user_metadata } as IUser);

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

export const createClient = ({ req, res }: GetServerSidePropsContext) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name] || "",
          }));
        },
        setAll(cookiesToSet) {
          res.setHeader(
            "Set-Cookie",
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );
  return supabase;
};

export default withAuth;
