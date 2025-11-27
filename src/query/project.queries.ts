import { Project } from "@/types";
import supabase from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useProjects = (search: string) => {
  return useQuery<object, Error, Project[]>({
    queryKey: ["projects", search],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .ilike("title", `%${search}%`)
        .order("createdAt", { ascending: false })
        .limit(5)
        .eq("isArchived", false);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};
