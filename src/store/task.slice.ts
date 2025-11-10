import { Task as TaskDataType } from "@/types";
import { StateCreator } from "zustand";

export type Task = Omit<TaskDataType, "createdAt" | "updatedAt" | "userId">;

type TaskStore = {
  tasks: Task[];
  showTasks: boolean;
};

export type TaskSlice = TaskStore & {
  toggleTasksVisibility: () => void;
  addTask: (data: Task) => void;
  deleteTask: (id: string) => void;
  editTask: (data: Omit<Task, "completed">) => void;
  toggleCompletion: (id: string) => void;
  resetTasks: () => void;
};

export const taskInitialState: TaskStore = {
  tasks: [],
  showTasks: false,
};

const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
  ...taskInitialState,
  toggleTasksVisibility: () =>
    set((state) => ({ showTasks: !state.showTasks })),

  addTask: (taskData) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...taskData, id: Date.now().toString(), completed: false },
      ],
    })),

  editTask: ({ title, id }) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title } : task,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  toggleCompletion: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    })),

  resetTasks: () => set(taskInitialState),
});

export default createTaskSlice;
