import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Image from "next/image";
import tomato from "../../../../public/assets/tomato.avif";
import googleIcon from "../../../../public/assets/google-icon.svg";
import { Button } from "@/components/ui/Button";

const FormLayout = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="flex items-center w-full max-w-4xl px-4">
      <div className="bg-card w-full items-center min-h-[34rem] flex relative gap-4 shadow p-4 border rounded-lg">
        <div className="flex-1">
          <Button
            size="lg"
            variant="outline"
            className="w-full hover:bg-background hover:text-black hover:shadow"
          >
            <Image src={googleIcon} alt="google icon" width={18} height={18} />
            Continue with Google
          </Button>

          <div className="flex items-center gap-2 my-4">
            <hr className="w-full" />
            <span className="font-medium text-sm text-muted-foreground">
              OR
            </span>
            <hr className="w-full" />
          </div>

          {isLoginForm ? (
            <LoginForm switchForm={() => setIsLoginForm(!isLoginForm)} />
          ) : (
            <SignupForm switchForm={() => setIsLoginForm(!isLoginForm)} />
          )}
        </div>

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
