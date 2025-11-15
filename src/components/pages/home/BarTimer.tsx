import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Session } from "@/types";
import { cn } from "@/utils/helpers";
import PomodoroInnerContent from "./PomodoroInnerContent";

interface IBarTimerProps {
  progress: number;
  type: Session["type"];
  status: Session["status"];
  remainingTime: string;
  onStart: () => void;
}

const BarTimer = ({
  progress,
  type,
  status,
  remainingTime,
  onStart,
}: IBarTimerProps) => {
  return (
    <div className="m-auto flex w-full flex-col items-center gap-10">
      <div className="absolute top-10 w-full px-10">
        <Progress
          value={progress}
          className={cn("bg-primary/20 h-3", {
            "bg-green-400/20": type === "SHORTBREAK",
            "bg-blue-400/20": type === "LONGBREAK",
          })}
          indicatorClassName={cn("bg-primary", {
            "bg-green-400": type === "SHORTBREAK",
            "bg-blue-400": type === "LONGBREAK",
          })}
        />
      </div>

      <PomodoroInnerContent
        onStart={onStart}
        remainingTime={remainingTime}
        status={status}
        type={type}
      />
    </div>
  );
};

export default BarTimer;
("animate-in fade-in absolute inset-0 m-auto size-fit delay-[var(--delay)] duration-[var(--transition-length)] ease-linear");
