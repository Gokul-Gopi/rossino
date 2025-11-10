import { RingProgress } from "@/components/ui/RingProgress";
import { useCallback, useEffect, useRef } from "react";
import { cn, notification } from "@/utils/helpers";
import { useSessionStore, useSettingsStore, useUserStore } from "@/store";
import dayjs from "dayjs";
import PomodoroInnerContent from "./PomodoroInnerContent";
import MoreOptions from "./MoreOptions";
import { useSession } from "@/query/session.queries";
import { SessionStore } from "@/store/session.slice";
import { Session } from "@/types";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Pomodoro = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { userId } = useUserStore();

  const {
    sessionId,
    status,
    type,
    startedAt,
    lastPausedAt,
    elapsedTime,
    totalPausedDuration,
    setSession,
    intendedDuration,
    projectId,
    projectName,
    focusSessionCompleted,
    notifiedForTimeLeft,
    notifiedForSessionEnded,
    setNotifiedUser,
  } = useSessionStore();

  const {
    pomoDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    autoStartPomo,
    autoStartBreak,
    sessionEndedReminder,
    timeLeftReminder,
    notificationsEnabled,
    silentNotifications,
  } = useSettingsStore();

  const remainingTime = formatTime(Math.floor(intendedDuration - elapsedTime));

  const session = useSession();

  const onStart = () => {
    setNotifiedUser({
      notifiedForSessionEnded: false,
      notifiedForTimeLeft: false,
    });

    const updatedState: Partial<SessionStore> = {
      type,
      startedAt,
      projectId,
      intendedDuration,
    };

    if (status === "IDLE") {
      const startedAt = dayjs().toISOString();

      updatedState.startedAt = startedAt;
      updatedState.status = "RUNNING";
    } else if (status === "RUNNING") {
      const pausedAt = dayjs().toISOString();

      updatedState.lastPausedAt = pausedAt;
      updatedState.status = "PAUSED";
    } else if (status === "PAUSED") {
      const pausedDuration =
        dayjs().diff(dayjs(lastPausedAt), "second") + totalPausedDuration;

      updatedState.totalPausedDuration = pausedDuration;
      updatedState.status = "RUNNING";
    }

    setSession(updatedState);

    if (userId && sessionId) {
      session.mutate(
        { ...updatedState, id: sessionId, projectId, userId },
        {
          onSuccess: (response) => {
            setSession({ sessionId: response.id, ...response });
          },
          onError: () => {
            const prevState = {
              status,
              lastPausedAt,
              startedAt,
              totalPausedDuration,
            };
            setSession(prevState);
          },
        },
      );
    }
  };

  const onAfterCompletion = () => {
    const updatedState: Partial<SessionStore> = {};

    if (type === "FOCUS") {
      const focusSessionCompletedCount = focusSessionCompleted + 1;
      updatedState.focusSessionCompleted = focusSessionCompletedCount;

      if (focusSessionCompletedCount % longBreakInterval === 0) {
        updatedState.type = "LONGBREAK";
        updatedState.intendedDuration = longBreakDuration;
      } else {
        updatedState.type = "SHORTBREAK";
        updatedState.intendedDuration = shortBreakDuration;
      }
    } else {
      updatedState.type = "FOCUS";
      updatedState.intendedDuration = pomoDuration;
    }

    setSession({
      ...updatedState,
      status: "IDLE",
      startedAt: null,
      endedAt: null,
      lastPausedAt: null,
      elapsedTime: 0,
      totalPausedDuration: 0,
      interruptionCount: 0,
    });

    if (userId) {
      session.mutate(
        {
          userId,
          projectId,
          type: updatedState.type,
          intendedDuration: updatedState.intendedDuration,
        },
        {
          onSuccess: (response) => {
            setSession({ sessionId: response.id, ...response });
          },
          onError: () => {
            setSession({
              status: "PAUSED",
              endedAt: null,
            });
          },
        },
      );
    }
  };

  const updateTimer = useCallback(() => {
    const elapsedTime =
      dayjs().diff(dayjs(startedAt), "second") - totalPausedDuration;

    const timeLeft = intendedDuration - elapsedTime;

    if (
      timeLeftReminder &&
      !notifiedForTimeLeft &&
      type === "FOCUS" &&
      timeLeft <= timeLeftReminder
    ) {
      notification({
        title: "Time Left Reminder",
        body: `Only ${timeLeftReminder} minutes left in your focus session!`,
        silent: silentNotifications,
      });
      setNotifiedUser({ notifiedForTimeLeft: true });
    }

    if (timeLeft <= 0) {
      setSession({
        status: "COMPLETED",
        endedAt: dayjs().toISOString(),
      });

      if (notificationsEnabled) {
        const nextSessionType: Session["type"] =
          type === "FOCUS"
            ? (focusSessionCompleted + 1) % longBreakInterval === 0
              ? "LONGBREAK"
              : "SHORTBREAK"
            : "FOCUS";

        notification({
          title: "Session Completed",
          body: `${nextSessionType === "FOCUS" ? "Time to focus!" : nextSessionType === "SHORTBREAK" ? "Take a short break!" : "Take a long break, you deserve it!"}`,
          silent: silentNotifications,
        });
      }

      if (userId && sessionId) {
        session.mutate(
          {
            id: sessionId,
            userId,
            projectId,
            intendedDuration,
            endedAt: dayjs().toISOString(),
            status: "COMPLETED",
          },
          {
            onError: () => {
              setSession({
                status: "PAUSED",
                endedAt: null,
              });
            },
          },
        );
      }

      clearInterval(intervalRef.current!);

      return;
    }

    setSession({
      elapsedTime,
    });
  }, [sessionId, startedAt, totalPausedDuration, type, notifiedForTimeLeft]);

  useEffect(() => {
    if (status === "IDLE") {
      if (
        (autoStartPomo && type === "FOCUS") ||
        (autoStartBreak && type !== "FOCUS")
      )
        onStart();
    }

    if (status === "RUNNING") {
      intervalRef.current = setInterval(updateTimer, 500);
    }

    if (status === "COMPLETED") {
      onAfterCompletion();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, updateTimer]);

  return (
    <div className="group bg-card relative col-start-2 col-end-3 flex flex-col items-center rounded-2xl border p-10 shadow max-2xl:order-first">
      <RingProgress
        value={(elapsedTime / intendedDuration) * 100}
        className="size-50 md:size-80 lg:size-100"
        circleProps={{
          strokeWidth: 6,
          className: cn("stroke-primary/20", {
            "stroke-green-400/20": type === "SHORTBREAK",
            "stroke-blue-400/20": type === "LONGBREAK",
          }),
        }}
        progressCircleProps={{
          strokeWidth: 6,
          className: cn("stroke-primary", {
            "stroke-green-400": type === "SHORTBREAK",
            "stroke-blue-400": type === "LONGBREAK",
          }),
        }}
        content={
          <PomodoroInnerContent
            remainingTime={remainingTime}
            status={status}
            type={type}
            onStart={onStart}
          />
        }
      />

      <p className="mt-4 text-center font-medium">{projectName}</p>

      <MoreOptions />
    </div>
  );
};

export default Pomodoro;
