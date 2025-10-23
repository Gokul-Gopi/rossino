import ControlledPasswordInput from "@/components/form/ControlledPasswordInput";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import LoaderButton from "@/components/ui/LoaderButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "@/utils/validationSchema";

const LoginForm = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormProvider {...form}>
        <ControlledTextInput name="email" placeholder="Email" />
        <ControlledPasswordInput name="password" placeholder="Password" />

        <LoaderButton type="submit">Submit</LoaderButton>
      </FormProvider>
    </form>
  );
};

export default LoginForm;
