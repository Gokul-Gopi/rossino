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
import { useUpdateSession } from "@/query/session.queries";
import useStore, { useStoreActions } from "@/store";
import { SessionStore } from "@/store/session.slice";
import {
  ChevronDown,
  EllipsisVertical,
  Grid2x2,
  Plus,
  SquareCheckBig,
  Undo2,
} from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import CreateNew from "./CreateNew";
import { Separator } from "@/components/ui/Separator";

const MoreOptions = () => {
  const router = useRouter();
  const isMobile = useMobile();

  const [confirmReset, setConfirmReset] = useState(false);
  const [createNewOpen, setCreateNewOpen] = useState(false);

  const userId = useStore((state) => state.userId);
  const sessionId = useStore((state) => state.sessionId);
  const projectId = useStore((state) => state.projectId);
  const startedAt = useStore((state) => state.startedAt);
  const endedAt = useStore((state) => state.endedAt);
  const lastPausedAt = useStore((state) => state.lastPausedAt);
  const totalPausedDuration = useStore((state) => state.totalPausedDuration);
  const elapsedTime = useStore((state) => state.elapsedTime);
  const status = useStore((state) => state.status);
  const showWidgets = useStore((state) => state.showWidgets);
  const showTasks = useStore((state) => state.showTasks);

  const { setSession, resetSession, toggleTasks, toggleWidgets } =
    useStoreActions();

  const updateSession = useUpdateSession();

  const onResetTimer = () => {
    const resetState: Partial<SessionStore> = {
      startedAt: null,
      endedAt: null,
      lastPausedAt: null,
      totalPausedDuration: 0,
      status: "IDLE",
    };
    setSession({ ...resetState, elapsedTime: 0 });

    if (userId && sessionId) {
      updateSession.mutate(
        { id: sessionId, projectId, userId, ...resetState },
        {
          onError: () => {
            const prevState = {
              startedAt,
              endedAt,
              lastPausedAt,
              totalPausedDuration,
              elapsedTime,
              status,
            };
            setSession(prevState);
          },
        },
      );
    }

    setConfirmReset(false);
  };

  const onContWithoutProject = () => {
    if (userId) {
      if (router.query.project) {
        router.replace(router.pathname, undefined, { shallow: true });
      }
    }

    resetSession();
    setCreateNewOpen(false);
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
            <Button className="text-primary group absolute right-4 bottom-2 bg-transparent px-0! font-semibold hover:bg-transparent active:scale-100 2xl:right-0 2xl:-bottom-12">
              More options{" "}
              <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          )}
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="bg-card flex w-[11rem] flex-col gap-2.5 border-0"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="tasks">
              <SquareCheckBig className="size-4" />
              Tasks
            </Label>
            <Switch
              id="tasks"
              checked={showTasks}
              onCheckedChange={toggleTasks}
            />
          </div>

          <Separator className="bg-[#f7dcca]" />

          <div className="flex items-center justify-between">
            <Label htmlFor="widgets">
              <Grid2x2 className="size-4" />
              Widgets
            </Label>
            <Switch
              id="widgets"
              checked={showWidgets}
              onCheckedChange={toggleWidgets}
            />
          </div>

          <Separator className="bg-[#f7dcca]" />

          <Button
            onClick={() => setCreateNewOpen(true)}
            size="sm"
            className="h-auto justify-start bg-transparent p-0! text-sm text-black hover:bg-transparent active:scale-100"
          >
            <Plus />
            Create new
          </Button>

          <Separator className="bg-[#f7dcca]" />

          <Button
            onClick={() => setConfirmReset(true)}
            size="sm"
            className="h-auto justify-start bg-transparent p-0! text-sm text-red-500 hover:bg-transparent active:scale-100"
          >
            <Undo2 />
            <span>Reset Timer</span>
          </Button>
        </PopoverContent>
      </Popover>

      <CreateNew
        open={createNewOpen}
        onOpenChange={() => setCreateNewOpen((pre) => !pre)}
        onContWithoutProject={onContWithoutProject}
      />

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
