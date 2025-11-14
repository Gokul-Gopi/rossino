import { Dashboard } from "@/types";
import supabase from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = (projectId: string | null) => {
  return useQuery<Dashboard>({
    queryFn: async () => {
      const { data, error } = await supabase.rpc("dashboard", {
        project_id: projectId,
      });

      if (error) throw error;

      return data;
    },
    queryKey: ["dashboard", projectId],
  });
};
