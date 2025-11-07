import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Switch } from "@/components/ui/Switch";
import { useWidgetsStore, useTaskStore } from "@/store";
import { ChevronDown } from "lucide-react";

const MoreOptions = () => {
  const { showTasks, toggleTasksVisibility } = useTaskStore();
  const { showWidgets, toggleWidgets } = useWidgetsStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="text-primary group absolute right-0 -bottom-12 bg-transparent px-0! font-medium hover:bg-transparent">
          More options{" "}
          <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="bg-card flex w-[10rem] flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <Label htmlFor="tasks">Tasks</Label>
          <Switch
            id="tasks"
            checked={showTasks}
            onCheckedChange={toggleTasksVisibility}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="widgets">Widgets</Label>
          <Switch
            id="widgets"
            checked={showWidgets}
            onCheckedChange={toggleWidgets}
          />
        </div>

        <Button size="sm" variant="outline" className="text-sm">
          Reset Timer
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default MoreOptions;
