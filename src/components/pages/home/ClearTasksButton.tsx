import { Button } from "@/components/ui/Button";
import { useTaskStore } from "@/store";

const ClearTasksButton = () => {
  const { resetTasks } = useTaskStore();

  return (
    <Button
      onClick={resetTasks}
      className="group border-primary relative mt-auto inline-flex h-10 items-center justify-center overflow-hidden border-2 bg-transparent! p-4 px-6 py-3 font-medium shadow-md transition duration-300 ease-out"
    >
      <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center text-xl text-white duration-300 group-hover:translate-x-0">
        🎉🎉🎉
      </span>
      <span className="ease absolute flex h-full w-full transform items-center justify-center text-black transition-all duration-300 group-hover:translate-x-full">
        Clear all
      </span>
      <span className="invisible relative">Clear all tasks</span>
    </Button>
  );
};

export default ClearTasksButton;
