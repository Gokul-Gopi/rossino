import { StateCreator } from "zustand/vanilla";

export type SummarySlice = {
  showSummary: boolean;
  toggleSummary: () => void;
};

const createSummarySlice: StateCreator<SummarySlice> = (set) => ({
  showSummary: false,
  toggleSummary: () => set((state) => ({ showSummary: !state.showSummary })),
});

export default createSummarySlice;
