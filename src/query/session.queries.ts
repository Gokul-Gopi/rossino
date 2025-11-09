import { Session } from "@/types";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSession = () => {
  return useMutation<Session, Error, Partial<Session>>({
    mutationFn: async (body: Partial<Session>) => {
      const { data, error } = await supabase
        .from("sessions")
        .upsert(body)
        .select()
        .single();

      if (error) throw error;

      return data;
    },

    onError: () => {
      return toast.error("Failed to update session. Please try again later");
    },
  });
};

export const useUpdateSession = () => {
  return useMutation<Session, Error, Partial<Session>>({
    mutationFn: async ({ id, ...rest }: Partial<Session>) => {
      const { data, error } = await supabase
        .from("sessions")
        .update(rest)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return data;
    },

    onError: () => {
      return toast.error("Failed to update session. Please try again later");
    },
  });
};
