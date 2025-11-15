import dayjs, { type Dayjs } from "dayjs";
import { StateCreator } from "zustand/vanilla";

export type WidgetStore = {
  note: string;
  showWidgets: boolean;
  dailyGoalProgress: number;
  pausedCount: number;
  pausedDuration: number;
  resetDate: Dayjs | null;
  timerStyle: "RING" | "BAR";
};

export type WidgetSlice = WidgetStore & {
  setNote: (note: string) => void;
  toggleWidgets: () => void;
  setTimerStyle: (style: "RING" | "BAR") => void;
  setInterruptionsData: ({
    count,
    duration,
  }: {
    count: number;
    duration: number;
  }) => void;
  resetWidgets: () => void;
};

export const widgetsInitialState: WidgetStore = {
  note: "",
  showWidgets: false,
  dailyGoalProgress: 0,
  pausedCount: 0,
  pausedDuration: 0,
  resetDate: null,
  timerStyle: "RING",
};

const createWidgetsSlice: StateCreator<WidgetSlice> = (set) => ({
  ...widgetsInitialState,
  toggleWidgets: () => set((state) => ({ showWidgets: !state.showWidgets })),

  setNote: (note) => set(() => ({ note })),

  setTimerStyle: (style) => set(() => ({ timerStyle: style })),

  setInterruptionsData: ({ count, duration }) => {
    set((state) => {
      const expired = state.resetDate && dayjs().isSame(state.resetDate, "day");

      return {
        pausedCount: !expired ? state.pausedCount + count : count,
        pausedDuration: !expired ? state.pausedDuration + duration : duration,
        resetDate: !state.resetDate ? dayjs().add(1, "day") : state.resetDate,
      };
    });
  },

  resetWidgets: () => set(widgetsInitialState),
});

export default createWidgetsSlice;
