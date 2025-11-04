import ControlledTextInput from "@/components/form/ControlledTextInput";
import { Button } from "@/components/ui/Button";
import { addTaskSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const Tasks = () => {
  const form = useForm({
    resolver: zodResolver(addTaskSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="bg-card rounded-2xl border p-10 shadow">
      <form onSubmit={onSubmit} className="flex gap-2">
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
    </div>
  );
};

export default Tasks;
