/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { formatTime, notification } from "@/utils/helpers";
import useStore, { useStoreActions } from "@/store";
import dayjs from "dayjs";
import MoreOptions from "./MoreOptions";
import { useSession } from "@/query/session.queries";
import { SessionStore } from "@/store/session.slice";
import { Session } from "@/types";
import { usePomodoro } from "@/hooks/usePomodoro";
import RingTimer from "./RingTimer";
import BarTimer from "./BarTimer";
import SwitchSession from "./SwitchSession";
import { NextSeo } from "next-seo";

const Pomodoro = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reminderTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const userId = useStore((state) => state.userId);

  const {
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
    timerStyle,
  } = usePomodoro();

  const { setSession, setNotifiedUser, setInterruptionsData } =
    useStoreActions();

  const remainingTime = formatTime(Math.floor(intendedDuration - elapsedTime));

  const session = useSession();

  const updatePausedData = (count = 0, duration = 0) => {
    setInterruptionsData({
      count,
      duration,
    });
  };

  const cleanup = () => {
    setNotifiedUser({
      notifiedForNextSession: false,
      notifiedForTimeLeft: false,
    });

    if (reminderTimeout.current) {
      clearTimeout(reminderTimeout.current);
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

  const onStart = () => {
    cleanup();

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

      updatePausedData(1);
    } else if (status === "PAUSED") {
      const pausedDuration =
        dayjs().diff(dayjs(lastPausedAt), "second") + totalPausedDuration;

      updatedState.totalPausedDuration = pausedDuration;
      updatedState.status = "RUNNING";

      updatePausedData(0, pausedDuration);
    }

    setSession(updatedState);

    if (userId) {
      session.mutate(
        { ...updatedState, id: sessionId!, projectId, userId },
        {
          onSuccess: ({ id, createdAt, updatedAt, ...rest }) => {
            setSession({ sessionId: id, ...rest });
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
          onSuccess: ({ id, createdAt, updatedAt, ...rest }) => {
            setSession({ sessionId: id, ...rest });
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

  const onNextSessionReminder = () => {
    if (!nextSessionReminder || notifiedForNextSession) return;

    reminderTimeout.current = setTimeout(() => {
      notification({
        title: "Next Session Reminder",
        body: "When you're ready, you can start your next session!",
        silent: silentNotifications,
      });
      setNotifiedUser({ notifiedForNextSession: true });

      clearTimeout(reminderTimeout.current!);
    }, nextSessionReminder * 1000);
  };

  useEffect(() => {
    if (status === "IDLE") {
      if (
        (autoStartPomo && type === "FOCUS") ||
        (autoStartBreak && type !== "FOCUS")
      ) {
        onStart();
      } else {
        onNextSessionReminder();
      }
    }

    if (status === "RUNNING") {
      intervalRef.current = setInterval(updateTimer, 1000);
    }

    if (status === "COMPLETED") {
      onAfterCompletion();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (reminderTimeout.current) {
        clearTimeout(reminderTimeout.current);
      }
    };
  }, [status, updateTimer]);

  return (
    <div className="group bg-card relative col-start-2 col-end-3 flex flex-col items-center rounded-2xl border px-4 pt-10 shadow max-2xl:order-first">
      {timerStyle === "RING" ? (
        <RingTimer
          progress={(elapsedTime / intendedDuration) * 100}
          remainingTime={remainingTime}
          status={status}
          type={type}
          onStart={onStart}
        />
      ) : (
        <BarTimer
          progress={(elapsedTime / intendedDuration) * 100}
          remainingTime={remainingTime}
          status={status}
          type={type}
          onStart={onStart}
        />
      )}
      {/* <p className="mt-4 text-center font-medium">{projectName}</p> */}

      <SwitchSession />

      <MoreOptions />

      <NextSeo
        title={`${remainingTime} - ${type === "FOCUS" ? "Focus" : "Break"}`}
      />
    </div>
  );
};

export default Pomodoro;
