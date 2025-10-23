import ControlledPasswordInput from "@/components/form/ControlledPasswordInput";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import LoaderButton from "@/components/ui/LoaderButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupData } from "@/utils/validationSchema";

const SignupForm = () => {
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormProvider {...form}>
        <ControlledTextInput name="email" placeholder="Email" />
        <ControlledTextInput name="name" placeholder="Name" />
        <ControlledPasswordInput name="password" placeholder="Password" />
        <ControlledPasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
        />

        <LoaderButton type="submit">Submit</LoaderButton>
      </FormProvider>
    </form>
  );
};

export default SignupForm;
