import { Button } from "@/components/ui/Button";
import { useTaskStore } from "@/store";

const Options = () => {
  const { tasks, showTasks, toggleTasksVisibility } = useTaskStore();

  return (
    <>
      <Button
        onClick={toggleTasksVisibility}
        className="z-10 mr-auto border"
        variant="outline"
      >
        {tasks.length ? (showTasks ? "Hide" : "Show") : "Add"} Tasks
      </Button>
    </>
  );
};

export default Options;
