import { Database } from "@/utils/database.types";
import { StateCreator } from "zustand/vanilla";

type Settings = Omit<
  Database["public"]["Tables"]["settings"]["Row"],
  "userId" | "createdAt" | "updatedAt"
>;

export type SettingsSlice = Settings & {
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
  setSettings: (settings: Settings) => settings,
});

export default createSettingsSlice;
