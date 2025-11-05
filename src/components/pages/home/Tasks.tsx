import ControlledTextInput from "@/components/form/ControlledTextInput";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { useTaskStore } from "@/store";
import { cn } from "@/utils/helpers";
import { addTaskSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Tasks = () => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const form = useForm({
    resolver: zodResolver(addTaskSchema),
  });

  const { tasks, addTask, editTask, toggleCompletion } = useTaskStore();

  const onSubmit = form.handleSubmit((data) => {
    addTask(data);
    form.reset({ title: "" });
  });

  return (
    <div className="bg-card rounded-2xl border p-10 shadow">
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

      <div className="flex max-h-[25rem] flex-col gap-2 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn("flex items-center transition-opacity duration-300", {
              "opacity-50": task.completed,
            })}
          >
            <Checkbox
              onCheckedChange={() => toggleCompletion(task.id)}
              checked={task.completed}
              className="size-5"
            />
            <Input
              readOnly={editingTaskId !== task.id}
              value={task.title}
              onDoubleClick={(e) => {
                if (!task.completed) {
                  const length = e.currentTarget.value.length;
                  e.currentTarget.setSelectionRange(length, length);
                  setEditingTaskId(task.id);
                }
              }}
              onChange={(e) => editTask({ id: task.id, title: e.target.value })}
              onBlur={() => setEditingTaskId(null)}
              className={cn(
                "focus-visible:border-input mx-2 cursor-default! rounded-none border-0 px-0 shadow-none outline-none not-read-only:border-b read-only:cursor-text! focus-visible:ring-0",
                {
                  "text-muted-foreground line-through read-only:cursor-default!":
                    task.completed,
                },
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
