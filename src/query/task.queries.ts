import { Task } from "@/store/task.slice";
import { onError } from "@/utils/helpers";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

type CreateTask = Omit<Task, "id" | "completed"> & { userId: string };
type UpdateTask = Partial<Omit<Task, "projectId">>;

export const useCreateTask = () => {
  return useMutation({
    mutationFn: async ({ title, projectId, userId }: CreateTask) => {
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

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: async ({ id, title, completed }: UpdateTask) => {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title, completed })
        .eq("id", id)
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
      const { data, error } = await supabase.from("tasks").delete();

      if (error) throw error;

      return data;
    },
    onError: onError,
  });
};

export const useDeleteProjectTasks = () => {
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("projectId", projectId);

      if (error) throw error;

      return data;
    },
    onError: onError,
  });
};

export const useDeleteUserTasks = () => {
  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("userId", userId);

      if (error) throw error;

      return data;
    },
    onError: onError,
  });
};
