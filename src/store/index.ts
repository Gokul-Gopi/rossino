import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEY } from "@/utils/constants";
import createUserSlice, { UserSlice } from "./user.slice";
import createSettingsSlice, { SettingsSlice } from "./settings.slice";
import createSessionSlice, { SessionSlice } from "./session.slice";
import createResetSlice, { ResetSlice } from "./reset.slice";
import createTaskSlice, { TaskSlice } from "./task.slice";
import createWidgetsSlice, { WidgetSlice } from "./widgets.slice";

export type Store = UserSlice &
  SettingsSlice &
  SessionSlice &
  ResetSlice &
  TaskSlice &
  WidgetSlice;

const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createSettingsSlice(...a),
      ...createSessionSlice(...a),
      ...createResetSlice(...a),
      ...createTaskSlice(...a),
      ...createWidgetsSlice(...a),
    }),
    {
      name: LOCAL_STORAGE_KEY,
      partialize: (state) => {
        // Exclude user info from persistence
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userId, email, name, setUser, ...rest } = state;
        return rest;
      },
    },
  ),
);

export const useUserStore = () =>
  useStore(
    useShallow((state) => ({
      userId: state.userId,
      email: state.email,
      name: state.name,
      setUser: state.setUser,
    })),
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
      nextSessionReminder: state.nextSessionReminder,
      timeLeftReminder: state.timeLeftReminder,
      notificationsEnabled: state.notificationsEnabled,
      silentNotifications: state.silentNotifications,
      dailyGoal: state.dailyGoal,
      setSettings: state.setSettings,
    })),
  );

export const useSessionStore = () =>
  useStore(
    useShallow((state) => ({
      sessionId: state.sessionId,
      projectId: state.projectId,
      projectName: state.projectName,
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
      notifiedForTimeLeft: state.notifiedForTimeLeft,
      notifiedForNextSession: state.notifiedForNextSession,
      setNotifiedUser: state.setNotifiedUser,
      setSession: state.setSession,
      resetSession: state.resetSession,
    })),
  );

export const useTaskStore = () =>
  useStore(
    useShallow((state) => ({
      tasks: state.tasks,
      showTasks: state.showTasks,
      toggleTasksVisibility: state.toggleTasksVisibility,
      addTask: state.addTask,
      deleteTask: state.deleteTask,
      editTask: state.editTask,
      toggleCompletion: state.toggleCompletion,
      resetTasks: state.resetTasks,
    })),
  );

export const useWidgetsStore = () =>
  useStore(
    useShallow((state) => ({
      showWidgets: state.showWidgets,
      toggleWidgets: state.toggleWidgets,
      note: state.note,
      setNote: state.setNote,
      dailyGoalProgress: state.dailyGoalProgress,
    })),
  );

export const useResetStore = () =>
  useStore(
    useShallow((state) => ({
      resetAll: state.resetAll,
    })),
  );

export default useStore;
