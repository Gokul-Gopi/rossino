import { onError } from "@/utils/helpers";
import supabase from "@/utils/supabase";
import { LoginData, SignupData } from "@/utils/validationSchema";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });
      if (error) throw error;
    },
    onError: onError,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) throw error;
    },
    onError: onError,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onError: onError,
  });
};
