import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SegmentedControl from "@/components/ui/SegmentedControl";
import useStore, { useStoreActions } from "@/store";
import { Session } from "@/types";
import { cn } from "@/utils/helpers";
import { Brain, Cloud, Coffee } from "lucide-react";
import { useState } from "react";

const SwitchSession = () => {
  const [discardSession, setDiscardSession] = useState(false);
  const [switchedSession, setSwitchedSession] = useState<
    Session["type"] | null
  >(null);

  const { resetSession } = useStoreActions();

  const type = useStore((state) => state.type);
  const status = useStore((state) => state.status);
  const projectId = useStore((state) => state.projectId);
  const projectName = useStore((state) => state.projectName);

  const onSwitchSession = (value: Session["type"]) => {
    if (status === "RUNNING") {
      setDiscardSession(true);
      setSwitchedSession(value as Session["type"]);
      return;
    }
    resetSession({ type: value, projectId, projectName });
  };

  const onConfirm = () => {
    resetSession({ type: switchedSession!, projectId, projectName });
    setDiscardSession(false);
  };

  return (
    <div className="mt-3 mb-4">
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
        className="border-none shadow-none"
        highlightClassName={cn({
          "bg-primary/40": type === "FOCUS",
          "bg-green-400/40": type === "SHORTBREAK",
          "bg-blue-400/40": type === "LONGBREAK",
        })}
      />

      <ConfirmDialog
        open={discardSession}
        onConfirm={onConfirm}
        onOpenChange={() => setDiscardSession((pre) => !pre)}
        title="Your current session will be discarded. Countinue?"
      />
    </div>
  );
};

export default SwitchSession;
