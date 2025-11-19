import SegmentedControl from "@/components/ui/SegmentedControl";
import { Session } from "@/types";
import { Brain, Cloud, Coffee } from "lucide-react";
import { useState } from "react";

const SwitchSession = () => {
  const [_activeTab, setActiveTab] = useState<Session["type"]>("FOCUS");

  return (
    <div className="mt-4 pb-4">
      <SegmentedControl
        onChange={(val) => setActiveTab(val as Session["type"])}
        defaultIndex={1}
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
      />
    </div>
  );
};

export default SwitchSession;
