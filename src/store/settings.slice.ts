import { Settings } from "@/types";
import { StateCreator } from "zustand/vanilla";

type SettingsStore = Omit<Settings, "userId" | "createdAt" | "updatedAt">;

export type SettingsSlice = SettingsStore & {
  setSettings: (settings: SettingsSlice) => void;
};

const createSettingsSlice: StateCreator<SettingsSlice> = () => ({
  autoStartBreak: false,
  autoStartPomo: false,
  pomoDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  longBreakInterval: 4,
  breakEndReminder: 300,
  timeLeftReminder: 300,
  notificationsEnabled: true,
  setSettings: (settings: SettingsStore) => settings,
});

export default createSettingsSlice;
