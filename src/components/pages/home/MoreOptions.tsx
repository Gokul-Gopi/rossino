import { Button } from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Label } from "@/components/ui/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Switch } from "@/components/ui/Switch";
import { useMobile } from "@/hooks/useMobile";
import { useWidgetsStore, useTaskStore, useSessionStore } from "@/store";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import { useState } from "react";

const MoreOptions = () => {
  const [confirmReset, setConfirmReset] = useState(false);

  const { setSession } = useSessionStore();
  const { showWidgets, toggleWidgets } = useWidgetsStore();
  const { showTasks, toggleTasksVisibility } = useTaskStore();

  const isMobile = useMobile();

  const onResetTimer = () => {
    setSession({
      startedAt: null,
      endedAt: null,
      lastPausedAt: null,
      totalPausedDuration: 0,
      elapsedTime: 0,
      status: "IDLE",
    });
    setConfirmReset(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          {isMobile ? (
            <Button size="icon" className="fixed right-4 bottom-4 rounded-full">
              <EllipsisVertical />
            </Button>
          ) : (
            <Button className="text-primary group absolute right-4 bottom-2 bg-transparent px-0! font-medium hover:bg-transparent active:scale-100 max-md:hidden 2xl:right-0 2xl:-bottom-12">
              More options{" "}
              <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          )}
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

          <Button
            onClick={() => setConfirmReset(true)}
            size="sm"
            variant="outline"
            className="text-sm"
          >
            Reset Timer
          </Button>
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        open={confirmReset}
        onOpenChange={() => setConfirmReset((pre) => !pre)}
        title="This will reset the current session's timer. Continue?"
        onConfirm={onResetTimer}
      />
    </>
  );
};
export default MoreOptions;
