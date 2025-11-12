import ControlledTextInput from "@/components/form/ControlledTextInput";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useSessionStore, useTaskStore, useUserStore } from "@/store";
import { cn } from "@/utils/helpers";
import { addTaskSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ClearTasksButton from "./ClearTasksButton";
import { motion } from "motion/react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "@/query/task.queries";

type ITaskProps = {
  id: string;
  title: string;
  completed: boolean;
};

const Task = ({ id, title, completed }: ITaskProps) => {
  const [taskIdToEdit, setEditingTaskId] = useState<string | null>(null);
  const [value, setValue] = useState(title);
  const debounedValue = useDebouncedValue(value, 500);

  const { updateTask, deleteTask, toggleCompletion } = useTaskStore();

  const updateQuery = useUpdateTask();
  const deleteQuery = useDeleteTask();

  const { projectId } = useSessionStore();

  const onComplete = () => {
    toggleCompletion(id);

    updateQuery.mutate(
      { id, completed: !completed },
      {
        onError: () => {
          toggleCompletion(id);
        },
      },
    );
  };

  const onDelete = (id: string) => {
    deleteTask(id);

    deleteQuery.mutate(
      { id },
      {
        onError: () => {
          updateTask(id, { id, title, completed, projectId });
        },
      },
    );
  };

  // useEffect(() => {
  //   editTask({ id, title: debounedValue, projectId });
  // }, [debounedValue, editTask, id, projectId]);

  return (
    <div className="group flex items-center gap-2">
      <Checkbox
        onCheckedChange={onComplete}
        checked={completed}
        className={cn("size-5", {
          "opacity-50 transition-opacity duration-300": completed,
        })}
      />

      <div
        className={cn("w-full", {
          "text-muted-foreground line-through opacity-50 transition-opacity duration-300 read-only:cursor-default!":
            completed,
        })}
      >
        {taskIdToEdit === id ? (
          <Input
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setEditingTaskId(null)}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            className="focus-visible:border-input cursor-default! rounded-none border-0 px-0 shadow-none outline-none not-read-only:border-b read-only:cursor-text! focus-visible:ring-0"
          />
        ) : (
          <div
            onDoubleClick={() => !completed && setEditingTaskId(id)}
            className="line-clamp-3 max-md:text-sm"
          >
            {title}
          </div>
        )}
      </div>

      <Button
        size="icon"
        onClick={() => onDelete(id)}
        className="text-primary mr-4 w-fit! bg-transparent transition-opacity duration-300 group-hover:opacity-100 hover:bg-transparent lg:opacity-0"
      >
        <X />
      </Button>
    </div>
  );
};

const Tasks = () => {
  const form = useForm({
    resolver: zodResolver(addTaskSchema),
  });

  const { userId } = useUserStore();
  const { tasks, addTask, deleteTask, updateTask } = useTaskStore();
  const { projectId } = useSessionStore();

  const createTask = useCreateTask();

  const onSubmit = form.handleSubmit((data) => {
    const tempId = Date.now().toString();

    addTask({
      id: tempId,
      title: data.title,
      completed: false,
      projectId,
    });

    if (userId) {
      createTask.mutate(
        { title: data.title, projectId, userId },
        {
          onSuccess: (task) => {
            updateTask(tempId, task);
          },
          onError: () => {
            deleteTask(tempId);
          },
        },
      );
    }

    form.reset({ title: "" });
  });

  const haveIncompleteTasks = tasks.length
    ? tasks.some((task) => !task.completed)
    : true;

  return (
    <motion.div
      key="tasks"
      initial={{ x: "100%", opacity: 0, scale: 0.98 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 40 }}
      className="bg-card flex flex-col rounded-2xl border p-5 shadow md:p-10"
    >
      <form onSubmit={onSubmit} className="mb-5 flex gap-2">
        <FormProvider {...form}>
          <ControlledTextInput
            name="title"
            placeholder="Task name.."
            className="text-sm!"
          />
          <Button type="submit" className="h-[2.5rem] text-sm text-white">
            Add
          </Button>
        </FormProvider>
      </form>

      {tasks.length ? (
        <ScrollArea className="flex max-h-[25rem] flex-col gap-2 overflow-y-auto pb-4">
          {tasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </ScrollArea>
      ) : (
        <p className="my-auto text-center text-gray-400">No tasks added..</p>
      )}

      {!haveIncompleteTasks && <ClearTasksButton />}
    </motion.div>
  );
};

export default Tasks;
