import { RingProgress } from "@/components/ui/RingProgress";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils/helpers";
import { useSessionStore, useUserStore } from "@/store";
import dayjs from "dayjs";
import PomodoroInnerContent from "./PomodoroInnerContent";
import MoreOptions from "./MoreOptions";
import { useSession } from "@/query/session.queries";
import { SessionStore } from "@/store/session.slice";

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
    nextSession,
    intendedDuration,
    projectId,
    projectName,
  } = useSessionStore();

  const remainingTime = formatTime(Math.floor(intendedDuration - elapsedTime));

  const session = useSession();

  const onStart = () => {
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

    if (userId) {
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

  const updateTimer = useCallback(() => {
    const elapsedTime =
      dayjs().diff(dayjs(startedAt), "second") - totalPausedDuration;

    if (elapsedTime >= intendedDuration) {
      setSession({
        status: "COMPLETED",
        elapsedTime: intendedDuration,
        endedAt: dayjs().toISOString(),
      });

      if (userId) {
        session.mutate(
          {
            id: sessionId,
            userId: userId,
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

      nextSession();

      clearInterval(intervalRef.current!);

      return;
    }

    setSession({
      elapsedTime,
    });
  }, [sessionId]);

  useEffect(() => {
    if (status === "RUNNING") {
      intervalRef.current = setInterval(updateTimer, 500);
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
