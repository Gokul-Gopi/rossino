import { StateCreator } from "zustand/vanilla";

export type WidgetsSlice = {
  showWidgets: boolean;
  toggleWidgets: () => void;
};

const createWidgetsSlice: StateCreator<WidgetsSlice> = (set) => ({
  showWidgets: false,
  toggleWidgets: () => set((state) => ({ showWidgets: !state.showWidgets })),
});

export default createWidgetsSlice;
