import { RingProgress } from "@/components/ui/RingProgress";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pause, Play, Power } from "lucide-react";
import { cn } from "@/utils/helpers";
import { useSettings } from "@/store";

interface ISession {
  startTimestamp: number | null;
  endTimestamp: number | null;
  lastPausedAt: number | null;
  totalPausedDuration: number;
  status: "IDLE" | "RUNNING" | "COMPLETED" | "PAUSED";
  elapsedTime: number;
  type: "FOCUS" | "SHORTBREAK" | "LONGBREAK";
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Pomodoro = () => {
  const { pomoDuration } = useSettings();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [session, setSession] = useState<ISession>({
    startTimestamp: null,
    endTimestamp: null,
    lastPausedAt: null,
    status: "IDLE",
    elapsedTime: 0,
    totalPausedDuration: 0,
    type: "FOCUS",
  });

  const remainingTime = formatTime(
    Math.floor(pomoDuration - session.elapsedTime)
  );

  const updateTimer = () => {
    const elapsedTime =
      (Date.now() -
        (session.startTimestamp ?? 0) -
        session.totalPausedDuration) /
      1000;

    if (elapsedTime >= pomoDuration) {
      setSession((prev) => ({
        ...prev,
        status: "COMPLETED",
        elapsedTime: pomoDuration,
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

  return (
    <div>
      <RingProgress
        value={(session.elapsedTime / pomoDuration) * 100}
        className="size-100"
        circleProps={{
          strokeWidth: 6,
          className: cn("stroke-primary/20", {
            "stroke-green-400/20": session.type === "SHORTBREAK",
          }),
        }}
        progressCircleProps={{
          strokeWidth: 6,
          className: cn("stroke-primary", {
            "stroke-green-400/60": session.type === "SHORTBREAK",
          }),
        }}
        content={
          <div className="flex flex-col gap-2 items-center justify-center relative">
            <p
              className={cn(
                "font-bold text-6xl text-black/70 dark:text-white/90",
                {
                  "text-muted-foreground dark:text-muted-foreground":
                    session.status === "PAUSED",
                }
              )}
            >
              {remainingTime}
            </p>

            <p className="tracking-widest text-primary font-medium">
              {session.type === "FOCUS" ? "🍅 FOCUS MODE" : "BREAK TIME"}
            </p>

            {session.status !== "COMPLETED" && (
              <Button
                onClick={onStart}
                className="absolute text-primary size-16 hover:scale-105 transition-transform bg-transparent hover:bg-transparent -bottom-[75%]"
              >
                {session.status === "IDLE" ? (
                  <Power className="size-8" />
                ) : session.status === "PAUSED" ? (
                  <Play className="size-8" />
                ) : (
                  <Pause className="size-8" />
                )}
              </Button>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Pomodoro;
