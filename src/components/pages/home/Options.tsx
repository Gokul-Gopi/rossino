import { Button } from "@/components/ui/Button";
import { useSummaryStore, useTaskStore } from "@/store";

const Options = () => {
  const { tasks, showTasks, toggleTasksVisibility } = useTaskStore();
  const { toggleSummary } = useSummaryStore();

  return (
    <div className="z-10 flex items-center justify-start gap-4">
      <Button
        onClick={toggleTasksVisibility}
        className="min-w-[7.5rem] border"
        variant="outline"
      >
        {tasks.length ? (showTasks ? "Hide" : "Show") : "Add"} Tasks
      </Button>

      <Button onClick={toggleSummary} className="z-10 border" variant="outline">
        My Today
      </Button>
    </div>
  );
};

export default Options;
