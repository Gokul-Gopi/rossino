import { Dashboard } from "@/types";
import supabase from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = (projectId: string) => {
  return useQuery<Dashboard>({
    queryFn: async () => {
      const { data, error } = await supabase.rpc("dashboard", {
        projectId,
      });

      if (error) throw error;

      return data;
    },
    queryKey: ["dashboard", projectId],
    enabled: !!projectId,
  });
};
