import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Image from "next/image";
import tomato from "../../../../public/assets/tomato.avif";
import googleIcon from "../../../../public/assets/google-icon.svg";
import { Button } from "@/components/ui/Button";
import { LayoutGroup, motion } from "motion/react";

const FormLayout = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="flex items-center w-full max-w-4xl">
      <div className="bg-card w-full items-center min-h-[34rem] flex relative gap-4 shadow p-4 border rounded-lg">
        <LayoutGroup>
          <div className="flex-1">
            <motion.div layout transition={{ duration: 0.3 }}>
              <Button
                size="lg"
                variant="outline"
                className="w-full hover:bg-background hover:text-black hover:shadow dark:text-white"
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
              className="flex items-center gap-2 my-4"
            >
              <hr className="w-full" />
              <span className="font-medium text-sm text-muted-foreground">
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

        <div className="flex-1 relative self-stretch max-lg:hidden">
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
  );
};

export default FormLayout;
