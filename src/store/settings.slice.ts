import { Settings } from "@/types";
import { StateCreator } from "zustand/vanilla";

type SettingsStore = Omit<Settings, "userId" | "createdAt" | "updatedAt">;

export type SettingsSlice = SettingsStore & {
  setSettings: (settings: Partial<SettingsSlice>) => void;
};

const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  autoStartBreak: false,
  autoStartPomo: false,
  pomoDuration: 60,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  longBreakInterval: 4,
  breakEndReminder: 300,
  timeLeftReminder: 300,
  notificationsEnabled: true,
  setSettings: (settings) => set((state) => ({ ...state, ...settings })),
});

export default createSettingsSlice;
