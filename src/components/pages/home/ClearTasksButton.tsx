import { Button } from "@/components/ui/Button";
import {
  useDeleteProjectTasks,
  useDeleteUserTasks,
} from "@/query/task.queries";
import useStore, { useStoreActions } from "@/store";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const ClearTasksButton = () => {
  const userId = useStore((state) => state.userId);
  const projectId = useStore((state) => state.projectId);
  const tasks = useStore((state) => state.tasks);

  const { setTasks, resetTasks } = useStoreActions();

  const deleteProjectTasks = useDeleteProjectTasks();
  const deleteUserTasks = useDeleteUserTasks();

  const onClearTasks = () => {
    if (userId) {
      if (projectId)
        deleteProjectTasks.mutate(
          { projectId },
          {
            onError: () => setTasks(tasks),
          },
        );
      else
        deleteUserTasks.mutate(
          { userId },
          {
            onError: () => setTasks(tasks),
          },
        );
    }

    resetTasks();
    confetti();

    toast.success("Woohoo! You cleared all your tasks!", {
      duration: 4000,
    });
  };

  return (
    <Button
      onClick={onClearTasks}
      className="group border-primary relative mx-auto mt-auto inline-flex h-11 max-w-[15rem] items-center justify-center overflow-hidden border-2 bg-transparent! p-4 px-6 py-3 font-medium shadow-md transition duration-300 ease-out"
    >
      <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center text-xl text-white duration-300 group-hover:translate-x-0 dark:text-white">
        🎉🎉🎉
      </span>
      <span className="ease absolute flex h-full w-full transform items-center justify-center text-black transition-all duration-300 group-hover:translate-x-full dark:text-white">
        Clear all
      </span>
      <span className="invisible relative">Clear all tasks</span>
    </Button>
  );
};

export default ClearTasksButton;
