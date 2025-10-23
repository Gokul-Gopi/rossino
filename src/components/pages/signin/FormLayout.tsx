import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Image from "next/image";
import tomato from "../../../../public/assets/tomato.avif";
import { Button } from "@/components/ui/Button";

const FormLayout = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="flex items-center w-full max-w-4xl">
      <div className="bg-card w-full items-center min-h-[32rem] flex relative gap-4 shadow p-4 border rounded-lg">
        <div className="flex-1">
          <Button variant={"outline"} className="w-full">
            Sign in with Google
          </Button>

          <div className="flex items-center gap-2 my-4">
            <hr className="w-full" />
            <div className="text-center font-medium text-sm text-muted-foreground">
              OR
            </div>
            <hr className="w-full" />
          </div>

          {isLoginForm ? (
            <LoginForm formSwitch={() => setIsLoginForm(!isLoginForm)} />
          ) : (
            <SignupForm formSwitch={() => setIsLoginForm(!isLoginForm)} />
          )}
        </div>

        <div className="flex-1 relative self-stretch">
          <Image
            src={tomato}
            alt="pomodoro"
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
