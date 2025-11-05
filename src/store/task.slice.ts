import { StateCreator } from "zustand";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export type TaskSlice = {
  tasks: Task[];
  addTask: (data: Omit<Task, "completed" | "id">) => void;
  deleteTask: (id: number) => void;
  editTask: (data: Omit<Task, "completed">) => void;
  toggleCompletion: (id: number) => void;
  resetTasks: () => void;
};

const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
  tasks: [],

  addTask: ({ title }) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title, completed: false }],
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

  resetTasks: () => set({ tasks: [] }),
});

export default createTaskSlice;
