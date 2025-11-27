import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

export const useWidget = () => {
  return useMutation<null, Error, { id: string; note: string }>({
    mutationFn: async ({ id, note }) => {
      const { data, error } = await supabase
        .from("widgets")
        .upsert({ userId: id, note });

      if (error) throw error;

      return data;
    },
  });
};
