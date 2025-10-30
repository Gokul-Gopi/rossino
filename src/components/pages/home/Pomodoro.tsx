import { RingProgress } from "@/components/ui/RingProgress";
import { useEffect, useMemo, useRef, useState } from "react";
import { Database } from "@/utils/database.types";
import { Button } from "@/components/ui/Button";

const testSettings: Database["public"]["Tables"]["settings"]["Row"] = {
  userId: "user-123",
  autoStartBreak: true,
  autoStartPomo: true,
  pomoDuration: 120,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  longBreakInterval: 4,
  breakEndReminder: 5,
  timeLeftReminder: 5,
  notificationsEnabled: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(testSettings.pomoDuration);
  const [isPaused, setIsPaused] = useState(true);

  const interval = useRef<ReturnType<typeof setInterval>>(null);
  const isCompleted = useMemo(() => timeLeft === 0, [timeLeft]);

  const time = useMemo(() => {
    const date = new Date(timeLeft * 1000);
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  useEffect(() => {
    if (isCompleted) {
      clearInterval(interval.current!);
      return;
    }
  }, [isCompleted]);

  const onStart = () => {
    if (isCompleted) return;

    if (isPaused) {
      interval.current = setInterval(() => {
        console.log("tick");
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : prev));
      }, 1000);
    } else {
      clearInterval(interval.current!);
    }

    setIsPaused((prev) => !prev);
  };

  return (
    <div>
      <RingProgress
        value={
          ((testSettings.pomoDuration - timeLeft) / testSettings.pomoDuration) *
          100
        }
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
            {time}
            <Button onClick={onStart}>{isPaused ? "Start" : "Pause"}</Button>
          </div>
        }
      />
    </div>
  );
};

export default Pomodoro;
