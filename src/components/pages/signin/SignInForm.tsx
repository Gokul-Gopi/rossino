import ControlledPasswordInput from "@/components/form/ControlledPasswordInput";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import LoaderButton from "@/components/ui/LoaderButton";
import { FormProvider, useForm } from "react-hook-form";

const SignInForm = () => {
  const form = useForm({});

  return (
    <form className="bg-card shadow p-4 border rounded-lg flex flex-col gap-4">
      <FormProvider {...form}>
        <ControlledTextInput name="Email" placeholder="Email" />
        <ControlledTextInput name="name" placeholder="Name" />
        <ControlledPasswordInput name="Password" placeholder="Password" />
        <ControlledPasswordInput
          name="Confirm Password"
          placeholder="Confirm Password"
        />
        <LoaderButton>Submit</LoaderButton>
      </FormProvider>
    </form>
  );
};

export default SignInForm;
