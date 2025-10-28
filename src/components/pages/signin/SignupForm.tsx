import ControlledPasswordInput from "@/components/form/ControlledPasswordInput";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import LoaderButton from "@/components/ui/LoaderButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupData } from "@/utils/validationSchema";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { useSignup } from "@/query/auth.queries";
import { toast } from "sonner";

interface ISignupFormProps {
  switchForm: () => void;
}

const SignupForm = ({ switchForm }: ISignupFormProps) => {
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const signup = useSignup();

  const onSubmit = form.handleSubmit((data) => {
    signup.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success(
          "Please check your inbox. Kindly verify your email to continue"
        );
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
        <ControlledTextInput name="name" placeholder="Name" />
        <ControlledPasswordInput name="password" placeholder="Password" />
        <ControlledPasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
        />

        <LoaderButton loading={signup.isPending} size="lg" type="submit">
          Sign up
        </LoaderButton>

        <div className="text-sm flex gap-1 justify-center items-center">
          <p>Already have an account?</p>
          <Button
            type="button"
            onClick={switchForm}
            variant="link"
            size="sm"
            className="text-sm size-fit px-0 bg-transparent font-medium"
          >
            Sign in
          </Button>
        </div>
      </FormProvider>
    </motion.form>
  );
};

export default SignupForm;
