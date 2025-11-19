import SegmentedControl from "@/components/ui/SegmentedControl";
import { Session } from "@/types";
import { Brain, Cloud, Coffee } from "lucide-react";
import { useState } from "react";

const SwitchSession = () => {
  const [_activeTab, setActiveTab] = useState<Session["type"]>("FOCUS");

  return (
    <div className="mt-5 gap-2">
      <SegmentedControl
        onChange={(val) => setActiveTab(val as Session["type"])}
        defaultIndex={1}
        segments={[
          {
            value: "SHORTBREAK",
            icon: <Coffee />,
          },
          {
            value: "FOCUS",
            icon: <Brain />,
          },
          {
            value: "LONGBREAK",
            icon: <Cloud />,
          },
        ]}
      />
    </div>
  );
};

export default SwitchSession;
