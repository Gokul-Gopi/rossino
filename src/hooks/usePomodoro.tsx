import useStore from "@/store";

// Simple wrapper hook to access all the Pomodoro-related state from the store
// Created to reduce the verbosity in the pomodoro component
export const usePomodoro = () => {
  const sessionId = useStore((state) => state.sessionId);
  const status = useStore((state) => state.status);
  const type = useStore((state) => state.type);
  const startedAt = useStore((state) => state.startedAt);
  const lastPausedAt = useStore((state) => state.lastPausedAt);
  const elapsedTime = useStore((state) => state.elapsedTime);
  const totalPausedDuration = useStore((state) => state.totalPausedDuration);
  const intendedDuration = useStore((state) => state.intendedDuration);
  const projectId = useStore((state) => state.projectId);
  const projectName = useStore((state) => state.projectName);
  const focusSessionCompleted = useStore(
    (state) => state.focusSessionCompleted,
  );
  const notifiedForTimeLeft = useStore((state) => state.notifiedForTimeLeft);
  const notifiedForNextSession = useStore(
    (state) => state.notifiedForNextSession,
  );

  const pomoDuration = useStore((state) => state.pomoDuration);
  const shortBreakDuration = useStore((state) => state.shortBreakDuration);
  const longBreakDuration = useStore((state) => state.longBreakDuration);
  const longBreakInterval = useStore((state) => state.longBreakInterval);
  const autoStartPomo = useStore((state) => state.autoStartPomo);
  const autoStartBreak = useStore((state) => state.autoStartBreak);
  const nextSessionReminder = useStore((state) => state.nextSessionReminder);
  const timeLeftReminder = useStore((state) => state.timeLeftReminder);
  const notificationsEnabled = useStore((state) => state.notificationsEnabled);
  const silentNotifications = useStore((state) => state.silentNotifications);

  return {
    sessionId,
    status,
    type,
    startedAt,
    lastPausedAt,
    elapsedTime,
    totalPausedDuration,
    intendedDuration,
    projectId,
    projectName,
    focusSessionCompleted,
    notifiedForTimeLeft,
    notifiedForNextSession,
    pomoDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    autoStartPomo,
    autoStartBreak,
    nextSessionReminder,
    timeLeftReminder,
    notificationsEnabled,
    silentNotifications,
  };
};
