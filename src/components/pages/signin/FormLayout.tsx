import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Button } from "@/components/ui/Button";

const FormLayout = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div>
      <Button onClick={() => setIsLoginForm(!isLoginForm)} className="mb-4">
        {isLoginForm ? "Switch to Signup" : "Switch to Login"}
      </Button>

      <div className="bg-card shadow p-4 border rounded-lg">
        {isLoginForm ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default FormLayout;
