import AppLayout from "@/components/layout/AppLayout";
import LoginForm from "@/components/pages/signin/LoginForm";
// import SignInForm from "@/components/pages/signin/SignupForm";
// import { Button } from "@/components/ui/Button";
// import { AnimatePresence, motion } from "motion/react";
// import { useState } from "react";

const Page = () => {
  // const [form, setForm] = useState<"signin" | "signup">("signin");

  return (
    <AppLayout>
      <div className="flex flex-col gap-4 h-screen items-center justify-center">
        <div className="bg-card shadow p-4 border rounded-lg">
          <LoginForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
