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
  pomoDuration: 30,
  shortBreakDuration: 10,
  longBreakDuration: 15,
  longBreakInterval: 3,
  sessionEndedReminder: 10,
  timeLeftReminder: 10,
  notificationsEnabled: true,
  silentNotifications: false,
  dailyGoal: null,
  setSettings: (settings) => set((state) => ({ ...state, ...settings })),
  resetSettings: () => set(state.getInitialState()),
});

export default createSettingsSlice;
