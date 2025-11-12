import { Task as TaskDataType } from "@/types";
import { StateCreator } from "zustand";

export type Task = Omit<TaskDataType, "createdAt" | "updatedAt" | "userId">;

type TaskStore = {
  tasks: Task[];
  showTasks: boolean;
};

export type TaskSlice = TaskStore & {
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  setTasks: (tasks: Task[]) => void;
  toggleCompletion: (id: string) => void;
  toggleTasks: () => void;
  resetTasks: () => void;
};

export const taskInitialState: TaskStore = {
  tasks: [],
  showTasks: false,
};

const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
  ...taskInitialState,

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((el) =>
        el.id === id ? { ...el, ...updatedTask } : el,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  setTasks: (tasks) => set(() => ({ tasks })),

  toggleCompletion: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    })),

  toggleTasks: () => set((state) => ({ showTasks: !state.showTasks })),

  resetTasks: () => set(taskInitialState),
});

export default createTaskSlice;
