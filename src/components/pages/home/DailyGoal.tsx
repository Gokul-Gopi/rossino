import { RingProgress } from "@/components/ui/RingProgress";

//TODO: delete this component, not needed anymore

const DailyGoal = () => {
  const dailyGoalProgress = 75; // Example progress percentage

  return (
    <div className="flex items-center gap-4">
      <RingProgress value={dailyGoalProgress} className="size-30" />
      <div>
        <p className="font-medium max-md:text-sm">Daily Goal Progress</p>
        <span className="text-muted-foreground text-sm font-medium">
          Goal: 2 hours
        </span>
      </div>
    </div>
  );
};

export default DailyGoal;
