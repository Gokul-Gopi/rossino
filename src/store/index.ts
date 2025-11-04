import { create } from "zustand";
import createUserSlice, { UserSlice } from "./user.slice";
import createSettingsSlice, { SettingsSlice } from "./settings.slice";
import { useShallow } from "zustand/react/shallow";
import { persist } from "zustand/middleware";
import createSessionSlice, { SessionSlice } from "./session.slice";
import { LOCAL_STORAGE_KEY } from "@/utils/constants";
import createResetSlice, { ResetSlice } from "./reset.slice";

export type Store = UserSlice & SettingsSlice & SessionSlice;

const useStore = create<
  UserSlice & SettingsSlice & SessionSlice & ResetSlice
>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createSettingsSlice(...a),
      ...createSessionSlice(...a),
      ...createResetSlice(...a),
    }),
    { name: LOCAL_STORAGE_KEY }
  )
);

export const useUserStore = () =>
  useStore(
    useShallow((state) => ({
      id: state.id,
      email: state.email,
      name: state.name,
      setUser: state.setUser,
    }))
  );

export const useSettingsStore = () =>
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

export const useSessionStore = () =>
  useStore(
    useShallow((state) => ({
      projectId: state.projectId,
      startedAt: state.startedAt,
      endedAt: state.endedAt,
      lastPausedAt: state.lastPausedAt,
      elapsedTime: state.elapsedTime,
      intendedDuration: state.intendedDuration,
      totalPausedDuration: state.totalPausedDuration,
      interruptionCount: state.interruptionCount,
      focusSessionCompleted: state.focusSessionCompleted,
      status: state.status,
      type: state.type,
      unSyncedSessions: state.unSyncedSessions,
      setSession: state.setSession,
      nextSession: state.nextSession,
    }))
  );

export const useResetStore = () =>
  useStore(
    useShallow((state) => ({
      resetAll: state.resetAll,
    }))
  );

export default useStore;
