import { onError } from "@/utils/helpers";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: async ({
      title,
      projectId,
      userId,
    }: {
      title: string;
      projectId: string | null;
      userId: string;
    }) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ title, projectId, userId }])
        .select()
        .single();

      if (error) throw error;

      return data;
    },
    onError: onError,
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) throw error;

      return data;
    },
    onError: onError,
  });
};
