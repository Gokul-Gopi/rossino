import { RingProgress } from "@/components/ui/RingProgress";
import { useEffect, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <RingProgress
        value={timer}
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
      />
    </div>
  );
};

export default Timer;
