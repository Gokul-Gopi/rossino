import { RingProgress } from "@/components/ui/RingProgress";
import { cn } from "@/utils/helpers";
import PomodoroInnerContent from "./PomodoroInnerContent";
import { SessionStore } from "@/store/session.slice";

interface IRingTimerProps {
  progress: number;
  remainingTime: string;
  status: SessionStore["status"];
  type: SessionStore["type"];
  onStart: () => void;
}

const RingTimer = ({
  progress,
  remainingTime,
  status,
  type,
  onStart,
}: IRingTimerProps) => {
  return (
    <RingProgress
      value={progress}
      className="animate-in fade-in size-50 md:size-80 lg:size-100"
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
  );
};

export default RingTimer;
