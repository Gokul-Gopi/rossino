import { Button } from "@/components/ui/Button";
import { Session } from "@/types";
import { cn } from "@/utils/helpers";
import { Pause, Play, Power } from "lucide-react";

interface IPomodoroInnerContentProps {
  remainingTime: string;
  status: Session["status"];
  type: Session["type"];
  onStart: () => void;
}

const PomodoroInnerContent = ({
  remainingTime,
  status,
  type,
  onStart,
}: IPomodoroInnerContentProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center md:gap-2">
      <p
        className={cn(
          "text-4xl font-bold text-black/70 md:text-6xl dark:text-white/90",
          {
            "text-muted-foreground dark:text-muted-foreground":
              status === "PAUSED",
          },
        )}
      >
        {remainingTime}
      </p>

      <p
        className={cn(
          "text-primary text-[10px] font-semibold tracking-widest md:text-sm md:font-medium lg:text-base",
          {
            "text-green-400": type === "SHORTBREAK",
            "text-blue-400": type === "LONGBREAK",
          },
        )}
      >
        {type === "FOCUS" ? "🍅 FOCUS MODE" : "🍅 BREAK TIME"}
      </p>

      {status !== "COMPLETED" && (
        <Button
          onClick={onStart}
          className={cn(
            "text-primary absolute -bottom-[3.5rem] size-16 bg-transparent transition-transform hover:scale-105 hover:bg-transparent md:-bottom-[70%] lg:-bottom-[75%]",
            {
              "text-green-400": type === "SHORTBREAK",
              "text-blue-400": type === "LONGBREAK",
            },
          )}
        >
          {status === "IDLE" ? (
            <Power className="size-4 md:size-6 lg:size-8" />
          ) : status === "PAUSED" ? (
            <Play className="size-4 md:size-6 lg:size-8" />
          ) : (
            <Pause className="size-4 md:size-6 lg:size-8" />
          )}
        </Button>
      )}
    </div>
  );
};

export default PomodoroInnerContent;
