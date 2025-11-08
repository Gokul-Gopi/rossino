import { StateCreator } from "zustand/vanilla";

export type WidgetsSlice = {
  showWidgets: boolean;
  toggleWidgets: () => void;
  note: string;
  setNote: (note: string) => void;
  dailyGoalProgress: number;
  setDailyGoalProgress: (progress: number) => void;
};

const createWidgetsSlice: StateCreator<WidgetsSlice> = (set) => ({
  showWidgets: false,
  toggleWidgets: () => set((state) => ({ showWidgets: !state.showWidgets })),

  note: "",
  setNote: (note) => set(() => ({ note })),

  dailyGoalProgress: 0,
  setDailyGoalProgress: (progress) =>
    set(() => ({ dailyGoalProgress: progress })),
});

export default createWidgetsSlice;
