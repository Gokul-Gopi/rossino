import { RingProgress } from "@/components/ui/RingProgress";
import { useEffect, useRef, useState } from "react";
import { Database } from "@/utils/database.types";
import { Button } from "@/components/ui/Button";

const testSettings: Database["public"]["Tables"]["settings"]["Row"] = {
  userId: "user-123",
  autoStartBreak: true,
  autoStartPomo: true,
  pomoDuration: 10,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  longBreakInterval: 4,
  breakEndReminder: 5,
  timeLeftReminder: 5,
  notificationsEnabled: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface ISession {
  startTimestamp: number | null;
  endTimestamp: number | null;
  lastPausedAt: number | null;
  totalPausedDuration: number;
  status: "IDLE" | "RUNNING" | "COMPLETED" | "PAUSED";
  elapsedTime: number;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Pomodoro = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [session, setSession] = useState<ISession>({
    startTimestamp: null,
    endTimestamp: null,
    lastPausedAt: null,
    status: "IDLE",
    elapsedTime: 0,
    totalPausedDuration: 0,
  });

  const remainingTime = formatTime(Math.floor(session.elapsedTime));

  useEffect(() => {
    if (session.status === "RUNNING") {
      intervalRef.current = setInterval(updateTimer, 500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [session.status]);

  const updateTimer = () => {
    const elapsedTime =
      (Date.now() -
        (session.startTimestamp ?? 0) -
        session.totalPausedDuration) /
      1000;

    if (elapsedTime >= testSettings.pomoDuration) {
      setSession((prev) => ({
        ...prev,
        status: "COMPLETED",
        elapsedTime: testSettings.pomoDuration,
      }));

      clearInterval(intervalRef.current!);

      return;
    }

    setSession((prev) => ({
      ...prev,
      elapsedTime,
    }));
  };

  const onStart = () => {
    if (session.status === "IDLE") {
      const startTimestamp = Date.now();

      setSession((prev) => ({
        ...prev,
        startTimestamp,
        status: "RUNNING",
      }));
    } else if (session.status === "RUNNING") {
      const lastPausedAt = Date.now();

      setSession((prev) => ({
        ...prev,
        lastPausedAt,
        status: "PAUSED",
      }));
    } else if (session.status === "PAUSED") {
      const totalPausedDuration =
        (session.lastPausedAt ? Date.now() - session.lastPausedAt : 0) +
        session.totalPausedDuration;

      setSession((prev) => ({
        ...prev,
        totalPausedDuration,
        status: "RUNNING",
      }));
    }
  };

  return (
    <div>
      <RingProgress
        value={((session.elapsedTime ?? 0) / testSettings.pomoDuration) * 100}
        className="size-80"
        circleProps={{
          strokeWidth: 6,
          // className: cn("stroke-primary/20", {
          //   "stroke-green-400/20": isBreak,
          // }),
        }}
        progressCircleProps={{
          strokeWidth: 6,
          // className: cn("stroke-primary", {
          //   "stroke-green-400/60": isBreak,
          // }),
        }}
        content={
          <div className="flex flex-col gap-2 items-center justify-center">
            {remainingTime}
            <Button onClick={onStart}>
              {session.status === "IDLE"
                ? "Start"
                : session.status === "PAUSED"
                ? "Resume"
                : "Pause"}
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default Pomodoro;
