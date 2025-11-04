import { create } from "zustand";
import createUserSlice, { UserSlice } from "./user.slice";
import createSettingsSlice, { SettingsSlice } from "./settings.slice";
import { useShallow } from "zustand/react/shallow";
import { persist } from "zustand/middleware";
import createSessionSlice, { SessionSlice } from "./session.slice";

const useStore = create<UserSlice & SettingsSlice & SessionSlice>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createSettingsSlice(...a),
      ...createSessionSlice(...a),
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

export const useSession = () =>
  useStore(
    useShallow((state) => ({
      projectId: state.projectId,
      startedAt: state.startedAt,
      endedAt: state.endedAt,
      lastPausedAt: state.lastPausedAt,
      intendedDuration: state.intendedDuration,
      totalPausedDuration: state.totalPausedDuration,
      interruptionCount: state.interruptionCount,
      status: state.status,
      type: state.type,
      setSession: state.setSession,
    }))
  );

export default useStore;
