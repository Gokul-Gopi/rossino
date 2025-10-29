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
        gaugePrimaryColor="rgb(79 70 229)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
      />
    </div>
  );
};

export default Timer;
