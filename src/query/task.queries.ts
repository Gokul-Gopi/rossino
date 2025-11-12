import { Task } from "@/store/task.slice";
import { onError } from "@/utils/helpers";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

type CreateTask = Omit<Task, "id" | "completed"> & { userId: string };
type UpdateTask = Partial<Omit<Task, "projectId">>;

export const useCreateTask = () => {
  return useMutation<Task, Error, CreateTask>({
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
  return useMutation<Task, Error, UpdateTask>({
    mutationFn: async ({ id, title, completed }) => {
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
  return useMutation<null, Error, { id: string }>({
    mutationFn: async ({ id }) => {
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

export const useDeleteProjectTasks = () => {
  return useMutation<null, Error, { projectId: string }>({
    mutationFn: async ({ projectId }) => {
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
  return useMutation<null, Error, { userId: string }>({
    mutationFn: async ({ userId }) => {
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
