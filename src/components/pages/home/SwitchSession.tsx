import SegmentedControl from "@/components/ui/SegmentedControl";
import useStore, { useStoreActions } from "@/store";
import { Session } from "@/types";
import { cn } from "@/utils/helpers";
import { Brain, Cloud, Coffee } from "lucide-react";

const SwitchSession = () => {
  const { setSession } = useStoreActions();

  const type = useStore((state) => state.type);
  const pomoDuration = useStore((state) => state.pomoDuration);
  const shortBreakDuration = useStore((state) => state.shortBreakDuration);
  const longBreakDuration = useStore((state) => state.longBreakDuration);

  const onSwitchSession = (value: Session["type"]) => {
    setSession({
      type: value,
      startedAt: null,
      endedAt: null,
      lastPausedAt: null,
      elapsedTime: 0,
      status: "IDLE",
      intendedDuration:
        value === "FOCUS"
          ? pomoDuration
          : value === "SHORTBREAK"
            ? shortBreakDuration
            : longBreakDuration,
    });
  };

  return (
    <div className="mt-4 pb-4">
      <SegmentedControl
        value={type}
        onChange={(value) => onSwitchSession(value as Session["type"])}
        segments={[
          {
            value: "SHORTBREAK",
            icon: <Coffee size={20} />,
          },
          {
            value: "FOCUS",
            icon: <Brain size={20} />,
          },
          {
            value: "LONGBREAK",
            icon: <Cloud size={20} />,
          },
        ]}
        highlightClassName={cn({
          "bg-primary/40": type === "FOCUS",
          "bg-green-400/40": type === "SHORTBREAK",
          "bg-blue-400/40": type === "LONGBREAK",
        })}
      />
    </div>
  );
};

export default SwitchSession;
