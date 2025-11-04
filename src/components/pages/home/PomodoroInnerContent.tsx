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
    <div className="flex flex-col gap-2 items-center justify-center relative">
      <p
        className={cn("font-bold text-6xl text-black/70 dark:text-white/90", {
          "text-muted-foreground dark:text-muted-foreground":
            status === "PAUSED",
        })}
      >
        {remainingTime}
      </p>

      <p
        className={cn("tracking-widest text-primary font-medium", {
          "text-green-400": type === "SHORTBREAK",
          "text-blue-400": type === "LONGBREAK",
        })}
      >
        {type === "FOCUS" ? "🍅 FOCUS MODE" : "🍅 BREAK TIME"}
      </p>

      {status !== "COMPLETED" && (
        <Button
          onClick={onStart}
          className={cn(
            "absolute text-primary size-16 hover:scale-105 transition-transform bg-transparent hover:bg-transparent -bottom-[75%]",
            {
              "text-green-400": type === "SHORTBREAK",
              "text-blue-400": type === "LONGBREAK",
            }
          )}
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
  );
};

export default PomodoroInnerContent;
