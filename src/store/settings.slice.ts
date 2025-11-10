import { Settings } from "@/types";
import { StateCreator } from "zustand/vanilla";

type SettingsStore = Omit<Settings, "userId" | "createdAt" | "updatedAt">;

export type SettingsSlice = SettingsStore & {
  setSettings: (settings: Partial<SettingsSlice>) => void;
  resetSettings: () => void;
};

const createSettingsSlice: StateCreator<SettingsSlice> = (
  set,
  _get,
  state,
) => ({
  autoStartBreak: false,
  autoStartPomo: false,
  pomoDuration: 120,
  shortBreakDuration: 20,
  longBreakDuration: 30,
  longBreakInterval: 3,
  notificationsEnabled: true,
  nextSessionReminder: 30,
  timeLeftReminder: 30,
  silentNotifications: true,
  dailyGoal: null,
  setSettings: (settings) => set((state) => ({ ...state, ...settings })),
  resetSettings: () => set(state.getInitialState()),
});

export default createSettingsSlice;
