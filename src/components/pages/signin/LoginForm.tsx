import ControlledPasswordInput from "@/components/form/ControlledPasswordInput";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import LoaderButton from "@/components/ui/LoaderButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "@/utils/validationSchema";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";

interface ILoginFormProps {
  switchForm: () => void;
}

const LoginForm = ({ switchForm }: ILoginFormProps) => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <motion.form
      key="signin-form"
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <FormProvider {...form}>
        <ControlledTextInput name="email" placeholder="Email" />
        <ControlledPasswordInput name="password" placeholder="Password" />

        <LoaderButton size="lg" type="submit">
          Sign in
        </LoaderButton>

        <div className="text-sm flex gap-1 justify-center items-center">
          <p>Don&apos;t have an account? </p>
          <Button
            type="button"
            onClick={switchForm}
            variant="link"
            size="sm"
            className="text-sm size-fit px-0 bg-transparent font-medium"
          >
            Sign up
          </Button>
        </div>
      </FormProvider>
    </motion.form>
  );
};

export default LoginForm;
