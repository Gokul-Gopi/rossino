import SegmentedControl from "@/components/ui/SegmentedControl";
import { Brain, Cloud, Coffee } from "lucide-react";
import { useState } from "react";

const SwitchSession = () => {
  const [_activeTab, setActiveTab] = useState("focus");

  return (
    <div className="mt-5 flex w-full items-center justify-between gap-2">
      <SegmentedControl
        onChange={(val) => setActiveTab(val)}
        defaultIndex={1}
        segments={[
          {
            label: "Focus",
            value: "focus",
            icon: <Brain />,
          },
          {
            label: "Short Break",
            value: "short",
            icon: <Coffee />,
          },
          {
            label: "Long Break",
            value: "long",
            icon: <Cloud />,
          },
        ]}
      />
    </div>
  );
};

export default SwitchSession;
