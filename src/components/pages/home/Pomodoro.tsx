import { RingProgress } from "@/components/ui/RingProgress";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Pause, Play, Power } from "lucide-react";
import { cn } from "@/utils/helpers";
import { useSession, useSettings } from "@/store";
import dayjs from "dayjs";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Pomodoro = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { pomoDuration } = useSettings();

  const {
    status,
    type,
    startedAt,
    lastPausedAt,
    elapsedTime,
    totalPausedDuration,
    setSession,
  } = useSession();

  const remainingTime = formatTime(Math.floor(pomoDuration - elapsedTime));

  const updateTimer = () => {
    const elapsedTime =
      dayjs().diff(dayjs(startedAt), "second") - totalPausedDuration;

    if (elapsedTime >= pomoDuration) {
      setSession({
        status: "COMPLETED",
        elapsedTime: pomoDuration,
        endedAt: dayjs().toISOString(),
      });

      clearInterval(intervalRef.current!);

      return;
    }

    setSession({
      elapsedTime,
    });
  };

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
    <div>
      <RingProgress
        value={(elapsedTime / pomoDuration) * 100}
        className="size-100"
        circleProps={{
          strokeWidth: 6,
          className: cn("stroke-primary/20", {
            "stroke-green-400/20": type === "SHORTBREAK",
          }),
        }}
        progressCircleProps={{
          strokeWidth: 6,
          className: cn("stroke-primary", {
            "stroke-green-400/60": type === "SHORTBREAK",
          }),
        }}
        content={
          <div className="flex flex-col gap-2 items-center justify-center relative">
            <p
              className={cn(
                "font-bold text-6xl text-black/70 dark:text-white/90",
                {
                  "text-muted-foreground dark:text-muted-foreground":
                    status === "PAUSED",
                }
              )}
            >
              {remainingTime}
            </p>

            <p className="tracking-widest text-primary font-medium">
              {type === "FOCUS" ? "🍅 FOCUS MODE" : "BREAK TIME"}
            </p>

            {status !== "COMPLETED" && (
              <Button
                onClick={onStart}
                className="absolute text-primary size-16 hover:scale-105 transition-transform bg-transparent hover:bg-transparent -bottom-[75%]"
              >
                {status === "IDLE" ? (
                  <Power className="size-8" />
                ) : status === "PAUSED" ? (
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
