import { Spinner } from "@/components/ui/Spinner";
import { useCreateSession } from "@/query/auth.queries";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const code = ctx.query?.code;
  console.log("Verification code:", code);

  if (!code) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Page = () => {
  const router = useRouter();
  const code = router.query?.code as string;
  const createSession = useCreateSession();

  useEffect(() => {
    if (router.isReady && code) {
      createSession.mutate(code, {
        onSuccess: () => {
          router.push("/");
          toast.success("Email verified successfully!");
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, code]);

  return (
    <div className="grid place-items-center min-h-dvh">
      <Spinner />
    </div>
  );
};

export default Page;
