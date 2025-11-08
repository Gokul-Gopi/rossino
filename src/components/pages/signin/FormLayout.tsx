import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Image from "next/image";
import tomato from "../../../../public/assets/tomato.avif";
import googleIcon from "../../../../public/assets/google-icon.svg";
import { Button } from "@/components/ui/Button";
import { LayoutGroup, motion } from "motion/react";
import supabase from "@/utils/supabase";
import { Timer } from "lucide-react";
import Link from "next/link";

const FormLayout = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const onGoogleSignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/verify-email`,
        queryParams: {
          prompt: "consent",
        },
      },
    });
  };

  return (
    <div className="flex w-full max-w-4xl items-center">
      <div className="w-full">
        <Link href="/">
          <Button
            variant="link"
            className="dark:text-muted-foreground text-primary px-0! font-medium"
          >
            <Timer />
            Back to Home
          </Button>
        </Link>

        <div className="bg-card relative flex min-h-[34rem] w-full items-center gap-4 rounded-lg border p-4 shadow">
          <LayoutGroup>
            <div className="flex-1">
              <motion.div layout transition={{ duration: 0.3 }}>
                <Button
                  onClick={onGoogleSignin}
                  size="lg"
                  variant="outline"
                  className="hover:bg-background border-input w-full text-black hover:text-inherit hover:shadow dark:text-white"
                >
                  <Image
                    src={googleIcon}
                    alt="google icon"
                    width={18}
                    height={18}
                  />
                  Continue with Google
                </Button>
              </motion.div>

              <motion.div
                transition={{ duration: 0.3 }}
                layout
                className="my-4 flex items-center gap-2"
              >
                <hr className="w-full" />
                <span className="text-muted-foreground text-sm font-medium">
                  OR
                </span>
                <hr className="w-full" />
              </motion.div>

              {isLoginForm ? (
                <LoginForm switchForm={() => setIsLoginForm(!isLoginForm)} />
              ) : (
                <SignupForm switchForm={() => setIsLoginForm(!isLoginForm)} />
              )}
            </div>
          </LayoutGroup>

          <div className="relative flex-1 self-stretch max-lg:hidden">
            <Image
              src={tomato}
              alt="tomato"
              className="rounded-lg"
              fill
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
