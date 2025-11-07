import { RingProgress } from "@/components/ui/RingProgress";
import { useEffect, useRef } from "react";
import { cn } from "@/utils/helpers";
import { useSessionStore } from "@/store";
import dayjs from "dayjs";
import PomodoroInnerContent from "./PomodoroInnerContent";
import MoreOptions from "./MoreOptions";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Pomodoro = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    status,
    type,
    startedAt,
    lastPausedAt,
    elapsedTime,
    totalPausedDuration,
    setSession,
    nextSession,
    intendedDuration,
  } = useSessionStore();

  const remainingTime = formatTime(Math.floor(intendedDuration - elapsedTime));

  const onStart = () => {
    if (status === "IDLE") {
      const startedAt = dayjs().toISOString();

      setSession({
        startedAt,
        status: "RUNNING",
      });
    } else if (status === "RUNNING") {
      const lastPausedAt = dayjs().toISOString();

      setSession({
        lastPausedAt,
        status: "PAUSED",
      });
    } else if (status === "PAUSED") {
      const pausedDuration =
        dayjs().diff(dayjs(lastPausedAt), "second") + totalPausedDuration;

      setSession({
        totalPausedDuration: pausedDuration,
        status: "RUNNING",
      });
    }
  };

  const updateTimer = () => {
    const elapsedTime =
      dayjs().diff(dayjs(startedAt), "second") - totalPausedDuration;

    if (elapsedTime >= intendedDuration) {
      setSession({
        status: "COMPLETED",
        elapsedTime: intendedDuration,
        endedAt: dayjs().toISOString(),
      });
      nextSession();

      clearInterval(intervalRef.current!);

      return;
    }

    setSession({
      elapsedTime,
    });
  };

  useEffect(() => {
    if (status === "RUNNING") {
      intervalRef.current = setInterval(updateTimer, 500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);

  return (
    <div className="group bg-card relative col-start-2 col-end-3 flex flex-col items-center rounded-2xl border p-10 shadow">
      <RingProgress
        value={(elapsedTime / intendedDuration) * 100}
        className="size-100"
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

      <p className="mt-4 text-center font-medium">Project Name</p>

      <MoreOptions />
    </div>
  );
};

export default Pomodoro;
