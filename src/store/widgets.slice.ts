import { StateCreator } from "zustand/vanilla";

export type WidgetsSlice = {
  showWidgets: boolean;
  toggleWidgets: () => void;
  dailyGoalProgress: number;
  setDailyGoalProgress: (progress: number) => void;
};

const createWidgetsSlice: StateCreator<WidgetsSlice> = (set) => ({
  showWidgets: false,
  toggleWidgets: () => set((state) => ({ showWidgets: !state.showWidgets })),
  dailyGoalProgress: 0,
  setDailyGoalProgress: (progress: number) =>
    set(() => ({ dailyGoalProgress: progress })),
});

export default createWidgetsSlice;
