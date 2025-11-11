import { Settings } from "@/types";
import supabase from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useSettings = (userId: string | null) => {
  return useQuery<Settings>({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("userId", userId)
        .single();

      if (error) throw error;

      return data;
    },

    queryKey: ["settings", userId],
    enabled: !!userId,
  });
};
