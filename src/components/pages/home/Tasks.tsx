import ControlledTextInput from "@/components/form/ControlledTextInput";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useTaskStore } from "@/store";
import { cn } from "@/utils/helpers";
import { addTaskSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ClearTasksButton from "./ClearTasksButton";

const Tasks = () => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const form = useForm({
    resolver: zodResolver(addTaskSchema),
  });

  const { tasks, addTask, editTask, deleteTask, toggleCompletion } =
    useTaskStore();

  const onSubmit = form.handleSubmit((data) => {
    addTask(data);
    form.reset({ title: "" });
  });

  const haveIncompleteTasks = tasks.length
    ? tasks.some((task) => !task.completed)
    : true;

  return (
    <div className="bg-card flex flex-col rounded-2xl border p-10 shadow">
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
      <ScrollArea className="flex max-h-[25rem] flex-col gap-2 overflow-y-auto pb-4">
        {tasks.map((task) => (
          <div key={task.id} className="group flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => toggleCompletion(task.id)}
              checked={task.completed}
              className={cn("size-5", {
                "opacity-50 transition-opacity duration-300": task.completed,
              })}
            />

            <div
              className={cn("w-full", {
                "text-muted-foreground line-through opacity-50 transition-opacity duration-300 read-only:cursor-default!":
                  task.completed,
              })}
            >
              {editingTaskId === task.id ? (
                <Input
                  value={task.title}
                  autoFocus={task.id === editingTaskId}
                  onChange={(e) =>
                    editTask({ id: task.id, title: e.target.value })
                  }
                  onBlur={() => setEditingTaskId(null)}
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                  className="focus-visible:border-input cursor-default! rounded-none border-0 px-0 shadow-none outline-none not-read-only:border-b read-only:cursor-text! focus-visible:ring-0"
                />
              ) : (
                <div
                  onDoubleClick={() =>
                    !task.completed && setEditingTaskId(task.id)
                  }
                  className="line-clamp-3"
                >
                  {task.title}
                </div>
              )}
            </div>

            <Button
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="text-primary mr-4 w-fit! bg-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-transparent"
            >
              <X />
            </Button>
          </div>
        ))}
      </ScrollArea>

      {!haveIncompleteTasks && <ClearTasksButton />}
    </div>
  );
};

export default Tasks;
