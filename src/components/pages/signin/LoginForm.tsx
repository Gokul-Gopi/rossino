import ControlledPasswordInput from "@/components/form/ControlledPasswordInput";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import LoaderButton from "@/components/ui/LoaderButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "@/utils/validationSchema";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { useLogin } from "@/query/auth.queries";
import { toast } from "sonner";
import { useStoreActions } from "@/store";

interface ILoginFormProps {
  switchForm: () => void;
}

const LoginForm = ({ switchForm }: ILoginFormProps) => {
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const login = useLogin();
  const { resetAll } = useStoreActions();

  const onSubmit = form.handleSubmit((data) => {
    login.mutate(data, {
      onSuccess: () => {
        resetAll();
        router.push("/");
        toast.success("Welcome back. Time to focus!");
      },
    });
  });

  return (
    <motion.form
      key="signin-form"
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <FormProvider {...form}>
        <ControlledTextInput name="email" placeholder="Email" />
        <ControlledPasswordInput name="password" placeholder="Password" />

        <LoaderButton size="lg" type="submit">
          Sign in
        </LoaderButton>

        <div className="flex items-center justify-center gap-1 text-sm">
          <p>Don&apos;t have an account? </p>
          <Button
            type="button"
            onClick={switchForm}
            variant="link"
            size="sm"
            className="size-fit bg-transparent px-0 text-sm font-medium"
          >
            Sign up
          </Button>
        </div>
      </FormProvider>
    </motion.form>
  );
};

export default LoginForm;
