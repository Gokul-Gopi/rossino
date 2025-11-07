import { RingProgress } from "@/components/ui/RingProgress";
import { useWidgetsStore } from "@/store";

const DailyGoal = () => {
  const { dailyGoalProgress } = useWidgetsStore();

  return (
    <div className="flex items-center gap-4">
      <RingProgress value={dailyGoalProgress} className="size-30" />
      <p>Daily Goal Progress</p>
    </div>
  );
};

export default DailyGoal;
