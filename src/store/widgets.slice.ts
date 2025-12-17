import dayjs, { type Dayjs } from "dayjs";
import { StateCreator } from "zustand/vanilla";

export type WidgetStore = {
  note: string;
  showWidgets: boolean;
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
    durationInc,
    countInc,
  }: {
    durationInc: number;
    countInc?: number;
  }) => void;
  resetWidgets: () => void;
};

export const widgetsInitialState: WidgetStore = {
  note: "",
  showWidgets: false,
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

  setInterruptionsData: ({ durationInc, countInc = 0 }) => {
    set((state) => {
      const expired = state.resetDate && dayjs().isSame(state.resetDate, "day");

      return {
        pausedCount: !expired ? state.pausedCount + countInc : countInc,
        pausedDuration: !expired
          ? state.pausedDuration + durationInc
          : durationInc,
        resetDate: !state.resetDate ? dayjs().add(1, "day") : state.resetDate,
      };
    });
  },

  resetWidgets: () => set(widgetsInitialState),
});

export default createWidgetsSlice;
