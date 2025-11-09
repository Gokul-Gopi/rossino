import { Session } from "@/types";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

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
  });
};
