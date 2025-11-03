import { create } from "zustand";
import createUserSlice, { UserSlice } from "./user.slice";
import createSettingsSlice, { SettingsSlice } from "./settings.slice";
import { useShallow } from "zustand/react/shallow";
import { persist } from "zustand/middleware";

const useStore = create<UserSlice & SettingsSlice>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createSettingsSlice(...a),
    }),
    { name: "rossino-store" }
  )
);

export const useUser = () =>
  useStore(
    useShallow((state) => ({
      id: state.id,
      email: state.email,
      name: state.name,
      setUser: state.setUser,
    }))
  );

export const useSettings = () =>
  useStore(
    useShallow((state) => ({
      autoStartBreak: state.autoStartBreak,
      autoStartPomo: state.autoStartPomo,
      pomoDuration: state.pomoDuration,
      shortBreakDuration: state.shortBreakDuration,
      longBreakDuration: state.longBreakDuration,
      longBreakInterval: state.longBreakInterval,
      breakEndReminder: state.breakEndReminder,
      timeLeftReminder: state.timeLeftReminder,
      notificationsEnabled: state.notificationsEnabled,
      setSettings: state.setSettings,
    }))
  );

export default useStore;
