import { onError } from "@/utils/helpers";
import supabase from "@/utils/supabase";
import { SignupData } from "@/utils/validationSchema";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) =>
      supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      }),
    onError: onError,
  });
};
