import { Database } from "@/utils/database.types";
import { StateCreator } from "zustand/vanilla";

export type SettingsSlice = Omit<
  Database["public"]["Tables"]["settings"]["Row"],
  "userId" | "createdAt" | "updatedAt"
> & {
  setSettings: (settings: SettingsSlice) => void;
};

const createSettingsSlice: StateCreator<SettingsSlice> = () => ({
  autoStartBreak: false,
  autoStartPomo: false,
  pomoDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  longBreakInterval: 4,
  breakEndReminder: 5,
  timeLeftReminder: 5,
  notificationsEnabled: false,
  setSettings: (settings: SettingsSlice) => settings,
});

export default createSettingsSlice;
