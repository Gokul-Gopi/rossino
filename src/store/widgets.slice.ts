import { StateCreator } from "zustand/vanilla";

export type WidgetStore = {
  note: string;
  showWidgets: boolean;
  dailyGoalProgress: number;
};

export type WidgetSlice = WidgetStore & {
  setNote: (note: string) => void;
  toggleWidgets: () => void;
  resetWidgets: () => void;
};

export const widgetsInitialState: WidgetStore = {
  note: "",
  showWidgets: false,
  dailyGoalProgress: 0,
};

const createWidgetsSlice: StateCreator<WidgetSlice> = (set) => ({
  ...widgetsInitialState,
  toggleWidgets: () => set((state) => ({ showWidgets: !state.showWidgets })),
  setNote: (note) => set(() => ({ note })),
  resetWidgets: () => set(widgetsInitialState),
});

export default createWidgetsSlice;
